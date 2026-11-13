"use client";

import { useRef } from "react";
import {
  gsap,
  heroDelay,
  MOTION_CONDITIONS,
  ScrollTrigger,
  useGSAP,
  type MotionConditions,
} from "./gsap";

type CountUpProps = { value: number; suffix?: string; className?: string };

/**
 * Counts from 0 to `value` once, when it scrolls into view. The server HTML
 * already holds the final number (no JS / reduced motion = static), and screen
 * readers get the final value only (the counting text is aria-hidden).
 */
export function CountUp({ value, suffix = "", className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${value}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (ctx) => {
        const { reduceMotion } = ctx.conditions as MotionConditions;
        if (reduceMotion) {
          el.textContent = final;
          return;
        }
        const counter = { v: 0 };
        let played = false;
        const render = () => {
          el.textContent = `${Math.round(counter.v)}${suffix}`;
        };
        const play = () => {
          if (played) return;
          played = true;
          render();
          gsap.to(counter, { v: value, duration: 0.9, delay: heroDelay(), onUpdate: render });
        };
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: play,
          onLeave: play,
          onEnterBack: play,
        });
        return () => {
          st.kill();
          el.textContent = final;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [value, suffix] },
  );

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {final}
      </span>
    </span>
  );
}
