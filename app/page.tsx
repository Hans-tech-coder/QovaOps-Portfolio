import { Reveal } from "@/components/motion/Reveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@/content/site";

// Phase 1 placeholder: shows the brand tokens working in both themes.
// Real layout and sections come in Phase 2–3 (PLAN.md §8).

const swatches = [
  { name: "bg", className: "bg-bg" },
  { name: "surface", className: "bg-surface" },
  { name: "line", className: "bg-line" },
  { name: "grid", className: "bg-grid" },
  { name: "fg", className: "bg-fg" },
  { name: "body", className: "bg-body" },
  { name: "muted", className: "bg-muted" },
  { name: "accent-text", className: "bg-accent-text" },
  { name: "accent", className: "bg-accent" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-8 sm:py-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="text-fg">Qova</span>
            <span className="text-outline">Ops</span>
          </p>
          <p className="mt-1 text-right text-lg font-medium text-endorse">{site.endorsement}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={site.contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {site.cta.secondary}
          </a>
          <ThemeToggle />
        </div>
      </header>

      <Reveal className="flex flex-col gap-8">
        <section
          data-reveal
          className="rounded-card border border-line bg-surface p-6 sm:p-10"
          aria-labelledby="hero-title"
        >
          <p className="qo-label text-accent-text">{"// Phase 1 · Token preview"}</p>
          <h1 id="hero-title" className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">
            <span className="block text-fg">{site.tagline.line1}</span>
            <span className="block text-accent-text">{site.tagline.line2}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-body">{site.heroSub}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2">
            <span className="size-2 rounded-full bg-accent-text" aria-hidden="true" />
            <span className="qo-label text-fg">{site.traits.join(" | ")}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-bold text-on-accent transition-colors hover:bg-accent-hover"
            >
              {site.cta.primary}
            </a>
            <a
              href={site.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-dashed border-line px-6 font-bold text-fg transition-colors hover:border-accent-text"
            >
              {site.cta.secondary}
            </a>
          </div>
        </section>

        <section data-reveal className="rounded-card border border-line bg-surface p-6 sm:p-10">
          <div className="relative">
            <span
              aria-hidden="true"
              className="text-outline-ghost pointer-events-none absolute -top-4 left-0 select-none text-6xl font-bold uppercase sm:text-8xl"
            >
              Tokens
            </span>
            <p className="qo-label relative text-accent-text">{"// Semantic tokens"}</p>
            <h2 className="relative mt-10 text-3xl font-bold sm:text-4xl">Both themes, one set of names</h2>
          </div>
          <div className="qo-divider mt-6" />
          <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {swatches.map((s) => (
              <li key={s.name} className="flex flex-col gap-2">
                <span className={`h-14 rounded-lg border border-line ${s.className}`} />
                <span className="font-mono text-xs text-muted">{s.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal className="grid gap-4 sm:grid-cols-3">
          {["Executive & Admin Support", "Operations & CRM Management", "AI-Augmented Workflows"].map(
            (title, i) => (
              <article
                key={title}
                className="relative overflow-hidden rounded-card border border-line bg-surface p-6 pl-8"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden="true" />
                <span className="inline-flex rounded-md bg-badge px-2 py-1 font-mono text-xs font-bold text-lime">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-bold text-fg">{title}</h3>
              </article>
            ),
          )}
        </section>
      </Reveal>

      <footer className="mt-auto pt-8 text-center">
        <p className="qo-label text-muted">
          QovaOps by triqova | {site.secondaryLine}
        </p>
      </footer>
    </main>
  );
}
