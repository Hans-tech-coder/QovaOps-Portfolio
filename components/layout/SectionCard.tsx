import type { ReactNode } from "react";
import type { SectionConfig } from "@/content/sections";
import { SectionHeading } from "./SectionHeading";

type SectionCardProps = {
  section: Pick<SectionConfig, "id" | "eyebrow" | "ghost" | "title" | "intro">;
  children?: ReactNode;
  className?: string;
};

/** One rounded surface card per section; the id is the scrollspy/nav anchor. */
export function SectionCard({ section, children, className = "" }: SectionCardProps) {
  const { id, eyebrow, ghost, title, intro } = section;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`overflow-hidden rounded-card border border-line bg-surface p-6 sm:p-10 ${className}`}
    >
      <SectionHeading id={id} eyebrow={eyebrow} ghost={ghost} title={title} intro={intro} />
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
