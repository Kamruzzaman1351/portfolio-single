@AGENTS.md

# Portfolio — AI Agent Coding Rules

This is a single-page developer portfolio for **Md Kamruzzaman**. Before writing any code, read this file in full.

---

## Stack & Versions

| Package | Version | Notes |
|---|---|---|
| Next.js | 16.2.4 | App Router only — no Pages Router |
| React | 19.2.4 | |
| TypeScript | 5 | Strict mode |
| Tailwind CSS | 4 | See CSS rules below |
| Framer Motion | 12 | See animation rules below |
| Lucide React | 1.14.0 | No brand icons — use react-icons/fa |
| React Icons | 5 | SI prefix for tech brands, FA prefix for social |
| Resend | 6 | Contact form email delivery |
| Node.js | ≥ 20.9.0 | Required by Next.js 16 |

---

## Project Layout

```
app/
  globals.css           ← Tailwind theme tokens — edit here, not a config file
  layout.tsx            ← Root layout, Google Fonts (Syne, DM Sans, JetBrains Mono)
  page.tsx              ← Section order: Navbar > Hero > About > Skills > Projects > Experience > Testimonials > Contact > Footer
  api/contact/route.ts  ← POST handler for contact form (bot protection + Resend)

components/             ← One file per section, all Client Components ('use client')
  Navbar.tsx · Hero.tsx · About.tsx · Skills.tsx · Projects.tsx
  Experience.tsx · Testimonials.tsx · Contact.tsx · Footer.tsx

lib/
  data.ts               ← ALL portfolio content lives here — the single source of truth
```

---

## The One Rule: Edit `lib/data.ts` for Content

**Never hardcode content inside components.** All text, links, names, dates, and config come from `lib/data.ts`. If the user wants to change a skill, project, or bio — update `data.ts` only.

---

## Tailwind CSS v4 Rules

Tailwind v4 has **breaking changes** from v3. Follow these exactly:

```css
/* globals.css — correct v4 patterns */

@import "tailwindcss";          /* NOT @tailwind base/components/utilities */

@theme {                        /* custom tokens — NOT theme.extend in a JS config */
  --color-cyan: #00D4FF;        /* used as bg-cyan, text-cyan, border-cyan etc. */
  --font-display: var(--font-syne), system-ui, sans-serif;
}

@keyframes my-anim { ... }      /* standard CSS keyframes */

@utility animate-my-anim {     /* custom utilities — NOT @layer utilities */
  animation: my-anim 1s ease infinite;
}
```

Custom tokens available: `dark`, `surface`, `cyan`, `violet`, `bright`, `muted`  
Custom fonts: `font-display` (Syne), `font-body` (DM Sans), `font-code` (JetBrains Mono)

---

## Framer Motion v12 Rules

**Always use `as const` on ease strings inside variant transition objects**, or TypeScript will widen the type and fail:

```ts
// ✅ Correct
const variants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// ❌ Wrong — TypeScript error: string not assignable to Easing
const variants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
```

Prefer `whileInView` + `viewport={{ once: true }}` for scroll-reveal animations.

---

## Icon Rules

- **Brand / tech icons** → `react-icons/si` (e.g. `SiReact`, `SiNextdotjs`, `SiMysql`)
- **Social icons** → `react-icons/fa` (e.g. `FaGithub`, `FaLinkedinIn`)
- **UI icons** → `lucide-react` (e.g. `Mail`, `MapPin`, `ArrowRight`)
- **Never** import social/brand icons from `lucide-react` — they don't exist in v1.

---

## API Route Rules (`app/api/contact/route.ts`)

The contact form API has three security layers — **do not remove any of them**:

1. **IP rate limiting** — 3 requests/IP/hour via in-memory Map
2. **Honeypot** — reject if `body.website` is non-empty
3. **Timing gate** — reject if submission arrives in under 3 seconds

All user input must be passed through `escapeHtml()` before embedding in email HTML.

Env vars required at runtime:
- `RESEND_API_KEY` — Resend API key
- `CONTACT_EMAIL` — destination inbox
- `RESEND_FROM_EMAIL` — optional, needs a verified Resend domain

---

## Component Conventions

- Every component file starts with `'use client';`
- Animation entry points use `useInView(ref, { once: true, amount: 0.1 })` — **not** `whileInView` on the section wrapper (to avoid re-triggering)
- Section `id` attributes must match the `href` values in `Navbar.tsx` NAV_LINKS
- Mobile touch targets: minimum `min-h-[44px]` and `min-w-[44px]` on interactive elements
- Never use `@apply` — compose Tailwind classes directly in JSX

---

## CV File

The Hero "Download CV" button links to `/cv.pdf`. Place the file at:
```
public/cv.pdf
```

---

## Do Not

- Do not add a `tailwind.config.js/ts` file — Tailwind v4 uses `globals.css` only
- Do not use `@tailwind base` / `@tailwind components` / `@tailwind utilities` directives
- Do not import from `next/router` — this is App Router, use `next/navigation`
- Do not use `getServerSideProps` or `getStaticProps` — App Router uses `async` Server Components
- Do not hardcode portfolio content inside components — always use `lib/data.ts`
- Do not remove bot-protection layers from the contact API route
