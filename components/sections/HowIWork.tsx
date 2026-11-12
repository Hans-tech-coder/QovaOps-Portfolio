import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/content/process";
import type { SectionConfig } from "@/content/sections";

// TODO: Hans review — How I Work copy lives in content/process.ts (PLAN.md §9).
export function HowIWork({ section }: { section: SectionConfig }) {
  return (
    <SectionCard section={section}>
      <Reveal className="relative">
        {/* Connector line between steps (draws on scroll in Phase 4) */}
        <span
          aria-hidden="true"
          className="absolute top-5 right-0 left-0 hidden border-t border-dashed border-line xl:block"
        />
        <ol className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(({ title, text }, i) => (
            <li
              key={title}
              data-reveal
              className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-lg bg-badge font-mono text-sm font-bold text-lime"
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
