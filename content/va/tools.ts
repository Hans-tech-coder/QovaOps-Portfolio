// VA site Tools section (PLAN.md §5 #4), grouped. Source: resume "Skills & Certifications" (2026-11-12).

import type { AboutContent, ToolGroup } from "@/content/profile";

export const toolGroups: ToolGroup[] = [
  {
    label: "Admin & Ops",
    tools: ["Google Workspace", "Microsoft Office", "Canva", "Figma", "ClickUp", "Trello", "Slack", "Excel", "Meta"],
  },
  {
    label: "Web & eCommerce",
    tools: [
      "WordPress",
      "Shopify",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PHP",
      "Node.js",
      "PostgreSQL",
      "Resend",
      "Flutter",
      "Dart",
      "VS Code",
      "Git",
      "GitHub",
    ],
  },
  {
    label: "Automation & AI",
    tools: [
      "n8n",
      "Make",
      "Claude",
      "Claude Code",
      "ChatGPT",
      "Cursor",
      "Antigravity",
      "Gemini Enterprise",
      "ElevenLabs",
      "Retell AI",
      "MCP servers",
    ],
  },
  {
    label: "Analytics & Hosting",
    tools: [
      "Google BigQuery",
      "DigitalOcean",
      "WHM / cPanel",
      "Vercel",
      "Netlify",
      "Neon",
      "Hostinger",
      "GoDaddy",
      "Google Cloud Run",
    ],
  },
];

/**
 * About/hero chips (subset of the groups above): Ops tools only on the VA site.
 * One unlabelled row; the hero supports labelled rows (`// Ops`, `// Dev`) for the dev site.
 */
export const heroToolRows: AboutContent["heroToolRows"] = [
  {
    tools: ["Google Workspace", "Slack", "ClickUp", "Canva", "Shopify", "WordPress", "n8n", "ChatGPT"],
  },
];
