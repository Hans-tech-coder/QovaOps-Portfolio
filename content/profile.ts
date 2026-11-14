// The typed "profile" that drives components/layout/PortfolioPage.tsx.
// One profile per site: content/va/profile.ts today, content/dev/profile.ts in Phase C
// (DEV_FIRST_PLAN.md §4). Data only (serializable), so slices can be passed to client components.

import type { StaticImageData } from "next/image";
import type { SocialLink } from "./site";
import type { WorkCategory } from "./work";

/** Which section component renders a section (components/layout/section-registry.ts). */
export type SectionKind =
  | "about"
  | "services"
  | "how-i-work"
  | "tools"
  | "work"
  | "experience"
  | "testimonials"
  | "contact";

export type SectionConfig = {
  /** Anchor id, also the scrollspy/nav key */
  id: string;
  /** Component that renders it; a dev "projects" section can reuse kind "work". */
  kind: SectionKind;
  /** Nav label (rendered uppercase mono) */
  label: string;
  /** Mono eyebrow, shown as `// EYEBROW` */
  eyebrow: string;
  /** Large outlined ghost word behind the eyebrow */
  ghost: string;
  title: string;
  intro: string;
  published: boolean;
};

export type NavItem = Pick<SectionConfig, "id" | "label">;

export type ToolGroup = { label: string; tools: string[] };

export type TimelineEntry = {
  title: string;
  org: string;
  /** Short context shown after the org, e.g. "Digital Marketing Agency" */
  orgNote?: string;
  period: string;
  points: string[];
};

export type Stat = { value: number; suffix: string; label: string };

/** Header/top-bar/footer brand: wordmark split into a solid and an outlined part. */
export type Brand = {
  /** Full name for screen readers, footer and metadata, e.g. "QovaOps" */
  name: string;
  /** Small gray line under the wordmark, e.g. "by triqova" (optional for a personal brand) */
  endorsement?: string;
  wordmark: { solid: string; outline: string };
  /** Footer line after the brand */
  secondaryLine: string;
};

export type Contact = {
  email: string;
  bookingUrl: string;
  /** Primary CTA (hero + lime contact band), e.g. "Delegate Your Operations" */
  primaryCta: string;
  /** Booking CTA (header, menu, contact band), e.g. "Book a call" */
  bookingCta: string;
};

export type Resume = {
  href: string;
  downloadName: string;
  /** Shown after the owner's name in the resume modal title */
  title: string;
  /** Page images for the modal (rendered from the PDF by scripts/resume-pages.py) */
  pages: StaticImageData[];
};

export type AboutContent = {
  tagline: { line1: string; line2: string };
  traits: readonly string[];
  blurb: string;
  photoAlt: string;
  /** Hero chips; a row with a label shows `// Label` above its chips. */
  heroToolRows: { label?: string; tools: string[] }[];
  /** Only real numbers, approved by Hans. */
  stats: Stat[];
};

export type ExperienceContent = {
  education: TimelineEntry[];
  work: TimelineEntry[];
  certifications: string[];
};

export type SiteProfile = {
  id: "va" | "dev";
  /** Canonical origin, e.g. https://qovaops.triqova.com */
  url: string;
  brand: Brand;
  contact: Contact;
  socials: readonly SocialLink[];
  resume: Resume;
  /** Published sections only, in page order */
  sections: SectionConfig[];
  navItems: NavItem[];
  about: AboutContent;
  toolGroups: ToolGroup[];
  /** Work tabs in order; tabs with no published projects are dropped. */
  workTabs: WorkCategory[];
  experience: ExperienceContent;
};

/** Published sections + matching nav, so the page and the nav always agree. */
export function publishSections(all: SectionConfig[]) {
  const sections = all.filter((s) => s.published);
  const navItems: NavItem[] = sections.map(({ id, label }) => ({ id, label }));
  return { sections, navItems };
}

/** Props every section component receives from PortfolioPage. */
export type SectionProps = { section: SectionConfig; profile: SiteProfile };
