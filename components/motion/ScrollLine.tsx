"use client";

import { useRef } from "react";
import { gsap, MOTION_CONDITIONS, useGSAP, type MotionConditions } from "./gsap";

type ScrollLineProps = {
  axis: "x" | "y";
  className?: string;
  /** ScrollTrigger start/end, measured on the line's parent element. */
  start?: string;
  end?: string;
};

/**
 * A thin accent line that draws as you scroll (ScrollTrigger scrub), laid over
 * a dashed track. Accent-text color: lime on dark, #101010 on light (never a
 * thin lime line on light). Transform only (scaleX / scaleY).
 * Without JS or under reduced motion the line is simply drawn in full.
 */
export function ScrollLine({ axis, className = "", start = "top 80%", end = "bottom 60%" }: ScrollLineProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const trigger = el?.parentElement;
    if (!el || !trigger) return;
    const prop = axis === "x" ? "scaleX" : "scaleY";
    const mm = gsap.matchMedia();
    mm.add(MOTION_CONDITIONS, (ctx) => {
      const { reduceMotion } = ctx.conditions as MotionConditions;
      if (reduceMotion) {
        gsap.set(el, { [prop]: 1 });
        return;
      }
      gsap.fromTo(
        el,
        { [prop]: 0 },
        { [prop]: 1, ease: "none", scrollTrigger: { trigger, start, end, scrub: 0.6 } },
      );
    });
    return () => mm.revert();
  });

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-scroll-line={axis}
      className={`pointer-events-none absolute bg-accent-text ${
        axis === "x" ? "h-px origin-left" : "w-px origin-top"
      } ${className}`}
    />
  );
}
