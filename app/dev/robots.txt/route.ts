import { devMeta } from "@/content/dev/profile";

// Same pattern as app/va/robots.txt/route.ts (robots.ts only works in the app root).
// Served at hansobena.triqova.com/robots.txt via the host rewrite in next.config.ts.
export function GET() {
  const body = `User-Agent: *\nAllow: /\n\nSitemap: ${devMeta.url}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
