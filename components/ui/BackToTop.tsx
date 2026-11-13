"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { Tooltip } from "./Tooltip";

/** Show the button after this much scroll (px). */
const SHOW_AFTER = 480;

/**
 * Sticky back-to-top button (bottom right). A thin ring around it fills with
 * page scroll progress; hovering or focusing shows a "Back to top" tooltip pill
 * to its left. Scroll updates write straight to the DOM (no React re-render per
 * frame). Smooth scroll via ScrollToPlugin, instant under reduced motion.
 */
export function BackToTop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      ring.style.strokeDashoffset = String(1 - progress);
      wrap.dataset.visible = y > SHOW_AFTER ? "true" : "false";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTop = () => {
    const done = () => {
      // The button hides at the top, so hand focus to the page start.
      document.getElementById("main")?.focus({ preventScroll: true });
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    };
    gsap.to(window, {
      duration: prefersReducedMotion() ? 0 : 0.9,
      ease: "power3.inOut",
      scrollTo: { y: 0, autoKill: true },
      overwrite: true,
      onComplete: done,
      onInterrupt: done,
    });
  };

  return (
    <div ref={wrapRef} className="qo-totop" data-visible="false">
      <Tooltip label="Back to top" side="left">
        <button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          className="qo-totop-btn qo-btn"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="qo-totop-ring">
            <circle cx="24" cy="24" r="22.5" pathLength={1} className="qo-totop-track" />
            <circle
              ref={ringRef}
              cx="24"
              cy="24"
              r="22.5"
              pathLength={1}
              className="qo-totop-progress"
            />
          </svg>
          <ArrowUp aria-hidden="true" className="relative size-5" strokeWidth={2} />
        </button>
      </Tooltip>
    </div>
  );
}
