import { site } from "@/content/site";

const SOLID = "Qova";
const OUTLINE = "Ops";

/**
 * QovaOps wordmark: solid "Qova" + outlined "Ops" (accent outline: lime on
 * dark, #101010 on light), "by triqova" in Cool Gray right-aligned under it.
 * The letters rise in as part of the hero timeline (components/motion/HeroIntro.tsx,
 * targets data-wordmark-letter / data-wordmark-endorse). CSS pre-hides them when
 * JS runs (globals.css), so there is no flash; under reduced motion they are never hidden.
 */
export function Wordmark() {
  return (
    <div data-hero-wordmark className="inline-flex flex-col">
      <a
        href="#top"
        className="rounded-lg text-[1.75rem] leading-none font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]"
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
              className="text-outline inline-block [-webkit-text-stroke-width:1px] sm:[-webkit-text-stroke-width:1.25px] lg:[-webkit-text-stroke-width:1.5px]"
            >
              {ch}
            </span>
          ))}
        </span>
      </a>
      <span
        data-wordmark-endorse
        aria-hidden="true"
        className="mt-0.5 self-end text-xs font-medium text-endorse sm:text-sm lg:text-base"
      >
        {site.endorsement}
      </span>
    </div>
  );
}
