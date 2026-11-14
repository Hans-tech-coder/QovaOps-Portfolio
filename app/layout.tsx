import type { Viewport } from "next";
import { SiteDocument } from "@/components/layout/SiteDocument";
import { DEFAULT_THEME, THEME_COLORS } from "@/components/layout/theme";
import "./globals.css";

// Shared shell for both sites (components/layout/SiteDocument.tsx). Each site's metadata
// (title, metadataBase, OG, JSON-LD) lives in its own segment layout: app/va/, app/dev/.

// One theme-color tag; the head script and the toggle update it per theme.
export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <SiteDocument>{children}</SiteDocument>;
}
