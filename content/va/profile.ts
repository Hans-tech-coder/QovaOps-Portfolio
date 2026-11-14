// VA site profile (qovaops.triqova.com): QovaOps by triqova, General VA service.
// Copy from brand/BRAND_GUIDE.md §1, §2 and §7. Do not invent numbers or claims.

import type { SiteProfile } from "@/content/profile";
import { site, socialLinks } from "@/content/site";
// Page images rendered from the PDF by scripts/resume-pages.py (re-run it after replacing the PDF).
import page1 from "@/public/resume/page-1.webp";
import page2 from "@/public/resume/page-2.webp";
import { certifications, education, work } from "./experience";
import { navItems, sections } from "./sections";
import { heroToolRows, toolGroups } from "./tools";

/** VA-only copy used outside the page body (metadata, OG card, JSON-LD). */
export const vaMeta = {
  url: "https://qovaops.triqova.com",
  title: "QovaOps by triqova — Tech-Enabled Virtual Assistant | Hans Obena",
  description:
    "General virtual assistant with advanced technical skills: executive support, websites & eCommerce, AI automation, and digital operations for founders, agencies and eCommerce brands.",
  heroSub:
    "Tech-enabled virtual assistance and streamlined day-to-day operations, backed by Triqova systems and automation.",
} as const;

export const vaProfile: SiteProfile = {
  id: "va",
  url: vaMeta.url,
  brand: {
    name: "QovaOps",
    endorsement: "by triqova",
    wordmark: { solid: "Qova", outline: "Ops" },
    secondaryLine: "Human execution. Powered by smarter systems.",
  },
  contact: {
    email: "qovaops@gmail.com",
    bookingUrl: site.bookingUrl,
    primaryCta: "Delegate Your Operations",
    bookingCta: "Book a call",
  },
  socials: [socialLinks.facebook, socialLinks.instagram, socialLinks.youtube, socialLinks.linkedin],
  // Resume PDF (copy of brand/Hans Christian A. Obena - Resume (General Virtual Assistant).pdf).
  // Replace the file in public/resume/ to update it; the link stays the same.
  resume: {
    href: "/resume/hans-obena-resume.pdf",
    downloadName: "Hans-Obena-Resume.pdf",
    title: "General Virtual Assistant",
    pages: [page1, page2],
  },
  sections,
  navItems,
  about: {
    tagline: { line1: "Your Daily Operations.", line2: "Our Execution." },
    traits: ["Intelligent", "Creative", "Confident"],
    // About blurb from BRAND_GUIDE §7.
    blurb:
      "I'm Hans, a Computer Science graduate with Honors and 4+ years in web development, digital operations and AI automation. I help busy founders, digital agencies and eCommerce brands simplify operations, fix technical bottlenecks, and scale without juggling multiple hires. I take ownership of the work, not just the task list.",
    photoAlt: "Hans Obena, virtual assistant with advanced technical skills",
    heroToolRows,
    // Only real numbers (PLAN.md "Stats" + session log). Do not add more without Hans.
    stats: [
      { value: 4, suffix: "+", label: "Years experience" },
      { value: 10, suffix: "+", label: "Client websites managed" },
      { value: 9, suffix: "", label: "Services" },
    ],
  },
  toolGroups,
  workTabs: ["websites", "automation", "operations"],
  experience: { education, work, certifications },
};
