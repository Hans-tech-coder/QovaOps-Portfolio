# Two sites, one app: developer portfolio + QovaOps VA

Status: **proposed (updated 2026-11-14), build starts when Hans approves.**
Context: Hans wants the portfolio to work mainly for **developer job applications**, with the QovaOps General VA service kept separate. Decided 2026-11-14: the developer portfolio gets its own subdomain, **`hansobena.triqova.com`**; the VA service stays on **`qovaops.triqova.com`**. Both are served by **this one repo and one Next.js app** (no copy of the project). Everything built so far (sections, motion, theme, Work browser, tool logos) is reused.

Status legend: `[ ]` to do · `[!]` needs Hans · `[x]` done/decided

---

## 1. Decisions & recommendations

| Topic | Decision | Status |
|---|---|---|
| Domains | `hansobena.triqova.com` = developer portfolio · `qovaops.triqova.com` = QovaOps VA service | [x] Hans, 2026-11-14 |
| Setup | **One repo, one Next.js app, one Vercel project with both domains.** Host-based rewrites send each domain's `/` to its own page. Not a copy of the project: a copy doubles every fix (logos, hover, theme, loader…) and the two drift apart. Split into a monorepo only if the sites ever need different designs or owners. | [x] recommended, Hans agreed |
| Who the dev site is about | **Hans Obena, Full-Stack Web Developer** (personal brand). QovaOps stays the brand of the VA site. | [x] |
| Look & feel | Same design system on both (dark-first, lime accent, Articulat CF, cards, sidebar, motion) | [x] |
| Dev header | Name wordmark **Hans** (solid) **Obena** (outlined lime), same treatment as Qova**Ops** | proposed |
| Dev contact email | **`obenahans@gmail.com`** (dev site only). The VA site keeps `qovaops@gmail.com`. | [x] Hans, 2026-11-14 |
| GitHub | **https://github.com/Hans-tech-coder**, shown on the dev site (header socials, contact, JSON-LD `sameAs`) | [x] Hans, 2026-11-14 |
| Intro loader | Once per visit (sessionStorage) instead of every load; also fixes the mobile LCP issue (PLAN.md §9) | proposed |
| Cross-linking | Dev site: small "Need a virtual assistant? → QovaOps" card + header link to `qovaops.triqova.com`. VA site: "Developer portfolio →" link to `hansobena.triqova.com`. | proposed |
| Old `/va` idea | Replaced by the two subdomains. `/va` and `/gva` on the dev domain redirect to `qovaops.triqova.com`. | [x] |

## 2. Developer site (`hansobena.triqova.com`)

Nav: About · Projects · Stack · Experience · Contact

| # | Section | Content | Reuses |
|---|---|---|---|
| 0 | Header | Hans Obena wordmark, socials (**GitHub, LinkedIn** first), theme toggle, lime **Get in touch** button, small "VA services" link | `Header`, `Wordmark` (new variant), `SocialIcons` (+ GitHub icon) |
| 1 | About / hero | H1 draft: **"I build fast, reliable websites and web apps."** Role line: *Full-Stack Web Developer · Next.js, React, TypeScript, WordPress, Shopify*. Short bio from real facts (CS with Honors; 4+ years; agency developer at Skyrocket; built Run As One). Dev tool chips. Stats: 4+ years · 10+ client websites managed · CS With Honors. Buttons: **View projects** + **Download resume**. | `About` (props for copy/chips/stats), `CountUp`, `TypeCycler`, portrait |
| 2 | Projects | Tabs **Websites** (current pinned WorkBrowser, Run As One + triqova first) and **Engineering** (n8n → BigQuery reporting pipeline, Meta Ads connector on Cloud Run + Gemini, Retell AI voice agent, Claude skills / MCP servers, Cresendo custom WP plugins, Kubota dealer locator). Each row shows stack and what Hans built. **No per-project GitHub links** (Hans, 2026-11-14); the GitHub profile link lives in the header and Contact. | `Work`, `WorkTabs`, `content/work.ts` (per-site project lists) |
| 3 | Stack | Grouped logo chips: Frontend · Backend & Data · CMS & eCommerce · Hosting & DevOps · AI & Automation · Tools (VS Code, Git, GitHub, Figma) | `Tools`, `ToolLogo`, `toolLogos` (all 44 logos exist) |
| 4 | Experience | Same timeline, dev-first wording: Skyrocket **Mid-Level Developer** leads; self-employed entry reframed as *Independent Developer & Founder (Run As One, triqova, QovaOps)*; DigitYza; education + certifications | `Experience`, dev variant of `content/experience.ts` |
| 5 | QovaOps card | "Also offering: virtual assistant services with advanced technical skills → qovaops.triqova.com" | new, small |
| 6 | Contact | "Let's build something": `obenahans@gmail.com`, GitHub, LinkedIn, resume, book a call | `Contact` (props for copy/CTA) |

