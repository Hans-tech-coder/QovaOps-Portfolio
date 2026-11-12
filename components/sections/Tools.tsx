import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import type { SectionConfig } from "@/content/sections";
import { toolGroups } from "@/content/tools";

export function Tools({ section }: { section: SectionConfig }) {
  return (
    <SectionCard section={section}>
      <Reveal className="grid gap-4 md:grid-cols-2">
        {toolGroups.map(({ label, tools }) => (
          <div
            key={label}
            data-reveal
            className="rounded-card border border-dashed border-line p-5"
          >
            <h3 className="qo-label flex items-center gap-2 text-fg">
              <span aria-hidden="true" className="h-3 w-[3px] rounded-full bg-accent-text" />
              {label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool}>
                  <Chip>{tool}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </SectionCard>
  );
}
