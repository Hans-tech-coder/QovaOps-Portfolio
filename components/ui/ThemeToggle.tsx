"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_COLORS,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/components/layout/theme";

// The <html data-theme> attribute (set by the head script) is the source of truth.
function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode): the theme still switches for this visit.
  }
}

/**
 * Minimal accessible toggle. Final styling and the sun/moon icon-swap transition
 * come in Phase 2 (PLAN.md §5.1). The icons are swapped with CSS on [data-theme],
 * so the right icon shows on first paint without waiting for hydration.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-fg transition-colors hover:border-accent-text ${className}`}
    >
      {/* Dark theme shows the moon, light theme shows the sun */}
      <Moon aria-hidden="true" className="size-[18px] in-data-[theme=light]:hidden" />
      <Sun aria-hidden="true" className="hidden size-[18px] in-data-[theme=light]:block" />
    </button>
  );
}