Not on the dev site: Services (01–09) and How I Work, which are the VA offer. A dev "How I work" can come later.

Rules that still apply: never invent results, numbers or testimonials; every claim comes from the resume/work data Hans already confirmed.

### 2.1 GitHub (checked 2026-11-14: 71 public repos, ~45 of them forks)

Public repos that match projects already on the site, for reference only (not linked on the site; useful when Hans pins repos on his profile):

| Repo | Matches | Language |
|---|---|---|
| `run-as-one` | Run As One | TypeScript (Next.js) |
| `wp-plugin-race-result` | Cresendo race results plugin | PHP |
| `wp-plugin-form-submissions-dashboard` | Cresendo form submissions dashboard | PHP |
| `sr-forms-dashboard` | Skyrocket ClickUp forms dashboard? | TypeScript |
| `ppc-web-app`, `rsvp-app`, `trading-signal-app`, `sr-speedcheck-app`, `agency-dashboard` | not on the site yet | TS / Python / JS |

- [x] Decided 2026-11-14: **no per-project repo links**, GitHub profile only. Open for Hans on GitHub itself: `sr-*` / `agency-dashboard` look like Skyrocket work, and `run-as-one` (live product with payments) is public; worth reviewing their visibility.
- [!] Recommended before sending the link to recruiters (done by Hans on GitHub, not on this site): pin the 4–6 best repos, add short descriptions/READMEs to them, and make private or archive old tutorial repos and unrelated forks. They crowd the profile.

## 3. VA site (`qovaops.triqova.com`)

The current page stays here **as is**: About (VA hero "Your Daily Operations. Our Execution."), Services 01–09, How I Work, Tools, Work, Experience, Testimonials (hidden until real), Contact with "Delegate Your Operations", email `qovaops@gmail.com`. Changes:
- Hero chips back to Ops tools only (Google Workspace, Slack, ClickUp, Canva, Shopify, WordPress, n8n, ChatGPT).
- Header gets a small "Developer portfolio →" link to `hansobena.triqova.com`.
- Framing rule from CLAUDE.md ("virtual assistant with advanced technical skills, not a freelancer") applies to this site.

## 4. Technical plan

