import type { ReactNode } from "react";

/** Dashed chip for tools/tags (PLAN.md §4: dashed borders on chips and pills). */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed border-line px-3 py-1.5 font-mono text-xs text-body ${className}`}
    >
      {children}
    </span>
  );
}
