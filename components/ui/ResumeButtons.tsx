"use client";

import { Download, Eye, X } from "lucide-react";
import Image from "next/image";
import { useId, useRef, type KeyboardEvent } from "react";
import { site } from "@/content/site";
// Page images rendered from the PDF by scripts/resume-pages.py (re-run it after replacing the PDF).
import page1 from "@/public/resume/page-1.webp";
import page2 from "@/public/resume/page-2.webp";

const RESUME_PAGES = [page1, page2];

const BTN =
  "qo-btn inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-fg hover:border-accent-text";

/**
 * "View resume" opens the resume in a branded modal on the page (no new tab);
 * "Download" saves the PDF (site.resume). Outlined, not lime, so the accent stays
 * ~10% of the page. Used in the sidebar (stacked) and the mobile menu (side by side).
 *
 * The modal shows the pages as images instead of an embedded PDF, because phones
 * (iOS Safari, Android Chrome) can't preview a PDF inside a page. It is a native
 * modal <dialog> (page inert, Esc closes, focus returns to the button) with the
 * same open/close motion as the menu sheet (.qo-sheet). Images load lazily, so
 * nothing is fetched until it is opened.
 */
export function ResumeButtons({ className = "" }: { className?: string }) {
  const { href, downloadName } = site.resume;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevOverflow = useRef("");
  const titleId = useId();

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Lock page scroll behind the modal; restore what was there (the menu sheet may have locked it too).
    prevOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  // Keep keys inside this modal: when opened from the mobile menu sheet, its
  // own Tab trap would otherwise handle them.
  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => e.stopPropagation();

  return (
    <div className={className}>
      <button type="button" onClick={open} aria-haspopup="dialog" className={BTN}>
        <Eye aria-hidden="true" className="size-4" />
        View resume
      </button>
      <a href={href} download={downloadName} className={BTN}>
        <Download aria-hidden="true" className="size-4" />
        Download
        <span className="sr-only"> resume (PDF)</span>
      </a>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          document.documentElement.style.overflow = prevOverflow.current;
        }}
        onKeyDown={onKeyDown}
        onClick={(e) => {
          // Click on the backdrop (outside the panel) closes.
          if (e.target === e.currentTarget) close();
        }}
        className="qo-sheet m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-3 text-fg sm:p-6"
      >
        <div className="mx-auto flex h-full max-w-3xl flex-col overflow-hidden rounded-card border border-line bg-surface">
          <div className="flex items-center gap-3 border-b border-dashed border-line px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="qo-label text-accent-text" aria-hidden="true">
                {"// Resume"}
              </p>
              <h2 id={titleId} className="mt-1 truncate text-base font-bold tracking-tight sm:text-lg">
                {site.owner}
                <span className="hidden text-muted sm:inline"> · General Virtual Assistant</span>
              </h2>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <a
                href={href}
                download={downloadName}
                className="qo-btn inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-bold text-on-accent hover:bg-accent-hover sm:px-5"
              >
                <Download aria-hidden="true" className="size-4" />
                <span className="hidden min-[360px]:inline">Download</span>
                <span className="sr-only"> resume (PDF)</span>
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="qo-btn inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg hover:border-accent-text"
              >
                <X aria-hidden="true" className="size-[18px]" />
                <span className="sr-only">Close resume</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain bg-bg p-3 sm:p-6">
            <div className="mx-auto flex max-w-[44rem] flex-col gap-3 sm:gap-5">
              {RESUME_PAGES.map((page, i) => (
                <Image
                  key={page.src}
                  src={page}
                  alt={`${site.owner} resume, page ${i + 1} of ${RESUME_PAGES.length}`}
                  placeholder="blur"
                  sizes="(min-width: 768px) 704px, 100vw"
                  className="h-auto w-full rounded-lg border border-line bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
