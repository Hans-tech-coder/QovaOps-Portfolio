// Single source for site-wide text, links and metadata.
// Values come from brand/BRAND_GUIDE.md §1, §2 and §7. Do not invent numbers or claims.

export const site = {
  name: "QovaOps",
  endorsement: "by triqova",
  triqovaUrl: "https://triqova.com",
  owner: "Hans Obena",
  url: "https://qovaops.triqova.com",
  title: "QovaOps by triqova — Tech-Enabled Virtual Assistant | Hans Obena",
  description:
    "General virtual assistant with advanced technical skills: executive support, websites & eCommerce, AI automation, and digital operations for founders, agencies and eCommerce brands.",
  tagline: { line1: "Your Daily Operations.", line2: "Our Execution." },
  heroSub:
    "Tech-enabled virtual assistance and streamlined day-to-day operations, backed by Triqova systems and automation.",
  secondaryLine: "Human execution. Powered by smarter systems.",
  traits: ["Intelligent", "Creative", "Confident"],
  cta: { primary: "Delegate Your Operations", secondary: "Book a call" },
  contact: {
    email: "qovaops@gmail.com",
    bookingUrl: "https://bit.ly/3WlL3yg",
  },
  // Resume PDF (copy of brand/Hans Christian A. Obena - Resume (General Virtual Assistant).pdf).
  // Replace the file in public/resume/ to update it; the link stays the same.
  resume: {
    href: "/resume/hans-obena-resume.pdf",
    downloadName: "Hans-Obena-Resume.pdf",
  },
  socials: [
    { label: "Facebook", handle: "@qovaops", href: "https://facebook.com/qovaops" },
    { label: "Instagram", handle: "@qovaops", href: "https://instagram.com/qovaops" },
    { label: "YouTube", handle: "@QovaOps", href: "https://youtube.com/@QovaOps" },
    { label: "LinkedIn", handle: "in/hans-obena", href: "https://linkedin.com/in/hans-obena" },
  ],
} as const;
