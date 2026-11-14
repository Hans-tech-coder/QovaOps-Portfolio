// Theme constants shared by the no-flash head script and the toggle.
// Behavior (PLAN.md §5.1): first visit is always dark, regardless of the OS setting;
// the visitor's choice is stored in localStorage under "theme".

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

/** sessionStorage key: the intro loader already played in this tab (once per visit). */
export const INTRO_SEEN_KEY = "qo-intro-seen";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#101010",
  light: "#F5F6F3",
};

/**
 * Runs inline in <head> before first paint. Kept tiny and dependency-free.
 * Sets data-theme on <html>, syncs <meta name="theme-color">, and adds the
 * `qo-js` class so CSS can pre-hide elements that GSAP reveals on load
 * (no visible→hidden flash). Without JS nothing is hidden. Failsafe: if the
 * motion code (components/motion/gsap.ts sets window.__qoMotion) has not loaded
 * after 4s, `qo-js` is removed again so pre-hidden content shows anyway.
 * Intro loader once per visit: if sessionStorage says it already played, adds
 * `qo-intro-skip qo-intro-done` so the loader never paints and scroll isn't locked.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)},c=${JSON.stringify(THEME_COLORS)},t=null;try{t=localStorage.getItem(k)}catch(e){}if(t!=="light"&&t!=="dark")t=${JSON.stringify(
  DEFAULT_THEME,
)};var d=document.documentElement;d.classList.add("qo-js");try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)}))d.classList.add("qo-intro-skip","qo-intro-done")}catch(e){}d.setAttribute("data-theme",t);d.style.colorScheme=t;var s=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c[t])};s();document.addEventListener("DOMContentLoaded",s);setTimeout(function(){if(!window.__qoMotion)d.classList.remove("qo-js")},4000)}catch(e){}})();`;
