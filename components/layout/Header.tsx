import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";

/**
 * Page header: wordmark left; socials, theme toggle and the lime "Book a call"
 * pill right. Below 1024px the toggle and socials live in the top bar / menu.
 */
export function Header() {
  return (
    <header className="flex flex-col gap-6 pt-8 pb-8 sm:flex-row sm:items-end sm:justify-between lg:pt-12 lg:pb-10">
      <Wordmark />
      <div className="flex items-center gap-2">
        <SocialLinks className="hidden lg:flex" />
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <a
          href={site.contact.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent pr-4 pl-6 text-sm font-bold text-on-accent transition-colors duration-150 hover:bg-accent-hover lg:ml-2"
        >
          {site.cta.secondary}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-250 ease-(--ease-smooth-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </header>
  );
}
