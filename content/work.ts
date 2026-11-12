// Work section (PLAN.md §5 #5). Source: resume "Selected / Other Projects" (2026-11-12).
// Hans approved showing agency work and naming clients (2026-11-12). Links/screenshots still TODO.

export type WorkCategory = "websites" | "automation" | "operations";

export type ProjectStatus = "Live" | "Agency work" | "Personal";

export const workCategoryLabels: Record<WorkCategory, string> = {
  websites: "Websites",
  automation: "Automation",
  operations: "Operations",
};

export type Project = {
  name: string;
  role: string;
  /** Badge. Only set when the resume states it; otherwise leave undefined. */
  status?: ProjectStatus;
  category: WorkCategory;
  summary: string;
  points: string[];
  href?: string;
  published: boolean;
};

export const projects: Project[] = [
  {
    name: "RunAsOne",
    status: "Live",
    role: "Founder and Developer",
    category: "websites",
    summary: "Live race-registration platform.",
    points: [
      "3 events and 244+ registrants as of October 2026.",
      "Online payments (GCash, Maya, QR Ph, card), registrant records, Excel results upload and PDF e-certificates.",
      "Staff accounts with role-based access and audit logs to protect registrant data.",
    ],
    href: "https://runasone.ph",
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    name: "Agency ad-reporting automation",
    status: "Agency work",
    role: "Built at Skyrocket Studios PH",
    category: "automation",
    summary: "n8n pipeline that replaced a 200K+/year reporting subscription.",
    points: [
      "Pulls Meta, TikTok and LinkedIn ad data into Google BigQuery every day.",
      "Retries and Slack alerts when a run fails.",
    ],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    name: "AI voice agent",
    status: "Agency work",
    role: "Built at Skyrocket Studios PH",
    category: "automation",
    summary: "Retell AI voice agent that answers service and hiring inquiries.",
    points: ["Call data sent through Make into reports."],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    name: "Claude skills, agents & MCP servers",
    status: "Personal",
    role: "Personal projects",
    category: "automation",
    summary: "AI tooling for code review and data access.",
    points: [
      "Claude skills and agents that check code for security issues.",
      "MCP servers that connect AI assistants to GitHub and Firestore data.",
    ],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    name: "Event RSVP app",
    role: "Developer",
    category: "websites",
    summary: "Invite-only RSVP app with gift registry and admin panel.",
    points: [
      "Invite-code access, gift-registry claiming and an admin panel for managing guests.",
      "Security review before launch; fixed two issues, including publicly readable guest data.",
    ],
    published: true,
  },
  {
    name: "Shopify stores",
    role: "Lead on two stores, support on one",
    category: "websites",
    summary: "Builders Home, Best Kept Organizer, Issy Cosmetics.",
    points: ["Custom store sections, product filters and app integrations."],
    // TODO(Hans): links/screenshots (naming approved 2026-11-12)
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    name: "Custom WordPress plugins",
    role: "Developer",
    category: "websites",
    summary: "Race results publishing and a form submissions dashboard.",
    points: [
      "A race results plugin for publishing event results.",
      "A form submissions dashboard for managing entries in one place.",
    ],
    published: true,
  },
];

export const publishedProjects = projects.filter((p) => p.published);
