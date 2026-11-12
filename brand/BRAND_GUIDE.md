# QovaOps Brand Guide — for the Portfolio Website

Reference for building Hans Obena's portfolio / QovaOps website. Everything here comes from the official brand sheet (`qovaops-brand-template.pdf`, same folder) and the QovaOps social media brand guide (`C:\Users\user\Social Media\brand\BRAND_GUIDE.md`), adapted for web.

Values marked **(derived)** are not official tokens. They were read off the brand PDF or added for web needs (hover states, borders, accessible text). Adjust them if Hans decides otherwise.

---

## 1. Business info

| | |
|---|---|
| Brand | **QovaOps** by triqova |
| Owner | Hans Christian A. Obena |
| What it is | General Virtual Assistant service **with advanced technical skills**, not a "normal" General VA |
| Tagline | **Your Daily Operations. Our Execution.** |
| Secondary line | Human execution. Powered by smarter systems. |
| Short description | Tech-enabled virtual assistant and streamlined day-to-day operations, backed by Triqova systems and automation. |
| Brand personality | Intelligent · Creative · Confident |
| Primary CTA (from brand sheet) | **Delegate Your Operations** |
| Secondary CTA | Book a call |

### About Hans
- Computer Science graduate **with Honors**
- **4+ years** in Web Development, Digital Operations and AI Automation
- Helps **busy founders, digital agencies and eCommerce brands** simplify operations, fix technical bottlenecks, and scale without juggling multiple hires
- Takes **ownership**, not just executes tasks: proactively finds smarter, faster, more cost-effective solutions
- Goal: take technical and operational tasks off the client's plate so they can focus on growing the business

### Services (all nine stay on offer)
| # | Service | Details / keywords |
|---|---|---|
| 01 | **Executive & Admin Support** | Inbox, calendar, travel and daily coordination |
| 02 | Website & eCommerce Management | WordPress, Shopify |
| 03 | Full-Stack Development | Next.js, TypeScript, PHP |
| 04 | Technical SEO & Website Performance Optimization | Core Web Vitals, speed, technical audits |
| 05 | AI & Workflow Automation | n8n, Make, AI Agents, MCP |
| 06 | CRM, ClickUp & Digital Operations Management | Process tracking, client onboarding, SOPs |
| 07 | Marketing Analytics, Dashboards & Reporting | |
| 08 | Hosting, Server Administration & Website Security | |
| 09 | End-to-End Technical Project & Operations Management | |

Executive & Admin Support must stay visible (Hans wants it offered); the technical skills are the differentiator, not a replacement for it.

The brand sheet groups the offer into three pillars, handy for a short "What I do" section:
1. **Executive & Admin Support** — Inbox, calendar, travel & daily coordination
2. **Operations & CRM Management** — Process tracking, client onboarding & SOPs
3. **AI-Augmented Workflows** — Human execution powered by Triqova automation

---

## 2. Contacts & links (use exactly these)

| Channel | Display | Link |
|---|---|---|
| Email | `qovaops@gmail.com` | `mailto:qovaops@gmail.com` |
| Book a call | `bit.ly/3WlL3yg` | `https://bit.ly/3WlL3yg` |
| Facebook | `@qovaops` | https://facebook.com/qovaops |
| Instagram | `@qovaops` | https://instagram.com/qovaops |
| YouTube | `@QovaOps` | https://youtube.com/@QovaOps |
| LinkedIn | `in/hans-obena` | https://linkedin.com/in/hans-obena |

- **Do not use** `triqova@gmail.com` or `info@triqova.com` for QovaOps. The brand PDF still shows `info@triqova.com` and `www.triqova.com`; those are the parent/other brand.
- **Portfolio domain:** `qovaops.triqova.com` (decided 2026-11-12; DNS at GoDaddy, hosted on Vercel).
- **Open question for Hans:** should the site link to `www.triqova.com` at all (e.g. a "by triqova" link in the footer)?

---

## 3. Colors

### Official palette — 60 / 30 / 10
| Token | Hex | Share | Use on web |
|---|---|---|---|
| Core Black | `#101010` | 60% | Page background (dark-first site) |
| Pure White | `#FFFFFF` | 30% | Headlines, primary text |
| Electric Lime | `#C6FF00` | 10% | Accent: CTA buttons, highlighted words, icons, active states, small bars |
| Cool Gray | `#6B7280` | — | "by triqova" endorsement, secondary/meta text |
| Light Surface | `#F5F6F3` | — | Light sections / light variant only |

