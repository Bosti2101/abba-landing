# ABA Pergola Systems — Premium Multilingual Website

A production-grade, multilingual website for **ABA Pergola Systems**, built with Next.js 16, TypeScript, and a performance-first architecture. The site supports **Romanian**, **Turkish**, and **Bulgarian**, with premium design, elegant motion, and strong SEO foundations.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Internationalization (i18n)](#internationalization-i18n)
5. [Routing & Pages](#routing--pages)
6. [Content Architecture](#content-architecture)
7. [Design System](#design-system)
8. [Components](#components)
9. [Animations & Motion](#animations--motion)
10. [Carousel Implementation](#carousel-implementation)
11. [SEO](#seo)
12. [Performance Strategy](#performance-strategy)
13. [Accessibility](#accessibility)
14. [Images](#images)
15. [Adding / Editing Content](#adding--editing-content)
16. [Scripts](#scripts)

---

## Tech Stack

| Technology            | Role                                      |
|-----------------------|-------------------------------------------|
| **Next.js 16**        | App Router, SSR/SSG, routing, metadata    |
| **TypeScript**        | Type safety across the entire codebase    |
| **next-intl**         | Internationalization (3 locales)          |
| **Framer Motion**     | Scroll-reveal, entrance animations        |
| **Embla Carousel**    | Touch-friendly, custom-styled carousels   |
| **Tailwind CSS v4**   | Utility-first styling + CSS custom props  |

No additional UI libraries, icon packs, or state management. Dependencies are intentionally minimal.

---

## Project Structure

```
aba-pergola/
├── app/
│   ├── globals.css              # Design tokens + base styles + Tailwind
│   ├── layout.tsx               # Root HTML shell (Inter font, global CSS)
│   ├── page.tsx                 # Root redirect → /ro
│   └── [locale]/
│       ├── layout.tsx           # NextIntlClientProvider + Header + Footer
│       ├── page.tsx             # Home (all homepage sections)
│       ├── about/page.tsx       # About page
│       ├── services/page.tsx    # Services + FAQ
│       ├── projects/page.tsx    # Projects gallery
│       ├── contact/page.tsx     # Contact (branches + form)
│       └── faq/page.tsx         # FAQ standalone page
│
├── components/
│   ├── layout/
│   │   ├── header.tsx           # Sticky header (transparent → solid on scroll)
│   │   ├── footer.tsx           # Dark footer with subscribe form
│   │   └── language-switcher.tsx # RO / TR / BG locale toggle
│   │
│   ├── sections/                # One folder per section
│   │   ├── hero/hero-section.tsx
│   │   ├── living-spaces/living-spaces-section.tsx
│   │   ├── winter-gardens/winter-gardens-section.tsx
│   │   ├── about/about-section.tsx
│   │   ├── strengths/strengths-section.tsx
│   │   ├── engineering/engineering-section.tsx
│   │   ├── portfolio/portfolio-section.tsx
│   │   ├── services/services-section.tsx
│   │   ├── contact/contact-section.tsx
│   │   └── faq/faq-section.tsx
│   │
│   └── ui/                      # Reusable primitives
│       ├── button.tsx           # Primary / Outline / Ghost / Dark variants
│       ├── container.tsx        # Max-width wrapper (1360px)
│       ├── section-heading.tsx  # Label + Title + Description
│       ├── badge.tsx            # Small tag/label component
│       └── reveal.tsx           # Scroll-triggered reveal wrapper (Framer Motion)
│
├── content/
│   └── site-data.ts             # Structured data: stats, categories, branches, services
│
├── lib/
│   ├── i18n/
│   │   ├── routing.ts           # Locale definitions (ro, tr, bg) + routing config
│   │   ├── request.ts           # next-intl getRequestConfig (loads JSON messages)
│   │   └── navigation.ts        # Locale-aware Link, useRouter, usePathname
│   ├── motion/
│   │   └── variants.ts          # Framer Motion variant presets
│   └── utils/
│       └── cn.ts                # Minimal className merge utility
│
├── messages/
│   ├── ro.json                  # Romanian translations (all sections + pages)
│   ├── tr.json                  # Turkish translations
│   └── bg.json                  # Bulgarian translations
│
├── types/
│   └── content.ts               # TypeScript interfaces (StatItem, ServiceItem, etc.)
│
├── public/
│   └── images/                  # Hero, sections, portfolio, services (placeholder)
│       ├── hero-bg.jpg
│       ├── living-spaces.jpg
│       ├── winter-garden.jpg
│       ├── about-pergola.jpg
│       ├── strengths-1/2/3.jpg
│       ├── engineering-1/2.jpg
│       ├── services/*.jpg
│       └── portfolio/*.jpg
│
├── proxy.ts                     # next-intl middleware (locale detection + redirect)
├── next.config.ts               # Next.js config + next-intl plugin
├── tsconfig.json
├── package.json
└── sections.txt                 # Original content source (Romanian/English)
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server on port 3009
npm run dev -- -p 3009

# Production build
npm run build

# Start production server
npm start -- -p 3009
```

The site opens at `http://localhost:3009` and auto-redirects to `/ro` (default locale).

---

## Internationalization (i18n)

### How it works

The i18n system uses **next-intl** with the following flow:

```
Request → proxy.ts (middleware)
         ↓
         Detects locale from URL prefix (/ro, /tr, /bg)
         ↓
         app/[locale]/layout.tsx
         ↓
         getMessages() loads messages/{locale}.json
         ↓
         <NextIntlClientProvider> wraps the entire page tree
         ↓
         Any component calls useTranslations("namespace") to access strings
```

### Files involved

| File | Purpose |
|------|---------|
| `lib/i18n/routing.ts` | Defines `locales: ["ro", "tr", "bg"]`, `defaultLocale: "ro"` |
| `lib/i18n/request.ts` | `getRequestConfig` — resolves locale and loads the correct JSON |
| `lib/i18n/navigation.ts` | Exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect` |
| `proxy.ts` | Middleware that detects/redirects locale in URLs |
| `messages/ro.json` | All Romanian strings |
| `messages/tr.json` | All Turkish strings |
| `messages/bg.json` | All Bulgarian strings |

### Translation structure (each JSON)

```json
{
  "nav": { ... },         // Navigation labels
  "hero": { ... },        // Hero section
  "livingSpaces": { ... },
  "winterGardens": { ... },
  "about": { ... },
  "strengths": { ... },
  "engineering": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "footer": { ... },
  "pages": { ... },       // Page-level metadata (title, description)
  "services": { ... },
  "faq": { ... }
}
```

### Language switcher

Located in `components/layout/language-switcher.tsx`. It reads the current locale via `useLocale()`, and on click calls `router.replace(pathname, { locale: nextLocale })` to switch without losing the current page.

It renders as `RO / TR / BG` with the active locale highlighted in red.

### Adding a new language

1. Add the locale code to `lib/i18n/routing.ts` → `locales` array
2. Create `messages/{locale}.json` with all translation keys
3. Done — routing, switcher, and metadata pick it up automatically

---

## Routing & Pages

All user-facing routes live under `app/[locale]/`:

| Route | Page | Sections included |
|-------|------|-------------------|
| `/{locale}` | Home | Hero, LivingSpaces, WinterGardens, About, Strengths, Engineering, Services, Portfolio |
| `/{locale}/about` | About | Dark header + About + Strengths + Engineering |
| `/{locale}/services` | Services | Dark header + Services grid + FAQ |
| `/{locale}/projects` | Projects | Dark header + Portfolio carousel |
| `/{locale}/contact` | Contact | Dark header + Contact branches + form |
| `/{locale}/faq` | FAQ | Dark header + FAQ accordion |

Each page file:
- Uses `generateStaticParams()` to pre-render for all 3 locales
- Uses `generateMetadata()` for locale-aware SEO (title, description, OG)
- Calls `setRequestLocale()` for static rendering support

The root `app/page.tsx` simply redirects to `/ro`.

---

## Content Architecture

Content flows through three layers:

### Layer 1 — Source (`sections.txt`)
The original content brief. Not parsed at runtime; it was used to create the structured data.

### Layer 2 — Structured data (`content/site-data.ts`)
Static TypeScript data arrays:

| Export | Contains |
|--------|----------|
| `aboutStats` | 4 stat items (value, label, suffix) |
| `portfolioCategories` | 4 categories, each with 2 image references |
| `contactBranches` | Bulgaria + Romania branch info (email, phone, address, map URL) |
| `serviceItems` | 4 service cards (title key, description key, image, href) |

These reference translation keys (e.g., `"category1"`, `"item1Title"`) rather than raw text, so they work with any locale.

### Layer 3 — Translation files (`messages/*.json`)
All user-visible text. Components call `useTranslations("namespace")` and resolve keys like `t("title")`.

### Type definitions (`types/content.ts`)
Interfaces: `StatItem`, `StrengthItem`, `PortfolioCategory`, `PortfolioImage`, `ServiceItem`, `FaqItem`, `ContactBranch`, `NavigationItem`.

---

## Design System

### Design tokens (`app/globals.css`)

All design decisions are centralized as CSS custom properties:

```css
--brand-primary: #c0392b;          /* Red accent */
--brand-primary-hover: #a93226;
--brand-primary-light: #fdf2f0;    /* Light red tint */

--color-ink: #1a1a1a;              /* Primary text */
--color-ink-secondary: #4a4a4a;    /* Body text */
--color-ink-muted: #7a7a7a;        /* Subtle text */

--color-surface: #ffffff;           /* White background */
--color-surface-warm: #faf9f7;     /* Off-white sections */
--color-surface-dark: #111111;     /* Footer */

--section-padding-y: clamp(5rem, 10vw, 9rem);   /* Responsive section spacing */
--container-max: 1360px;
--container-padding: clamp(1.25rem, 4vw, 3rem);

--radius-sm/md/lg/xl               /* Border radius scale */
--shadow-card / --shadow-card-hover /* Card elevation */
```

### Utility classes (CSS)

| Class | Purpose |
|-------|---------|
| `.container-site` | Centers content, max-width 1360px, responsive padding |
| `.section-y` | Vertical section padding (responsive clamp) |
| `.section-y-sm` | Smaller vertical section padding |

### Tailwind usage

Tailwind v4 is used for component-level styling. The design tokens above are referenced via their CSS variable values directly in class names (e.g., `bg-[#faf9f7]`, `text-[#c0392b]`).

---

## Components

### UI Primitives (`components/ui/`)

**Button** — 4 variants (`primary`, `outline`, `ghost`, `dark`), 3 sizes (`sm`, `md`, `lg`). Includes focus-visible ring, disabled state, and cursor styles.

**Container** — Wraps content in a centered max-width container. Accepts `as` prop for semantic elements.

**SectionHeading** — Renders a label (uppercase red), title (h2/h3), and optional description. Supports `align: "center" | "left"` and `inverted` (white text for dark backgrounds).

**Badge** — Small inline label. Variants: `default`, `muted`, `brand`.

**Reveal** — Client component wrapping Framer Motion `useInView`. Any child gets scroll-triggered entrance animation. Accepts custom `variants` and `delay`.

### Layout Components (`components/layout/`)

**Header** — Fixed, transitions from transparent (over hero) to solid white with border on scroll. Desktop: horizontal nav + language switcher + CTA button. Mobile: hamburger → slide-in drawer from right. Active link has red underline.

**Footer** — Dark (`#111111`) background. Four-column grid: brand + tagline, Explore links, Support links, newsletter subscribe form. Copyright bar at bottom.

**LanguageSwitcher** — `RO / TR / BG` text buttons. Uses `useTransition` for non-blocking locale switches. Supports `inverted` prop (white text for transparent header state).

### Section Components (`components/sections/`)

Each section is a self-contained component:

| Section | Key features |
|---------|-------------|
| **HeroSection** | Full-screen image bg, gradient overlays, animated entrance (staggered), scroll indicator, bottom stats bar |
| **LivingSpacesSection** | Two-column (image + text), floating accent card on image, bullet feature list |
| **WinterGardensSection** | Dark background (`#1a1a1a`), inverted text, 3 benefit cards with icons, diagonal accent |
| **AboutSection** | Animated stat counters (trigger on viewport), warm background, decorative accent behind image |
| **StrengthsSection** | 2+1 image grid composition, staggered icon+text list items |
| **EngineeringSection** | 2x2 feature card grid with checkmark icons, stacked images |
| **ServicesSection** | 4-column card grid, each card has image + text + hover arrow animation |
| **PortfolioSection** | Filter tabs + Embla Carousel (full-bleed), hover overlay with caption, custom nav arrows |
| **ContactSection** | Two branch info cards with map embeds, dark contact form with validation |
| **FaqSection** | Accordion with animated expand/collapse, numbered items, plus→cross toggle icon |

---

## Animations & Motion

### Library
**Framer Motion** — used exclusively for scroll-reveal and entrance animations.

### Preset variants (`lib/motion/variants.ts`)

| Variant | Effect |
|---------|--------|
| `fadeInUp` | Opacity 0→1, Y 24→0 |
| `fadeIn` | Opacity only |
| `fadeInLeft` | Opacity + X -32→0 |
| `fadeInRight` | Opacity + X 32→0 |
| `scaleIn` | Opacity + Scale 0.94→1 |
| `staggerContainer` | Parent variant, staggers children by 120ms |

All use the `[0.22, 1, 0.36, 1]` easing curve for a smooth, premium feel.

### How reveal works

The `<Reveal>` component (`components/ui/reveal.tsx`):
1. Uses `useRef` + `useInView` from Framer Motion
2. Triggers when element enters viewport (with `-80px` margin)
3. Plays the variant animation once (`once: true`)
4. Accepts custom variants and delay

### Reduced motion

Global CSS includes:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### Specific animations
- **Hero**: Title, subtitle, CTAs enter with staggered delays (0.1s, 0.25s, 0.4s)
- **Stat counters**: `setInterval`-based counting animation triggered by `useInView`
- **FAQ accordion**: `AnimatePresence` with height 0→auto transition
- **Portfolio carousel**: `AnimatePresence` with scale+opacity entrance per slide

---

## Carousel Implementation

### Library
**Embla Carousel** via `embla-carousel-react`.

### Portfolio carousel (`portfolio-section.tsx`)

Configuration:
```ts
useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 })
```

Features:
- **Filter tabs** — All / Retractable Roof / Winter Garden / Bioclimatic / Guillotine. Clicking a tab filters the visible images.
- **Full-bleed layout** — Carousel extends beyond the container with dynamic left padding matching the container offset.
- **Custom navigation** — Two styled arrow buttons (bordered squares with hover state).
- **Hover interaction** — Each slide shows a gradient overlay + caption text on hover with `group-hover` transitions.
- **Touch/drag** — Native Embla swipe support.
- **Keyboard accessible** — Arrow buttons are focusable with labels.

Slides are `300px` (mobile) → `360px` (tablet) → `420px` (desktop) with `aspect-[3/4]`.

---

## SEO

### Per-page metadata

Every page exports `generateMetadata()` which:
1. Resolves the locale from params
2. Loads translations from the `"pages"` namespace
3. Returns `title`, `description`, `openGraph`, and `alternates`

Example output for the home page (Romanian):
```
title: "ABA Pergola Systems — Soluții Premium de Pergole"
description: "Pergole bioclimatice, grădini de iarnă și sisteme de sticlă premium..."
og:type: "website"
og:locale: "ro"
alternates.languages: { ro: "/ro", tr: "/tr", bg: "/bg" }
```

### Structural SEO
- Semantic HTML throughout (`<section>`, `<nav>`, `<main>`, `<footer>`, `<article>`)
- Proper heading hierarchy (one `<h1>` per page, `<h2>` for sections, `<h3>` for subsections)
- `aria-label` on all sections and interactive regions
- Internal linking between pages via locale-aware `<Link>`
- Clean URL structure: `/{locale}/{page}`

---

## Performance Strategy

- **Server components by default** — Only sections that use browser APIs (`useState`, `useEffect`, Framer Motion, Embla) are marked `"use client"`
- **Static generation** — All pages use `generateStaticParams()` for pre-rendering
- **`next/image`** — All images use `fill` + `sizes` prop for responsive loading, `priority` only on hero
- **Lazy loading** — Non-critical images load lazily (Next.js default)
- **Minimal dependencies** — Only 3 runtime deps beyond Next.js (next-intl, framer-motion, embla-carousel-react)
- **Font optimization** — Inter loaded via `next/font/google` with `display: "swap"` and `latin-ext` subset
- **CSS** — Tailwind v4 with PostCSS, no runtime CSS-in-JS
- **Layout stability** — All images have explicit aspect ratios to prevent CLS

---

## Accessibility

- Semantic `<section>`, `<nav>`, `<main>`, `<footer>` landmarks
- `aria-label` on all sections, navigation regions, and the language switcher
- `aria-expanded` on mobile menu toggle and FAQ accordion items
- `role="tablist"` + `role="tab"` + `aria-selected` on portfolio filter tabs
- Focus-visible ring (`outline: 2px solid #c0392b`) globally
- Keyboard-navigable: all interactive elements are buttons or links
- All images have descriptive `alt` text
- Form fields have associated `<label>` elements
- Sufficient color contrast (dark text on light, white on dark/red)
- Reduced motion media query respected

---

## Images

All images are **placeholders** (1x1 transparent PNGs) located in `public/images/`.

To replace with real images:
1. Drop your `.jpg`/`.webp` files into `public/images/` matching the existing filenames
2. Recommended sizes:
   - `hero-bg.jpg` — 1920x1080 or larger
   - Section images — 1200x900 (landscape) or 900x1200 (portrait)
   - Portfolio images — 800x1067 (3:4 ratio)
   - Service cards — 800x600 (4:3 ratio)
3. `next/image` handles format conversion (AVIF/WebP) and resizing automatically

---

## Adding / Editing Content

### Change text
Edit the corresponding key in `messages/ro.json`, `messages/tr.json`, and `messages/bg.json`.

### Add a new FAQ item
1. Add `q6` / `a6` keys to all 3 message files
2. Add the item to the `items` array in `faq-section.tsx`

### Add a portfolio category
1. Add the category object to `portfolioCategories` in `content/site-data.ts`
2. Add `category5` key to the `portfolio` namespace in all 3 message files
3. Place images in `public/images/portfolio/`

### Add a new page
1. Create `app/[locale]/your-page/page.tsx`
2. Export `generateStaticParams`, `generateMetadata`, and the page component
3. Add navigation entries in the `navItems` array in `header.tsx`
4. Add translation keys to `nav` and `pages` namespaces

### Add a new language
1. Add locale to `lib/i18n/routing.ts` → `locales` array
2. Create `messages/{locale}.json` (copy an existing one and translate)
3. Add label to `localeLabels` in `language-switcher.tsx`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (default port 3000) |
| `npm run dev -- -p 3009` | Start dev server on port 3009 |
| `npm run build` | Production build (generates 22 static pages) |
| `npm start` | Start production server |
| `npm start -- -p 3009` | Start production server on port 3009 |
