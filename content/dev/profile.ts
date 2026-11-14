// Developer site profile (hansobena.triqova.com): Hans Obena, Full-Stack Web Developer.
// Personal brand; QovaOps stays the VA site's brand (DEV_FIRST_PLAN.md §1, §2).
// Copy only from confirmed facts: brand/BRAND_GUIDE.md, content/va/experience.ts and
// public/resume/hans-obena-developer-resume.pdf. Do not invent numbers or claims.
// Hero copy (tagline, pill, blurb) approved by Hans (2026-11-14).

import type { SiteProfile } from "@/content/profile";
import { site, socialLinks } from "@/content/site";
// Page images rendered from the developer PDF by scripts/resume-pages.py (re-run it after replacing the PDF).
import page1 from "@/public/resume/dev-page-1.webp";
import page2 from "@/public/resume/dev-page-2.webp";
import { certifications, education, work } from "./experience";
import { navItems, sections } from "./sections";
import { heroToolRows, toolGroups } from "./tools";

/** Dev-only copy used outside the page body (metadata, OG card, JSON-LD). */
export const devMeta = {
  url: site.devUrl,
  title: "Hans Obena — Full-Stack Web Developer (Next.js, React, WordPress, Shopify)",
  description:
    "Full-stack web developer with 4+ years of agency experience. I build websites and web apps with Next.js, React and TypeScript, and WordPress and Shopify sites. Open to remote full-time, contract or part-time roles.",
  jobTitle: "Full-Stack Web Developer",
} as const;

export const devProfile: SiteProfile = {
  id: "dev",
  url: devMeta.url,
  brand: {
    name: site.owner,
    wordmark: { solid: "Hans", outline: "Obena", spaced: true },
    secondaryLine: "Full-Stack Web Developer",
  },
  header: {
    cta: { label: "Get in touch", href: "#contact" },
    crossLink: { label: "VA services", href: site.vaUrl },
  },
  contact: {
    // Dev site only; the VA site keeps qovaops@gmail.com (Hans, 2026-11-14).
    email: "obenahans@gmail.com",
    bookingUrl: site.bookingUrl,
    primaryCta: "Let's build something",
    bookingCta: "Book a call",
    bandLine: "Open to remote full-time, contract or part-time roles.",
  },
  crossSell: {
    eyebrow: "Also offering",
    text: "Virtual assistant services with advanced technical skills, as QovaOps by triqova.",
    link: { label: "qovaops.triqova.com", href: site.vaUrl },
  },
  socials: [socialLinks.github, socialLinks.linkedin],
  // Developer resume (added by Hans 2026-11-14). Set enabled: false to hide every resume
  // button if the PDF is ever removed; the VA site keeps hans-obena-resume.pdf.
  resume: {
    enabled: true,
    href: "/resume/hans-obena-developer-resume.pdf",
    downloadName: "Hans-Obena-Developer-Resume.pdf",
    title: "Full-Stack Developer",
    pages: [page1, page2],
  },
  sections,
  navItems,
  about: {
    tagline: { line1: "I build fast, reliable", line2: "websites and web apps." },
    // Target role (Hans, 2026-11-14)
    pill: "Open to remote roles · Full-time, contract or part-time",
    blurb:
      "I'm Hans, a full-stack developer with a Computer Science degree (With Honors) and 4+ years of agency experience, most recently as Mid-Level Developer at Skyrocket Studios PH. I build web apps end to end with Next.js, React and TypeScript, ship WordPress and Shopify sites, and automate the work around them. I also built and run Run As One, a live race-registration platform, and co-founded triqova.",
    photoAlt: "Hans Obena, full-stack web developer",
    heroToolRows,
    // Only real numbers (same as the VA site). The CS With Honors card follows them.
    stats: [
      { value: 4, suffix: "+", label: "Years experience" },
      { value: 10, suffix: "+", label: "Client websites managed" },
    ],
    actions: { primary: { label: "View projects", href: "#projects" }, secondary: "resume" },
  },
  toolGroups,
  // Project ids from content/work.ts. No per-project repo links (Hans, 2026-11-14).
  workTabs: [
    {
      id: "websites",
      label: "Websites",
      layout: "browser",
      projects: [
        "runasone",
        "triqova",
        "cresendo",
        "kubota",
        "buildershome",
        "bestkept",
        "wyla",
        "cosplayfabrics",
        "techstack",
        "phinma",
        "issy",
        "ottlite",
      ],
    },
    {
      id: "engineering",
      label: "Engineering",
      layout: "rows",
      projects: [
        "ad-reporting",
        "meta-ads-mcp",
        "forms-dashboard",
        "voice-agent",
        "claude-tooling",
        "rsvp-app",
        "cresendo-plugins",
        "kubota-locator",
      ],
    },
  ],
  experience: { education, work, certifications },
};
