import type { ReactNode } from "react";

type Side = "top" | "bottom" | "left";
type Align = "center" | "start" | "end";

/**
 * Tooltip pill (the "Back to top" style) for icon-only controls. Wraps one
 * trigger; shows on hover (devices that can hover) and on keyboard focus.
 * Purely visual: the trigger keeps its own aria-label, so the pill is
 * aria-hidden and screen readers don't hear it twice. Don't also set `title`.
 * CSS: `.qo-tt*` in globals.css (transitions-dev 17 timings).
 *
 * `align` matters for top/bottom: use "end" for triggers near the right edge
 * so the pill grows leftward and never overflows the page.
 */
export function Tooltip({
  label,
  side = "bottom",
  align = "center",
  className = "",
  children,
}: {
  label: string;
  side?: Side;
  align?: Align;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`qo-tt-wrap ${className}`}>
      {children}
      <span aria-hidden="true" className="qo-tt text-sm font-medium" data-side={side} data-align={align}>
        {label}
      </span>
    </span>
  );
}
