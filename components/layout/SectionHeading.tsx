type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  ghost: string;
  title: string;
  intro?: string;
};

/**
 * Section header (PLAN.md §3/§4): mono `// EYEBROW` in the accent text color
 * over a large outlined ghost word, then the H2 and a muted intro line.
 * The H2 is the focus target after nav clicks (tabIndex -1, data-section-focus).
 */
export function SectionHeading({ id, eyebrow, ghost, title, intro }: SectionHeadingProps) {
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
      <h2
        id={`${id}-title`}
        tabIndex={-1}
        data-section-focus
        className="mt-4 scroll-mt-24 text-3xl font-bold tracking-tight text-fg outline-offset-4 sm:text-4xl lg:text-[2.5rem]"
      >
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}
