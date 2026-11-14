import type { Metadata } from "next";

// Per-site icons (files from scripts/icons.mjs, in public/icons/). The app has no root
// icon files, since those would give both domains the same icon: each site links its own
// in metadata, its manifest lists its own, and /favicon.ico is rewritten per host in
// next.config.ts (dev host → HO mark, any other host → QovaOps Q).
//   dev: HO ligature (public/brand/hans-obena-mark.svg)
//   va:  Q mark (public/brand/qovaops-mark.svg), also used by the site picker
type SiteId = "dev" | "va";

const FILES: Record<SiteId, { prefix: string; s192: string; s512: string; maskable: string }> = {
  dev: {
    prefix: "hans-obena",
    s192: "hans-obena-192.png",
    s512: "hans-obena-512.png",
    maskable: "hans-obena-maskable-512.png",
  },
  va: { prefix: "qovaops", s192: "icon-192.png", s512: "icon-512.png", maskable: "icon-maskable-512.png" },
};

/** `icons` for a site's Metadata. /favicon.ico is listed so old browsers get the host's .ico. */
export function siteIcons(id: SiteId): NonNullable<Metadata["icons"]> {
  const { prefix } = FILES[id];
  return {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: `/icons/${prefix}-icon.svg`, type: "image/svg+xml" },
    ],
    apple: [{ url: `/icons/${prefix}-apple-icon.png`, sizes: "180x180", type: "image/png" }],
  };
}

/** `icons` for a site's web app manifest. */
export function manifestIcons(id: SiteId) {
  const { s192, s512, maskable } = FILES[id];
  return [
    { src: `/icons/${s192}`, sizes: "192x192", type: "image/png", purpose: "any" },
    { src: `/icons/${s512}`, sizes: "512x512", type: "image/png", purpose: "any" },
    { src: `/icons/${maskable}`, sizes: "512x512", type: "image/png", purpose: "maskable" },
  ];
}
