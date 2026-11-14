import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DEFAULT_THEME, themeInitScript } from "./theme";
import { Cursor } from "@/components/motion/Cursor";

// Inter is the metric fallback while Articulat CF (Adobe Fonts kit, see <head>) loads.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const TYPEKIT_CSS = "https://use.typekit.net/lsg5lvm.css";
const typekitLoader = `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(TYPEKIT_CSS)};document.head.appendChild(l)})();`;

// Mono for eyebrows, nav and labels.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

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

/**
 * The <html> document both sites share: fonts, theme head script, Adobe Fonts loader, the
 * grid background, cursor and Vercel scripts. Used by the root layout (app/layout.tsx) and
 * by app/global-not-found.tsx, which Next renders without any layout.
 */
export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      // The head script may switch data-theme before hydration.
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      {/* App Router document head (this renders the root layout's <html>); the rule targets pages/. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Articulat CF via Hans's licensed Adobe Fonts web project (kit lsg5lvm).
            The kit CSS sets font-display: swap, so Inter shows until it loads. It is
            added by a script instead of a blocking <link>, because the kit CSS @imports
            p.typekit.net (Adobe's required usage ping) and that chain held back first
            paint by ~0.8s on mobile. Fonts still swap in exactly as before. */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" />
        <script dangerouslySetInnerHTML={{ __html: typekitLoader }} />
        <noscript>
          <link rel="stylesheet" href={TYPEKIT_CSS} />
        </noscript>
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
        {/* Vercel Web Analytics + Speed Insights: cookieless, so no consent banner (PLAN.md §2).
            Only rendered on Vercel builds (VERCEL=1); elsewhere /_vercel/* doesn't exist and
            the scripts would 404 (local `next start`, Lighthouse runs). */}
        {process.env.VERCEL ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
