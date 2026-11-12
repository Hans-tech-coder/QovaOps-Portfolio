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
| 0 | Header | Qova**Ops** wordmark, "by triqova", socials (FB, IG, YT, LinkedIn), theme toggle, Book a call button | Wordmark letters reveal on load; sun/moon icon swap on toggle | [ ] |
| 1 | About / hero | Photo, "Hi, I'm Hans_" typer, H1 "Your Daily Operations." / "Our Execution." (white / lime), trait pill, tool chips, hero sub, stats | Hero entrance timeline; count-up on stats | [ ] |
| 2 | Services | All 9 services from BRAND_GUIDE §1, numbered 01–09, icon, title, one line | Rows stagger in on scroll; hover lifts the row and lights the lime bar | [ ] |
| 3 | How I Work | 4 steps: Discovery call → Audit & plan → Execute & own it → Report & improve | Cards with step numbers; line draws between steps on scroll | [ ] copy needs Hans review |
| 4 | Tools | Grouped chips: Admin & Ops, Web & eCommerce, Automation & AI, Analytics & Hosting | Chips fade up in groups | [!] tool list needs Hans |
| 5 | Work | Tabs: Websites · Automation · Operations; project rows with status badges and links | Sliding tab pill (transitions-dev); rows cross-fade on tab change | [!] no real projects yet; hidden until ≥1 |
| 6 | Experience | Timeline: BS Computer Science (with Honors) + work history | Timeline line draws on scroll | [!] school, years, roles needed |
| 7 | Testimonials | Carousel of real quotes | Two-up slider, arrow buttons | [!] hidden until real testimonials |
| 8 | Contact | "Let's work together", lime CTA band "Delegate Your Operations", pills: email, book a call, socials | CTA band reveal; button hover per brand | [ ] |
| 9 | Footer | "QOVAOPS BY TRIQOVA \| HUMAN EXECUTION. POWERED BY SMARTER SYSTEMS." + © year | Static | [ ] |

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
- [~] Fonts: Inter fallback now (`next/font`), JetBrains Mono for labels; Articulat CF once the license is confirmed
- [x] Install GSAP + `@gsap/react`, motion setup with reduced-motion handling — `components/motion/gsap.ts` (registers ScrollTrigger + useGSAP, `MOTION_CONDITIONS`), `components/motion/Reveal.tsx` (useGSAP + `gsap.matchMedia`)
- [~] `git init`, first commit, GitHub repo — local repo + first commit done; [!] GitHub repo waits on Hans (private or public, which account)

### Phase 2 — Layout shell
- [ ] Header (wordmark, socials, theme toggle, Book a call)
- [ ] Sidebar with scrollspy; mobile top bar + menu
- [ ] SectionCard and SectionHeading (eyebrow + ghost word)
- [ ] Footer

### Phase 3 — Sections
- [ ] About / hero
- [ ] Services (9)
- [ ] How I Work
- [ ] Tools
- [ ] Work (built, hidden until real data)
- [ ] Experience
- [ ] Testimonials (built, hidden until real data)
- [ ] Contact + CTA band

### Phase 4 — Motion & polish
- [ ] Hero timeline, scroll reveals, count-ups, line draws
- [ ] transitions-dev states for tabs, chips, buttons
- [ ] Motion polish pass (transitions-polish) and reduced-motion check
- [ ] Responsive pass at 1440 / 1024 / 768 / 390
- [ ] Light theme pass: every section checked in both themes, contrast AA, logo light variant

### Phase 5 — Launch
- [ ] SEO: metadata, OG image, JSON-LD, sitemap, robots
- [ ] Favicon + icons from the real Q mark SVG
- [ ] Lighthouse and accessibility audit
- [ ] Vercel project + `qovaops.triqova.com` via GoDaddy CNAME
- [ ] Vercel Analytics + Speed Insights on
- [ ] Final review with Hans, then share the link

## 9. On hold — needed from Hans

- [!] **Real photo** of Hans (hero). Until then: Q mark in a dark rounded square.
- [!] **Logo SVGs** exported from Canva `DAHaBth6Gns` page 2 → `public/brand/`, both the dark version and the light variant (black wordmark).
- [!] **Articulat CF license** (Adobe Fonts kit ID or webfont files).
- [!] **Tools list** to confirm for the Tools section.
- [!] **Experience details:** school name and years, past roles/clients that can be named.
- [!] **Projects / case studies** for Work (name, what you did, link, screenshots, allowed to show?).
- [!] **Testimonials** (quote, name, role, permission to publish).
- [!] **How I Work copy** review once drafted.
- [!] Should the footer link to `www.triqova.com`?
- [!] **GitHub repo:** private or public, and which GitHub account? (local repo is ready to push)

## 10. Session log

| Date | What happened |
|---|---|
| 2026-11-12 | Reviewed reference with REA; reviewed taste-skill, ui-ux-pro-max, gsap-skills, transitions.dev; installed 12 skills into `.claude/skills/`; chose stack; domain set to qovaops.triqova.com (GoDaddy DNS); wrote this plan. |
| 2026-11-12 | Captured the reference's dark mode with REA (toggle, palette swap, `localStorage` persistence, light default). Added light/dark theme to the plan (§5.1): dark default, saved choice, light palette from the brand light variant. |
| 2026-11-12 | Hans confirmed dark default and approved the plan. Phase 1 handed to a new session. |
| 2026-11-12 | **Phase 1 done** (except GitHub repo). Scaffolded Next 16.4.6 + Tailwind 4.3 via a temp dir; brand tokens (dark + light) in `app/globals.css`; no-flash theme script + toggle (dark default even with OS light, choice saved in `localStorage.theme`, verified in browser); GSAP motion setup with reduced-motion; metadata from BRAND_GUIDE §7 in `app/layout.tsx`; `content/site.ts` holds copy and links; placeholder token-preview page. `npm run build` and `npm run lint` pass. Notes: template has `cacheComponents` on (kept); `next dev` maintains `AGENTS.md` (committed); added `.claude/launch.json` for the dev preview. Next: GitHub repo (Hans), then Phase 2. |
