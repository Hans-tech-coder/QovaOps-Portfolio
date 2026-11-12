import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DEFAULT_THEME, THEME_COLORS, themeInitScript } from "@/components/layout/theme";
import { site } from "@/content/site";
import "./globals.css";

// Inter is the fallback until the Articulat CF license is confirmed (PLAN.md §9).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Mono for eyebrows, nav and labels.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: `${site.name} ${site.endorsement}`,
  authors: [{ name: site.owner }],
  creator: site.owner,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} ${site.endorsement}`,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

// One theme-color tag; the head script and the toggle update it per theme.
export const viewport: Viewport = {
  themeColor: THEME_COLORS[DEFAULT_THEME],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      // The head script may switch data-theme before hydration.
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="qo-grid-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
