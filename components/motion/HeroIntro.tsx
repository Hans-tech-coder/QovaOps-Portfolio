"use client";

import {
  DIST,
  DUR,
  gsap,
  heroStartDelay,
  MOTION_CONDITIONS,
  setHeroDuration,
  useGSAP,
  type MotionConditions,
} from "./gsap";

/**
 * Hero entrance, once on load right after the intro loader (PLAN.md §6, ≤1.2s): wordmark letters, the H1
 * lines, portrait, trait pill, blurb, tool chips and buttons. Targets are
 * marked with data attributes in Wordmark.tsx and About.tsx and pre-hidden by
 * CSS when JS runs (`.qo-js [data-hero]`), so there is no flash before
 * hydration. Under reduced motion everything is shown at once, nothing moves.
 *
 * Renders nothing; place it before the content in app/page.tsx so its effect
 * runs before the scroll reveals (they wait for it via heroDelay()).
 */
export function HeroIntro() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_CONDITIONS, (ctx) => {
      const { reduceMotion } = ctx.conditions as MotionConditions;
      const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel);

      const letters = q("[data-wordmark-letter]");
      const endorse = q("[data-wordmark-endorse]");
      const lines = q('[data-hero="line"]');
      const photo = q('[data-hero="photo"]');
      const pill = q('[data-hero="pill"]');
      const blurb = q('[data-hero="blurb"]');
      const chips = q('[data-hero="chips"] > li');
      const actions = q('[data-hero="actions"]');
      const all = [...letters, ...endorse, ...lines, ...photo, ...pill, ...blurb, ...chips, ...actions];
      if (!all.length) return;

      if (reduceMotion) {
        gsap.set(all, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const rise = { autoAlpha: 0, y: DIST.medium };
      // Starts as the intro loader slides away (components/motion/Loader.tsx).
      const delay = heroStartDelay();
      const tl = gsap.timeline({ delay, defaults: { duration: DUR.verySlow } });
      tl.fromTo(letters, { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, stagger: DUR.stagger }, 0)
        .fromTo(endorse, { autoAlpha: 0, y: DIST.micro }, { autoAlpha: 1, y: 0, duration: DUR.slow }, 0.3)
        .fromTo(photo, { ...rise, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 }, 0.1)
        .fromTo(lines, rise, { autoAlpha: 1, y: 0, stagger: DUR.micro }, 0.2)
        .fromTo(pill, rise, { autoAlpha: 1, y: 0 }, 0.4)
        .fromTo(blurb, rise, { autoAlpha: 1, y: 0 }, 0.46)
        .fromTo(
          chips,
          { autoAlpha: 0, y: DIST.base },
          { autoAlpha: 1, y: 0, duration: DUR.slow, stagger: { amount: 0.24 } },
          0.52,
        )
        .fromTo(actions, rise, { autoAlpha: 1, y: 0 }, 0.6);
      // Clear transforms at the end so hover states (CSS transforms) take over.
      tl.set(all, { clearProps: "transform" });

      setHeroDuration(delay + tl.duration());
    });

    return () => mm.revert();
  });

  return null;
}
