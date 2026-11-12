// Tools section (PLAN.md §5 #4), grouped. Source: resume "Skills & Certifications" (2026-11-12).

export type ToolGroup = { label: string; tools: string[] };

export const toolGroups: ToolGroup[] = [
  {
    label: "Admin & Ops",
    tools: ["Google Workspace", "Microsoft Office", "Canva", "ClickUp", "Slack", "Excel"],
  },
  {
    label: "Web & eCommerce",
    tools: ["WordPress", "Shopify", "Next.js", "React", "TypeScript", "PHP", "Node.js", "PostgreSQL"],
  },
  {
    label: "Automation & AI",
    tools: ["n8n", "Make", "Claude", "Claude Code", "Cursor", "Gemini Enterprise", "Retell AI", "MCP servers"],
  },
  {
    label: "Analytics & Hosting",
    tools: ["Google BigQuery", "DigitalOcean", "WHM / cPanel", "Vercel", "Google Cloud Run"],
  },
];

/** Short highlight list for the About/hero chips (subset of the groups above). */
export const heroTools = ["Google Workspace", "ClickUp", "Shopify", "WordPress", "Next.js", "n8n", "Make"];