Rules:
- Brand colors are the primary, near-only colors. No off-brand blues, purples, or rainbow gradients.
- The site is **dark-first**. A light (`#F5F6F3`) section is fine as an occasional break, not the default.
- Lime is an accent, about 10% of the screen. Don't make big lime areas except a CTA band or a single highlight block.

### Derived web tokens (from the brand PDF, not official)
| Token | Hex | Use |
|---|---|---|
| Surface / card | `#16191D` | Cards, panels on the black background |
| Border | `#1F242B` | Card borders, dividers, grid lines |
| Grid line | `#1A1D21` | Subtle background grid (as on brand sheet page 2) |
| Muted text (small) | `#9CA3AF` | Small secondary text on black (passes WCAG AA) |
| Lime hover | `#B3E600` | Hover/pressed state for lime buttons |
| Badge bg | `#1F2937` | Number badges ("01", "02") with lime text |

### Contrast notes (WCAG)
| Pair | Ratio | Verdict |
|---|---|---|
| White on `#101010` | ~18.9:1 | ✅ all text |
| Lime `#C6FF00` on `#101010` | ~16:1 | ✅ all text |
| `#101010` on Lime | ~16:1 | ✅ button labels |
| Cool Gray `#6B7280` on `#101010` | ~3.8:1 | ⚠️ large text (≥24px, or ≥19px bold) only — use `#9CA3AF` for small text |
| Lime on White / `#F5F6F3` | ~1.2:1 | ❌ never; on light sections use black text, and lime only as a background behind black text |

---

## 4. Typography

- **Articulat CF** for everything.
  - **Bold 700** — wordmark, headlines, buttons
  - **Medium 500** — "by triqova" endorsement, secondary text
  - Regular 400 for body copy is fine if the licensed family includes it
- **Licensing:** Articulat CF is a commercial font (Connary Fagen). It is available on Adobe Fonts (needs an Adobe CC plan and a web project kit) or as a paid webfont license. Confirm with Hans which license he has before shipping it. Self-hosting requires a webfont license.
- **Fallback stack** (closest free alternatives first):
  ```css
  font-family: "articulat-cf", "Articulat CF", "Inter", "Helvetica Neue", Arial, sans-serif;
  ```
  The brand PDF itself rendered in Helvetica/Arial, so a clean grotesk fallback stays on-brand.

### Suggested type scale (derived)
| Role | Size (desktop / mobile) | Weight | Notes |
|---|---|---|---|
| Hero H1 | 64–72px / 40px | 700 | Two lines: white line + lime line (e.g. "Your Daily Operations." / "Our Execution.") |
| H2 | 40px / 30px | 700 | |
| H3 / card title | 20–22px | 700 | |
| Body | 18px / 16px | 400–500 | White or `#D1D5DB` for long copy |
| Small / meta | 14px | 500 | `#9CA3AF` |
| Eyebrow / label | 12–13px, uppercase, letter-spacing 0.08em | 700 | Lime or Cool Gray, e.g. "INTELLIGENT \| CREATIVE \| CONFIDENT" |

---

## 5. Logo

- **Full lockup:** lime monoline "Q" mark + white **QovaOps** wordmark (Bold 700) + Cool Gray **by triqova** (Medium 500) underneath, right-aligned under the wordmark.
- **Dark-first:** white wordmark needs a dark background (`#101010`).
- **Light variant:** on `#F5F6F3`, the wordmark turns `#101010`, the Q mark sits in a black rounded square (lime strokes), "by triqova" stays Cool Gray.
- **Q mark alone:** favicon, social avatar, app icon, mobile nav. Shown inside a dark rounded square (radius ≈ 22% of size) with a subtle border.
- Don't recolor, stretch, add shadows/glows, or put the white wordmark on a light background.
- **Files:** export the vector logo from Canva design `DAHaBth6Gns` ("by triqova"), page 2 — it has the Q mark and full logo as editable vectors. Download as **SVG** for the website. Avoid the old `qovaops_icon_mark_only.svg` / `qovaops_logo_transparent_editable.svg` uploads (they are raster images inside SVG and pixelate).
- Put final files in `public/brand/` (suggested names: `qovaops-logo.svg`, `qovaops-logo-light.svg`, `qovaops-mark.svg`, `favicon.ico`, `apple-touch-icon.png`).

---

## 6. UI patterns (taken from the brand sheet)

