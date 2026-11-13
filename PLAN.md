# Portfolio Build Plan — QovaOps by triqova

Living plan for the portfolio site. **Update the status boxes as work lands**, and add a line to the Session log at the bottom. A new session should read, in order: [CLAUDE.md](CLAUDE.md) → [brand/BRAND_GUIDE.md](brand/BRAND_GUIDE.md) → this file.

Status legend: `[x]` done · `[~]` in progress · `[ ]` to do · `[!]` on hold (waiting on Hans or a decision)

---

## 1. Goal

A one-page portfolio for **Hans Obena / QovaOps**, framed as a *general virtual assistant with advanced technical skills*. The layout follows the reference site's structure, restyled to the QovaOps brand (dark-first, lime accent). Every section ends in a path to the CTA: email `qovaops@gmail.com` or book a call `https://bit.ly/3WlL3yg`.

## 2. Decisions

| Topic | Decision | Date |
|---|---|---|
| Reference design | https://www.sohammondal.com/ — structure and patterns only, never its code, copy or images | 2026-11-12 |
| Domain | **qovaops.triqova.com** (subdomain; DNS at GoDaddy, Hans has access) | 2026-11-12 |
| Hosting | Vercel, from a GitHub repo, static output | 2026-11-12 |
| Framework | Next.js (App Router) + TypeScript, latest stable from `create-next-app` | 2026-11-12 |
| Styling | Tailwind CSS v4, brand tokens in `@theme` (from `brand/brand-tokens.css`) | 2026-11-12 |
| Motion | GSAP + ScrollTrigger + `@gsap/react` for scroll/sequenced motion; transitions-dev CSS for small UI states | 2026-11-12 |
| Content | Typed data files in `content/` (one place to edit text); MDX later only if case studies need it | 2026-11-12 |
| Icons | Lucide (monoline) | 2026-11-12 |
| Contact | `mailto:` + booking link, no form or backend in v1 | 2026-11-12 |
| Analytics | Vercel Web Analytics + Speed Insights (cookieless, so **no cookie banner**) | 2026-11-12 |
| Theme | **Dark (default) + light theme toggle**, like the reference. First visit is always dark, not the device setting (confirmed by Hans); the visitor's choice is saved and restored. See §5.1 | 2026-11-12 |
| Plan vs build | Plan first (this file), build after Hans approves | 2026-11-12 |

Project skills installed in `.claude/skills/`: gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-react, gsap-plugins, gsap-utils, gsap-performance, ui-ux-pro-max, ui-styling, design-system, transitions-dev, transitions-polish. Taste-skill was reviewed and deliberately **not** installed: its rules conflict with the sidebar + cards layout.

## 3. Reference anatomy (captured 2026-11-12 with REA, desktop 1440px, light mode)

What the reference does, so later sessions don't need to re-capture it:

- **Header:** huge name in two styles: first word solid, second word outlined. Social icons top right, theme toggle in a black square.
- **Background:** pale page with thin vertical grid lines behind the content.
- **Sidebar:** sticky black panel on the left with uppercase mono nav items. Scrollspy marks the active item with a dashed circle; inactive items show a small dot.
- **Content:** one white rounded card per section, stacked in the right column.
- **Section header:** small mono eyebrow `// ABOUT ME` overlapping a large outlined "ghost" word (ABOUT ME), then a big heading, then a gray one-line intro.
- **About card:** round photo with a "Hi there!_" typewriter tag, status pill ("Available for consulting", green dot), dashed tech chips, a short bio, and three count-up stats (big outlined digits + small mono labels).
- **Portfolio:** tabs (Current Work / Open Source / Hobby); project rows with name, colored status badges, subtitle, description, small icon links.
- **GitHub stats:** four dashed cards with icon + live number.
- **Strengths:** numbered rows 01–05 (outlined numbers), small icon + mono title, description on the right, dashed dividers.
- **Testimonials:** two-up carousel with arrow buttons, stars, quote with "Read more", avatar, name + LinkedIn icon, role.
- **Resume:** two timeline columns (education / experience) with dashed year pills.
- **Employers:** grayscale logo row. **Writing & Talks:** blog cards. **Contact:** "Let's Connect", pill links (email, location, socials), embedded map. **Footer:** one small centered line.
- **Tech:** Next.js, Poppins + Open Sans + Roboto Mono, a typewriter script, cookie consent dialog.
- **Light/dark theme** (captured 2026-11-12, REA evidence `ev_c31d93f3…`):
  - Toggle is the black square button top right; its icon swaps sun (light) ↔ moon (dark).
  - The whole palette switches: page bg goes pure black, cards and sidebar become one dark gray (~`#1E1F22`), text goes white, ghost words and dashed borders go dark gray. The layout, grid lines and motion stay the same.
  - Accent colors adjust per theme (the LinkedIn badge is blue in light, yellow in dark; the status green gets brighter).
  - The choice is saved in `localStorage` key `theme` (value `dark` confirmed by hash) and restored on reload.
  - The default is **light**, and it ignores the browser's `prefers-color-scheme` (a dark-preference browser still opened in light).
