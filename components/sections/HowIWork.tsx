import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { processSteps } from "@/content/process";
import type { SectionConfig } from "@/content/sections";

// TODO: Hans review — How I Work copy lives in content/process.ts (PLAN.md §9).
export function HowIWork({ section }: { section: SectionConfig }) {
  return (
    <SectionCard section={section}>
      <Reveal className="relative">
        {/* xl (4 columns): connector from the first to the last step badge, through
            the badge centres (41px = card border + p-5 + half the 40px badge). A dashed
            track, plus an accent line that draws as you scroll. Cards are transparent so
            the line shows through; the opaque badges sit on top of it. */}
        <span
          aria-hidden="true"
          className="absolute top-[41px] right-[calc((100%-3rem)/4-41px)] left-[41px] hidden border-t border-dashed border-line xl:block"
        />
        <ScrollLine
          axis="x"
          className="top-[41px] right-[calc((100%-3rem)/4-41px)] left-[41px] hidden xl:block"
          start="top 85%"
          end="top 35%"
        />
        <ol className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(({ title, text }, i) => (
            <li
              key={title}
              data-reveal
              className="flex flex-col gap-4 rounded-card border border-line p-5"
            >
              <span
                aria-hidden="true"
                className="relative inline-flex size-10 items-center justify-center rounded-lg bg-badge font-mono text-sm font-bold text-lime"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold text-fg">
                <span className="sr-only">{`Step ${i + 1}: `}</span>
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </SectionCard>
  );
}
