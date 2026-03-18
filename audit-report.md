# Complete Next.js Project Audit: ABA Pergola Systems

## 1. App Structure Summary
The project is built on a modern Next.js 15+ (App Router) stack using React 19, Tailwind CSS v4, and TypeScript. The internationalization is handled gracefully via `next-intl` inside `app/[locale]`. The architecture is clean, separating concerns into `components/ui` (reusable atomic components) and `components/sections` (larger page blocks). Global design tokens and accessible baselines are properly defined in `globals.css`.

## 2. Immediate Red Flags
- **Overuse of `"use client"` Boundary:** Practically every section component (`hero-section`, `about-section`, etc.) is marked with `"use client"`. This forces the entire core content of the landing page into the client Javascript bundle, defeating the primary performance benefits of Next.js React Server Components (RSC).
- **Translation Provider Bloat:** Because most of the app is client-rendered, `NextIntlClientProvider` is passing all localized `messages` to the client in `layout.tsx`, drastically increasing HTML payload and JS parsing time.
- **Missing SEO File Standards:** The project is missing a dynamically generated `sitemap.ts` and `robots.ts`, which are critical for crawler indexability on an internationalized site.

---

## 3. Full Audit

### 3.1. SEO

**Issue 1: Missing Sitemap and Robots.txt**
- **Why it matters:** Search engines need a sitemap to discover all language variants (`/en`, `/ro`, `/bg`) and understand page hierarchy. `robots.txt` governs crawler access.
- **Severity:** High
- **Where:** App Root
- **Recommendation:** Create `app/sitemap.ts` and `app/robots.ts` using Next.js file-based metadata API. Ensure alternate language links are populated in the sitemap.
- **Expected impact:** Faster and more accurate indexing across all languages.

**Issue 2: Missing Root OpenGraph / Twitter Fallbacks**
- **Why it matters:** If a specific page forgets to generate OpenGraph tags, social sharing will look broken.
- **Severity:** Medium
- **Where:** `app/[locale]/layout.tsx` or `app/layout.tsx`
- **Recommendation:** Export a base `metadata` object in the root layout with default `openGraph` and `twitter` properties. Include a default sharing image (`opengraph-image.png`).

**Issue 3: Semantic Landmark Usage**
- **Why it matters:** While `main` and `section` tags are used, there is no `<nav>` explicitly checked, and the footer usage is standard. It is mostly well implemented, but ensure all interactive sections have standard `aria` regions.
- **Severity:** Low
- **Where:** Throughout
- **Recommendation:** Maintain the current good practices.

### 3.2. Performance

**Issue 1: Misuse of Client vs. Server Components (Hydration Cost)**
- **Why it matters:** Setting `"use client"` at the very top of massive layout blocks like `HeroSection` or `AboutSection` forces the browser to download and hydrate large amounts of JS, severely hurting Time to Interactive (TTI) and Total Blocking Time (TBT).
- **Severity:** Critical
- **Where:** `components/sections/*`
- **Recommendation:** Push the `"use client"` boundary down the tree. For instance, the static text in the Hero should be a Server Component, while only the carousel logic or animations (e.g., `Reveal` wrappers) should be client-side. Or, use Server Components for the sections and pass the animated elements as children.
- **Expected impact:** Massive reduction in First Load JS Size; better LCP and TTFB.

**Issue 2: `next-intl` Message Payload Bloat**
- **Why it matters:** Passing `messages={messages}` in the root layout to the client provider serializes the entire dictionary into the HTML document.
- **Severity:** High
- **Where:** `app/[locale]/layout.tsx`
- **Recommendation:** Because you should shift sections to Server Components, you won't need `NextIntlClientProvider` for the whole app. Only wrap specific deeply nested client components that actually need translations, and only pass the specific namespace they need.
- **Code Sample:**
  ```tsx
  // Instead of passing all messages to the root:
  <NextIntlClientProvider messages={pick(messages, 'ContactForm')}>
    <ContactForm />
  </NextIntlClientProvider>
  ```
- **Expected impact:** Reduction in raw HTML size and client-side memory footprint.

**Issue 3: Missing `next/dynamic` Imports for Heavy UI**
- **Why it matters:** Components below the fold (like `PortfolioSection` or `ContactSection`) are bundled in the initial load even if the user never scrolls down.
- **Severity:** Medium
- **Where:** `app/[locale]/page.tsx`
- **Recommendation:** Lazy-load sections below the fold using `next/dynamic`.
- **Code Sample:**
  ```tsx
  import dynamic from 'next/dynamic'
  const PortfolioSection = dynamic(() => import('@/components/sections/portfolio/portfolio-section').then(mod => mod.PortfolioSection))
  ```

### 3.3. Code Quality / Architecture

**Issue 1: Exporting inline components inside files**
- **Why it matters:** Some files contain multiple components (e.g., `HeroStatsBar` inside `hero-section.tsx`). While fine for small helpers, as the app scales, isolating them makes testing and static analysis easier.
- **Severity:** Low
- **Where:** `hero-section.tsx`
- **Recommendation:** Extract complex sub-components into their own files (`hero-stats-bar.tsx`) if they grow beyond 50 lines.

**Positive Note:** The modular separation of `components/ui` vs. `components/sections` is excellent. Tailwind configuration is cleanly handled in v4.

### 3.4. UX / Conversion

**Issue 1: Scroll Indicator Clarity**
- **Why it matters:** In `HeroSection`, there's a scroll hint, but its contrast against dynamic images might fail in certain carousel frames.
- **Severity:** Low
- **Where:** `components/sections/hero/hero-section.tsx`
- **Recommendation:** Add a very subtle dark radial gradient directly behind the scroll indicator to guarantee text readability regardless of the active image.

**Positive Note:** Primary CTAs are prominent, nicely contrasting (`variant="primary"`), and utilize clear verbs (derived from i18n). Structural hierarchy holds up nicely via `SectionHeading`.

### 3.5. Accessibility

**Positive Note:** The project excels here. Global CSS includes `prefers-reduced-motion` to cut down animations for sensitive users, and `:focus-visible` rings are strictly configured to maintain keyboard navigability. Color choices generally allow for high contrast text.

---

## 4. Priority Executions

### Top 3 Highest-Priority Fixes
1. **Refactor Client Boundaries:** Break out animated pieces (like counters or reveal elements) into small `"use client"` wrapper components. Make the main section layouts Server Components.
2. **Implement Dynamic Sitemaps:** Create `sitemap.ts` generating routes for all languages to ensure proper indexing.
3. **Limit `NextIntlClientProvider` Payload:** Remove the global provider wrapping the entire `<body>` if possible, and only provide specific message namespaces to interactive client components.

### Quick Wins (Under 1 Hour)
- Implement `next/dynamic` for sections below the folder in `app/[locale]/page.tsx`.
- Add OpenGraph default images and meta tag fallbacks in the root `layout.tsx`.
- Adjust `NextIntlClientProvider` to only pass the exact dictionary chunks needed.

### What is Already Well Implemented
- **Styling Architecture:** The usage of PostCSS, Tailwind v4, and custom design variables (`globals.css`) provides a highly maintainable styling pipeline.
- **Image Optimization:** Broad and correct usage of `<Image>` tags with proper `sizes`, `fill` properties, and responsive layout management.
- **Accessibility Baselines:** Keyboard focus states and reduced motion queries are proactively set up.
- **Semantic Headings:** `SectionHeading` enforces semantic `h2`/`h3` tags while allowing visual overrides, which perfectly bridges design and SEO requirements.