- **Not captured:** mobile layouts (verify the mobile sidebar behavior before building ours) and whether the theme switch itself animates.

## 4. Brand alignment

| Reference | QovaOps version |
|---|---|
| Pale bg + white cards | `#101010` bg, `#16191D` cards, `#1F242B` borders, grid lines `#1A1D21` |
| Black sidebar | `#16191D` sidebar with border; active item white + lime ring/dot; inactive `#9CA3AF` |
| "Soham **Mondal**" solid + outline | **Qova** solid white + **Ops** outlined lime; "by triqova" Cool Gray under it |
| Green status pill | Trait pill: lime dot + "INTELLIGENT \| CREATIVE \| CONFIDENT" |
| Outlined ghost word | Ghost word stroke `#1F242B`; eyebrow `// ABOUT` in lime |
| Outlined stat digits | Lime-outlined digits |
| Strengths 01–05 | Services 01–09 with lime numbers and the lime left bar from the brand sheet |
| Theme toggle (top right) | Kept: square icon button (sun/moon), next to a lime pill **Book a call** button |
| Light mode palette | Brand light variant: `#F5F6F3` page, white cards, `#101010` text, lime only behind black text (see §5.1) |
| Fonts | Articulat CF (Inter fallback) for headings/body; a mono font for eyebrows, nav and labels |
| Dashed borders | Keep: dashed `#1F242B` on chips, pills and cards |
| Cookie dialog, map, blog, employers | Dropped |

Brand rules that override the reference: lime ≈ 10% of the screen, no glows/sparkles/3D clip art, no invented numbers or testimonials.

## 5. Page plan (single page)

Nav order: About · Services · How I Work · Tools · Work · Experience · Contact (+ Testimonials when real ones exist).

| # | Section | Content | Layout & motion | Status |
|---|---|---|---|---|
| 0 | Header | Qova**Ops** wordmark, "by triqova", socials (FB, IG, YT, LinkedIn), theme toggle, Book a call button | Wordmark letters reveal on load; sun/moon icon swap on toggle | [x] Phase 2 |
| 1 | About / hero | Photo, "Hi, I'm Hans_" typer, H1 "Your Daily Operations." / "Our Execution." (white / lime), trait pill, tool chips, hero sub, stats | Hero entrance timeline; count-up on stats | [x] Phase 3 (Q mark placeholder; motion Phase 4) |
| 2 | Services | All 9 services from BRAND_GUIDE §1, numbered 01–09, icon, title, one line | Rows stagger in on scroll; hover lifts the row and lights the lime bar | [x] Phase 3 |
| 3 | How I Work | 4 steps: Discovery call → Audit & plan → Execute & own it → Report & improve | Cards with step numbers; line draws between steps on scroll | [x] Phase 3, [!] copy needs Hans review |
| 4 | Tools | Grouped chips: Admin & Ops, Web & eCommerce, Automation & AI, Analytics & Hosting | Chips fade up in groups | [x] Phase 3 |
| 5 | Work | Tabs: Websites · Automation · Operations; project rows with status badges and links | Sliding tab pill (transitions-dev); rows cross-fade on tab change | [x] Phase 3 (Operations tab hidden: no projects) |
| 6 | Experience | Timeline: BS Computer Science (with Honors) + work history | Timeline line draws on scroll | [x] Phase 3 |
| 7 | Testimonials | Carousel of real quotes | Two-up slider, arrow buttons | [!] hidden until real testimonials (`content/testimonials.ts` is empty) |
| 8 | Contact | "Let's work together", lime CTA band "Delegate Your Operations", pills: email, book a call, socials | CTA band reveal; button hover per brand | [x] Phase 3 |
| 9 | Footer | "QOVAOPS BY TRIQOVA \| HUMAN EXECUTION. POWERED BY SMARTER SYSTEMS." + © year | Static | [x] Phase 2 |

### 5.1 Light / dark theme

**Behavior**
- Default **dark** on the first visit, whatever the OS setting (brand is dark-first; the reference also ignores the OS setting, but defaults to light).
- The toggle switches the whole site and saves the choice in `localStorage` key `theme` (`dark` | `light`).
- No flash of the wrong theme: a tiny inline script in `<head>` sets `data-theme` on `<html>` before first paint (or `next-themes` with `defaultTheme="dark"`, `enableSystem={false}`, `attribute="data-theme"`).
- Toggle is a real `<button>` with `aria-label="Switch to light theme"` / `"Switch to dark theme"`; works by keyboard.
- `theme-color` meta follows the theme (`#101010` / `#F5F6F3`).

