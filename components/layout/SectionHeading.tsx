import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  ghost: string;
  title: ReactNode;
  intro?: string;
  /** The About/hero card renders the page H1; every other card an H2. */
  as?: "h1" | "h2";
  titleClassName?: string;
};

const DEFAULT_TITLE = "text-3xl sm:text-4xl lg:text-[2.5rem]";

/**
 * Section header (PLAN.md §3/§4): mono `// EYEBROW` in the accent text color
 * over a large outlined ghost word, then the heading and a muted intro line.
 * The heading is the focus target after nav clicks (tabIndex -1, data-section-focus).
 */
export function SectionHeading({
  id,
  eyebrow,
  ghost,
  title,
  intro,
  as: Heading = "h2",
  titleClassName = DEFAULT_TITLE,
}: SectionHeadingProps) {
  return (
    <div>
      <div className="relative">
        <span
          aria-hidden="true"
          className="text-outline-ghost pointer-events-none block truncate text-6xl leading-none font-bold tracking-tight uppercase select-none sm:text-7xl lg:text-8xl"
        >
          {ghost}
        </span>
        <p className="qo-label absolute bottom-[0.6em] left-1 text-accent-text sm:text-[0.8125rem]">
          {`// ${eyebrow}`}
        </p>
      </div>
      <Heading
        id={`${id}-title`}
        tabIndex={-1}
        data-section-focus
        className={`mt-4 scroll-mt-24 font-bold tracking-tight text-fg outline-offset-4 ${titleClassName}`}
      >
        {title}
      </Heading>
      {intro && <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}
