import { ArrowRight } from "lucide-react";
import { SectionCard } from "@/components/layout/SectionCard";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { TypeCycler } from "@/components/motion/TypeCycler";
import { Chip } from "@/components/ui/Chip";
import { ToolLogo } from "@/components/ui/ToolLogo";
import Image from "next/image";
// Transparent cut-out exported from Canva DAHasTtTt6Y (2026-11-12)
import hansPhoto from "@/public/brand/hans-photo.png";
import type { SectionProps } from "@/content/profile";

// Photo tag, typed and backspaced in turn (components/motion/TypeCycler.tsx)
const GREETINGS = ["Hi there!", "I'm Hans"] as const;

/** Hero: copy, chips and stats come from the site profile (content/<site>/profile.ts). */
export function About({ section, profile }: SectionProps) {
  const { tagline, traits, blurb, photoAlt, heroToolRows, stats } = profile.about;
  const { email, primaryCta } = profile.contact;
  return (
    <SectionCard
      section={section}
      titleAs="h1"
      titleClassName="text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
      title={
        <>
          <span data-hero="line" className="block">
            {tagline.line1}
          </span>
          <span data-hero="line" className="block text-accent-text">
            {tagline.line2}
          </span>
        </>
      }
    >
      {/* Top block animates with the hero timeline (components/motion/HeroIntro.tsx, data-hero) */}
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-10">
        {/* Cut-out portrait over a soft aura; the bottom fades into the card so it
            doesn't look cut off. Styles in globals.css (.qo-aura, .qo-portrait-fade). */}
        <div data-hero="photo" className="relative mx-auto w-60 sm:w-64 md:mx-0 xl:w-72">
          <span aria-hidden="true" className="qo-aura" />
          <div className="qo-portrait-fade relative aspect-[3/4] w-full">
            <Image
              src={hansPhoto}
              alt={photoAlt}
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 1280px) 288px, (min-width: 640px) 256px, 240px"
              className="object-cover object-[50%_12%]"
            />
          </div>
          <p className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-dashed border-line bg-surface px-3 py-1.5 font-mono text-sm whitespace-nowrap text-fg">
            <span className="sr-only">{GREETINGS.join(" ")}</span>
            <span aria-hidden="true">
              <TypeCycler words={GREETINGS} caretClassName="text-accent-text" />
            </span>
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          {/* Trait pill: dark pill with a lime dot in both themes (lime never small on light) */}
          <p data-hero="pill" className="qo-trait-pill qo-label inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
            {traits.join(" | ")}
          </p>

          <p data-hero="blurb" className="max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            {blurb}
          </p>

          <div className="flex flex-col gap-4">
            {heroToolRows.map(({ label, tools }, i) => (
              <ul
                key={label ?? i}
                data-hero="chips"
                aria-label={label ? `${label} tools I use` : "Tools I use"}
                className="qo-chip-row flex flex-wrap items-center gap-2"
              >
                {/* Optional row label (dev site: Ops / Dev). It sits in the list so it
                    animates in with the chips (HeroIntro). */}
                {label && (
                  <li aria-hidden="true" className="qo-label basis-full whitespace-nowrap text-muted">
                    {`// ${label}`}
                  </li>
                )}
                {tools.map((tool) => (
                  <li key={tool}>
                    <Chip icon={<ToolLogo name={tool} />}>{tool}</Chip>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div data-hero="actions" className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="qo-btn group inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-6 text-sm font-bold text-on-accent hover:bg-accent-hover"
            >
              {primaryCta}
              <ArrowRight aria-hidden="true" className="qo-nudge size-4" />
            </a>
            <a
              href={`mailto:${email}`}
              className="qo-btn inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-bold text-fg hover:bg-line"
            >
              {email}
            </a>
          </div>
        </div>
      </div>

      <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Counted up on scroll (components/motion/CountUp.tsx); the HTML holds the final value. */}
        {stats.map(({ value, suffix, label }) => (
          <div
            key={label}
            data-reveal
            className="flex flex-col gap-2 rounded-card border border-dashed border-line p-4 sm:p-5"
          >
            <CountUp
              value={value}
              suffix={suffix}
              className="text-outline text-4xl leading-none font-bold tracking-tight sm:text-5xl"
            />
            <span className="qo-label text-muted">{label}</span>
          </div>
        ))}
        <div
          data-reveal
          className="flex flex-col justify-between gap-2 rounded-card border border-dashed border-line p-4 sm:p-5"
        >
          <span className="text-xl leading-tight font-bold text-fg sm:text-2xl">
            Computer Science
          </span>
          <span className="qo-label text-muted">With Honors</span>
        </div>
      </Reveal>
    </SectionCard>
  );
}
