"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";
import {
  DIST,
  DUR,
  gsap,
  MOTION_CONDITIONS,
  prefersReducedMotion,
  pinnedContainerOf,
  ScrollTrigger,
  useGSAP,
} from "@/components/motion/gsap";
import type { Project, WorkCategory } from "@/content/work";

export type WorkTab = { id: WorkCategory; label: string; projects: Project[] };

const STATUS_CLASS: Record<NonNullable<Project["status"]>, string> = {
  // A legend of three: solid lime, solid inverse, outline. Brand colors only, both themes.
  // Lime only as a fill behind black text; outline uses accent-text (lime on dark, black on light).
  "Own product": "border-transparent bg-accent text-on-accent",
  "Agency work": "border-transparent bg-fg text-bg",
  Personal: "border-accent-text text-accent-text",
};

/** Scroll-driven switching (pinned card): lg+ with motion allowed. */
const SCROLL_QUERY = `(min-width: 1024px) and ${MOTION_CONDITIONS.motionOK}`;
/** Scroll per project while the Work card is pinned, as a share of the viewport height. */
const STEP_VH = 0.15;
/**
 * Pinned card inset from the viewport edge: 24px, the gap between sections
 * (gap-6) and the sidebar card's sticky top (top-6), so the two cards line up.
 */
const PIN_GAP = 24;

/**
 * Tabs that use the name list + detail view with scroll switching (they have
 * screenshots). Every other tab keeps the plain project rows (WorkRows).
 */
const BROWSER_TABS: WorkCategory[] = ["websites"];

/** Shared between WorkTabs and the WorkBrowser it re-mounts on every tab switch. */
type PinShared = {
  /** The live pin trigger (null when not pinned / below lg / reduced motion). */
  trigger: RefObject<ScrollTrigger | null>;
  /** Set on a tab switch made while pinned: the new tab starts at its first project. */
  jumpToStart: RefObject<boolean>;
};

/**
 * Work tabs: transitions-dev 16-tabs-sliding (JS measures the active tab and
 * writes it onto the pill; CSS tweens it). WAI-ARIA tabs with arrow/Home/End keys.
 * Each tab's projects show as a name list + detail view at lg+ (WorkBrowser) and
 * as a compact list below lg (WorkList). The card is as tall as its content.
 */
