import { ArrowRight } from "lucide-react";
import { SectionCard } from "@/components/layout/SectionCard";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import Image from "next/image";
// Transparent cut-out exported from Canva DAHasTtTt6Y (2026-11-12)
import hansPhoto from "@/public/brand/hans-photo.png";
import type { SectionConfig } from "@/content/sections";
import { site } from "@/content/site";
import { heroTools } from "@/content/tools";

const GREETING = "Hi, I'm Hans";

// About blurb from BRAND_GUIDE §7.
const BLURB =
  "I'm Hans, a Computer Science graduate with Honors and 4+ years in web development, digital operations and AI automation. I help busy founders, digital agencies and eCommerce brands simplify operations, fix technical bottlenecks, and scale without juggling multiple hires. I take ownership of the work, not just the task list.";

// Only real numbers (PLAN.md "Stats" + session log). Do not add more without Hans.
// Counted up on scroll (components/motion/CountUp.tsx); the HTML holds the final value.
const STATS = [
  { value: 4, suffix: "+", label: "Years experience" },
  { value: 10, suffix: "+", label: "Client websites managed" },
  { value: 9, suffix: "", label: "Services" },
] as const;

export function About({ section }: { section: SectionConfig }) {
  return (
    <SectionCard
      section={section}
      titleAs="h1"
      titleClassName="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
      title={
        <>
          <span data-hero="line" className="block">
            {site.tagline.line1}
          </span>
          <span data-hero="line" className="block text-accent-text">
            {site.tagline.line2}
          </span>
        </>
      }
    >
      {/* Top block animates with the hero timeline (components/motion/HeroIntro.tsx, data-hero) */}
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-10">
        {/* Cut-out portrait over a soft aura; the bottom fades into the card so it
            doesn't look cut off. Styles in globals.css (.qo-aura, .qo-portrait-fade). */}
        <div data-hero="photo" className="relative mx-auto w-64 sm:w-72 md:mx-0 lg:w-80">
          <span aria-hidden="true" className="qo-aura" />
          <div className="qo-portrait-fade relative aspect-[3/4] w-full">
            <Image
              src={hansPhoto}
              alt="Hans Obena, virtual assistant with advanced technical skills"
              fill
              priority
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
              className="object-cover object-[50%_12%]"
            />
          </div>
          <p className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-dashed border-line bg-surface px-3 py-1.5 font-mono text-sm whitespace-nowrap text-fg">
            <span className="sr-only">{GREETING}</span>
            <span
              aria-hidden="true"
              className="qo-typer"
              style={{ "--chars": GREETING.length } as React.CSSProperties}
            >
              {GREETING}
            </span>
            <span aria-hidden="true" className="qo-caret text-accent-text">
              _
            </span>
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          {/* Trait pill: dark pill with a lime dot in both themes (lime never small on light) */}
          <p data-hero="pill" className="qo-trait-pill qo-label inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
            {site.traits.join(" | ")}
          </p>

          <p data-hero="blurb" className="max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            {BLURB}
          </p>

          <ul data-hero="chips" aria-label="Tools I use" className="qo-chip-row flex flex-wrap gap-2">
            {heroTools.map((tool) => (
              <li key={tool}>
                <Chip>{tool}</Chip>
              </li>
            ))}
          </ul>

          <div data-hero="actions" className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="qo-btn group inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-6 text-sm font-bold text-on-accent hover:bg-accent-hover"
            >
              {site.cta.primary}
              <ArrowRight aria-hidden="true" className="qo-nudge size-4" />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="qo-btn inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-bold text-fg hover:bg-line"
            >
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ value, suffix, label }) => (
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
