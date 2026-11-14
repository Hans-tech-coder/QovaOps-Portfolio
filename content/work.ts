// Work section (PLAN.md §5 #5). Source: resume "Selected / Other Projects" (2026-11-12).
// Hans approved showing agency work and naming clients (2026-11-12).
// Client sites + roles from Hans (2026-11-13); details checked on the live sites, screenshots in public/work/.

// Shared project data for both sites. Each site picks and orders projects by `id` in its
// profile (SiteProfile.workTabs), so a project can show on one site, both, or neither.

export type ProjectStatus = "Own product" | "Agency work" | "Personal";

export type Project = {
  /** Stable key the site profiles use to pick projects (content/<site>/profile.ts). */
  id: string;
  name: string;
  role: string;
  /** Badge: Own product (Hans founded it), Agency work (Skyrocket), Personal. Only set when Hans confirms. */
  status?: ProjectStatus;
  summary: string;
  points: string[];
  /** Platform line shown under the role, e.g. "Shopify" or "WordPress + Elementor". */
  stack?: string;
  /** 16:10 screenshot in public/, shown as the row thumbnail (Websites tab). */
  image?: string;
  href?: string;
  published: boolean;
};

export const projects: Project[] = [
  {
    id: "runasone",
    name: "Run As One",
    status: "Own product",
    role: "Founder and Developer",
    summary: "Live race-registration platform.",
    points: [
      "3 events and 244+ registrants as of October 2026.",
      "Online payments (GCash, Maya, QR Ph, card), registrant records, Excel results upload and PDF e-certificates.",
      "Staff accounts with role-based access and audit logs to protect registrant data.",
    ],
    // Stack from the developer resume (public/resume/hans-obena-developer-resume.pdf).
    stack: "Next.js · TypeScript · PostgreSQL · Prisma",
    image: "/work/runasone.webp",
    href: "https://runasone.ph",
    published: true,
  },
  {
    id: "triqova",
    name: "triqova",
    status: "Own product",
    role: "Co-founder and Developer",
    stack: "Next.js",
    summary: "Site for triqova, the creative technology startup I co-founded in Tarlac.",
    points: [
      "Developed the company website: services, approach, work and contact.",
      "Interactive previews for each service and a \"what's holding your business back?\" picker that shows where triqova would start.",
    ],
    image: "/work/triqova.webp",
    href: "https://triqova.com",
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    id: "ad-reporting",
    name: "Agency ad-reporting automation",
    status: "Agency work",
    role: "Built at Skyrocket Studios PH",
    stack: "n8n · Google BigQuery",
    summary: "n8n pipeline that replaced a 200K+/year reporting subscription.",
    points: [
      "Pulls Meta, TikTok and LinkedIn ad data into Google BigQuery every day.",
      "Retries and Slack alerts when a run fails.",
    ],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    id: "voice-agent",
    name: "AI voice agent",
    status: "Agency work",
    role: "Built at Skyrocket Studios PH",
    stack: "Retell AI · Make",
    summary: "Retell AI voice agent that answers service and hiring inquiries.",
    points: ["Call data sent through Make into reports."],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    id: "claude-tooling",
    name: "Claude skills, agents & MCP servers",
    status: "Personal",
    role: "Personal projects",
    summary: "AI tooling for code review and data access.",
    points: [
      "Claude skills and agents that check code for security issues.",
      "MCP servers that connect AI assistants to GitHub and Firestore data.",
    ],
    published: true,
  },
  {
    id: "cresendo",
    name: "Cresendo Running Community",
    status: "Personal",
    role: "Solo Developer",
    stack: "WordPress + Elementor",
    summary: "Website for my running community in Tarlac, designed and built on my own.",
    points: [
      "Pages for events, merch, the blog and an online membership form.",
      "Custom plugin: form submissions dashboard with filters, search, read/unread tracking, failed-action status, bulk actions and CSV export.",
      "Custom plugin: race results publishing for community runs (results now hosted on Run As One).",
    ],
    image: "/work/cresendo.webp",
    href: "https://cresendorunningcommunity.com",
    published: true,
  },
  {
    id: "kubota",
    name: "Kubota Philippines",
    status: "Agency work",
    role: "Lead Developer",
    stack: "WordPress + Elementor",
    summary: "Official site for Kubota's Philippine distributor.",
    points: [
      "Built the first find-a-dealer with custom scripts and JSON, then recommended and set up a store-locator plugin so the team can manage dealers themselves.",
      "Dealer map covers 90 dealers across 37 provinces.",
      "Set up and configured the MyAlice chatbot on the site.",
    ],
    image: "/work/kubota.webp",
    href: "https://kubota.com.ph",
    published: true,
  },
  {
    id: "buildershome",
    name: "Builders Home",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    summary: "Online store for building materials and construction supplies in the Philippines.",
    points: [
      "Built the storefront and set up the admin: products, categories, checkout and shipping.",
      "Connected Klaviyo email marketing and Judge.me product reviews.",
    ],
    image: "/work/buildershome.webp",
    href: "https://buildershome.com",
    published: true,
  },
  {
    id: "bestkept",
    name: "Best Kept Organizer",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    summary: "Home organization store, built, launched and managed end to end.",
    points: [
      "Prices switch to the visitor's local currency automatically, based on location.",
      "Set up Klaviyo for email marketing.",
    ],
    image: "/work/bestkept.webp",
    href: "https://bestkeptorganizer.com",
    published: true,
  },
  {
    id: "wyla",
    name: "Wyla",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    summary: "Craft products brand store, developed and set up in full.",
    points: ["Custom code for functions the client needed beyond the theme."],
    image: "/work/wyla.webp",
    href: "https://wyla.com",
    published: true,
  },
  {
    id: "cosplayfabrics",
    name: "Cosplay Fabrics International",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    summary: "Specialty fabric store for cosplay designs, developed and set up in full.",
    points: ["Header currency switcher for USD, EUR, GBP and CHF."],
    image: "/work/cosplayfabrics.webp",
    href: "https://cosplayfabricsinternational.com",
    published: true,
  },
  {
    id: "techstack",
    name: "TechStack",
    status: "Agency work",
    role: "Lead Developer",
    stack: "WordPress + Elementor",
    summary: "Marketing and eCommerce technology consultancy site, built solo.",
    points: [
      "Set up everything: development environment, admin dashboard, theme and plugins.",
    ],
    image: "/work/techstack.webp",
    href: "https://techstack.ph",
    published: true,
  },
  {
    id: "phinma",
    name: "PHINMA Properties",
    status: "Agency work",
    role: "Support Developer",
    stack: "WordPress + Elementor",
    summary: "Property developer site for first-time homebuyers.",
    points: [
      "Developed the home page and other pages, and fixed mobile responsiveness.",
      "Sent website form submissions to Lark and set up lead management there.",
    ],
    image: "/work/phinma.webp",
    href: "https://phinmaproperties.com",
    published: true,
  },
  {
    id: "issy",
    name: "Issy Cosmetics",
    status: "Agency work",
    role: "Support Developer",
    stack: "Shopify",
    summary: "Makeup and perfume brand store.",
    points: [
      "Developed pages and custom Liquid sections and blocks to match the client's designs.",
      "Configured store system settings.",
    ],
    image: "/work/issy.webp",
    href: "https://issycosmetics.com",
    published: true,
  },
  {
    id: "ottlite",
    name: "OttLite",
    status: "Agency work",
    role: "Support Developer",
    stack: "Shopify",
    summary: "Daylight lamp brand store.",
    points: ["Developed pages and custom Liquid sections and blocks."],
    image: "/work/ottlite.webp",
    href: "https://ottlite.com",
    published: true,
  },

  // ---- Engineering entries used on the developer site (content/dev/profile.ts). ----
  // Facts from the VA resume experience + developer resume (2026-11-14). No repo links.
  {
    // TODO(Hans): link or screenshot
    id: "meta-ads-mcp",
    name: "Meta Ads MCP server",
    status: "Agency work",
    role: "Built at Skyrocket Studios PH",
    stack: "Google Cloud Run · Gemini Enterprise",
    summary: "Custom MCP server on Google Cloud Run that connects Meta Ads data to Gemini Enterprise.",
    points: ["Lets the team ask Gemini Enterprise about ad data."],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    id: "forms-dashboard",
    name: "ClickUp forms dashboard",
    status: "Agency work",
    role: "Built at Skyrocket Studios PH",
    stack: "Next.js · TypeScript · ClickUp API",
    summary: "Forms dashboard on the ClickUp REST API, so the team manages submissions in one place.",
    points: ["Built with the Next.js App Router and TypeScript; runs with PM2 behind an Apache reverse proxy."],
    published: true,
  },
  {
    // TODO(Hans): link or screenshot
    id: "rsvp-app",
    name: "Event RSVP app",
    status: "Personal",
    role: "Personal project",
    stack: "Next.js · Firebase · Vercel",
    summary: "RSVP app with invite-code access, gift-registry claiming and an admin CMS.",
    points: [
      "Transaction-safe gift-registry claiming on Firestore, built on the App Router.",
      "Ran my own security review of the AI-assisted code and fixed two issues before launch: a server-side request forgery risk and publicly readable guest data.",
    ],
    published: true,
  },
  {
    id: "cresendo-plugins",
    name: "Custom WordPress plugins",
    status: "Personal",
    role: "Solo Developer · Cresendo Running Community",
    stack: "PHP · WordPress",
    summary: "Two custom plugins for the Cresendo Running Community site.",
    points: [
      "Form submissions dashboard with filters, search, read/unread tracking, failed-action status, bulk actions and CSV export.",
      "Race results publishing for community runs (results now hosted on Run As One).",
    ],
    href: "https://cresendorunningcommunity.com",
    published: true,
  },
  {
    id: "kubota-locator",
    name: "Kubota dealer locator",
    status: "Agency work",
    role: "Lead Developer · Kubota Philippines",
    stack: "WordPress · JavaScript + JSON",
    summary: "The first find-a-dealer for Kubota Philippines, built with custom scripts and JSON.",
    points: [
      "Later recommended and set up a store-locator plugin so the team can manage dealers themselves.",
      "Dealer map covers 90 dealers across 37 provinces.",
    ],
    href: "https://kubota.com.ph",
    published: true,
  },
];

export const publishedProjects = projects.filter((p) => p.published);