**Routes and host rewrites**
```
app/
  layout.tsx              theme, fonts, cursor, background (shared, unchanged)
  dev/
    layout.tsx            metadataBase https://hansobena.triqova.com, dev metadata, Person JSON-LD
    page.tsx              <PortfolioPage profile={dev} />
    opengraph-image.tsx   dev OG card ("Hans Obena / Full-Stack Web Developer")
    sitemap.ts, robots.ts
  va/
    layout.tsx            metadataBase https://qovaops.triqova.com, current metadata, ProfessionalService JSON-LD
    page.tsx              <PortfolioPage profile={va} />
    opengraph-image.tsx   current VA card
    sitemap.ts, robots.ts
next.config.ts            rewrites with `has: [{ type: "host", value: … }]`
```
- `hansobena.triqova.com/*` → `/dev/*`, `qovaops.triqova.com/*` → `/va/*` (including `/sitemap.xml`, `/robots.txt`, `/opengraph-image`). Visitors only ever see `/`.
- Pages stay static (rewrites in `next.config.ts`, no request-time logic). `proxy.ts` (Next 16's name for middleware) only if rules get more complex.
- The internal `/dev` and `/va` paths redirect to the right domain if opened directly, so each page has a single canonical URL.
- Local dev: `localhost:3000/dev` and `/va` open each site directly; a `?site=` or host-alias tip goes in the README.
- Shared assets (`public/`, icons, resume, work thumbnails) work on both domains.

**Shared page shell.** Move what `app/page.tsx` does today (loader, hero intro, skip link, mobile nav, header, sidebar, sections loop, footer, back to top) into `components/layout/PortfolioPage.tsx`. It takes a *profile*: nav/sections, section components, header wordmark + CTA, contact email, cross-link.

**Content split**
```
content/
  site.ts          shared: owner, booking link, socials, GitHub
  dev/  profile.ts (email obenahans@gmail.com) sections.ts tools.ts work.ts experience.ts
  va/   profile.ts (email qovaops@gmail.com)   sections.ts tools.ts …  (today's files, moved)
  tool-logos.ts    shared (unchanged)
  work.ts          shared project data; each site picks and orders
```
Components that read content directly (`About`, `Contact`, `Tools`, `Work`, `Experience`, `Header`, `Sidebar`, `MobileNav`, `JsonLd`) get the data through the profile/props instead.

**SEO**
- Dev: title *Hans Obena — Full-Stack Web Developer (Next.js, React, WordPress, Shopify)*; JSON-LD `Person` (jobTitle, `knowsAbout` = dev stack, `sameAs` GitHub + LinkedIn, `alumniOf`, email `obenahans@gmail.com`).
- VA: current QovaOps title/description; JSON-LD `ProfessionalService` with `founder` → the dev site's `Person` `@id`.
- Separate canonical, sitemap, robots and OG/Twitter card per domain.

**Guardrails & docs.** `scripts/guardrails.mjs` only blocks `triqova@gmail.com` / `info@triqova.com`, so `obenahans@gmail.com` passes; add a check that it appears only in dev content. Update CLAUDE.md "Contacts" (per-site emails, GitHub) and framing (VA framing on the VA site only), and add a short personal-brand section to BRAND_GUIDE.md.

**Motion checks:** ScrollSpy, Reveal, HeroIntro and the Work pin read the current page's DOM; verify each on both sites.

## 5. Phases

### Phase A — Decisions (Hans)
- [x] Subdomains: `hansobena.triqova.com` (dev) + `qovaops.triqova.com` (VA), one app
- [x] GitHub `Hans-tech-coder`, dev email `obenahans@gmail.com`
- [!] Approve this plan and the personal-brand dev header
- [x] Target role: **Full-stack developer, remote; open to full-time, contract or part-time** (Hans, 2026-11-14)
- [!] Developer resume PDF: Hans adds it as a **new file** in `public/resume/` (e.g. `hans-obena-developer-resume.pdf`); the VA site keeps `hans-obena-resume.pdf`. Then render modal pages with `scripts/resume-pages.py`
- [x] Repo links: none, GitHub profile only (§2.1)
- [x] Dev hero copy and reworded Experience entries approved (Hans, 2026-11-14)

### Phase B — Restructure, no visual change
- [x] `PortfolioPage` shell + `SiteProfile` type (`content/profile.ts`); VA content moved to `content/va/`; VA hero chips back to Ops only (2026-11-14)
- [x] `app/va/*` serves today's page (metadata, JSON-LD, OG/Twitter, sitemap, `robots.txt` route handler); host rewrites + production-only `/va`, `/dev` redirects in `next.config.ts`. `/dev` = noindex placeholder showing the VA profile until Phase C (2026-11-14)
- [x] tsc, lint, build pass; text/head diff vs the old page and DOM checks at 1440/375 match (2026-11-14). Still to watch with the browser pane visible: loader + hero timeline and scroll motion

### Phase C — Developer site
- [x] `content/dev/*` (copy only from confirmed facts: brand guide, VA experience, developer resume PDF), **Hans Obena** wordmark (`spaced`), GitHub icon + profile link (header, contact, JSON-LD `sameAs`) (2026-11-14)
- [x] Hero, Projects (Websites browser + Engineering rows, per-site project ids in `SiteProfile.workTabs`), Stack (6 groups, all 44 logos), Experience wording, QovaOps "Also offering" card, Contact "Let's build something" (2026-11-14)
- [x] Cross-links in both headers and mobile menus; loader once per visit (sessionStorage `qo-intro-seen`, head script adds `qo-intro-skip`) (2026-11-14)
- [x] Dev resume: `public/resume/hans-obena-developer-resume.pdf` → `dev-page-1/2.webp` (`scripts/resume-pages.py` renders both PDFs); `resume.enabled` flag hides every resume button if a PDF is missing (2026-11-14)
- [x] Basics of Phase D for dev: `app/dev/layout.tsx` (metadata, Person JSON-LD), OG/Twitter card, sitemap, robots; `/va` and `/gva` on the dev host redirect to `qovaops.triqova.com` (2026-11-14)
- [x] Hero copy (`content/dev/profile.ts`) and Experience wording (`content/dev/experience.ts`) approved (Hans, 2026-11-14)
- [x] Two Engineering rows from the dev resume kept: ClickUp forms dashboard, Event RSVP app (Hans, 2026-11-14)

### Phase D — SEO & sharing
- [ ] Metadata, canonical, JSON-LD, sitemap, robots, OG card per domain (dev basics done in Phase C; left: VA `ProfessionalService.founder` → dev `Person` @id (`devPersonId`), review dev title/description with Hans, validate both in Rich Results / OG debuggers after deploy)

### Phase E — QA & launch
- [ ] Both sites at 1440 / 1024 / 768 / 390, dark + light, keyboard, reduced motion, no overflow; Lighthouse both
- [ ] Docs: PLAN.md, CLAUDE.md, BRAND_GUIDE.md, guardrails email check
- [ ] Hans says "push the changes" → guardrails → commit → push
- [ ] Vercel: one project, add both domains. GoDaddy (`triqova.com` DNS): CNAME `hansobena` and CNAME `qovaops` → the value Vercel shows
