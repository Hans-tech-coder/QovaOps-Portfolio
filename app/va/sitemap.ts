import type { MetadataRoute } from "next";
import { vaMeta } from "@/content/va/profile";

// One-page site: only the home URL. Section anchors (#services…) aren't separate pages.
// Served at qovaops.triqova.com/sitemap.xml via the host rewrite in next.config.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: vaMeta.url, changeFrequency: "monthly", priority: 1 }];
}
