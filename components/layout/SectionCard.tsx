import type { ReactNode } from "react";
import type { SectionConfig } from "@/content/profile";
import { SectionHeading } from "./SectionHeading";

type SectionCardProps = {
  section: Pick<SectionConfig, "id" | "eyebrow" | "ghost" | "title" | "intro">;
  children?: ReactNode;
  className?: string;
  /** Optional richer heading than the plain config string (e.g. the two-tone hero H1). */
  title?: ReactNode;
  titleAs?: "h1" | "h2";
  titleClassName?: string;
  /** Hide the intro line (when the section body shows its own). */
  hideIntro?: boolean;
};

/** One rounded surface card per section; the id is the scrollspy/nav anchor. */
export function SectionCard({
  section,
  children,
  className = "",
  title,
  titleAs,
  titleClassName,
  hideIntro = false,
}: SectionCardProps) {
  const { id, eyebrow, ghost, intro } = section;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`overflow-hidden rounded-card border border-line bg-surface p-6 sm:p-8 lg:p-10 ${className}`}
    >
      <SectionHeading
        id={id}
        eyebrow={eyebrow}
        ghost={ghost}
        title={title ?? section.title}
        intro={hideIntro ? undefined : intro}
        as={titleAs}
        titleClassName={titleClassName}
      />
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}
