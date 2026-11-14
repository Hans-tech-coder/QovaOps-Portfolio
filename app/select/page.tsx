import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { siteIcons } from "@/components/seo/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { devProfile } from "@/content/dev/profile";
import type { SiteProfile } from "@/content/profile";
import { vaProfile } from "@/content/va/profile";

/*
 * Site picker for hosts that are neither site's domain: localhost and *.vercel.app.
 * next.config.ts rewrites `/` here for those hosts and redirects /select to `/` on the
 * two real domains, so visitors there never see it. Each card is a plain <a> to the
 * internal /dev or /va path (a full load, so the home page plays its own intro). On a
 * production *.vercel.app URL those paths redirect to the real domains.
 * No contact details here: this page is shared by both sites.
 */

export const metadata: Metadata = {
  title: "Choose a site | Hans Obena · QovaOps",
  description: "Local and preview entry point for the developer and VA sites.",
  robots: { index: false, follow: false },
  // Same fallback as /favicon.ico on non-site hosts (next.config.ts): the Q mark.
  icons: siteIcons("va"),
};

// html.qo-js locks scroll until `qo-intro-done` (globals.css); there is no intro here.
const unlockScroll = `document.documentElement.classList.add("qo-intro-done")`;

const SITES: { profile: SiteProfile; path: string; label: string; blurb: string }[] = [
  {
    profile: devProfile,
    path: "/dev",
    label: "Developer site",
    blurb: "Hans Obena, Full-Stack Web Developer. Portfolio for remote developer roles.",
  },
  {
    profile: vaProfile,
    path: "/va",
    label: "VA site",
    blurb: "QovaOps by triqova. Virtual assistant with advanced technical skills.",
  },
];

export default function SelectSitePage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: unlockScroll }} />
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-end gap-4 py-5 lg:py-6">
          <ThemeToggle tooltipAlign="end" />
        </header>

        <main id="main" className="flex flex-1 flex-col justify-center py-6">
          <p className="qo-label text-accent-text sm:text-[0.8125rem]">{"// local preview"}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-[2.5rem]">
            Which site do you want to open?
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
            This page only shows on localhost and Vercel preview URLs. Each domain opens its own
            site directly.
          </p>

          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
            {SITES.map(({ profile, path, label, blurb }) => (
              <li key={path}>
                <a
                  href={path}
                  className="group flex h-full flex-col gap-6 rounded-card border border-line bg-surface p-6 transition-colors hover:border-accent sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Wordmark brand={profile.brand} href={null} animate={false} />
                    <ArrowRight aria-hidden="true" className="mt-2 size-5 shrink-0 text-accent-text qo-nudge" />
                  </div>
                  <div className="mt-auto">
                    <p className="qo-label text-accent-text">{label}</p>
                    <p className="mt-2 text-base text-fg">{blurb}</p>
                    <p className="mt-3 font-mono text-sm text-muted">
                      {new URL(profile.url).host} <span aria-hidden="true">·</span> {path}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
