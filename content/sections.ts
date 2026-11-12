// One config for the page sections and the nav (sidebar + mobile menu).
// Only `published` sections render and show in the nav (PLAN.md §5, hidden-until-real rule).
// Order here = order on the page and in the nav.

import { testimonials } from "./testimonials";
import { publishedProjects } from "./work";

export type SectionConfig = {
  id: string;
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

const allSections: SectionConfig[] = [
  {
    id: "about",
    label: "About",
    eyebrow: "About",
    ghost: "About",
    // Rendered as the page H1 (two-tone tagline) by components/sections/About.tsx
    title: "Your Daily Operations. Our Execution.",
    intro:
      "Tech-enabled virtual assistance and streamlined day-to-day operations, backed by Triqova systems and automation.",
    published: true,
  },
  {
    id: "services",
    label: "Services",
    eyebrow: "Services",
    ghost: "Services",
    title: "What I can take off your plate",
    intro: "Nine services, from inbox and calendar to servers and automation.",
    published: true,
  },
  {
    id: "how-i-work",
    label: "How I Work",
    eyebrow: "How I work",
    ghost: "Process",
    // TODO(Hans): review How I Work copy (PLAN.md §9)
    title: "How we work together",
    intro: "A short, clear process from the first call to ongoing support.",
    published: true,
  },
  {
    id: "tools",
    label: "Tools",
    eyebrow: "Tools",
    ghost: "Tools",
    // Tools list from the resume (content/tools.ts)
    title: "Tools I work with",
    intro: "The platforms I use for admin, websites, automation and reporting.",
    published: true,
  },
  {
    id: "work",
    label: "Work",
    eyebrow: "Work",
    ghost: "Work",
    title: "Selected work",
    intro: "Websites, automations and operations projects.",
    // Shows when at least one project in content/work.ts is published.
    published: publishedProjects.length > 0,
  },
  {
    id: "experience",
    label: "Experience",
    eyebrow: "Experience",
    ghost: "Resume",
    title: "Experience",
    intro: "Education and work history.",
    // Data from the resume (content/experience.ts).
    published: true,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    eyebrow: "Testimonials",
    ghost: "Clients",
    title: "What clients say",
    intro: "Real feedback from people I've worked with.",
    // Hidden until real testimonials with permission exist. Never invent quotes.
    published: testimonials.length > 0,
  },
  {
    id: "contact",
    label: "Contact",
    eyebrow: "Contact",
    ghost: "Contact",
    title: "Let's work together",
    intro: "Email me or book a call, whichever is easier for you.",
    published: true,
  },
];

export const sections = allSections.filter((s) => s.published);

export type NavItem = Pick<SectionConfig, "id" | "label">;
export const navItems: NavItem[] = sections.map(({ id, label }) => ({ id, label }));
