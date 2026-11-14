"use client";

import { useRef } from "react";
import { INTRO_SEEN_KEY } from "@/components/layout/theme";
import {
  DIST,
  DUR,
  gsap,
  INTRO,
  introSkipped,
  MOTION_CONDITIONS,
  startIntro,
  useGSAP,
  type MotionConditions,
} from "./gsap";

/**
 * Intro loader: the page opens on a full-screen panel (same grid as the page)
 * that counts 0 → 100% with a thin progress line and "LOADING...", then the
 * counter fades up and the panel slides away, uncovering the page while the
 * hero timeline starts (HeroIntro waits via heroStartDelay()).
 *
 * Shown only when JS runs (`.qo-js`, globals.css), so without JS the page shows
 * straight away; if the motion code never loads, the head-script failsafe drops
 * `qo-js` after 4s and the panel goes with it. Skipped under reduced motion.
 * Length is fixed (INTRO in gsap.ts) so the rest of the page can plan around it.
 * Once per visit: after it plays, sessionStorage marks it seen and the head script
 * skips it on later loads in the same tab (`qo-intro-skip`; the hero still animates).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;
      const finish = () => {
        el.style.display = "none";
        html.classList.add("qo-intro-done");
        // Once per visit: later loads in this tab skip the loader (head script).
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {}
      };
      if (introSkipped()) {
        finish();
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (ctx) => {
        const { reduceMotion } = ctx.conditions as MotionConditions;
        if (reduceMotion) {
          finish();
          return;
        }

        const num = el.querySelector<HTMLElement>("[data-loader-num]");
        const bar = el.querySelector<HTMLElement>("[data-loader-bar]");
        const fadeItems = el.querySelectorAll<HTMLElement>("[data-loader-item]");
        const counter = { v: 0 };
        const render = () => {
          if (num) num.textContent = String(Math.round(counter.v));
        };

        const tl = gsap.timeline({ onComplete: finish });
        tl.to(counter, { v: 100, duration: INTRO.count, ease: "power2.inOut", onUpdate: render }, 0)
          .fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: INTRO.count, ease: "power2.inOut" },
            0,
          )
          .to(
            fadeItems,
            {
              autoAlpha: 0,
              y: -DIST.medium,
              duration: INTRO.fadeOut,
              stagger: DUR.stagger,
              ease: "power2.in",
            },
            INTRO.count + INTRO.hold,
          )
          .to(
            el,
            { yPercent: -100, duration: INTRO.slide, ease: "power3.inOut" },
            INTRO.count + INTRO.hold + INTRO.fadeOut,
          );

        // Shared clock with the hero: if its effect started the intro first, catch up.
        tl.time(startIntro());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="qo-loader qo-grid-bg" role="status" aria-label="Loading">
      <div className="flex flex-col items-center">
        <p
          data-loader-item
          aria-hidden="true"
          className="relative text-7xl leading-none font-bold tracking-tight text-fg sm:text-8xl lg:text-9xl"
        >
          {/* The number stays centered on the page axis while it counts; the % hangs
              off its right edge, so it doesn't pull the number off-center. */}
          <span data-loader-num className="tabular-nums">
            0
          </span>
          <span className="absolute top-[0.08em] left-full ml-1 text-[0.4em] text-accent-text">%</span>
        </p>
        <div data-loader-item aria-hidden="true" className="mt-6 h-0.5 w-40 bg-line sm:w-56">
          <span data-loader-bar className="block h-full origin-left scale-x-0 bg-accent-text" />
        </div>
        <p data-loader-item aria-hidden="true" className="qo-label mt-4 text-muted">
          Loading<span className="qo-loader-dots" />
        </p>
      </div>
    </div>
  );
}
