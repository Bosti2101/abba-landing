# ABA Pergola Systems

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and server-first architecture. Supports **Romanian**, **English**, and **Bulgarian** with full SEO optimization per locale.

---

## Tech Stack

| Technology     | Version | Role                                              |
| -------------- | ------- | ------------------------------------------------- |
| Next.js        | 16.1.6  | App Router, SSR/SSG, metadata, image optimization |
| React          | 19.2.3  | UI with Server Components                         |
| TypeScript     | 5       | Strict mode, full type coverage                   |
| Tailwind CSS   | 4       | Utility-first styling with CSS custom properties  |
| next-intl      | 4.8.3   | i18n routing, translations, locale-aware metadata |
| Framer Motion  | 12.35.2 | Scroll-reveal and entrance animations             |
| Embla Carousel | 8.6.0   | Portfolio carousel with autoplay                  |
| Resend         | 6.9.3   | Transactional email API for contact form          |

No UI libraries, state management, or heavy utilities. 8 runtime dependencies total.

---

## Project Structure

```
aba-pergola/
├── app/
│   ├── layout.tsx                    Root HTML shell, fonts, global metadata
│   ├── page.tsx                      Root redirect → /ro
│   ├── not-found.tsx                 Global 404 with header/footer
│   ├── globals.css                   Design tokens + Tailwind config
│   ├── robots.ts                     Dynamic robots.txt
│   ├── sitemap.ts                    Dynamic sitemap.xml (all locales + projects)
│   ├── api/
│   │   └── contact/route.ts          POST endpoint — form submission via Resend
│   └── [locale]/
│       ├── layout.tsx                NextIntlClientProvider + Header + Footer
│       ├── page.tsx                  Homepage (9 sections)
│       ├── services/page.tsx         Services + FAQ
│       ├── projects/page.tsx         Projects gallery
│       ├── projects/[slug]/page.tsx  Individual project detail
│       ├── contact/page.tsx          Contact page
│       ├── faq/page.tsx              FAQ page
│       ├── error.tsx                 Error boundary (translated)
│       └── not-found.tsx             404 page (translated)
│
├── components/
│   ├── layout/                       Header, Footer, LanguageSwitcher
│   ├── sections/                     Page sections (one folder each)
│   │   ├── hero/                     Hero carousel + stats bar + slide zoom
│   │   ├── living-spaces/            Product feature section
│   │   ├── winter-gardens/           Benefit cards + icons
│   │   ├── about/                    Animated stat counters
│   │   ├── strengths/                Company strengths + icons
│   │   ├── engineering/              Technical specs
│   │   ├── services/                 Service cards grid
│   │   ├── portfolio/                Embla carousel gallery
│   │   ├── contact/                  Form, branch cards, custom select
│   │   ├── faq/                      Accordion
│   │   └── page-hero/                Reusable dark page header
│   └── ui/                           Button, Container, Reveal, SectionHeading
│
├── content/
│   └── site-data.ts                  Structured content arrays (stats, services, branches)
│
├── lib/
│   ├── i18n/                         Locale routing, request config, navigation helpers
│   ├── motion/                       Framer Motion animation presets
│   └── utils/                        cn() classname utility
│
├── messages/                         Translation JSON files
│   ├── ro.json                       Romanian (default)
│   ├── en.json                       English
│   └── bg.json                       Bulgarian
│
├── types/
│   └── content.ts                    TypeScript interfaces
│
├── public/
│   ├── images/                       Optimized WebP images (hero, portfolio, OG)
│   ├── logo.png                      Company logo
│   └── logo.ico                      Favicon
│
├── proxy.ts                          next-intl middleware (locale detection)
├── next.config.ts                    Next.js config + i18n plugin
├── tsconfig.json                     TypeScript strict config
├── postcss.config.mjs                Tailwind v4 PostCSS plugin
├── env.example                       Environment variable template
└── package.json
```

---

## Pages & Routes

All user-facing routes are under `app/[locale]/` with static generation per locale.

| Route                       | Page           | Content                                                                                                   |
| --------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                         | Redirect       | → `/ro` (default locale)                                                                                  |
| `/{locale}`                 | Homepage       | Hero, Living Spaces, Winter Gardens, About, Strengths, Engineering, Services, Portfolio, Contact          |
| `/{locale}/services`        | Services       | Page hero + FAQ accordion                                                                                 |
| `/{locale}/projects`        | Projects       | Page hero + service cards grid                                                                            |
| `/{locale}/projects/{slug}` | Project Detail | Page hero + image gallery (4 slugs: retractable-roof, winter-garden, bioclimatic-roof, guillotine-window) |
| `/{locale}/contact`         | Contact        | Page hero + branch cards + contact form                                                                   |
| `/{locale}/faq`             | FAQ            | Page hero + 5-item accordion                                                                              |

**API:** `POST /api/contact` — Contact form submission with validation, rate limiting, honeypot, and Resend email delivery.

**Generated:** `/robots.txt`, `/sitemap.xml` — Dynamic, includes all locales and project pages.

---

## Components

### Layout (`components/layout/`)

