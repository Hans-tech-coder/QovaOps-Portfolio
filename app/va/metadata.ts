import type { Metadata } from "next";
import { siteIcons } from "@/components/seo/icons";
import { ogAlt, ogSize } from "@/components/seo/og-image";
import { vaMeta, vaProfile } from "@/content/va/profile";

const { brand } = vaProfile;
const siteName = `${brand.name} ${brand.endorsement}`;

// VA site metadata (app/va/layout.tsx). One OG/Twitter image for both cards:
// app/va/opengraph-image/route.tsx. Icons: Q mark (components/seo/icons.ts, scripts/icons.mjs).
// Relative to metadataBase, so it renders as https://<this domain>/opengraph-image.
const ogImage = { url: "/opengraph-image", ...ogSize, alt: ogAlt, type: "image/png" };

export const vaMetadata: Metadata = {
  metadataBase: new URL(vaMeta.url),
  title: vaMeta.title,
  description: vaMeta.description,
  applicationName: siteName,
  authors: [{ name: "Hans Obena" }],
  creator: "Hans Obena",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: siteIcons("va"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: vaMeta.url,
    siteName,
    title: vaMeta.title,
    description: vaMeta.description,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
    title: vaMeta.title,
    description: vaMeta.description,
  },
};
