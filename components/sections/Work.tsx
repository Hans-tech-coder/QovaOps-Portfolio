import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionConfig } from "@/content/sections";
import { publishedProjects, workCategoryLabels, type WorkCategory } from "@/content/work";
import { WorkTabs } from "./WorkTabs";

const ORDER: WorkCategory[] = ["websites", "automation", "operations"];

export function Work({ section }: { section: SectionConfig }) {
  // Tabs with no published projects are left out (hidden-until-real rule).
  const tabs = ORDER.map((id) => ({
    id,
    label: workCategoryLabels[id],
    projects: publishedProjects.filter((p) => p.category === id),
  })).filter((t) => t.projects.length > 0);

  return (
    <SectionCard section={section}>
      <Reveal>
        <div data-reveal>
          <WorkTabs tabs={tabs} />
        </div>
      </Reveal>
    </SectionCard>
  );
}
