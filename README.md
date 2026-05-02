# Md Kamruzzaman — Portfolio

A production-ready, single-page developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Features a working contact form powered by [Resend](https://resend.com), scroll-spy navigation, scroll-reveal animations, and a fully dark theme.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 |
| Icons | Lucide React v1 · React Icons v5 |
| Email | Resend SDK v6 |
| Runtime | Node.js ≥ 20.9.0 |

---

## Project Structure

```
portfolio-single/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Secure contact form API (rate limit + honeypot + Resend)
│   ├── globals.css           # Tailwind v4 theme tokens, keyframes, custom utilities
│   ├── layout.tsx            # Root layout, Google Fonts, SEO metadata
│   └── page.tsx              # Page composition — renders all sections in order
│
├── components/
│   ├── Navbar.tsx            # Fixed nav, scroll-spy active state, mobile drawer
│   ├── Hero.tsx              # Typewriter effect, animated stats, social links, CV download
│   ├── About.tsx             # Bio, animated CountUp stats
│   ├── Skills.tsx            # 6 skill categories, proficiency dots, brand icons
│   ├── Projects.tsx          # Project cards with hover overlays, tag chips
│   ├── Experience.tsx        # Timeline with bullet points, company descriptions
│   ├── Testimonials.tsx      # Client review cards with avatars and star rating
│   ├── Contact.tsx           # Contact form (honeypot + timing gate + Resend)
│   └── Footer.tsx            # Dynamic year, back-to-top button
│
├── lib/
│   └── data.ts               # Single source of truth — all portfolio content & types
│
├── public/
│   └── cv.pdf                # CV file served at /cv.pdf (add yours here)
│
├── .env.local                # Local env vars (not committed — see setup below)
├── CLAUDE.md                 # AI agent coding rules for this project
└── AGENTS.md                 # Next.js version-specific rules for AI agents
```

---

## Getting Started

### Prerequisites

Node.js **≥ 20.9.0** is required (Next.js 16 drops support for older versions).

```bash
node -v   # must be v20.9.0 or higher
```

If you use nvm:
```bash
nvm install 22
nvm use 22
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required — get your key at https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxx

# The inbox that receives contact form submissions
CONTACT_EMAIL=you@example.com

# Optional — requires a verified domain in Resend
# Without this, Resend uses its sandbox sender (only delivers to your Resend account email)
# RESEND_FROM_EMAIL=Portfolio Contact <hello@yourdomain.com>
```

> **Restart the dev server** after editing `.env.local` — Next.js reads env vars at startup only.

---

## Personalisation

All portfolio content lives in **`lib/data.ts`** — it's the single source of truth. Edit that file to update:

- `profile` — name, title, bio, location, email, availability, social links
- `stats` — years of experience, projects, clients, GitHub stars
- `skills` — tech stack across 6 categories with proficiency levels (1–5)
- `projects` — project cards with title, description, tags, GitHub & demo links
- `experiences` — work history with bullet points, dates, and company descriptions
- `testimonials` — client reviews with name, title, company

### CV / Resume

Drop your PDF at:
```
public/cv.pdf
```
The **Download CV** button in the Hero links to `/cv.pdf` automatically.

### Colour Tokens

Custom design tokens are defined in `app/globals.css` inside `@theme {}`:

```css
@theme {
  --color-dark:    #080B11;   /* page background */
  --color-surface: #0F1420;   /* card / panel background */
  --color-cyan:    #00D4FF;   /* primary accent */
  --color-violet:  #7B61FF;   /* secondary accent */
  --color-bright:  #F0F4FF;   /* primary text */
  --color-muted:   #6B7A99;   /* secondary text */
}
```

---

## Contact Form Security

The `/api/contact` route has three layers of bot protection:

| Layer | How it works |
|---|---|
| **Honeypot** | A hidden `website` field is included in the form. Bots auto-fill it; the server silently discards those submissions. |
| **Timing gate** | Submissions arriving in under 3 seconds are rejected — bots submit instantly, humans don't. |
| **IP rate limiting** | Max 3 submissions per IP per hour via an in-memory Map. Resets on server cold-start. |

All user input is HTML-escaped before being embedded in the email template to prevent XSS.

---

## Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Deployment

The easiest option is [Vercel](https://vercel.com) — zero config for Next.js App Router projects.

1. Push to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add the environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL`) in the Vercel dashboard
4. Deploy

For other platforms (Railway, Fly.io, DigitalOcean App Platform), set the same env vars and ensure Node.js ≥ 20.9.0 is available.

---

## Known Gotchas

- **Framer Motion v12** requires `ease: "easeOut" as const` (not a plain string) on variant `transition` objects due to strict TypeScript `Easing` typing.
- **lucide-react v1** does not export brand icons (GitHub, LinkedIn, etc.). Use `react-icons/fa` instead (`FaGithub`, `FaLinkedinIn`).
- **Tailwind CSS v4** uses `@theme {}` for tokens and `@utility` for custom utilities — not `theme.extend` in a config file.
- **Resend sandbox** (`onboarding@resend.dev` sender) only delivers to the email address that owns the API key. Verify a domain in Resend for production delivery to any address.
