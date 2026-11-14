import { vaMeta } from "@/content/va/profile";

// robots.ts only works in the root of app/, and each domain needs its own sitemap line,
// so this is a plain route handler (prerendered at build). Served at
// qovaops.triqova.com/robots.txt via the host rewrite in next.config.ts.
export function GET() {
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${vaMeta.url}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
