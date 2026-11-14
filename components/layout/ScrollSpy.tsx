"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  gsap,
  pinnedContainerOf,
  prefersReducedMotion,
  ScrollTrigger,
  useGSAP,
} from "@/components/motion/gsap";
import type { NavItem } from "@/content/profile";

type ScrollSpyValue = {
  items: NavItem[];
  activeId: string;
  goTo: (id: string) => void;
};

const ScrollSpyContext = createContext<ScrollSpyValue | null>(null);

export function useScrollSpy() {
  const ctx = useContext(ScrollSpyContext);
  if (!ctx) throw new Error("useScrollSpy must be used inside <ScrollSpyProvider>");
  return ctx;
}

/** Offset for the sticky top bar (<1024px), read from the rendered bar. */
function topOffset() {
  const bar = document.querySelector<HTMLElement>("[data-topbar]");
  const barH = bar && bar.offsetParent !== null ? bar.offsetHeight : 0;
  return barH + (barH ? 16 : 24);
}

/** Scrollspy line: a section is active while its top is above 40% of the viewport. */
const SPY_LINE = 0.4;

/** The scrollspy trigger per section id (set by ScrollSpyProvider). */
const spyTriggers = new Map<string, ScrollTrigger>();

/**
 * Scroll position that puts a section's top just under the top bar. Read from the
 * section's scrollspy trigger, which (through `pinnedContainer`) includes the Work
 * pin's extra scroll; the element's own offset doesn't, so links to sections below
 * Work would land inside the pin, one section short.
 */
function sectionY(st: ScrollTrigger) {
  const y = st.start + window.innerHeight * SPY_LINE - topOffset();
  return gsap.utils.clamp(0, ScrollTrigger.maxScroll(window), y);
}

/**
 * Smooth-scrolls to a section (ScrollToPlugin), then moves focus to its heading
 * so keyboard and screen-reader users land in the section. Instant under
 * prefers-reduced-motion.
 */
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  const focusTarget = section.querySelector<HTMLElement>("[data-section-focus]") ?? section;
  const spy = spyTriggers.get(id);

  const done = () => {
    focusTarget.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  };

  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : 0.8,
    ease: "power3.inOut",
    scrollTo: spy
      ? { y: sectionY(spy), autoKill: true }
      : { y: section, offsetY: topOffset(), autoKill: true },
    overwrite: true,
    onComplete: done,
    onInterrupt: done,
  });
}

/**
 * Scrollspy: one ScrollTrigger per section. A section is active while it
 * crosses the line 40% down the viewport. At the very bottom of the page the
 * last section wins, so a short final section can still become active.
 */
export function ScrollSpyProvider({ items, children }: { items: NavItem[]; children: ReactNode }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useGSAP(
    () => {
      const triggers: { id: string; st: ScrollTrigger }[] = [];
      let atBottom = false;

      const recompute = () => {
        if (atBottom && items.length) return setActiveId(items[items.length - 1].id);
        const active = triggers.filter((t) => t.st.isActive).at(-1);
        if (active) return setActiveId(active.id);
        // Above the first section: first item. Below everything: keep last.
        const first = triggers[0];
        if (first && window.scrollY < first.st.start) setActiveId(first.id);
      };

      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        const st = ScrollTrigger.create({
          trigger: el,
          pinnedContainer: pinnedContainerOf(el),
          start: `top ${SPY_LINE * 100}%`,
          end: `bottom ${SPY_LINE * 100}%`,
          onToggle: recompute,
        });
        triggers.push({ id, st });
        spyTriggers.set(id, st);
      }

      // Direct position check: a ScrollTrigger ending at "max" reports
      // isActive=false at progress 1, i.e. exactly when the page is at the bottom.
      const checkBottom = () => {
        const next = window.scrollY >= ScrollTrigger.maxScroll(window) - 4;
        if (next === atBottom) return;
        atBottom = next;
        recompute();
      };
      // Plain in-page links to a section (header CTA, hero buttons) take the same path
      // as the nav: a native #hash jump uses the element's own offset and would land
      // inside the Work pin for sections below it.
      const onLinkClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
        const id = link?.getAttribute("href")?.slice(1);
        if (!id || !spyTriggers.has(id)) return;
        e.preventDefault();
        scrollToSection(id);
      };
      document.addEventListener("click", onLinkClick);

      window.addEventListener("scroll", checkBottom, { passive: true });
      window.addEventListener("resize", checkBottom);
      ScrollTrigger.addEventListener("refresh", checkBottom);

      checkBottom();
      recompute();
      return () => {
        triggers.forEach((t) => {
          t.st.kill();
          if (spyTriggers.get(t.id) === t.st) spyTriggers.delete(t.id);
        });
        document.removeEventListener("click", onLinkClick);
        window.removeEventListener("scroll", checkBottom);
        window.removeEventListener("resize", checkBottom);
        ScrollTrigger.removeEventListener("refresh", checkBottom);
      };
    },
    { dependencies: [items] },
  );

  return (
    <ScrollSpyContext.Provider value={{ items, activeId, goTo: scrollToSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
}
