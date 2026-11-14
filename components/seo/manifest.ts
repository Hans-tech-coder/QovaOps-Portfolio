import { THEME_COLORS } from "@/components/layout/theme";

// Per-site web app manifest (app/va|dev/manifest.webmanifest/route.ts). A root
// app/manifest.ts would give both domains the same name, so each site serves its own,
// and its metadata links it as "/manifest.webmanifest" (rewritten per host).
// Icons are generated from the Q mark by scripts/icons.mjs and shared by both sites.
export function manifestResponse({ name, shortName, description }: { name: string; shortName: string; description: string }) {
  const manifest = {
    name,
    short_name: shortName,
    description,
    start_url: "/",
    display: "browser",
    background_color: THEME_COLORS.dark,
    theme_color: THEME_COLORS.dark,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json" },
  });
}