**Tokens.** Components only use semantic tokens (`--qo-bg`, `--qo-surface`, `--qo-text`, `--qo-text-muted`, `--qo-border`, `--qo-grid`, `--qo-accent-text`…); each theme sets them under `:root[data-theme="dark"]` and `:root[data-theme="light"]`.

| Semantic token | Dark | Light |
|---|---|---|
| Page bg `--qo-bg` | `#101010` | `#F5F6F3` |
| Card / sidebar `--qo-surface` | `#16191D` | `#FFFFFF` |
| Border, dashed lines `--qo-border` | `#1F242B` | `#E2E4DF` (derived) |
| Grid lines `--qo-grid` | `#1A1D21` | `#E9EBE6` (derived) |
| Text `--qo-text` | `#FFFFFF` | `#101010` |
| Body text `--qo-body` | `#D1D5DB` | `#374151` (derived) |
| Muted text `--qo-text-muted` | `#9CA3AF` | `#4B5563` |
| Accent as text/stroke `--qo-accent-text` (eyebrows, numbers, "Ops" outline, stat digits) | Lime `#C6FF00` | `#101010` |
| Accent fill `--qo-accent` (buttons, CTA band, active nav ring bg) | Lime `#C6FF00`, black text | Lime `#C6FF00`, black text |
| Ghost word stroke | `#1F242B` | `#E2E4DF` |

**Light-theme brand rules** (from BRAND_GUIDE §3 and §5)
- Lime never as text, thin line or small icon on light; on light it is only a fill behind black text/glyphs (buttons, CTA band, number badges, the lime dot sits inside a black pill).
- Logo switches to the light variant: `#101010` wordmark, Q mark in a black rounded square, "by triqova" stays Cool Gray.
- Derived light values above are proposals; check every pair against WCAG AA when building.

**Motion.** Sun/moon icon swap via transitions-dev (`09-icon-swap`). The theme change itself is a short color cross-fade (~250ms) using the View Transitions API where supported, and instant under `prefers-reduced-motion`.

### Stats (only true numbers)
- **4+** years experience (confirmed in BRAND_GUIDE)
- **9** services
- **CS with Honors** shown as a label, not a number
- Anything else (clients, hours, projects) stays out until Hans gives a real number.

### Hidden-until-real rule
Work, Testimonials and any logo row are built with data in `content/` and a `published` flag. Sections with no published items don't render and don't appear in the nav. Placeholder data is marked `// TODO: real data from Hans`.

## 6. Motion plan

| Element | Tool | Notes |
|---|---|---|
| Hero entrance (wordmark, H1 lines, pill, chips, photo) | GSAP timeline | Once on load, ≤1.2s total |
| Typewriter "Hi, I'm Hans_" | Small custom GSAP/TextPlugin or CSS steps | No external typer script |
| Sidebar scrollspy | ScrollTrigger per section | Active ring animates between items |
| Section reveals | ScrollTrigger.batch | Fade + small rise, stagger 40–80ms |
| Count-up stats | GSAP tween on scroll enter | Lime outlined digits |
| Timeline / step lines | ScrollTrigger scrub | Line draws as you scroll |
| Tabs, chip hovers, buttons, carousel arrows | transitions-dev CSS | Use its motion tokens via `_root.css` |
| Theme toggle | transitions-dev icon swap + View Transitions cross-fade | See §5.1 |
| Smooth scroll for nav links | ScrollToPlugin | Offset for mobile header |

All motion respects `prefers-reduced-motion` via `gsap.matchMedia()` and CSS guards. Animate transforms and opacity only (gsap-performance).

## 7. Technical plan

### Structure
```
app/
  layout.tsx        fonts, metadata, analytics
  page.tsx          assembles sections
  globals.css       Tailwind v4 @theme with brand tokens
  opengraph-image.tsx, icon, apple-icon, sitemap.ts, robots.ts
components/
  layout/           Header, Sidebar, SectionCard, SectionHeading (eyebrow + ghost word)
  sections/         About, Services, HowIWork, Tools, Work, Experience, Testimonials, Contact, Footer
  ui/               Pill, Chip, Button, Tabs, Stat, TimelineItem
  motion/           useGsap setup, reveal helpers
content/            site.ts, services.ts, tools.ts, work.ts, experience.ts, testimonials.ts
public/brand/       logo SVGs, favicon, OG assets
```

### Responsive
- ≥1024px: sticky sidebar left + cards right (like the reference).
- <1024px: sidebar becomes a top bar with a menu sheet; cards go full width with 16px gutters.
- Check at 1440, 1024, 768 and 390.

