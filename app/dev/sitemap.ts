import type { MetadataRoute } from "next";
import { devMeta } from "@/content/dev/profile";

// One-page site: only the home URL. Served at hansobena.triqova.com/sitemap.xml via the host rewrite.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: devMeta.url, changeFrequency: "monthly", priority: 1 }];
}
