import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import type { SiteProfile } from "@/content/profile";
import { Wordmark } from "./Wordmark";

/**
 * Page header: a compact brand bar (wordmark left; link to the other site, socials,
 * theme toggle and the lime CTA pill right). Kept short so the About card shows on
 * the first screen. Below 1024px the toggle, socials and cross-link live in the top bar / menu.
 */
export function Header({ profile }: { profile: SiteProfile }) {
  const { cta, crossLink } = profile.header;
  const internal = cta.href.startsWith("#");
  const CtaIcon = internal ? ArrowRight : ArrowUpRight;
  return (
    <header className="flex items-center justify-between gap-4 py-5 lg:py-6">
      <Wordmark brand={profile.brand} />
      <div className="flex items-center gap-2">
        <a
          href={crossLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="qo-label group mr-2 hidden items-center gap-1 rounded-lg text-muted transition-colors hover:text-fg lg:inline-flex"
        >
          {crossLink.label}
          <ArrowUpRight aria-hidden="true" className="size-3.5 qo-nudge-ne" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <SocialLinks socials={profile.socials} className="hidden lg:flex" />
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <a
          href={cta.href}
          {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="qo-btn group inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-accent pr-3.5 pl-5 text-sm font-bold text-on-accent hover:bg-accent-hover sm:h-11 sm:pr-4 sm:pl-6 lg:ml-2"
        >
          {cta.label}
          <CtaIcon aria-hidden="true" className={`size-4 ${internal ? "qo-nudge" : "qo-nudge-ne"}`} />
          {!internal && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      </div>
    </header>
  );
}
