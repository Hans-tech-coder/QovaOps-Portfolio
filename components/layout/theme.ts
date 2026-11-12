// Theme constants shared by the no-flash head script and the toggle.
// Behavior (PLAN.md §5.1): first visit is always dark, regardless of the OS setting;
// the visitor's choice is stored in localStorage under "theme".

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#101010",
  light: "#F5F6F3",
};

/**
 * Runs inline in <head> before first paint. Kept tiny and dependency-free.
 * Sets data-theme on <html> and syncs <meta name="theme-color">.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)},c=${JSON.stringify(THEME_COLORS)},t=null;try{t=localStorage.getItem(k)}catch(e){}if(t!=="light"&&t!=="dark")t=${JSON.stringify(
  DEFAULT_THEME,
)};var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t;var s=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c[t])};s();document.addEventListener("DOMContentLoaded",s)}catch(e){}})();`;
