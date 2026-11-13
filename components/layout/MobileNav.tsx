"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SocialLinks } from "@/components/ui/SocialIcons";
import { site } from "@/content/site";
import { useScrollSpy } from "./ScrollSpy";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Top bar + menu sheet for <1024px. The sheet is a native modal <dialog>:
 * the rest of the page is inert while it is open, Esc closes it, focus is
 * trapped inside (Tab cycles) and returns to the menu button on close.
 */
export function MobileNav() {
  const { items, activeId, goTo } = useScrollSpy();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const activeLabel = items.find((i) => i.id === activeId)?.label;

  // The page header already shows the big wordmark, so the small top-bar mark
  // only fades in once the header wordmark has scrolled out of view (no double logo).
  const [showMark, setShowMark] = useState(false);
  useEffect(() => {
    const big = document.querySelector("[data-hero-wordmark]");
    // The header wordmark is always rendered; nothing to observe means nothing to hide.
    if (!big) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowMark(!entry.isIntersecting),
      // Count the area under the sticky bar as "out of view".
      { rootMargin: "-64px 0px 0px 0px" },
    );
    io.observe(big);
    return () => io.disconnect();
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    // Lock page scroll behind the sheet (released in onClose).
    document.documentElement.style.overflow = "hidden";
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  // Keep Tab / Shift+Tab inside the sheet.
  const trapFocus = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const nodes = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <div
        data-topbar
        className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm lg:hidden"
      >
        <div className="mx-auto flex h-(--qo-topbar-h) max-w-7xl items-center gap-3 px-4 sm:px-6">
          <a
            href="#top"
            inert={!showMark}
            data-shown={showMark}
            className="qo-topbar-mark text-xl font-bold tracking-tight"
            aria-label={`${site.name} ${site.endorsement}, back to top`}
          >
            <span className="text-fg">Qova</span>
            <span className="text-outline [-webkit-text-stroke-width:1px]">Ops</span>
          </a>
          {activeLabel && (
            <span className="qo-label hidden truncate text-muted min-[420px]:block" aria-hidden="true">
              {`// ${activeLabel}`}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="qo-btn inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-fg hover:border-accent-text"
            >
              <Menu aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu"
        onClose={() => {
          document.documentElement.style.overflow = "";
          setOpen(false);
        }}
        onKeyDown={trapFocus}
        onClick={(e) => {
          // Click on the backdrop (outside the panel) closes.
          if (e.target === e.currentTarget) closeMenu();
        }}
        className="qo-sheet m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-3 text-fg sm:p-4 lg:hidden"
      >
        <div className="rounded-card border border-line bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="qo-label text-muted" aria-hidden="true">
              {"// Menu"}
            </p>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              autoFocus
              className="qo-btn inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg hover:border-accent-text"
            >
              <X aria-hidden="true" className="size-[18px]" />
            </button>
          </div>

          <nav aria-label="Sections" className="mt-4">
            <ul className="flex flex-col">
              {items.map(({ id, label }) => {
                const active = id === activeId;
                return (
                  <li key={id} className="border-b border-dashed border-line last:border-b-0">
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMenu();
                        goTo(id);
                      }}
                      aria-current={active ? "location" : undefined}
                      className={`qo-label flex items-center gap-3 py-4 text-sm ${
                        active ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      <span className="flex size-5 items-center justify-center" aria-hidden="true">
                        <span
                          className={
                            active
                              ? "flex size-5 items-center justify-center rounded-full border border-dashed border-accent-text"
                              : "size-1 rounded-full bg-muted"
                          }
                        >
                          {active && <span className="size-2 rounded-full bg-accent-text" />}
                        </span>
                      </span>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <a
              href={site.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qo-btn inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-bold text-on-accent hover:bg-accent-hover"
            >
              {site.cta.secondary}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <SocialLinks className="-mr-2" />
          </div>
        </div>
      </dialog>
    </>
  );
}
