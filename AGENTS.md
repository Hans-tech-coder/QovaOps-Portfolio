<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commit & Push Guardrails

- **Never commit or push unless explicitly instructed by the user in that turn** (e.g., "push the changes").
- When instructed to push local changes:
  1. Execute `npm run guardrails` (`node scripts/guardrails.mjs`). This verifies:
     - Working tree has changes
     - No sensitive files (`.env*`, keys, local settings), merge conflict markers, secrets, or forbidden contact emails (`triqova@gmail.com`, `info@triqova.com`) in app/components/content/public
     - `obenahans@gmail.com` only in developer-site files (`app/dev`, `content/dev`): never in VA source (`app/va` and `content/va` are always scanned in full) or in the built VA page
     - TypeScript (`npx tsc --noEmit`)
     - ESLint (`npm run lint`)
     - Next.js production build (`npm run build`)
  2. If any guardrail fails, **abort commit and push** and report the failure.
  3. If all guardrails pass, write the commit message using `.claude/skills/caveman-commit/SKILL.md` (terse Conventional Commits `<type>(<scope>): <imperative summary>`, ≤50/72 chars, no fluff, validated by `scripts/validate-commit-msg.mjs`), commit, and push to the remote branch.

