// Services section (PLAN.md §5 #2). All nine from BRAND_GUIDE §1, in order.
// Icon names are Lucide components, mapped in components/sections/Services.tsx.

export type ServiceIcon =
  | "inbox"
  | "cart"
  | "code"
  | "gauge"
  | "workflow"
  | "kanban"
  | "chart"
  | "shield"
  | "route";

export type Service = { title: string; line: string; icon: ServiceIcon };

export const services: Service[] = [
  {
    title: "Executive & Admin Support",
    line: "Inbox, calendar, travel and daily coordination.",
    icon: "inbox",
  },
  {
    title: "Website & eCommerce Management",
    line: "WordPress sites and Shopify stores, kept updated and running smoothly.",
    icon: "cart",
  },
  {
    title: "Full-Stack Development",
    line: "Custom features and web apps in Next.js, TypeScript and PHP.",
    icon: "code",
  },
  {
    title: "Technical SEO & Website Performance Optimization",
    line: "Core Web Vitals, speed fixes and technical audits.",
    icon: "gauge",
  },
  {
    title: "AI & Workflow Automation",
    line: "n8n, Make, AI agents and MCP: practical automation, without the hype.",
    icon: "workflow",
  },
  {
    title: "CRM, ClickUp & Digital Operations Management",
    line: "Process tracking, client onboarding and SOPs in one place.",
    icon: "kanban",
  },
  {
    title: "Marketing Analytics, Dashboards & Reporting",
    line: "Ad and marketing data pulled into dashboards and reports you can act on.",
    icon: "chart",
  },
  {
    title: "Hosting, Server Administration & Website Security",
    line: "Hosting, email deliverability and site security, kept in check.",
    icon: "shield",
  },
  {
    title: "End-to-End Technical Project & Operations Management",
    line: "One owner for the work, from plan to launch to ongoing support.",
    icon: "route",
  },
];
