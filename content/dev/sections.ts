// Developer site (hansobena.triqova.com): page sections + nav (sidebar + mobile menu).
// Order here = order on the page and in the nav (DEV_FIRST_PLAN.md §2).
// No Services / How I Work / Testimonials here: those are the VA offer.

import { publishSections, type SectionConfig } from "@/content/profile";

const allSections: SectionConfig[] = [
  {
    id: "about",
    kind: "about",
    label: "About",
    eyebrow: "About",
    ghost: "About",
    // Hero copy approved by Hans (2026-11-14). H1 is the two-line tagline in profile.ts.
    title: "I build fast, reliable websites and web apps.",
    // Role line under the H1
    intro: "Full-Stack Web Developer · Next.js, React, TypeScript, WordPress, Shopify",
    published: true,
  },
  {
    id: "projects",
    kind: "work",
    label: "Projects",
    eyebrow: "Projects",
    ghost: "Projects",
    title: "Selected projects",
    intro: "Websites I built or developed, and the engineering work behind them.",
    published: true,
  },
  {
    id: "stack",
    kind: "tools",
    label: "Stack",
    eyebrow: "Stack",
    ghost: "Stack",
    title: "Tech stack",
    intro: "The languages, frameworks, platforms and tools I build with.",
    published: true,
  },
  {
    id: "experience",
    kind: "experience",
    label: "Experience",
    eyebrow: "Experience",
    ghost: "Resume",
    title: "Experience",
    intro: "Work history, education and certifications.",
    published: true,
  },
  {
    id: "contact",
    kind: "contact",
    label: "Contact",
    eyebrow: "Contact",
    ghost: "Contact",
    title: "Get in touch",
    intro: "Open to remote full-stack roles. Email me or book a call.",
    published: true,
  },
];

export const { sections, navItems } = publishSections(allSections);
