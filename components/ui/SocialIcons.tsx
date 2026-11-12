import type { SVGProps } from "react";
import { site } from "@/content/site";

// Lucide v1 dropped brand icons, so these are the monoline brand glyphs from
// Lucide's last release that shipped them (ISC license), same 24px / 2px stroke.

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const FacebookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Base>
);

const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Base>
);

const YoutubeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Base>
);

const LinkedinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Base>
);

const ICONS: Record<(typeof site.socials)[number]["label"], (p: IconProps) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  LinkedIn: LinkedinIcon,
};

/** Row of social icon links (BRAND_GUIDE §2). */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {site.socials.map(({ label, handle, href }) => {
        const Icon = ICONS[label];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} ${handle} (opens in a new tab)`}
              title={`${label} ${handle}`}
              className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-line hover:text-fg"
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
