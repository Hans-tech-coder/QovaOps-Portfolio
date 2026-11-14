import type { Metadata } from "next";
import { devMeta, devProfile } from "@/content/dev/profile";

// Developer site metadata (app/dev/layout.tsx). OG/Twitter images come from
// app/dev/opengraph-image.tsx and twitter-image.tsx; icons from the app root.
// TODO(Phase D): review title/description wording with Hans.
export const devMetadata: Metadata = {
  metadataBase: new URL(devMeta.url),
  title: devMeta.title,
  description: devMeta.description,
  applicationName: devProfile.brand.name,
  authors: [{ name: devProfile.brand.name }],
  creator: devProfile.brand.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: devMeta.url,
    siteName: devProfile.brand.name,
    title: devMeta.title,
    description: devMeta.description,
    locale: "en_US",
    firstName: "Hans",
    lastName: "Obena",
  },
  twitter: {
    card: "summary_large_image",
    title: devMeta.title,
    description: devMeta.description,
  },
};
