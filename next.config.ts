import type { NextConfig } from "next";

// Two sites, one app (DEV_FIRST_PLAN.md §4). Each domain's paths are rewritten to its
// own route segment, so visitors only ever see `/`:
//   qovaops.triqova.com/*   → /va/*   (QovaOps VA site)
//   hansobena.triqova.com/* → /dev/*  (developer portfolio)
//   any other host (localhost, *.vercel.app) → `/` is the site picker (app/select)
// Pages stay static: rewrites/redirects are routing rules, no request-time code.
const VA_HOST = "qovaops.triqova.com";
const DEV_HOST = "hansobena.triqova.com";
const host = (value: string) => [{ type: "host" as const, value: value.replace(/\./g, "\\.") }];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // app/global-not-found.tsx: one branded 404 per host for unmatched paths.
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async rewrites() {
    return {
      // `/` exists on no route, so it is mapped before the filesystem check. Any other host
      // (localhost, Vercel preview URLs) gets the site picker, which links to /dev and /va.
      beforeFiles: [
        { source: "/", has: host(DEV_HOST), destination: "/dev" },
        { source: "/", has: host(VA_HOST), destination: "/va" },
        { source: "/", missing: [...host(DEV_HOST), ...host(VA_HOST)], destination: "/select" },
        // No root app/favicon.ico (it would be the same on both domains): each host gets its
        // own mark's .ico (scripts/icons.mjs, components/seo/icons.ts).
        { source: "/favicon.ico", has: host(DEV_HOST), destination: "/icons/hans-obena-favicon.ico" },
        { source: "/favicon.ico", missing: host(DEV_HOST), destination: "/icons/qovaops-favicon.ico" },
      ],
      // Everything else per domain (sitemap.xml, robots.txt, manifest.webmanifest,
      // opengraph-image…), after public files and _next assets, so shared assets (icons,
      // resume, work thumbnails) are served as-is on both domains. Other hosts (localhost,
      // previews) still fall back to the VA files, so the VA page's relative manifest link
      // works there; only `/` is the picker.
      // A path neither site has falls through to app/global-not-found.tsx (404, branded per host).
      afterFiles: [
        { source: "/:path*", has: host(DEV_HOST), destination: "/dev/:path*" },
        { source: "/:path*", missing: host(DEV_HOST), destination: "/va/:path*" },
      ],
    };
  },

  // The internal paths redirect to their domain so each page has one canonical URL.
  // Production deploys only (VERCEL_ENV is set by Vercel), so localhost:3000/va and /dev,
  // `next start` and preview URLs still open each site directly.
  async redirects() {
    // The old /va idea (DEV_FIRST_PLAN.md §1): on the dev domain, /va and /gva go to the VA site
    // for good (308), like the other domain redirects.
    const oldVaPaths = [
      { source: "/:p(va|gva)", has: host(DEV_HOST), destination: `https://${VA_HOST}/`, permanent: true },
    ];
    // The site picker is only for localhost and *.vercel.app; on the real domains it goes home.
    const pickerOnDomains = [DEV_HOST, VA_HOST].map((h) => ({
      source: "/select",
      has: host(h),
      destination: "/",
      permanent: false,
    }));
    if (process.env.VERCEL_ENV !== "production") return [...oldVaPaths, ...pickerOnDomains];
    return [
      ...oldVaPaths,
      ...pickerOnDomains,
      { source: "/va", destination: `https://${VA_HOST}/`, permanent: true },
      { source: "/dev", destination: `https://${DEV_HOST}/`, permanent: true },
    ];
  },
};

export default nextConfig;
