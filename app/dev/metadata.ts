import type { Metadata } from "next";
import { devOgAlt, ogSize } from "@/components/seo/og-image";
import { devMeta, devProfile } from "@/content/dev/profile";

// Developer site metadata (app/dev/layout.tsx). One OG/Twitter image for both cards:
// app/dev/opengraph-image/route.tsx; icons from the app root.
// Relative to metadataBase, so it renders as https://<this domain>/opengraph-image.
const ogImage = { url: "/opengraph-image", ...ogSize, alt: devOgAlt, type: "image/png" };

export const devMetadata: Metadata = {
  metadataBase: new URL(devMeta.url),
  title: devMeta.title,
  description: devMeta.description,
  applicationName: devProfile.brand.name,
  authors: [{ name: devProfile.brand.name }],
  creator: devProfile.brand.name,
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: devMeta.url,
    siteName: devProfile.brand.name,
    title: devMeta.title,
    description: devMeta.description,
    locale: "en_US",
    images: [ogImage],
    firstName: "Hans",
    lastName: "Obena",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
    title: devMeta.title,
    description: devMeta.description,
  },
};
