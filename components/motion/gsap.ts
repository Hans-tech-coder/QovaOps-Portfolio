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

// ---------- Intro loader timing ----------
// The page opens behind a 0–100% loader (components/motion/Loader.tsx). Its
// length is fixed so the hero timeline and the scroll reveals can plan around it
// without waiting on events. Both sides call startIntro(); the first call sets
// the clock, so it does not matter which effect runs first.

/** Loader phases in seconds: count to 100, hold, fade the counter out, slide the panel up. */
export const INTRO = { count: 1.8, hold: 0.2, fadeOut: 0.35, slide: 0.8 } as const;

let introStartedAt: number | null = null;

/** Starts (once) and returns the intro clock: seconds since the loader began. */
export function startIntro() {
  if (introStartedAt === null) introStartedAt = performance.now();
  return (performance.now() - introStartedAt) / 1000;
}

/**
 * Seconds until the hero timeline should start: as the loader panel is about
 * halfway up, so the page builds while it is being uncovered. 0 under reduced
 * motion (no loader then).
 */
export function heroStartDelay() {
  if (prefersReducedMotion()) return 0;
  const { count, hold, fadeOut, slide } = INTRO;
  return Math.max(0, count + hold + fadeOut + slide * 0.45 - startIntro());
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

// ---------- Pinned page column ----------
// The Work section pins the whole <main> column while its projects switch (see
// components/sections/WorkTabs.tsx), so the screen freezes on a real slice of
// the page instead of showing empty background around a short card. Position-
// tracking triggers inside <main> (scrollspy, scrubbed lines) pass
// `pinnedContainer` so their start/end account for that pin. One-shot reveals
// (Reveal, CountUp) deliberately don't: content visible during the pin (e.g.
// Experience under the card) then reveals on arrival instead of staying hidden.

/** The pinned column an element sits in (for `pinnedContainer`), or undefined. */
export function pinnedContainerOf(el: Element | null | undefined) {
  return el?.closest<HTMLElement>("main#main") ?? undefined;
}

export { gsap, ScrollToPlugin, ScrollTrigger, useGSAP };
