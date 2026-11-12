"use client";

// Central GSAP setup. Import gsap, ScrollTrigger and useGSAP from here so the
// plugins are always registered once, before any animation code runs.
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.6 });
}

/**
 * Conditions for gsap.matchMedia(). Every animation should branch on these:
 * full motion for `motionOK`, final state only (or a plain fade) for `reduceMotion`.
 */
export const MOTION_CONDITIONS = {
  motionOK: "(prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export type MotionConditions = { motionOK: boolean; reduceMotion: boolean };

export { gsap, ScrollTrigger, useGSAP };
