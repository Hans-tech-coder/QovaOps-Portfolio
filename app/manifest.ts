import type { MetadataRoute } from "next";
import { THEME_COLORS } from "@/components/layout/theme";
import { site } from "@/content/site";

// Icons are generated from the Q mark by scripts/icons.mjs.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} ${site.endorsement}`,
    short_name: site.name,
    description: site.description,
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
}
