import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { LinkItem, SiteProfile } from "@/content/profile";
import { Footer } from "./Footer";
import { Wordmark } from "./Wordmark";

// No intro loader here, but html.qo-js still locks scroll until `qo-intro-done` (globals.css).
// Only the class, not the sessionStorage flag, so the home page still plays its intro once.
const unlockScroll = `document.documentElement.classList.add("qo-intro-done")`;

type NotFoundPageProps = {
  profile: SiteProfile;
  title: string;
  intro: string;
  /** Secondary link next to the lime "Back to home" button. */
  secondary: LinkItem;
};

/**
 * Branded 404 for each site (app/<site>/not-found.tsx): wordmark + theme toggle bar,
 * ghost "404" with the `// 404` eyebrow, a short line, lime home button, one secondary
 * link, footer. Plain <a> links so leaving it is a full load (the home page sets up its
 * own loader and motion). Contact details come from the profile, never hard-coded here.
 */
export function NotFoundPage({ profile, title, intro, secondary }: NotFoundPageProps) {
  const external = /^https?:/.test(secondary.href);
  const SecondaryIcon = external ? ArrowUpRight : ArrowRight;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: unlockScroll }} />
      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 py-5 lg:py-6">
          <Wordmark brand={profile.brand} href="/" animate={false} />
          <ThemeToggle tooltipAlign="end" />
        </header>

        <main id="main" className="flex flex-1 items-center py-6">
          <section
            aria-labelledby="not-found-title"
            className="w-full overflow-hidden rounded-card border border-line bg-surface p-6 sm:p-8 lg:p-10"
          >
            <div className="relative">
              <span
                aria-hidden="true"
                className="text-outline-ghost pointer-events-none block text-[6rem] leading-none font-bold tracking-tight select-none sm:text-[9rem] lg:text-[12rem]"
              >
                404
              </span>
              <p className="qo-label absolute bottom-[0.6em] left-1 text-accent-text sm:text-[0.8125rem]">
                {"// 404"}
              </p>
            </div>
            <h1
              id="not-found-title"
              className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-[2.5rem]"
            >
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="/"
                className="qo-btn group inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-6 text-sm font-bold text-on-accent hover:bg-accent-hover"
              >
                Back to home
                <ArrowRight aria-hidden="true" className="size-4 qo-nudge" />
              </a>
              <a
                href={secondary.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-1.5 rounded-lg text-sm font-bold text-fg underline decoration-dashed underline-offset-4 transition-colors hover:text-muted"
              >
                {secondary.label}
                <SecondaryIcon
                  aria-hidden="true"
                  className={`size-4 ${external ? "qo-nudge-ne" : "qo-nudge"}`}
                />
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </div>
          </section>
        </main>

        <Footer brand={profile.brand} />
      </div>
    </>
  );
}
