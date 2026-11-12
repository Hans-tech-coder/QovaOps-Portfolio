"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_CONDITIONS, ScrollTrigger, useGSAP, type MotionConditions } from "./gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Selector (scoped to this wrapper) for the items to stagger in. */
  items?: string;
  stagger?: number;
  y?: number;
};

/**
 * Scroll reveal: items fade up as the wrapper enters the viewport.
 * Uses useGSAP (auto cleanup) + gsap.matchMedia (prefers-reduced-motion).
 * Animates opacity/transform only (gsap-performance).
 */
export function Reveal({
  children,
  className,
  items = "[data-reveal]",
  stagger = 0.06,
  y = 24,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (ctx) => {
        const { reduceMotion } = ctx.conditions as MotionConditions;
        const targets = gsap.utils.toArray<HTMLElement>(items, root.current);
        if (!targets.length) return;

        if (reduceMotion) {
          // No movement: show everything in its final state.
          gsap.set(targets, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.set(targets, { autoAlpha: 0, y });
        ScrollTrigger.batch(targets, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, stagger, overwrite: true }),
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
