// Developer site Stack section, grouped (DEV_FIRST_PLAN.md §2 #3).
// Only tools with a logo in content/tool-logos.ts (all 44 are used once).
// Source: resume "Skills & Certifications" (VA + developer resume, 2026-11-14).

import type { AboutContent, ToolGroup } from "@/content/profile";

export const toolGroups: ToolGroup[] = [
  {
    label: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flutter", "Dart"],
  },
  {
    label: "Backend & Data",
    tools: ["Node.js", "PHP", "PostgreSQL", "Neon", "Google BigQuery", "Resend"],
  },
  {
    label: "CMS & eCommerce",
    tools: ["WordPress", "Shopify"],
  },
  {
    label: "Hosting & DevOps",
    tools: [
      "Vercel",
      "Netlify",
      "Google Cloud Run",
      "DigitalOcean",
      "WHM / cPanel",
      "Hostinger",
      "GoDaddy",
    ],
  },
  {
    label: "AI & Automation",
    tools: [
      "Claude Code",
      "Claude",
      "MCP servers",
      "Cursor",
      "Antigravity",
      "ChatGPT",
      "Gemini Enterprise",
      "n8n",
      "Make",
      "Retell AI",
      "ElevenLabs",
    ],
  },
  {
    label: "Tools",
    tools: [
      "VS Code",
      "Git",
      "GitHub",
      "Figma",
      "Canva",
      "ClickUp",
      "Trello",
      "Slack",
      "Google Workspace",
      "Microsoft Office",
      "Excel",
      "Meta",
    ],
  },
];

/** Hero chips: `// Dev` row first, then `// Ops`. */
export const heroToolRows: AboutContent["heroToolRows"] = [
  { label: "Dev", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Shopify"] },
  { label: "Ops", tools: ["Google Workspace", "Slack", "ClickUp", "Canva", "n8n", "ChatGPT"] },
];
