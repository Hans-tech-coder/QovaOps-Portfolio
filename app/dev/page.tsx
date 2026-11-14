import type { Metadata } from "next";
import { PortfolioPage } from "@/components/layout/PortfolioPage";
import { vaProfile } from "@/content/va/profile";
import { vaMetadata } from "../va/metadata";

// TODO(Phase C, DEV_FIRST_PLAN.md): placeholder until the developer site exists.
// hansobena.triqova.com → /dev renders the VA profile so the host rewrite has a target;
// noindex so it never gets indexed as the dev site. Replace with app/dev/layout.tsx
// (dev metadata, Person JSON-LD, OG card, sitemap, robots) + <PortfolioPage profile={devProfile} />.
export const metadata: Metadata = {
  ...vaMetadata,
  robots: { index: false, follow: false },
};

export default function DevHome() {
  return <PortfolioPage profile={vaProfile} />;
}
