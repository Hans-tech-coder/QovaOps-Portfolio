import type { Metadata } from "next";
import { vaMeta, vaProfile } from "@/content/va/profile";

const { brand } = vaProfile;
const siteName = `${brand.name} ${brand.endorsement}`;

// VA site metadata (app/va/layout.tsx). OG/Twitter images come from
// app/va/opengraph-image.tsx and twitter-image.tsx; icons from the app root
// (favicon.ico, icon.svg, apple-icon.png, scripts/icons.mjs).
export const vaMetadata: Metadata = {
  metadataBase: new URL(vaMeta.url),
  title: vaMeta.title,
  description: vaMeta.description,
  applicationName: siteName,
  authors: [{ name: "Hans Obena" }],
  creator: "Hans Obena",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: vaMeta.url,
    siteName,
    title: vaMeta.title,
    description: vaMeta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: vaMeta.title,
    description: vaMeta.description,
  },
};
