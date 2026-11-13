"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Tooltip } from "./Tooltip";
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

function setTheme(theme: Theme) {
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
 * Switch theme. Uses a short View Transitions cross-fade where supported
 * (PLAN.md §5.1), and switches instantly under prefers-reduced-motion.
 */
export function applyTheme(theme: Theme) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (
    !reduce &&
    document.visibilityState === "visible" &&
    typeof document.startViewTransition === "function"
  ) {
    // The theme still switches if the browser skips the animation; only the
    // cross-fade is lost, so the rejections (e.g. tab hidden mid-switch) are ignored.
    const t = document.startViewTransition(() => setTheme(theme));
    const ignore = () => {};
    t.ready.catch(ignore);
    t.finished.catch(ignore);
    t.updateCallbackDone.catch(ignore);
  } else {
    setTheme(theme);
  }
}

/**
 * Square icon button. Sun/moon cross-fade with the transitions-dev icon swap
 * (09-icon-swap, CSS in globals.css). The visible icon is keyed on
 * html[data-theme], so the right one shows on first paint, before hydration.
 */
export function ThemeToggle({
  className = "",
  tooltipAlign = "center",
}: {
  className?: string;
  /** "end" when the toggle sits near the right edge (mobile top bar). */
  tooltipAlign?: "center" | "end";
}) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <Tooltip label={`Switch to ${next} theme`} align={tooltipAlign}>
      <button
        type="button"
        onClick={() => applyTheme(next)}
        aria-label={`Switch to ${next} theme`}
        className={`qo-btn inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-fg hover:border-accent-text ${className}`}
      >
        <span className="t-icon-swap qo-theme-swap" aria-hidden="true">
          {/* Dark theme shows the moon, light theme shows the sun */}
          <Moon className="t-icon size-[18px]" data-icon="moon" />
          <Sun className="t-icon size-[18px]" data-icon="sun" />
        </span>
      </button>
    </Tooltip>
  );
}
