"use client";

import { useRef, type ReactNode } from "react";
import {
  DIST,
  DUR,
  gsap,
  heroDelay,
  MOTION_CONDITIONS,
  ScrollTrigger,
  useGSAP,
  type MotionConditions,
} from "./gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Selector (scoped to this wrapper) for the items to stagger in. */
  items?: string;
  /** Rise distance in px (default --distance-medium, "text reveal"). */
  y?: number;
};

/** Per-item stagger: 40–80ms, shrunk so a batch never takes more than ~320ms in total. */
function staggerFor(count: number) {
  if (count <= 1) return 0;
  return gsap.utils.clamp(DUR.stagger, DUR.micro, 0.32 / (count - 1));
}

/**
 * Scroll reveal: items fade + rise a little as they enter the viewport, in
 * batches (ScrollTrigger.batch), so items entering together stagger together.
 * Items are pre-hidden by CSS (`.qo-js [data-reveal]` in globals.css) to avoid a
 * visible→hidden flash; under reduced motion nothing is hidden or moved.
 * Animates opacity/transform only (gsap-performance).
 */
export function Reveal({ children, className, items = "[data-reveal]", y = DIST.medium }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_CONDITIONS, (ctx) => {
        const { reduceMotion } = ctx.conditions as MotionConditions;
        const targets = gsap.utils.toArray<HTMLElement>(items, root.current);
        if (!targets.length) return;

        if (reduceMotion) {
          gsap.set(targets, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.set(targets, { autoAlpha: 0, y });
        const show = (batch: Element[]) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: DUR.verySlow,
            stagger: staggerFor(batch.length),
            delay: heroDelay(),
            overwrite: true,
          });

        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: show,
          // Loaded or jumped past (e.g. #contact link): make sure nothing stays hidden.
          onLeave: show,
          onEnterBack: show,
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
