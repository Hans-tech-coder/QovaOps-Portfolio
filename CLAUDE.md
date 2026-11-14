# Portfolio — QovaOps / Hans Obena

One Next.js app that serves **two sites** (host rewrites in `next.config.ts`, one Vercel project):
- **`hansobena.triqova.com`** → `app/dev/*`, `content/dev/*`: **Hans Obena, Full-Stack Web Developer** (personal brand, for remote developer roles).
- **`qovaops.triqova.com`** → `app/va/*`, `content/va/*`: **QovaOps by triqova**, Hans's tech-enabled General VA service.
Shared page shell `components/layout/PortfolioPage.tsx` + typed `SiteProfile` (`content/profile.ts`); shared data in `content/site.ts`. Locally, `localhost:3000/dev` and `/va` open each site (any other host gets the VA site at `/`).

**Build status, decisions and what's on hold live in [PLAN.md](PLAN.md)** (whole project) **and [DEV_FIRST_PLAN.md](DEV_FIRST_PLAN.md)** (the two-site split, phases A–E, launch checklist). Read them at the start of a session and update their status boxes and session log as work lands.

**Before any design, copy or UI work, read [brand/BRAND_GUIDE.md](brand/BRAND_GUIDE.md).** Tokens are in [brand/brand-tokens.css](brand/brand-tokens.css); the original brand sheet is [brand/qovaops-brand-template.pdf](brand/qovaops-brand-template.pdf).

Must-follow essentials:
- Dark-first. Colors: `#101010` black (60%), `#FFFFFF` white (30%), `#C6FF00` lime (10%), `#6B7280` gray for endorsement. Font: Articulat CF.
- Contacts per site (book a call `https://bit.ly/3WlL3yg` on both):
  - Dev site: `obenahans@gmail.com`, GitHub profile `https://github.com/Hans-tech-coder` (profile only, no per-project repo links), LinkedIn.
  - VA site: `qovaops@gmail.com`. **`obenahans@gmail.com` must never appear in VA content** (`app/va`, `content/va`, shared components/content); `npm run guardrails` checks it.
  - Don't use `triqova@gmail.com` or `info@triqova.com` anywhere.
- VA site: frame as a "virtual assistant with advanced technical skills", not a freelancer. Dev site: personal brand, see the developer section of BRAND_GUIDE.md.
- SEO: each site has its own metadata, canonical, OG image route, sitemap, robots and manifest under `app/<site>/`. Rendered URLs must use that site's domain and never the internal `/dev` or `/va` path (check with `curl -H "Host: <domain>" http://localhost:3005/…` on `next start`). One `Person` (`site.personId`, on the dev domain) is shared by both sites' JSON-LD.
- Never invent client results, testimonials or numbers; leave TODO placeholders.
- **Never `git commit` or `git push` unless Hans explicitly says so in that moment** (e.g., "push the changes"). Leave changes uncommitted and tell him what's ready. Approval for one commit/push doesn't carry over to the next.
- **Commit & Push Guardrails Workflow:** Whenever there are local changes and Hans explicitly says to commit/push (e.g., "push the changes"):
  1. Run `npm run guardrails` (`node scripts/guardrails.mjs`) first — checks git working tree, secrets/conflict markers/forbidden brand emails, the dev email staying out of VA content (source + built VA page), `tsc --noEmit`, `npm run lint`, and `npm run build`.
  2. **Stop immediately** if any check fails; fix or report the failure and do not commit or push.
  3. Only when `npm run guardrails` passes: craft the commit message strictly following [`.claude/skills/caveman-commit/SKILL.md`](.claude/skills/caveman-commit/SKILL.md) (validate via `npm run guardrails:msg -- --msg "<message>"` and enforced by `.githooks/commit-msg`), stage the changes, `git commit`, and `git push`.
- Hans writes in Taglish; reply in Taglish.