The brand PDF page 2 is effectively a landing-page hero. Reuse these patterns:

| Pattern | How it looks |
|---|---|
| **Background grid** | `#101010` with faint grid lines (`#1A1D21`, ~90–100px cells). Subtle, never busy. |
| **Two-tone headline** | Line 1 white, line 2 lime. |
| **Primary button** | Lime pill (`border-radius: 9999px`), black Bold text, e.g. "Delegate Your Operations". Hover → `#B3E600`. |
| **Secondary link** | White bold text with gray text under it (e.g. site + email next to the CTA). |
| **Trait pill** | Dark rounded pill with border, lime dot + uppercase "INTELLIGENT \| CREATIVE \| CONFIDENT". |
| **Service card** | Dark surface card, rounded (~14px), thin border, **lime vertical bar** on the left, small number badge (`01`) with lime text, white bold title, gray one-line description. |
| **Divider with lime tip** | Thin gray horizontal line where the first ~10% is lime. Same motif as the social graphics' logo line. |
| **Footer strip** | Uppercase small gray text: "QOVAOPS BY TRIQOVA \| HUMAN EXECUTION. POWERED BY SMARTER SYSTEMS." |
| **Icons** | Lime circle with black glyph (contact/social icons), or monoline lime icons on dark. |

Design rules from Hans (apply to the site too):
- Must look **professional, not AI-generated**: no floating 3D clip art, sparkles, random dot grids, heavy glows.
- **Not plain** either: light shading, the grid, and a few brand shapes are fine; avoid empty dead space.
- One consistent design direction across all pages.

---

## 7. Copy & voice

- Voice: **intelligent, clear, confident, practical**. Educational over salesy; soft-sell on CTAs.
- Frame Hans/QovaOps as a **General Virtual Assistant with advanced technical skills**. Say "virtual assistant", not "freelancer" (also in meta tags and alt text).
- Mention Executive & Admin Support, not only tech services.
- AI/automation: practical, "without the hype".
- **Never invent client results, testimonials, logos, numbers or case-study claims.** Leave placeholders (e.g. `TODO: real testimonial from Hans`) until Hans supplies real proof.
- Every page should end with a CTA: email `qovaops@gmail.com` or book a call via `bit.ly/3WlL3yg`.

### Ready-to-use copy
- **Hero:** "Your Daily Operations. Our Execution."
- **Hero sub:** "Tech-enabled virtual assistance and streamlined day-to-day operations, backed by Triqova systems and automation."
- **Secondary:** "Human execution. Powered by smarter systems."
- **About blurb:** "I'm Hans, a Computer Science graduate with Honors and 4+ years in web development, digital operations and AI automation. I help busy founders, digital agencies and eCommerce brands simplify operations, fix technical bottlenecks, and scale without juggling multiple hires. I take ownership of the work, not just the task list."
- **CTA:** "Delegate Your Operations" / "Book a call"

### SEO / meta starting point
- Title: `QovaOps by triqova — Tech-Enabled Virtual Assistant | Hans Obena`
- Description: `General virtual assistant with advanced technical skills: executive support, websites & eCommerce, AI automation, and digital operations for founders, agencies and eCommerce brands.`
- `theme-color`: `#101010`

---

## 8. Design tokens

Copy-paste versions are in [brand-tokens.css](brand-tokens.css) (CSS variables) and below for Tailwind.

```js
// tailwind.config (v3) — or map the same values in @theme for Tailwind v4
colors: {
  brand: {
    black: "#101010",
    white: "#FFFFFF",
    lime: "#C6FF00",
    "lime-hover": "#B3E600",
    gray: "#6B7280",
    muted: "#9CA3AF",
    light: "#F5F6F3",
    surface: "#16191D",
    border: "#1F242B",
  },
},
fontFamily: {
  sans: ['"articulat-cf"', '"Articulat CF"', "Inter", '"Helvetica Neue"', "Arial", "sans-serif"],
},
borderRadius: { card: "14px" },
```

---

## 9. Open items for Hans

- [x] Portfolio domain: `qovaops.triqova.com`
- [ ] Whether to link `www.triqova.com`
- [x] Articulat CF web license — Adobe Fonts kit `lsg5lvm` (2026-11-12)
- [ ] Export SVG logo files from Canva `DAHaBth6Gns` page 2
- [ ] Real photo of Hans (the founder graphics' photo looked like a stock image)
- [ ] Real projects, case studies and testimonials to show (none are in the brand files)
