// Work section (PLAN.md §5 #5). Source: resume "Selected / Other Projects" (2026-11-12).
// Hans approved showing agency work and naming clients (2026-11-12).
// Client sites + roles from Hans (2026-11-13); details checked on the live sites, screenshots in public/work/.

export type WorkCategory = "websites" | "automation" | "operations";

export type ProjectStatus = "Own product" | "Agency work" | "Personal";

export const workCategoryLabels: Record<WorkCategory, string> = {
  websites: "Websites",
  automation: "Automation",
  operations: "Operations",
};

export type Project = {
  name: string;
  role: string;
  /** Badge: Own product (Hans founded it), Agency work (Skyrocket), Personal. Only set when Hans confirms. */
  status?: ProjectStatus;
  category: WorkCategory;
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
    name: "Run As One",
    status: "Own product",
    role: "Founder and Developer",
    category: "websites",
    summary: "Live race-registration platform.",
    points: [
      "3 events and 244+ registrants as of October 2026.",
      "Online payments (GCash, Maya, QR Ph, card), registrant records, Excel results upload and PDF e-certificates.",
      "Staff accounts with role-based access and audit logs to protect registrant data.",
    ],
    stack: "Next.js",
    image: "/work/runasone.webp",
    href: "https://runasone.ph",
    published: true,
  },
  {
    name: "triqova",
    status: "Own product",
    role: "Co-founder and Developer",
    stack: "Next.js",
    category: "websites",
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
    name: "Cresendo Running Community",
    status: "Personal",
    role: "Solo Developer",
    stack: "WordPress + Elementor",
    category: "websites",
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
    name: "Kubota Philippines",
    status: "Agency work",
    role: "Lead Developer",
    stack: "WordPress + Elementor",
    category: "websites",
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
    name: "Builders Home",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    category: "websites",
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
    name: "Best Kept Organizer",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    category: "websites",
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
    name: "Wyla",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    category: "websites",
    summary: "Craft products brand store, developed and set up in full.",
    points: ["Custom code for functions the client needed beyond the theme."],
    image: "/work/wyla.webp",
    href: "https://wyla.com",
    published: true,
  },
  {
    name: "Cosplay Fabrics International",
    status: "Agency work",
    role: "Lead Developer",
    stack: "Shopify",
    category: "websites",
    summary: "Specialty fabric store for cosplay designs, developed and set up in full.",
    points: ["Header currency switcher for USD, EUR, GBP and CHF."],
    image: "/work/cosplayfabrics.webp",
    href: "https://cosplayfabricsinternational.com",
    published: true,
  },
  {
    name: "TechStack",
    status: "Agency work",
    role: "Lead Developer",
    stack: "WordPress + Elementor",
    category: "websites",
    summary: "Marketing and eCommerce technology consultancy site, built solo.",
    points: [
      "Set up everything: development environment, admin dashboard, theme and plugins.",
    ],
    image: "/work/techstack.webp",
    href: "https://techstack.ph",
    published: true,
  },
  {
    name: "PHINMA Properties",
    status: "Agency work",
    role: "Support Developer",
    stack: "WordPress + Elementor",
    category: "websites",
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
    name: "Issy Cosmetics",
    status: "Agency work",
    role: "Support Developer",
    stack: "Shopify",
    category: "websites",
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
    name: "OttLite",
    status: "Agency work",
    role: "Support Developer",
    stack: "Shopify",
    category: "websites",
    summary: "Daylight lamp brand store.",
    points: ["Developed pages and custom Liquid sections and blocks."],
    image: "/work/ottlite.webp",
    href: "https://ottlite.com",
    published: true,
  },
];

export const publishedProjects = projects.filter((p) => p.published);
