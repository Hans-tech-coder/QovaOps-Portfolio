import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { NotFoundPage } from "@/components/layout/NotFoundPage";
import { SiteDocument } from "@/components/layout/SiteDocument";
import { DEFAULT_THEME, THEME_COLORS } from "@/components/layout/theme";
import { devProfile } from "@/content/dev/profile";
import type { SiteProfile } from "@/content/profile";
import { site } from "@/content/site";
import { vaProfile } from "@/content/va/profile";
import "./globals.css";

/*
 * Branded 404 for both sites (needs `experimental.globalNotFound` in next.config.ts).
 * Every path is rewritten to /dev/* or /va/*, so a path neither site has is unmatched and
 * Next answers it with this page and status 404 (adding `noindex`), without any layout,
 * hence the shared <SiteDocument> and globals.css here. The host picks the site, like the
 * rewrites: hansobena.triqova.com → dev, any other host (qovaops, localhost, previews) → VA.
 *
 * Why not the alternatives (tried on a prod build, Next 16 + cacheComponents):
 * - app/<site>/not-found.tsx + a catch-all calling notFound(): a thrown notFound() is
 *   answered with an empty error shell rendered in the browser (no HTML content, and the
 *   theme head script never runs).
 * - app/not-found.tsx reading the host: Next ships the root not-found with every route, so
 *   headers() there turned the static home pages into partial prerenders.
 */

const DEV_HOST = new URL(site.devUrl).host;

async function siteFromHost(): Promise<"dev" | "va"> {
  const host = (await headers()).get("host")?.toLowerCase();
  return host === DEV_HOST ? "dev" : "va";
}

type Copy = { profile: SiteProfile; title: string; intro: string; secondary: { label: string; href: string } };

function copyFor(which: "dev" | "va"): Copy {
  if (which === "dev") {
    const { email } = devProfile.contact;
    return {
      profile: devProfile,
      title: "This page doesn't exist.",
      intro:
        "The link may be old or mistyped. The projects, stack and contact details are all on the home page.",
      secondary: { label: email, href: `mailto:${email}` },
    };
  }
  const { bookingUrl, bookingCta } = vaProfile.contact;
  return {
    profile: vaProfile,
    title: "This page isn't here.",
    intro:
      "The link may be old or mistyped. Head back to see how QovaOps can take on your daily operations, or book a quick call.",
    secondary: { label: bookingCta, href: bookingUrl },
  };
}

export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
  colorScheme: "dark light",
};

export async function generateMetadata(): Promise<Metadata> {
  const { brand } = copyFor(await siteFromHost()).profile;
  const name = brand.endorsement ? `${brand.name} ${brand.endorsement}` : brand.name;
  return {
    title: `Page not found | ${name}`,
    // Relative: served per host by the rewrites, like the home pages' manifest link.
    manifest: "/manifest.webmanifest",
  };
}

async function HostNotFound() {
  const copy = copyFor(await siteFromHost());
  return <NotFoundPage {...copy} />;
}

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <Suspense>
        <HostNotFound />
      </Suspense>
    </SiteDocument>
  );
}
