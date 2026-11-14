// Experience timeline (PLAN.md §5 #6).
// Source: brand/Hans Christian A. Obena - Resume (General Virtual Assistant).pdf (added 2026-11-12).
// Only facts from the resume. Personal phone/email from the resume are intentionally NOT used.

import type { TimelineEntry } from "@/content/profile";

export const education: TimelineEntry[] = [
  {
    title: "BS Computer Science, With Honors",
    org: "St. Paul Colleges Foundation Inc.",
    period: "2015 – 2019",
    points: ["Awards: Best in Web Development, Best Mobile Application"],
  },
];

export const work: TimelineEntry[] = [
  {
    title: "Founder · General Virtual Assistant",
    org: "QovaOps by triqova / Self-employed",
    period: "2021 – Present",
    points: [
      "Websites, integrations and technical SEO for small-business clients.",
      "Built and runs Run As One (race registration); now offers General VA services as QovaOps.",
    ],
  },
  {
    title: "Mid-Level Developer",
    org: "Skyrocket Studios PH, Inc.",
    orgNote: "Digital Marketing Agency",
    period: "Nov 2022 – Jul 2026",
    points: [
      "Automated the agency's daily ad reporting with an n8n pipeline (Meta, TikTok, LinkedIn → Google BigQuery, with retries and Slack alerts), replacing a 200K+/year Supermetrics subscription.",
      "Set up a Retell AI voice agent that answers service and hiring inquiries, with call data sent through Make into reports.",
      "Built a ClickUp-connected forms dashboard so the team could manage submissions in one place.",
      "Managed Shopify stores and apps (Klaviyo, product reviews), including a Shopify Plus store.",
      "Built custom website features, such as the first Kubota Philippines dealer locator.",
      "Managed hosting, email deliverability (SPF/DKIM) and security for 10+ client websites, including removing a credential-stealing fake plugin.",
      "Built a Meta Ads connector on Google Cloud Run so the team could ask Gemini Enterprise about ad data.",
    ],
  },
  {
    title: "Web Developer / Web Designer (Part-time Contract)",
    org: "DigitYza",
    period: "Jun 2023 – Dec 2023",
    points: [
      "Maintained WordPress sites for business clients: plugin setup, responsive layouts and load-speed improvements.",
      "Ran QA checks for stability and security before each client handover.",
    ],
  },
];

export const certifications = [
  "Google IT Support",
  "Web Accessibility Audit",
  "AI in Software Development",
  "Mobile Application Development",
  "UI and UX Design",
];

export const languages = ["English", "Tagalog"];
