"use client";

// Central GSAP setup. Import gsap, ScrollTrigger and useGSAP from here so the
// plugins are always registered once, before any animation code runs.
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Motion tokens in seconds / px, mirroring the transitions.dev scale in
 * app/globals.css (--duration-*, --distance-*), so GSAP and CSS motion match.
 */
export const DUR = {
  stagger: 0.04,
  micro: 0.08,
  quick: 0.15,
  fast: 0.25,
  medium: 0.35,
  slow: 0.4,
  verySlow: 0.5,
} as const;

export const DIST = { micro: 4, base: 8, medium: 12 } as const;

/** --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1) */
export const EASE_SMOOTH_OUT = "qo-smooth-out";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase, useGSAP);
  CustomEase.create(EASE_SMOOTH_OUT, "0.22,1,0.36,1");
  gsap.defaults({ ease: EASE_SMOOTH_OUT, duration: DUR.verySlow });
  // Tells the head-script failsafe that motion code loaded, so it keeps the
  // `qo-js` pre-hide (components/layout/theme.ts).
  (window as Window & { __qoMotion?: boolean }).__qoMotion = true;
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

/** True when the visitor asked for less motion (for one-off, non-matchMedia code). */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(MOTION_CONDITIONS.reduceMotion).matches
  );
}

// ---------- Hero / scroll-reveal coordination ----------
// The hero timeline runs once on load. Scroll reveals that are already in view
// at load (e.g. the About stats on a tall screen) wait until it is nearly done,
// so the page builds in one order instead of everything at once.

let heroEndsAt = 0;

/** Called by the hero timeline with its total duration (seconds). */
export function setHeroDuration(seconds: number) {
  heroEndsAt = performance.now() + seconds * 1000;
}

/** Delay (seconds) a reveal should wait so it starts as the hero finishes. */
export function heroDelay(overlap = 0.25) {
  return Math.max(0, (heroEndsAt - performance.now()) / 1000 - overlap);
}

export { gsap, ScrollToPlugin, ScrollTrigger, useGSAP };