### SEO & quality
- Metadata from BRAND_GUIDE §7 (title, description, `theme-color #101010`), Open Graph image in brand style.
- JSON-LD `Person` + `ProfessionalService`.
- `sitemap.xml`, `robots.txt`, canonical `https://qovaops.triqova.com`.
- Targets: Lighthouse ≥95 on all four categories, CLS ≈ 0, LCP < 2.5s on mobile.
- Accessibility: contrast per BRAND_GUIDE §3, visible focus rings, keyboard-usable nav and tabs, alt text says "virtual assistant", not "freelancer".

### Deployment
1. Create a GitHub repo (the folder is not a git repo yet) and push.
2. Import the repo in Vercel (framework preset Next.js). Every push deploys; PRs get preview URLs.
3. Vercel → Project → Settings → Domains → add `qovaops.triqova.com`.
4. GoDaddy → `triqova.com` → DNS → Add record: **Type** CNAME, **Name** `qovaops`, **Value** the target Vercel shows (usually `cname.vercel-dns.com`), TTL default.
5. Wait for Vercel to verify; SSL is issued automatically. The main `triqova.com` site is unaffected.

## 8. Phases

### Phase 0 — Groundwork
- [x] Brand guide and tokens (`brand/`)
- [x] Review the reference site (REA capture)
- [x] Review and install project skills
- [x] Choose tech stack and domain
- [x] Write this plan
- [x] Hans approves the plan (2026-11-12)

### Phase 1 — Setup
- [x] Scaffold Next.js + TypeScript + Tailwind v4 in this folder (keep `brand/`, `CLAUDE.md`, `PLAN.md`) — Next 16.4.6, React 19.3, Tailwind 4.3.3, ESLint 9 (`.claude/**` ignored)
- [x] Brand tokens in `@theme` as semantic tokens with dark + light sets (§5.1), base styles, background grid — `app/globals.css`; utilities `bg-bg`, `bg-surface`, `border-line`, `text-fg`, `text-body`, `text-muted`, `text-accent-text`, `bg-accent`, `text-on-accent`, plus `qo-grid-bg`, `qo-divider`, `text-outline`, `qo-label`
- [x] Theme system: `data-theme` on `<html>`, no-flash script, saved choice, default dark — own inline head script (`components/layout/theme.ts`, no `next-themes`), toggle `components/ui/ThemeToggle.tsx`, `theme-color` synced per theme
- [x] Fonts: Articulat CF from Hans's Adobe Fonts web project (kit `lsg5lvm`, `<link>` in `app/layout.tsx`, added 2026-11-12), Inter (`next/font`) as fallback, JetBrains Mono for labels
- [x] Install GSAP + `@gsap/react`, motion setup with reduced-motion handling — `components/motion/gsap.ts` (registers ScrollTrigger + useGSAP, `MOTION_CONDITIONS`), `components/motion/Reveal.tsx` (useGSAP + `gsap.matchMedia`)
- [x] `git init`, first commit, GitHub repo — `Hans-tech-coder/QovaOps-Portfolio`, `main` pushed

