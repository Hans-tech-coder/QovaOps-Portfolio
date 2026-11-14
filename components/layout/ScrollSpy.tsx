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

/**
 * Smooth-scrolls to a section (ScrollToPlugin), then moves focus to its heading
 * so keyboard and screen-reader users land in the section. Instant under
 * prefers-reduced-motion.
 */
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  const focusTarget = section.querySelector<HTMLElement>("[data-section-focus]") ?? section;

  const done = () => {
    focusTarget.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  };

  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : 0.8,
    ease: "power3.inOut",
    scrollTo: { y: section, offsetY: topOffset(), autoKill: true },
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
        triggers.push({
          id,
          st: ScrollTrigger.create({
            trigger: el,
            pinnedContainer: pinnedContainerOf(el),
            start: "top 40%",
            end: "bottom 40%",
            onToggle: recompute,
          }),
        });
      }

      // Direct position check: a ScrollTrigger ending at "max" reports
      // isActive=false at progress 1, i.e. exactly when the page is at the bottom.
      const checkBottom = () => {
        const next = window.scrollY >= ScrollTrigger.maxScroll(window) - 4;
        if (next === atBottom) return;
        atBottom = next;
        recompute();
      };
      window.addEventListener("scroll", checkBottom, { passive: true });
      window.addEventListener("resize", checkBottom);
      ScrollTrigger.addEventListener("refresh", checkBottom);

      checkBottom();
      recompute();
      return () => {
        triggers.forEach((t) => t.st.kill());
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
