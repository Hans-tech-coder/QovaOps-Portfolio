import { BriefcaseBusiness, GraduationCap, type LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { certifications, education, work, type TimelineEntry } from "@/content/experience";
import type { SectionConfig } from "@/content/sections";

function Timeline({
  title,
  icon: Icon,
  entries,
}: {
  title: string;
  icon: LucideIcon;
  entries: TimelineEntry[];
}) {
  return (
    <div>
      <h3 className="qo-label flex items-center gap-2 text-fg">
        <Icon aria-hidden="true" className="size-4 text-accent-text" />
        {title}
      </h3>
      <ol className="mt-5 border-l border-dashed border-line">
        {entries.map((e) => (
          <li key={`${e.org}-${e.period}`} data-reveal className="relative pb-8 pl-6 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[5px] size-[9px] rounded-full border-2 border-accent-text bg-surface"
            />
            <p className="inline-flex rounded-full border border-dashed border-line px-3 py-1 font-mono text-xs text-muted">
              {e.period}
            </p>
            <h4 className="mt-3 text-lg leading-snug font-bold text-fg">{e.title}</h4>
            <p className="mt-1 text-sm text-body">
              {e.org}
              {e.orgNote && <span className="text-muted">{` · ${e.orgNote}`}</span>}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {e.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                  {pt}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Two timeline columns: education (+ certifications) and work history. */
export function Experience({ section }: { section: SectionConfig }) {
  return (
    <SectionCard section={section}>
      <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
        <div className="flex flex-col gap-10">
          <Timeline title="Education" icon={GraduationCap} entries={education} />
          <div data-reveal>
            <h3 className="qo-label text-fg">Certifications</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Timeline title="Experience" icon={BriefcaseBusiness} entries={work} />
      </Reveal>
    </SectionCard>
  );
}
