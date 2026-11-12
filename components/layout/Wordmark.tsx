"use client";

import { useRef } from "react";
import { gsap, MOTION_CONDITIONS, useGSAP, type MotionConditions } from "@/components/motion/gsap";
import { site } from "@/content/site";

const SOLID = "Qova";
const OUTLINE = "Ops";

/**
 * QovaOps wordmark: solid "Qova" + outlined "Ops" (accent outline: lime on
 * dark, #101010 on light), "by triqova" in Cool Gray right-aligned under it.
 * Letters rise in on load. CSS pre-hides them when JS runs (globals.css), so
 * there is no flash; under reduced motion they are never hidden.
 */
export function Wordmark() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (ctx) => {
        const { reduceMotion } = ctx.conditions as MotionConditions;
        const letters = gsap.utils.toArray<HTMLElement>("[data-wordmark-letter]");
        const endorse = gsap.utils.toArray<HTMLElement>("[data-wordmark-endorse]");
        if (reduceMotion) {
          gsap.set([...letters, ...endorse], { autoAlpha: 1, clearProps: "transform" });
          return;
        }
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            letters,
            { autoAlpha: 0, yPercent: 40 },
            { autoAlpha: 1, yPercent: 0, duration: 0.6, stagger: 0.05 },
          )
          .fromTo(endorse, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.25");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="inline-flex flex-col">
      <a
        href="#top"
        className="rounded-lg text-5xl leading-none font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
      >
        <span className="sr-only">
          {site.name} {site.endorsement}
        </span>
        <span aria-hidden="true">
          {SOLID.split("").map((ch, i) => (
            <span key={`s${i}`} data-wordmark-letter className="inline-block text-fg">
              {ch}
            </span>
          ))}
          {OUTLINE.split("").map((ch, i) => (
            <span
              key={`o${i}`}
              data-wordmark-letter
              className="text-outline inline-block [-webkit-text-stroke-width:1.5px] lg:[-webkit-text-stroke-width:2px]"
            >
              {ch}
            </span>
          ))}
        </span>
      </a>
      <span
        data-wordmark-endorse
        aria-hidden="true"
        className="mt-1 self-end text-lg font-medium text-endorse sm:text-xl lg:text-2xl"
      >
        {site.endorsement}
      </span>
    </div>
  );
}
