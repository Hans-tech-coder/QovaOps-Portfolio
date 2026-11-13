"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { ResumeButtons } from "@/components/ui/ResumeButtons";
import { site } from "@/content/site";
import { useScrollSpy } from "./ScrollSpy";

/**
 * Sticky sidebar nav (≥1024px). Inactive items show a small dot; the active
 * item gets a dashed accent ring that glides between items (PLAN.md §4).
 */
export function Sidebar() {
  const { items, activeId, goTo } = useScrollSpy();
  const listRef = useRef<HTMLUListElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useGSAP(
    () => {
      const place = (animate: boolean) => {
        const list = listRef.current;
        const ring = ringRef.current;
        const marker = list?.querySelector<HTMLElement>(
          `[data-nav-id="${activeId}"] [data-marker]`,
        );
        // Hidden below 1024px: nothing to measure yet.
        if (!list || !ring || !marker || marker.offsetHeight === 0) return;

        // Marker center relative to the list (the ring's offset parent)
        const y = marker.offsetTop + marker.offsetHeight / 2 - ring.offsetHeight / 2;
        const x = marker.offsetLeft + marker.offsetWidth / 2 - ring.offsetWidth / 2;

        if (!animate || prefersReducedMotion() || !placed.current) {
          gsap.set(ring, { x, y, autoAlpha: 1 });
        } else {
          gsap.to(ring, { x, y, autoAlpha: 1, duration: 0.45, ease: "power3.inOut", overwrite: true });
        }
        placed.current = true;
      };

      place(true);
      const onResize = () => place(false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { dependencies: [activeId], scope: listRef },
  );

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 rounded-card border border-line bg-surface p-6">
        <p className="qo-label text-muted" aria-hidden="true">
          {"// Menu"}
        </p>
        <nav aria-label="Sections" className="mt-5">
          <ul ref={listRef} className="relative flex flex-col gap-1">
            <span
              ref={ringRef}
              aria-hidden="true"
              className="pointer-events-none invisible absolute left-0 top-0 size-5"
            >
              {/* GSAP moves the outer span (x/y); the dashes spin on this inner one (.qo-spin) */}
              <span className="qo-spin block size-full rounded-full border border-dashed border-accent-text" />
            </span>
            {items.map(({ id, label }) => {
              const active = id === activeId;
              return (
                <li key={id} data-nav-id={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(id);
                    }}
                    aria-current={active ? "location" : undefined}
                    className={`qo-btn qo-label group flex items-center gap-3 rounded-lg py-2 pr-2 ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span data-marker className="flex size-5 shrink-0 items-center justify-center">
                      <span
                        className={`size-2 rounded-full transition-[transform,background-color] duration-(--duration-fast) ease-(--ease-smooth-out) ${
                          active
                            ? "bg-accent-text"
                            : "scale-50 bg-muted group-hover:bg-fg"
                        }`}
                      />
                    </span>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-6 border-t border-dashed border-line pt-5">
          <p className="qo-label text-muted">{"// Email"}</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-2 block break-all text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            {site.contact.email}
          </a>
        </div>

        <div className="mt-6 border-t border-dashed border-line pt-5">
          <p className="qo-label text-muted">{"// Resume"}</p>
          <ResumeButtons className="mt-3 flex flex-col gap-2" />
        </div>
      </div>
    </aside>
  );
}
