"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap";
import type { Testimonial } from "@/content/va/testimonials";
import { Tooltip } from "@/components/ui/Tooltip";

/**
 * Two-up testimonial carousel (one-up below 768px). Native scroll-snap track,
 * arrow buttons scroll by one card. Only real quotes are ever passed in.
 */
export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const arrowClass =
    "qo-btn group inline-flex size-11 items-center justify-center rounded-full border border-line text-fg hover:bg-line disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div>
      <ul
        ref={track}
        aria-label="Testimonials"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] motion-reduce:scroll-auto"
      >
        {items.map((t) => (
          <li
            key={`${t.name}-${t.role}`}
            className="flex w-full shrink-0 snap-start flex-col gap-5 rounded-card border border-dashed border-line p-6 md:w-[calc(50%-0.5rem)]"
          >
            <Quote aria-hidden="true" className="size-6 text-accent-text" />
            <blockquote className="text-base leading-relaxed text-body">{t.quote}</blockquote>
            <div className="mt-auto">
              <p className="font-bold text-fg">
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {t.name}
                    <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
                  </a>
                ) : (
                  t.name
                )}
              </p>
              <p className="font-mono text-xs text-muted">{t.role}</p>
            </div>
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-5 flex justify-end gap-2">
          <Tooltip label="Previous" side="top">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous testimonial"
              className={arrowClass}
            >
              <ArrowLeft aria-hidden="true" className="qo-nudge-back size-4" />
            </button>
          </Tooltip>
          <Tooltip label="Next" side="top" align="end">
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next testimonial"
              className={arrowClass}
            >
              <ArrowRight aria-hidden="true" className="qo-nudge size-4" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
