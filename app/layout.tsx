import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DEFAULT_THEME, THEME_COLORS, themeInitScript } from "@/components/layout/theme";
import { Cursor } from "@/components/motion/Cursor";
import { site } from "@/content/site";
import "./globals.css";

// Inter is the metric fallback while Articulat CF (Adobe Fonts kit, see <head>) loads.
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

// Background streaks: which grid line (k, counted from the centered column for
// vertical, from the top for horizontal), speed and offset. Negative delays start
// each one mid-run so they never all line up. Kept to a few on purpose.
const BEAMS = [
  { axis: "y", k: -6, dur: "9s", delay: "-1s" },
  { axis: "y", k: -2, dur: "11s", delay: "-6s" },
  { axis: "y", k: 1, dur: "10s", delay: "-3s" },
  { axis: "y", k: 5, dur: "12s", delay: "-8s" },
  { axis: "x", k: 1, dur: "14s", delay: "-4s" },
  { axis: "x", k: 7, dur: "16s", delay: "-11s" },
] as const;

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
        {/* Articulat CF via Hans's licensed Adobe Fonts web project (kit lsg5lvm).
            The kit CSS sets font-display: swap, so Inter shows until it loads. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/lsg5lvm.css" />
      </head>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to
          <body> before React hydrates. This only ignores <body>'s own attributes,
          not its children, so real mismatches in the page still surface. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Fixed grid + moving line streaks (globals.css .qo-bg-layer). Decorative only. */}
        <div aria-hidden="true" className="qo-bg-layer qo-grid-bg">
          {/* Grid lights up around the pointer (driven by <Cursor />, desktop only) */}
          <span className="qo-grid-spot" />
          {BEAMS.map(({ axis, k, dur, delay }) => (
            <span
              key={`${axis}${k}`}
              className={`qo-beam qo-beam-${axis}`}
              style={{ "--k": k, animationDuration: dur, animationDelay: delay } as React.CSSProperties}
            />
          ))}
        </div>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
