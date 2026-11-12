# QovaOps by triqova — portfolio

Portfolio site for Hans Obena's QovaOps, a general virtual assistant with advanced technical skills.

- Plan and status: [PLAN.md](PLAN.md)
- Brand rules and tokens: [brand/BRAND_GUIDE.md](brand/BRAND_GUIDE.md)

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Theme: dark by default on first visit; the toggle saves the choice in `localStorage` (`theme`).
Brand tokens live in `app/globals.css` (dark + light sets under `:root[data-theme]`).