### Phase 2 — Layout shell
- [x] Header (wordmark, socials, theme toggle, Book a call) — `components/layout/Header.tsx`, `Wordmark.tsx` (GSAP letter reveal, pre-hidden via `qo-js` class from the head script so no flash; reduced-motion = static), `components/ui/SocialIcons.tsx` (Lucide v1 has no brand icons, so Lucide's old ISC brand glyphs are inlined), `ThemeToggle.tsx` restyled: square button, transitions-dev `09-icon-swap` keyed on `html[data-theme]`, View Transitions cross-fade (skipped under reduced motion / hidden tab)
- [x] Sidebar with scrollspy; mobile top bar + menu — nav comes from one config, `content/sections.ts` (`published` flag; only published sections render and show in the nav). `ScrollSpy.tsx`: ScrollTrigger per section (active while crossing 40% of viewport, last section wins at page bottom) + `scrollToSection()` (ScrollToPlugin, top-bar offset, focus moves to the section H2, hash updated). `Sidebar.tsx` (≥1024px): dots + dashed accent ring that glides to the active item. `MobileNav.tsx` (<1024px): sticky top bar (wordmark, current section, toggle, menu) + native modal `<dialog>` sheet (Esc closes, Tab trapped, focus returns, page scroll locked, open 250ms / close 150ms)
- [x] SectionCard and SectionHeading (eyebrow + ghost word) — `components/layout/SectionCard.tsx`, `SectionHeading.tsx`
- [x] Footer — `components/layout/Footer.tsx` (year via `"use cache"` + `cacheLife("max")`, because `cacheComponents` forbids a bare `new Date()`; updates on each deploy)
- [x] Shell page: `app/page.tsx` with skip link, header, sidebar and TODO cards for About, Services, How I Work, Tools, Contact. Work, Experience and Testimonials are `published: false` (no real data yet). Checked at 1440 / 1024 / 768 / 390, both themes, mouse + keyboard

### Phase 3 — Sections
Sections live in `components/sections/` and are wired by id in `app/page.tsx` (`SECTION_COMPONENTS`), so the page and nav still come from `content/sections.ts`. Motion is basic (`Reveal` + CSS); the full pass is Phase 4.
- [x] About / hero — `About.tsx`: section card renders the page **H1** (two-tone tagline; `SectionCard`/`SectionHeading` got `title`/`titleAs`/`titleClassName`), Hans's photo (`public/brand/hans-photo.jpg`; the Q mark placeholder was removed), CSS-only "Hi, I'm Hans_" typer (`.qo-typer`), trait pill, BRAND_GUIDE §7 blurb, tool chips (`heroTools` in `content/tools.ts`), Delegate/email buttons, stats 4+ years · 10+ client websites managed · 9 services + "Computer Science / With Honors" label. photo added 2026-11-12
- [x] Services (9) — `Services.tsx` + `content/services.ts`: rows 01–09, outlined numbers, Lucide icons, one line each, accent left bar on hover (lime on dark, #101010 on light)
- [x] How I Work — `HowIWork.tsx` + `content/process.ts` (4 steps, lime-on-black step badges). [!] copy marked `TODO: Hans review`
- [x] Tools — `Tools.tsx`: 4 groups of dashed chips from `content/tools.ts`
- [x] Work — `Work.tsx` + `WorkTabs.tsx`: transitions-dev `16-tabs-sliding` (lime pill, black text, ARIA tabs with arrow/Home/End), only categories with projects get a tab (Websites 4, Automation 3; Operations has none), status badges only where the resume states it (Live / Agency work / Personal), RunAsOne link. [!] screenshots/links for the other projects (`TODO(Hans)` in `content/work.ts`)
- [x] Experience — `Experience.tsx`: education + certifications column, work timeline column, dashed period pills
- [x] Testimonials (built, hidden until real data) — `Testimonials.tsx` + `TestimonialsCarousel.tsx` (two-up scroll-snap, arrow buttons, no stars); renders nothing while `content/testimonials.ts` is empty. [!] real quotes
- [x] Contact + CTA band — `Contact.tsx`: lime band "Delegate Your Operations" (Book a call + Email me), pills for email, booking link and the four socials (`SocialIcon` export added). No location (on hold)

### Phase 4 — Motion & polish
- [x] Hero timeline, scroll reveals, count-ups, line draws — `components/motion/HeroIntro.tsx` (one timeline on load, ~1.2s: wordmark letters, H1 lines, portrait, trait pill, blurb, chips, buttons; targets marked `data-hero`/`data-wordmark-*`; Wordmark no longer has its own timeline), `Reveal.tsx` (ScrollTrigger.batch, 12px rise, 40–80ms stagger capped at ~320ms per batch, also fires on leave/enter-back so deep links like `#work` never leave content hidden), `CountUp.tsx` (About stats 4+ / 10+ / 9, final value in the HTML + sr-only), `ScrollLine.tsx` (scrubbed accent line over the dashed track: How I Work badges at xl, both Experience timelines). Load-time content is pre-hidden by CSS under `.qo-js` (no flash); the head script drops `qo-js` after 4s if the motion code never loaded. Scroll reveals in view at load wait for the hero (`heroDelay()` in `gsap.ts`)
- [x] transitions-dev states — `.qo-btn` (quick hover + press scale) on buttons, pills, icon buttons, carousel arrows and links; `24-learn-more-hover` arrow nudge (`.qo-nudge`, `-ne`, `-back`); `11-avatar-group-hover` lift with falloff on chip rows (`.qo-chip-row`, CSS only); tabs keep `16-tabs-sliding`
- [x] Motion polish pass (transitions-polish) and reduced-motion check — full `_root.css` token scale imported once in `globals.css`, mirrored for GSAP (`DUR`, `DIST`, `qo-smooth-out` CustomEase as the default ease); sheet/icon-swap/panel/sidebar/services values now reference tokens; sidebar dot animates `transform` instead of `transition-all` on size. Reduced motion: every GSAP branch sets final state, CSS pre-hide only applies under `no-preference`, CSS guards zero transitions. Verified in headless Chrome with `prefers-reduced-motion: reduce` (all content visible at once, no errors)
- [x] Responsive pass at 1440 / 1024 / 768 / 390 — no horizontal overflow at any width; mobile double wordmark fixed: the top-bar mark fades in only after the header wordmark scrolls away (IntersectionObserver, `inert` while hidden). CLS measured ≈ 0.0005 at 1440 (full scroll)
- [x] Light theme pass: every section checked in both themes, contrast AA, logo light variant — contrast audit of every text node passes AA in both themes except the "by triqova" endorsement (logo lockup, exempt) and outline strokes; trait pill is a black pill with the lime dot in light (lime never small on light); Work tab counts lost `opacity-60` (failed AA); the wordmark already switches to `#101010` on light. Live theme toggle checked in headless Chrome

### Phase 5 — Launch
- [ ] SEO: metadata, OG image, JSON-LD, sitemap, robots
- [ ] Favicon + icons from the real Q mark SVG
- [ ] Lighthouse and accessibility audit
- [ ] Vercel project + `qovaops.triqova.com` via GoDaddy CNAME
- [ ] Vercel Analytics + Speed Insights on
- [ ] Final review with Hans, then share the link

## 9. On hold — needed from Hans

- [x] **Real photo** of Hans — transparent cut-out `public/brand/hans-photo.png` (exported from Canva `DAHasTtTt6Y`, 2026-11-12), shown in the About hero via `next/image`. The original `hans-photo.jpg` is no longer used.
- [~] **Logo SVGs** — `public/brand/qovaops-logo.svg`, `qovaops-logo-light.svg`, `qovaops-mark.svg` (2026-11-12). The Q mark paths are copied 1:1 from Canva `DAHaBth6Gns` page 2 (read through the Canva connector; it can't export SVG). The wordmark is live text (Articulat CF → Inter/Helvetica fallback), not outlined. [!] For outlined text, Hans downloads the SVG from Canva (Pro) and replaces the files.
- [x] **Articulat CF license** — Adobe Fonts kit `lsg5lvm` (2026-11-12). If the site ever shows Inter instead, check that the web project is still published in Adobe Fonts.
- [x] **Tools list** — from the resume (2026-11-12), in `content/tools.ts`.
- [x] **Experience details** — from the resume (2026-11-12), in `content/experience.ts`: St. Paul Colleges Foundation Inc. 2015–2019 (BS CS, With Honors; Best in Web Development, Best Mobile Application), Skyrocket Studios PH (Nov 2022 – Jul 2026), DigitYza (Jun–Dec 2023), self-employed 2021–present, 5 certifications. The resume's phone number and personal Gmail are deliberately not used on the site.
- [~] **Projects / case studies** — resume projects are in `content/work.ts`, all published. Hans approved (2026-11-12) showing the Skyrocket agency work and naming Kubota PH and the client Shopify stores. [!] Still needed: screenshots/links for projects; location "Tarlac, Philippines": show on the site or not?
- [!] **Testimonials** (quote, name, role, permission to publish).
- [!] **How I Work copy** review — drafted in `content/process.ts` (Phase 3).
- [!] Should the footer link to `www.triqova.com`?
- [x] **GitHub repo:** `Hans-tech-coder/QovaOps-Portfolio` exists and `main` is pushed to `origin`. Still: push only when Hans says so.

## 10. Session log

| Date | What happened |
|---|---|
| 2026-11-12 | Reviewed reference with REA; reviewed taste-skill, ui-ux-pro-max, gsap-skills, transitions.dev; installed 12 skills into `.claude/skills/`; chose stack; domain set to qovaops.triqova.com (GoDaddy DNS); wrote this plan. |
| 2026-11-12 | Captured the reference's dark mode with REA (toggle, palette swap, `localStorage` persistence, light default). Added light/dark theme to the plan (§5.1): dark default, saved choice, light palette from the brand light variant. |
| 2026-11-12 | Hans confirmed dark default and approved the plan. Phase 1 handed to a new session. |
| 2026-11-12 | **Phase 1 done** (except GitHub repo). Scaffolded Next 16.4.6 + Tailwind 4.3 via a temp dir; brand tokens (dark + light) in `app/globals.css`; no-flash theme script + toggle (dark default even with OS light, choice saved in `localStorage.theme`, verified in browser); GSAP motion setup with reduced-motion; metadata from BRAND_GUIDE §7 in `app/layout.tsx`; `content/site.ts` holds copy and links; placeholder token-preview page. `npm run build` and `npm run lint` pass. Notes: template has `cacheComponents` on (kept); `next dev` maintains `AGENTS.md` (committed); added `.claude/launch.json` for the dev preview. Next: GitHub repo (Hans), then Phase 2. |
| 2026-11-12 | **Phase 2 done.** Layout shell: header + wordmark reveal, socials, square theme toggle with icon swap, lime Book a call; sticky sidebar with ScrollTrigger scrollspy and gliding ring; <1024px top bar + `<dialog>` menu sheet; SectionCard/SectionHeading; footer strip. Sections driven by `content/sections.ts` (Work/Experience/Testimonials hidden until real data). `npm run build` + `npm run lint` pass; verified in browser at 1440/1024/768/390, dark + light, mouse + keyboard (scrollspy, smooth scroll + focus, Esc/Tab trap). Notes: Experience is hidden too because there's no data yet (flip `published` once Hans sends school/years/roles); "by triqova" Cool Gray on dark is below AA at small sizes but is part of the logo lockup (sr-only text carries the name); mobile shows the wordmark twice (top bar + header), revisit in Phase 4. Not committed. Next: Phase 3 sections. |
| 2026-11-12 | Hans added his resume (`brand/Hans Christian A. Obena - Resume (General Virtual Assistant).pdf`). Pulled the facts into `content/experience.ts`, `content/tools.ts`, `content/work.ts` and an empty `content/testimonials.ts`. Experience and Work are now published in `content/sections.ts` (Work shows while ≥1 project is published; Testimonials shows only when real quotes exist). Real numbers now available for Phase 3: 4+ years agency experience, 10+ client websites (hosting/security), 200K+/year subscription replaced, RunAsOne 3 events / 244+ registrants (as of Oct 2026). Open: agency-work/client-name permissions, location. Not committed. |
| 2026-11-12 | Hans approved showing the agency work and naming clients: all projects in `content/work.ts` published, Kubota PH named in `content/experience.ts`. Not committed. |
| 2026-11-12 | **Phase 3 done.** All sections built in `components/sections/` and wired in `app/page.tsx` (About/hero with H1 + Q mark + typer + real stats only, Services 01–09, How I Work, Tools, Work tabs, Experience timeline, Testimonials carousel hidden while empty, Contact + lime CTA band). New content files `content/services.ts`, `content/process.ts`; `status` badges + category labels in `content/work.ts`. `npx tsc --noEmit`, `npm run lint`, `npm run build` pass. Verified on the production build (`prod-preview` config in `.claude/launch.json`, port 3005) at 1440/1024/768/390, dark + light: no horizontal overflow, nav = rendered sections, scrollspy follows, tabs switch. Note: another session's `next dev` on :3000 served a stale `globals.css` (new CSS missing), so check new CSS on a fresh dev server or the prod preview. Open for Hans: photo/Q mark SVG, How I Work copy, project links/screenshots, testimonials, location. Not committed. Next: Phase 4 motion. |
| 2026-11-12 | Hans added his portrait (`public/brand/hans-photo.jpg`), which now replaces the Q mark placeholder in the About hero (`next/image`, blur placeholder, rounded square). Built the logo SVGs in `public/brand/` (logo, light logo, mark) from the Canva page 2 vector paths; the wordmark is live text, not outlined. Removed the unused `QMark.tsx`. Lint + build pass; checked in the prod preview. Not committed. |
| 2026-11-12 | Articulat CF is live: Hans's Adobe Fonts kit `lsg5lvm` loads via `<link>` + preconnect in `app/layout.tsx` (weights 400/500/700 confirmed loaded in the prod preview; Inter stays the fallback). Lint + build pass. Not committed. |
| 2026-11-12 | About portrait restyled after Hans's reference: larger 3:4 photo, no frame, bottom fades into the card (`.qo-portrait-fade` mask in `globals.css`, also soft top/side edges), "Hi, I'm Hans_" tag overlaps the bottom. Light theme looks clean; in dark the JPG's light-gray background shows as a soft pale box. [!] Hans to send a transparent PNG cut-out (`public/brand/hans-photo.png`), then swap the import in `About.tsx`. Not committed. |
| 2026-11-12 | Exported Hans's transparent portrait from Canva `DAHasTtTt6Y` (PNG 1200×1607, via the connector) to `public/brand/hans-photo.png`; About now uses it with a bottom fade plus a subtle aura behind it (`.qo-aura`: faint lime on dark, faint neutral on light, kept low because the brand rules out heavy glows). Lint + build pass; checked in both themes. `hans-photo.jpg` is unused (kept until Hans says delete). Not committed. |
| 2026-11-13 | **Phase 4 done.** Hero timeline, batch scroll reveals, count-up stats, scrubbed line draws (How I Work at xl, Experience), transitions-dev hover/press states, motion tokens imported once and mirrored for GSAP, reduced motion verified, responsive + light theme passes (details in §8 Phase 4). `npx tsc --noEmit`, `npm run lint`, `npm run build` pass; checked on the prod preview (:3005) and in headless Chrome (reduced motion, theme toggle, 768/1024). Note: the Claude browser pane freezes CSS transitions and View Transitions while it is hidden, so check theme toggling with the pane visible. Not committed. Next: Phase 5 launch. |
| 2026-11-13 | **Compact header + About above the fold** (Hans's feedback: wordmark too big). Wordmark is now a brand bar: 28/36/44px (was 48–96px), "by triqova" 12/14/16px, header `py-5 lg:py-6` in one row at every width (Book a call stays beside the logo on mobile). Section rhythm tightened for every card: ghost word 48/60/72px (was up to 96), heading `mt-3`, card padding `p-6 sm:p-8 lg:p-10`. About: H1 56px at lg / 64px at xl (brand 64–72, still the biggest text), portrait `w-60 sm:w-64 xl:w-72`, right column `gap-5`. At 1440×900 the About card starts at y=118 (was ~220) and the first screen shows the eyebrow, full H1, sub, photo, trait pill, full bio, chips and both CTA buttons (bottom at 847); at 1366×768 the pill + whole bio + top of the photo; at 1920×1080 the stats row too. Sidebar top aligns with the card (both 118). Mobile 390: top bar + header end at 151px (was ~270), top-bar mark stays hidden until the header wordmark scrolls away (no double logo). No overflow at 390/768/1366/1440/1920; checked dark + light on the prod preview. Hero/wordmark timeline untouched (same data attributes). Lint + build pass. Not committed. |
| 2026-11-13 | **Fixed grid background + moving line streaks** (Hans: background shouldn't scroll; add the reference's moving lines, but minimal). The grid moved from `<body>` to a fixed `.qo-bg-layer` (`app/layout.tsx`, z-index -1, body now transparent, html keeps the bg), so it stays put while the page scrolls. Reference (checked live): fixed layer, 4 vertical lines at 20/40/60/80%, an 80px fading streak runs top→bottom every 8s, staggered 2s. Ours: 4 vertical + 2 horizontal 80px streaks riding exactly on our 96px grid lines (`--k` index), transform-only animation, 9–16s linear with negative delays so they never sync. Color `--qo-beam`: lime 40% on dark, `#101010` 30% on light (no lime on light, thin line, no glow). Hidden under reduced motion. One horizontal streak runs in the gap between header and cards at desktop. No overflow at 390/1440; lint + build pass. Note: the first `npm run build` served a stale CSS chunk (new rules missing); a second build fixed it — rebuild if new CSS doesn't show. Not committed. |
| 2026-11-13 | **Spinning nav ring** (Hans: make the circular dash in the menu rotate, like the reference's `nav-circle`, 10s linear). Sidebar: the ring is now an outer span GSAP still glides with x/y plus an inner dashed span that spins (`.qo-spin`, 10s linear, in `globals.css`), so the rotation never fights the GSAP transform. Mobile menu sheet: the active item's dashed ring spins too. Off under reduced motion. Checked on the prod preview: animation runs, ring stays centered on the marker after gliding About → Services. Lint + build pass. Not committed. |
| 2026-11-13 | **Intro loader** (Hans: a 1–100% loading screen with "LOADING..." and smooth motion, so visitors don't land straight on the page). `components/motion/Loader.tsx`, first in `app/page.tsx`: full-screen panel on the same grid as the page, big counter 0→100 (power2.inOut, 1.8s) with the `%` in accent text, a 2px progress line (accent fill on a border-color track) and mono "LOADING" with stepping dots; then the counter/line/label fade up (staggered), the panel slides up (`yPercent -100`, 0.8s power3.inOut) and sets `html.qo-intro-done`. Fixed length (`INTRO` in `gsap.ts`, ~3.2s total) shared through `startIntro()`/`heroStartDelay()`, so the hero timeline starts as the panel is ~halfway up and the scroll reveals/count-ups still wait for the hero (`setHeroDuration(delay + duration)`). Page scroll is locked until done (`html.qo-js:not(.qo-intro-done)`), `scrollbar-gutter: stable` keeps the width steady. Only for JS + motion-allowed visitors: no JS → no loader; the head-script 4s failsafe removes it with `qo-js`; reduced motion → skipped, page shows at once. Shows on every full page load. Checked in headless Chrome (REA) at 1440 dark (0% → 10% → 100% → page) and 390 light (`%` and line in #101010, no lime on light), reduced motion (no loader). Lint + build pass. Not committed. |
| 2026-11-13 | **Typing photo tag** (Hans: the About "Hi, I'm Hans" tag should alternate "Hi there!" / "I'm Hans" with typing + backspace). New `components/motion/TypeCycler.tsx` replaces the one-shot CSS typer (`.qo-typer` removed from `globals.css`; `.qo-caret` blink kept): types 90ms/char, holds 1.8s, backspaces 45ms/char, 0.4s gap, loops. It opens on "I'm Hans" (what no-JS and reduced-motion visitors keep), then after the intro loader + hero (`heroStartDelay()` + 1.4s) backspaces it and types "Hi there!". Pill width is reserved for the longest word + caret (mono `ch`), so it doesn't jitter; screen readers get "Hi there! I'm Hans" once (sr-only). Checked in headless Chrome at 1440 dark: I'm Hans → empty → Hi there! → backspacing. Lint + build pass. Not committed. |
| 2026-11-13 | Photo tag pill is now flexible (Hans): `TypeCycler` no longer reserves the longest word's width, so the pill grows and shrinks with each typed/backspaced character and stays centered under the portrait (it is `left-1/2 -translate-x-1/2`). Checked in headless Chrome: `I'm Hans_` → `_` → `Hi t_` → `Hi there!_` → `I_`. Lint + build pass. Not committed. |
