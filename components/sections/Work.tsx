import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "@/content/profile";
import { publishedProjects, workCategoryLabels } from "@/content/work";
import { WorkTabs } from "./WorkTabs";

export function Work({ section, profile }: SectionProps) {
  // Tab order comes from the profile; tabs with no published projects are left out
  // (hidden-until-real rule).
  const tabs = profile.workTabs.map((id) => ({
    id,
    label: workCategoryLabels[id],
    projects: publishedProjects.filter((p) => p.category === id),
  })).filter((t) => t.projects.length > 0);

  return (
    <SectionCard section={section}>
      {/* WorkTabs marks its own [data-reveal] items (tab bar, panel). */}
      <Reveal>
        <WorkTabs tabs={tabs} />
      </Reveal>
    </SectionCard>
  );
}
