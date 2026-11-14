import { THEME_COLORS } from "@/components/layout/theme";
import { manifestIcons } from "./icons";

// Per-site web app manifest (app/va|dev/manifest.webmanifest/route.ts). A root
// app/manifest.ts would give both domains the same name, so each site serves its own,
// and its metadata links it as "/manifest.webmanifest" (rewritten per host).
// Icons come from each site's mark (scripts/icons.mjs, components/seo/icons.ts).
export function manifestResponse({
  site,
  name,
  shortName,
  description,
}: {
  site: "dev" | "va";
  name: string;
  shortName: string;
  description: string;
}) {
  const manifest = {
    name,
    short_name: shortName,
    description,
    start_url: "/",
    display: "browser",
    background_color: THEME_COLORS.dark,
    theme_color: THEME_COLORS.dark,
    icons: manifestIcons(site),
  };
  return new Response(JSON.stringify(manifest), {
    headers: { "Content-Type": "application/manifest+json" },
  });
}
