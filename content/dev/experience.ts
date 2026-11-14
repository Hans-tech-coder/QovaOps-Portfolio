// Developer site Experience timeline: dev-first wording of the same history.
// Sources: public/resume/hans-obena-developer-resume.pdf and content/va/experience.ts (2026-11-14).
// Reworded only, no new claims. Personal phone from the resume is intentionally NOT used.
// Wording approved by Hans (2026-11-14).

import type { TimelineEntry } from "@/content/profile";
import { certifications, education } from "@/content/va/experience";

export { certifications, education };

export const work: TimelineEntry[] = [
  {
    title: "Mid-Level Developer",
    org: "Skyrocket Studios PH, Inc.",
    orgNote: "Digital Marketing Agency",
    period: "Nov 2022 – Jul 2026",
    points: [
      "Built and deployed a Next.js (App Router) and TypeScript forms dashboard on the ClickUp REST API, run with PM2 behind an Apache reverse proxy.",
      "Replaced the agency's ₱200K+/year Supermetrics subscription with an n8n pipeline that loads Meta, TikTok and LinkedIn API data into Google BigQuery daily, with upserts, retries and Slack alerts.",
      "Built a Retell AI voice agent that answers service and hiring inquiries, and a custom Meta Ads MCP server on Google Cloud Run for Gemini Enterprise.",
      "Built and maintained WordPress and Shopify sites for agency clients: custom PHP plugins, Liquid sections, metafields and Shopify API integrations, including the first Kubota Philippines dealer locator.",
      "Managed hosting and security for 10+ client sites on DigitalOcean (WHM/cPanel): email deliverability (SPF, DKIM, rDNS), malware removal and CSF firewall hardening.",
      "Worked with Git branches and pull requests, and reviewed and debugged teammates' code when issues came up.",
    ],
  },
  {
    title: "Independent Developer & Founder",
    org: "Self-employed",
    orgNote: "Run As One, triqova, QovaOps",
    period: "2021 – Present",
    points: [
      "Build websites and integrations for small-business clients: responsive design, plugin work and technical SEO.",
      "Built and run Run As One, a live race-registration platform (Next.js, TypeScript, PostgreSQL, Prisma, PayMongo).",
      "Co-founded triqova and developed its website; also offer virtual assistant services as QovaOps.",
    ],
  },
  {
    title: "Web Developer / Web Designer (Part-time Contract)",
    org: "DigitYza",
    period: "Jun 2023 – Dec 2023",
    points: [
      "Built and maintained WordPress sites for business clients, including plugin customization, responsive layouts and load-speed improvements.",
      "Ran QA testing for stability and security before each client handover.",
    ],
  },
];
