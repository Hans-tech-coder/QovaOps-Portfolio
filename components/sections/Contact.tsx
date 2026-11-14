import { ArrowUpRight, CalendarClock, Mail } from "lucide-react";
import { SectionCard } from "@/components/layout/SectionCard";
import { Reveal } from "@/components/motion/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcons";
import type { SectionProps } from "@/content/profile";

const pillClass =
  "group inline-flex h-11 items-center gap-2.5 rounded-full border border-dashed border-line px-4 text-sm text-fg qo-btn hover:border-solid hover:bg-line";

/**
 * Contact: lime CTA band with the profile's primary CTA ("Delegate Your Operations" on the VA site,
 * "Let's build something" on the dev site) + pill links, then the optional cross-sell card.
 * Location stays out until Hans decides (PLAN.md §9).
 */
export function Contact({ section, profile }: SectionProps) {
  const { email, bookingUrl, primaryCta, bookingCta, bandLine } = profile.contact;
  const { crossSell } = profile;
  return (
    <SectionCard section={section}>
      <Reveal className="flex flex-col gap-8">
        {/* Lime band: fixed brand colors, same in both themes (black on lime) */}
        <div
          data-reveal
          className="flex flex-col gap-6 rounded-card bg-lime p-6 text-brand-black sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10"
        >
          <div>
            <p className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
              {primaryCta}
            </p>
            <p className="mt-2 text-base font-medium text-brand-black/75">
              {bandLine ?? profile.brand.secondaryLine}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qo-btn group inline-flex h-12 items-center gap-2 rounded-full bg-brand-black pr-5 pl-6 text-sm font-bold text-brand-white hover:bg-[#262626] focus-visible:outline-brand-black"
            >
              {bookingCta}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-lime qo-nudge-ne"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="qo-btn inline-flex h-12 items-center rounded-full border-2 border-brand-black px-6 text-sm font-bold hover:bg-brand-black/10 focus-visible:outline-brand-black"
            >
              Email me
            </a>
          </div>
        </div>

        <ul data-reveal aria-label="Contact links" className="flex flex-wrap gap-3">
          <li>
            <a href={`mailto:${email}`} className={pillClass}>
              <Mail aria-hidden="true" className="size-4 text-accent-text" />
              {email}
            </a>
          </li>
          <li>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={pillClass}>
              <CalendarClock aria-hidden="true" className="size-4 text-accent-text" />
              {bookingCta}
              <span className="font-mono text-xs text-muted">{bookingUrl.replace(/^https?:\/\//, "")}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          {profile.socials.map(({ label, handle, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={pillClass}>
                <SocialIcon label={label} className="size-4 text-accent-text" />
                <span className="sr-only">{label}</span>
                {handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Dev site: small card pointing to the VA service (QovaOps). */}
        {crossSell && (
          <div
            data-reveal
            className="flex flex-col gap-3 rounded-card border border-dashed border-line p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="qo-label text-muted">{`// ${crossSell.eyebrow}`}</p>
              <p className="mt-2 text-base text-body">{crossSell.text}</p>
            </div>
            <a
              href={crossSell.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="qo-btn group inline-flex h-10 shrink-0 items-center gap-1.5 self-start rounded-full border border-line px-4 font-mono text-xs text-fg hover:bg-line sm:self-auto"
            >
              {crossSell.link.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5 qo-nudge-ne" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        )}
      </Reveal>
    </SectionCard>
  );
}
