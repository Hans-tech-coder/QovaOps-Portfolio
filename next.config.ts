import type { NextConfig } from "next";

// Two sites, one app (DEV_FIRST_PLAN.md §4). Each domain's paths are rewritten to its
// own route segment, so visitors only ever see `/`:
//   qovaops.triqova.com/*   → /va/*   (QovaOps VA site)
//   hansobena.triqova.com/* → /dev/*  (developer portfolio; placeholder until Phase C)
// Pages stay static: rewrites/redirects are routing rules, no request-time code.
const VA_HOST = "qovaops.triqova.com";
const DEV_HOST = "hansobena.triqova.com";
const host = (value: string) => [{ type: "host" as const, value: value.replace(/\./g, "\\.") }];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
      // (localhost, Vercel preview URLs) gets the VA site at `/` for now.
      beforeFiles: [
        { source: "/", has: host(DEV_HOST), destination: "/dev" },
        { source: "/", missing: host(DEV_HOST), destination: "/va" },
      ],
      // Everything else per domain (sitemap.xml, robots.txt, opengraph-image…), after
      // public files and _next assets, so shared assets (icons, resume, work thumbnails)
      // are served as-is on both domains.
      afterFiles: [
        { source: "/:path*", has: host(DEV_HOST), destination: "/dev/:path*" },
        { source: "/:path*", has: host(VA_HOST), destination: "/va/:path*" },
      ],
    };
  },

  // The internal paths redirect to their domain so each page has one canonical URL.
  // Production deploys only (VERCEL_ENV is set by Vercel), so localhost:3000/va and /dev,
  // `next start` and preview URLs still open each site directly.
  async redirects() {
    if (process.env.VERCEL_ENV !== "production") return [];
    return [
      { source: "/va", destination: `https://${VA_HOST}/`, permanent: true },
      { source: "/dev", destination: `https://${DEV_HOST}/`, permanent: true },
    ];
  },
};

export default nextConfig;
