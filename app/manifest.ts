import type { MetadataRoute } from "next";
import { THEME_COLORS } from "@/components/layout/theme";
import { vaMeta, vaProfile } from "@/content/va/profile";

// Shared by both domains (manifest must live in the app root). VA values until Phase C.
// Icons are generated from the Q mark by scripts/icons.mjs.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${vaProfile.brand.name} ${vaProfile.brand.endorsement}`,
    short_name: vaProfile.brand.name,
    description: vaMeta.description,
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
