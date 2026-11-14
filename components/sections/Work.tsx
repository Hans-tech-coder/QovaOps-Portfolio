import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "@/content/profile";
import { publishedProjects, type Project } from "@/content/work";
import { WorkTabs } from "./WorkTabs";

export function Work({ section, profile }: SectionProps) {
  // Tabs, their order and their projects come from the profile (project ids in
  // content/work.ts). Unpublished projects and empty tabs are left out (hidden-until-real rule).
  const byId = new Map(publishedProjects.map((p) => [p.id, p]));
  const tabs = profile.workTabs
    .map(({ id, label, layout, projects }) => ({
      id,
      label,
      layout,
      projects: projects.map((pid) => byId.get(pid)).filter((p): p is Project => !!p),
    }))
    .filter((t) => t.projects.length > 0);

  return (
    <SectionCard section={section}>
      {/* WorkTabs marks its own [data-reveal] items (tab bar, panel). */}
      <Reveal>
        <WorkTabs tabs={tabs} />
      </Reveal>
    </SectionCard>
  );
}