| Component          | Description                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Header`           | Fixed navbar, transparent → solid on scroll, mobile drawer menu, language switcher. Accepts `forceSolid` prop for pages without hero. |
| `Footer`           | Dark footer with logo, social links, navigation columns, dynamic copyright year.                                                      |
| `LanguageSwitcher` | RO / EN / BG toggle with `useTransition` for non-blocking locale switches.                                                            |

### Sections (`components/sections/`)

Each section is self-contained in its own folder with sub-components extracted.

| Section           | Files   | Key Features                                                                                |
| ----------------- | ------- | ------------------------------------------------------------------------------------------- |
| `hero/`           | 3 files | CSS keyframe carousel (5s interval, wipe + Ken Burns zoom), stats bar                       |
| `living-spaces/`  | 1 file  | Two-column layout, floating accent card, feature list                                       |
| `winter-gardens/` | 3 files | Dark section, 3 benefit cards with SVG icons                                                |
| `about/`          | 2 files | Animated stat counters triggered on viewport entry                                          |
| `strengths/`      | 2 files | Image grid + 3-item icon list                                                               |
| `engineering/`    | 2 files | 4-point technical checklist                                                                 |
| `services/`       | 2 files | 4-column card grid with hover effects                                                       |
| `portfolio/`      | 1 file  | Embla carousel with autoplay (2s), custom nav arrows                                        |
| `contact/`        | 7 files | Branch switcher (BG/RO), form with validation, Google Maps embeds, custom accessible select |
| `faq/`            | 2 files | CSS grid-template-rows accordion                                                            |
| `page-hero/`      | 1 file  | Reusable dark header for secondary pages                                                    |

### UI Primitives (`components/ui/`)

| Component        | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| `Button`         | 4 variants (primary, outline, ghost, dark), 3 sizes, forwardRef     |
| `Container`      | Max-width 1360px centered wrapper, polymorphic `as` prop            |
| `Reveal`         | Scroll-triggered entrance animation via Framer Motion `useInView`   |
| `SectionHeading` | Label + title + description combo, center/left align, inverted mode |

---

## Design System

Design tokens are defined as CSS custom properties in `app/globals.css` and exposed to Tailwind via `@theme inline`:

```
Brand:     text-brand (#c0392b), bg-brand-hover, bg-brand-light
Ink:       text-ink (#1a1a1a), text-ink-secondary, text-ink-muted
Surface:   bg-surface (#fff), bg-surface-warm, bg-surface-mid, bg-surface-dark
Border:    border-border (#e8e4df), border-border-strong
Error:     color-error (#e74c3c)
```

Spacing uses responsive `clamp()` values. Typography is Inter via `next/font/google`.

---

## Internationalization

3 locales configured in `lib/i18n/routing.ts`:

| Locale | Language  | Default |
| ------ | --------- | ------- |
| `ro`   | Romanian  | Yes     |
| `en`   | English   |         |
| `bg`   | Bulgarian |         |

**How it works:**

1. `proxy.ts` middleware detects locale from URL prefix
2. `[locale]/layout.tsx` loads `messages/{locale}.json` via `getMessages()`
3. `NextIntlClientProvider` wraps the page tree
4. Components use `useTranslations("namespace")` to access strings
5. Each page exports `generateMetadata()` for locale-aware SEO

**Translation structure:** 13 namespaces (nav, hero, livingSpaces, winterGardens, about, strengths, engineering, portfolio, contact, footer, pages, services, faq).

---

## Contact Form & Email

### Client-side

- 5 required fields: name, email, phone, country, message
- Per-field validation with translated error messages
- Honeypot field for bot detection
- Loading state + success animation + auto-reset

### Server-side (`POST /api/contact`)

- IP-based rate limiting (3 requests/minute, in-memory)
- Honeypot check (silent success for bots)
- Field validation (regex for name, email, phone)
- HTML email template localized by country (Romanian or Bulgarian labels)
- Resend API integration with error code mapping

**Error codes returned:** `RATE_LIMITED`, `QUOTA_EXCEEDED`, `MISSING_FIELDS`, `INVALID_NAME`, `INVALID_EMAIL`, `INVALID_PHONE`, `INVALID_MESSAGE`, `SEND_FAILED` — all mapped to translated messages on the client.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone <repo-url>
cd abba-landing

npm install

cp env.example .env.local
```

Edit `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`, redirects to `/ro`.

To access from mobile on the same network:

```bash
npm run dev -- -H 0.0.0.0
```

### Build

```bash
npm run build
```

Generates 34 static pages across 3 locales.

### Production

```bash
npm start
```

---

## Environment Variables

| Variable               | Required | Description                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | API key from [resend.com](https://resend.com/api-keys)                          |
| `CONTACT_EMAIL`        | Yes      | Email address receiving contact form submissions                                |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Base URL for canonical links, sitemap, OG images (e.g. `https://abapergola.ro`) |

---

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start development server           |
| `npm run build` | Production build (34 static pages) |
| `npm start`     | Start production server            |

---

## Content Management

All text content lives in `messages/*.json` (translations) and `content/site-data.ts` (structured data).

### Editing text

Edit the corresponding key in all 3 files: `messages/ro.json`, `messages/en.json`, `messages/bg.json`.

### Adding a FAQ item

1. Add `q6` / `a6` keys to the `faq` namespace in all 3 message files
2. Add the item to the `items` array in `components/sections/faq/faq-section.tsx`

### Adding a service/project

1. Add an entry to `serviceItems` in `content/site-data.ts`
2. Add a corresponding `portfolioCategories` entry with images
3. Add translation keys to the `services` namespace in all 3 message files
4. Place images in `public/images/`

### Adding a language

1. Add the locale code to `lib/i18n/routing.ts` → `locales` array
2. Create `messages/{locale}.json` with all translation keys
3. Add the label to `language-switcher.tsx`

---

## Deployment

The project is ready for deployment on **Vercel** (auto-detects Next.js). Set the 3 environment variables in the Vercel dashboard.

For other platforms, ensure Node.js 18+ and run:

```bash
npm run build
npm start
```

---

## Browser Support

```
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 Edge versions
```

Configured in `package.json` → `browserslist`. No legacy polyfills shipped.
