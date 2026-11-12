"use client";

import { ArrowUpRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ScrollTrigger } from "@/components/motion/gsap";
import type { Project, WorkCategory } from "@/content/work";

export type WorkTab = { id: WorkCategory; label: string; projects: Project[] };

const STATUS_CLASS: Record<NonNullable<Project["status"]>, string> = {
  // Lime only as a fill behind black text (valid in both themes)
  Live: "border-transparent bg-accent text-on-accent",
  "Agency work": "border-line text-body",
  Personal: "border-line text-body",
};

/**
 * Work tabs: transitions-dev 16-tabs-sliding (JS measures the active tab and
 * writes it onto the pill; CSS tweens it). WAI-ARIA tabs with arrow/Home/End keys.
 */
export function WorkTabs({ tabs }: { tabs: WorkTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstPaint = useRef(true);

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
  }, [active]);

  const select = (i: number, focus = false) => {
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
      <div className="-mx-1 overflow-x-auto px-1 py-1">
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
              <span className="ml-1.5 opacity-60">{tab.projects.length}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="mt-6 rounded-card outline-offset-4"
      >
        {/* key: remount on tab change so the CSS fade-in replays */}
        <ul key={current.id} className="qo-panel-in border-t border-dashed border-line">
          {current.projects.map((p) => (
            <li
              key={p.name}
              className="grid gap-3 border-b border-dashed border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8"
            >
              <div className="flex flex-col items-start gap-2">
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
                <p className="font-mono text-xs text-muted">{p.role}</p>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg transition-colors duration-150 hover:bg-line"
                  >
                    {p.href.replace(/^https?:\/\//, "")}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-250 ease-(--ease-smooth-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {/* TODO(Hans): screenshots and links for projects without href (content/work.ts) */}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base text-body">{p.summary}</p>
                <ul className="flex flex-col gap-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