export function WorkTabs({ tabs }: { tabs: WorkTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstPaint = useRef(true);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const jumpRef = useRef(false);

  const movePill = useCallback(
    (animate: boolean) => {
      const pill = pillRef.current;
      const tab = tabRefs.current[active];
      if (!pill || !tab) return;
      const apply = () => {
        pill.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill.style.width = `${tab.offsetWidth}px`;
      };
      if (animate) {
        apply();
        return;
      }
      const prev = pill.style.transition;
      pill.style.transition = "none";
      apply();
      void pill.offsetWidth;
      pill.style.transition = prev;
    },
    [active],
  );

  useLayoutEffect(() => {
    movePill(!firstPaint.current);
    firstPaint.current = false;
  }, [movePill]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    // Snap (no tween) on resize and when web fonts change the label widths.
    const ro = new ResizeObserver(() => movePill(false));
    ro.observe(bar);
    return () => ro.disconnect();
  }, [movePill]);

  // The panel height changes with the tab, which moves every later section:
  // keep the scrollspy triggers in sync.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    ScrollTrigger.refresh();
    // Switched away from the pinned view to a tab without one: the pin length is
    // gone, so bring the tabs back into view instead of landing further down.
    if (jumpRef.current) {
      jumpRef.current = false;
      const bar = barRef.current;
      if (bar) {
        window.scrollTo({
          top: bar.getBoundingClientRect().top + window.scrollY - PIN_GAP,
          behavior: "instant",
        });
      }
    }
  }, [active]);

  const select = (i: number, focus = false) => {
    if (i !== active) jumpRef.current = triggerRef.current?.isActive ?? false;
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  };

  const current = tabs[active];

  return (
    <div>
      <div data-reveal className="-mx-1 overflow-x-auto px-1 py-1">
        <div ref={barRef} role="tablist" aria-label="Work categories" className="qo-tabs">
          <span ref={pillRef} className="qo-tabs-pill" aria-hidden="true" />
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKeyDown}
              className="qo-tab qo-label"
            >
              {tab.label}
              <span className="ml-1.5 font-medium">{tab.projects.length}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        data-reveal
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="mt-6 rounded-card outline-offset-4"
      >
        {/* key: remount on tab change so the selection resets and the CSS fade-in replays */}
        <div key={current.id} className="qo-panel-in">
          {BROWSER_TABS.includes(current.id) ? (
            <>
              <div className="hidden lg:block">
                <WorkBrowser
                  projects={current.projects}
                  idBase={`${baseId}-${current.id}`}
                  pin={{ trigger: triggerRef, jumpToStart: jumpRef }}
                />
              </div>
              <WorkList projects={current.projects} />
            </>
          ) : (
            <WorkRows projects={current.projects} />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * lg+: project names on the left (fixed in place; only the highlight moves),
 * the selected project's screenshot and details on the right. Click (or focus +
 * Enter) a name to switch: the outgoing
 * project slides up and out, the next rises in (reversed when going back up the
 * list). Under reduced motion the swap is instant.
 *
 * Scrolling also steps through the projects: the page column (<main>) pins and
 * stays until the last project, snapping to each. The card keeps its content
 * height. A click holds until the scroll reaches the next project.
 */
function WorkBrowser({
  projects,
  idBase,
  pin,
}: {
  projects: Project[];
  idBase: string;
  pin: PinShared;
}) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const progressRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);

  const show = useCallback(
    (next: number) => {
      const prev = activeRef.current;
      if (next === prev) return;
      activeRef.current = next;
      setActive(next);

      const reduce = prefersReducedMotion();
      const panels = panelRefs.current;
      const out = panels[prev];
      const inn = panels[next];
      gsap.killTweensOf(panels);
      gsap.set(
        panels.filter((_, i) => i !== prev && i !== next),
        { autoAlpha: 0, y: 0 },
      );
      gsap.to(progressRef.current, { scaleX: (next + 1) / n, duration: reduce ? 0 : DUR.medium });
      if (reduce) {
        gsap.set(out, { autoAlpha: 0, y: 0 });
        gsap.set(inn, { autoAlpha: 1, y: 0 });
        return;
      }
      const dir = next > prev ? 1 : -1;
      const dist = DIST.medium * 2;
      gsap.to(out, { autoAlpha: 0, y: -dist * dir, duration: DUR.fast });
      gsap.fromTo(
        inn,
        { autoAlpha: 0, y: dist * dir },
        { autoAlpha: 1, y: 0, duration: DUR.medium, delay: DUR.micro },
      );
    },
    [n],
  );

  useGSAP(
    () => {
      if (n < 2) return;
      const mm = gsap.matchMedia();
      mm.add(SCROLL_QUERY, () => {
        const section = root.current?.closest("section");
        const tabs = section?.querySelector<HTMLElement>('[role="tablist"]');
        // The whole page column pins, not just the card: the screen freezes on a
        // real slice of the page (the section above stays in view), so a card
        // shorter than the screen never leaves empty background around it.
        const column = pinnedContainerOf(section);
        if (!section || !tabs || !column) return;

        /**
         * Pin offset from the viewport top. Card fits the screen: PIN_GAP from the
         * top, level with the sidebar card (the next section shows below it).
         * Card taller than the screen: bottom-aligned PIN_GAP above the viewport
         * bottom, its heading above the fold, but never past the tabs (they stay
         * at least PIN_GAP from the top).
         */
        const pinTop = () => {
          const tabsOffset = tabs.getBoundingClientRect().top - section.getBoundingClientRect().top;
          const bottomAligned = window.innerHeight - PIN_GAP - section.offsetHeight;
          return Math.max(Math.min(PIN_GAP, bottomAligned), PIN_GAP - tabsOffset);
        };

        // Only react when the scroll crosses into another project's band, so a
        // click choice isn't undone by small scrolls.
        let last = -1;
        const st = ScrollTrigger.create({
          trigger: section,
          pin: column,
          // Set explicitly: GSAP defaults it to false when the pin's parent is a flex box.
          pinSpacing: true,
          start: () => `top top+=${pinTop()}`,
          end: () => `+=${(n - 1) * window.innerHeight * STEP_VH}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // Created again on every tab switch: refresh before the triggers below it.
          refreshPriority: 1,
          snap: {
            snapTo: 1 / (n - 1),
            duration: { min: 0.15, max: 0.4 },
            delay: 0.06,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const i = Math.round(self.progress * (n - 1));
            if (i === last) return;
            last = i;
            show(i);
          },
        });
        pin.trigger.current = st;

        // Tab switched while pinned: start the new tab at its first project.
        if (pin.jumpToStart.current) {
          pin.jumpToStart.current = false;
          ScrollTrigger.refresh();
          window.scrollTo({ top: st.start, behavior: "instant" });
          last = 0;
          show(0);
        }

        return () => {
          if (pin.trigger.current === st) pin.trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    // `pin` holds stable refs (a new wrapper object each render), so it is not a dependency.
    { scope: root, dependencies: [n, show] },
  );

  return (
    <div
      ref={root}
      className="grid grid-cols-[minmax(0,15rem)_minmax(0,1fr)] gap-8 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] xl:gap-10"
    >
      <div className="flex min-w-0 flex-col">
        <div className="font-mono text-xs text-muted" aria-hidden="true">
          <span className="text-fg">{String(active + 1).padStart(2, "0")}</span> /{" "}
          {String(n).padStart(2, "0")}
        </div>
        <div className="relative mt-3 h-px bg-line" aria-hidden="true">
          <span
            ref={progressRef}
            className="absolute inset-0 origin-left bg-accent-text"
            style={{ transform: `scaleX(${1 / n})` }}
          />
        </div>

        <ul aria-label="Projects" className="mt-3">
          {projects.map((p, i) => (
            <li key={p.name}>
              <button
                type="button"
                aria-current={i === active ? "true" : undefined}
                aria-controls={`${idBase}-p${i}`}
                onClick={() => show(i)}
                className="qo-reel-item flex h-10 w-full min-w-0 items-center gap-2.5 text-left"
              >
                <span aria-hidden="true" className="qo-reel-dot size-1.5 shrink-0 rounded-full" />
                <span className="truncate">{p.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Every project is stacked in one grid cell, so the card keeps the tallest height. */}
      <div className="grid min-w-0">
        {projects.map((p, i) => (
          <div
            key={p.name}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            id={`${idBase}-p${i}`}
            role="group"
            aria-label={p.name}
            aria-hidden={i !== active}
            inert={i !== active}
            data-work-item
            className={`flex min-w-0 flex-col items-start gap-2 [grid-area:1/1] ${i === 0 ? "" : "invisible opacity-0"}`}
          >
            {p.image && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="qo-thumb mb-2 block w-full overflow-hidden rounded-card border border-line bg-line"
              >
                <Image
                  src={p.image}
                  alt=""
                  width={1200}
                  height={750}
                  sizes="(min-width: 1280px) 560px, 420px"
                  className="aspect-[16/10] h-auto w-full object-cover object-top"
                />
              </a>
            )}
            <ProjectHead project={p} />
            <p className="mt-1 text-base text-body">{p.summary}</p>
            <Points points={p.points} />
            <ProjectLink href={p.href} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Projects shown below lg before "Show all". */
const LIST_PREVIEW = 4;

/**
 * Below lg, the first few only until "Show all" (hidden rows stay in the HTML),
 * points behind a disclosure. Below md: one column, full-width 16:10 thumbnail
 * above the details. md to lg: compact rows with a 144px thumbnail beside them.
 */
function WorkList({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const extra = projects.length - LIST_PREVIEW;

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    // The list height changes: refresh the later triggers, and keep the button in view when collapsing.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (!next) toggleRef.current?.scrollIntoView({ block: "nearest" });
    });
  };

  return (
    <div className="lg:hidden">
      <ul id={listId} className="border-t border-dashed border-line">
        {projects.map((p, i) => (
          <li
            key={p.name}
            data-work-item
            hidden={!expanded && i >= LIST_PREVIEW}
            className="flex flex-col gap-4 border-b border-dashed border-line py-5 md:flex-row"
          >
            {p.image && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="qo-thumb block w-full shrink-0 self-start overflow-hidden rounded-lg border border-line bg-line md:w-36"
              >
                <Image
                  src={p.image}
                  alt=""
                  width={1200}
                  height={750}
                  sizes="(min-width: 768px) 144px, 100vw"
                  className="aspect-[16/10] h-auto w-full object-cover object-top"
                />
              </a>
            )}
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <ProjectHead project={p} />
              <p className="text-sm text-body">{p.summary}</p>
              {p.points.length > 0 && (
                <details className="qo-details group w-full">
                  <summary className="qo-label cursor-pointer list-none py-1 text-[0.6875rem] text-muted hover:text-fg">
                    <span className="group-open:hidden">+ Details</span>
                    <span className="hidden group-open:inline">− Hide details</span>
                  </summary>
                  <div className="pt-1">
                    <Points points={p.points} />
                  </div>
                </details>
              )}
              <ProjectLink href={p.href} />
            </div>
          </li>
        ))}
      </ul>
      {extra > 0 && (
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={toggle}
          className="qo-btn qo-label mt-5 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[0.6875rem] text-fg hover:bg-line"
        >
          {expanded ? "Show fewer" : `Show all ${projects.length} projects`}
        </button>
      )}
    </div>
  );
}

/** Plain project rows (the original Work layout): meta + link on the left, summary + points on the right. */
function WorkRows({ projects }: { projects: Project[] }) {
  return (
    <ul className="border-t border-dashed border-line">
      {projects.map((p) => (
        <li
          key={p.name}
          data-work-item
          className="grid gap-3 border-b border-dashed border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8"
        >
          <div className="flex flex-col items-start gap-2">
            <ProjectHead project={p} />
            <ProjectLink href={p.href} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base text-body">{p.summary}</p>
            <Points points={p.points} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function ProjectHead({ project: p }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-bold text-fg sm:text-xl">{p.name}</h3>
        {p.status && (
          <span
            className={`qo-label rounded-full border px-2.5 py-1 text-[0.6875rem] ${STATUS_CLASS[p.status]}`}
          >
            {p.status}
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-muted">
        {p.role}
        {p.stack && <span> · {p.stack}</span>}
      </p>
    </>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {points.map((pt) => (
        <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
          {pt}
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({ href }: { href?: string }) {
  // TODO(Hans): screenshots and links for projects without href (content/work.ts)
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="qo-btn group mt-1 inline-flex max-w-full items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg hover:bg-line"
    >
      <span className="truncate">{href.replace(/^https?:\/\//, "")}</span>
      <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 qo-nudge-ne" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
