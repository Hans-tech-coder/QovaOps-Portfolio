// The typed "profile" that drives components/layout/PortfolioPage.tsx.
// One profile per site: content/va/profile.ts (qovaops.triqova.com) and content/dev/profile.ts
// (hansobena.triqova.com), DEV_FIRST_PLAN.md §4. Data only (serializable), so slices can be passed to client components.

import type { StaticImageData } from "next/image";
import type { SocialLink } from "./site";

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
  /** `spaced`: a small gap between the parts (two-word names like "Hans Obena"). */
  wordmark: { solid: string; outline: string; spaced?: boolean };
  /** Footer line after the brand */
  secondaryLine: string;
};

export type Contact = {
  email: string;
  bookingUrl: string;
  /** Primary CTA (lime contact band; VA hero button), e.g. "Delegate Your Operations" */
  primaryCta: string;
  /** Booking CTA (contact band + pills), e.g. "Book a call" */
  bookingCta: string;
  /** Line under the CTA in the lime contact band (defaults to brand.secondaryLine). */
  bandLine?: string;
};

/** A link with a label. `href` starting with "#" scrolls within the page; others open in a new tab. */
export type LinkItem = { label: string; href: string };

/** Header + mobile menu: lime CTA pill and the small link to the other site. */
export type HeaderContent = {
  cta: LinkItem;
  crossLink: LinkItem;
};

/** Small "Also offering…" card at the end of Contact (dev site → QovaOps). */
export type CrossSell = {
  eyebrow: string;
  text: string;
  link: LinkItem;
};

export type Resume = {
  /** False hides every resume button (e.g. while a site's PDF isn't ready). */
  enabled: boolean;
  href: string;
  downloadName: string;
  /** Shown after the owner's name in the resume modal title */
  title: string;
  /** Page images for the modal (rendered from the PDF by scripts/resume-pages.py) */
  pages: StaticImageData[];
};

export type AboutContent = {
  tagline: { line1: string; line2: string };
  /** Text in the dark pill with the lime dot (VA: traits; dev: availability). */
  pill: string;
  blurb: string;
  photoAlt: string;
  /** Hero chips; a row with a label shows `// Label` above its chips. */
  heroToolRows: { label?: string; tools: string[] }[];
  /** Only real numbers, approved by Hans. A "Computer Science / With Honors" card follows them. */
  stats: Stat[];
  /**
   * Hero buttons: a lime primary link, then either the email pill (VA) or the
   * resume buttons (dev; hidden when the resume is disabled).
   */
  actions: { primary: LinkItem; secondary: "email" | "resume" };
};

export type ExperienceContent = {
  education: TimelineEntry[];
  work: TimelineEntry[];
  certifications: string[];
};

/** One Work/Projects tab: project ids from content/work.ts, in order. */
export type WorkTabConfig = {
  id: string;
  label: string;
  /** "browser": list + detail view with the pinned scroll switching (lg+); "rows": plain rows. */
  layout: "browser" | "rows";
  projects: string[];
};

export type SiteProfile = {
  id: "va" | "dev";
  /** Canonical origin, e.g. https://qovaops.triqova.com */
  url: string;
  brand: Brand;
  header: HeaderContent;
  contact: Contact;
  crossSell?: CrossSell;
  socials: readonly SocialLink[];
  resume: Resume;
  /** Published sections only, in page order */
  sections: SectionConfig[];
  navItems: NavItem[];
  about: AboutContent;
  toolGroups: ToolGroup[];
  /** Work tabs in order; unpublished projects and empty tabs are dropped. */
  workTabs: WorkTabConfig[];
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
