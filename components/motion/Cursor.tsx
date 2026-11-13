"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

/** Elements that get the hover state (ring grows, dot shrinks). */
const INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], [role="tab"], label[for], summary, select, [data-cursor="hover"]';

/** Fine pointer + motion allowed. Touch screens and reduced-motion visitors keep the native cursor. */
const ENABLE_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Custom cursor + background mouse effect (desktop only).
 * - Dot follows the pointer exactly; the ring trails it with a short lerp.
 * - Over links/buttons the ring grows and fills faintly, the dot shrinks.
 * - Press squeezes the ring; a click sends out a ripple from the click point.
 * - The fixed grid (.qo-bg-layer) lights up around the pointer via `.qo-grid-spot`.
 * Inside a modal <dialog> (top layer, above any z-index) it steps aside and the
 * native cursor shows. Colors come from theme tokens (no lime on light).
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    const mq = window.matchMedia(ENABLE_QUERY);
    let teardown: (() => void) | null = null;

    const setup = () => {
      const html = document.documentElement;
      const spot = document.querySelector<HTMLElement>(".qo-grid-spot");
      html.classList.add("qo-cursor-on");

      const pos = { x: -100, y: -100 }; // pointer
      const ringPos = { x: -100, y: -100 }; // trailing ring
      const spotPos = { x: -100, y: -100 }; // slower background light
      let seen = false;

      const setDotX = gsap.quickSetter(dot, "x", "px");
      const setDotY = gsap.quickSetter(dot, "y", "px");
      const setRingX = gsap.quickSetter(ring, "x", "px");
      const setRingY = gsap.quickSetter(ring, "y", "px");

      const tick = () => {
        // Frame-rate independent lerp (gsap.ticker.deltaRatio = 1 at 60fps).
        const r = gsap.ticker.deltaRatio();
        const k = 1 - Math.pow(1 - 0.2, r);
        const ks = 1 - Math.pow(1 - 0.08, r);
        ringPos.x += (pos.x - ringPos.x) * k;
        ringPos.y += (pos.y - ringPos.y) * k;
        spotPos.x += (pos.x - spotPos.x) * ks;
        spotPos.y += (pos.y - spotPos.y) * ks;
        setDotX(pos.x);
        setDotY(pos.y);
        setRingX(ringPos.x);
        setRingY(ringPos.y);
        if (spot) {
          spot.style.setProperty("--mx", `${spotPos.x.toFixed(1)}px`);
          spot.style.setProperty("--my", `${spotPos.y.toFixed(1)}px`);
        }
      };
      gsap.ticker.add(tick);

      const show = (on: boolean) => {
        root.dataset.visible = on ? "true" : "false";
        spot?.classList.toggle("is-on", on);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pos.x = e.clientX;
        pos.y = e.clientY;
        if (!seen) {
          // First move: jump everything to the pointer instead of flying in from a corner.
          seen = true;
          ringPos.x = spotPos.x = pos.x;
          ringPos.y = spotPos.y = pos.y;
        }
        const target = e.target as Element | null;
        const inDialog = !!target?.closest?.("dialog");
        show(!inDialog);
        root.dataset.hover = !inDialog && target?.closest?.(INTERACTIVE) ? "true" : "false";
      };

      const onLeave = (e: MouseEvent) => {
        if (!e.relatedTarget) show(false);
      };

      const onDown = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        root.dataset.press = "true";
        if ((e.target as Element | null)?.closest?.("dialog")) return;
        const ripple = document.createElement("span");
        ripple.className = "qo-cursor-ripple";
        root.appendChild(ripple);
        gsap.set(ripple, { x: e.clientX, y: e.clientY, xPercent: -50, yPercent: -50 });
        gsap.fromTo(
          ripple,
          { scale: 0.3, opacity: 0.9 },
          { scale: 2.6, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() },
        );
        if (spot) {
          gsap.fromTo(spot, { "--spot-boost": 1.35 }, { "--spot-boost": 1, duration: 0.7, ease: "power2.out" });
        }
      };

      const onUp = () => {
        root.dataset.press = "false";
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      window.addEventListener("blur", onUp);
      document.addEventListener("mouseout", onLeave);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("blur", onUp);
        document.removeEventListener("mouseout", onLeave);
        html.classList.remove("qo-cursor-on");
        show(false);
        root.querySelectorAll(".qo-cursor-ripple").forEach((n) => n.remove());
      };
    };

    const sync = () => {
      teardown?.();
      teardown = mq.matches ? setup() : null;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="qo-cursor" data-visible="false">
      <div ref={ringRef} className="qo-cursor-ring">
        <span className="qo-cursor-ring-shape" />
      </div>
      <div ref={dotRef} className="qo-cursor-dot">
        <span className="qo-cursor-dot-shape" />
      </div>
    </div>
  );
}
