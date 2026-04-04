# Drive Point Exchange — Website Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the Drive Point Exchange site to match the new glass-effect logo — frosted light theme, Trustpilot reviews, social media carousel with cron job.

**Architecture:** Replace the orange color scheme with navy/blue/red, swap Inter for Saira (headings) + Outfit (body), add Trustpilot widget replacing hardcoded testimonials, add horizontal social feed carousel backed by Supabase + Vercel cron. All new Tailwind tokens use v4 `@theme` blocks in CSS.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Supabase, Vercel, Google Fonts (Saira + Outfit)

**Spec:** `docs/superpowers/specs/2026-03-20-apex-rebrand-design.md`

---

## Task 1: Theme Foundation — Fonts, Colors, CSS Tokens

**Files:**
- Modify: `app/layout.tsx:1-152`
- Modify: `app/globals.css:1-117`
- Modify: `tailwind.config.ts:1-106`

- [ ] **Step 1: Update layout.tsx — add Saira + Outfit fonts, Trustpilot script, metadata**

Replace the Inter-only font setup with Saira + Outfit, add Trustpilot bootstrap, update theme-color and structured data logo URL.

```tsx
// app/layout.tsx — replace lines 1-13 with:
import type { Metadata } from "next";
import { Saira, Outfit } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../lib/i18n/context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
```

Update `theme-color` meta (line 141): `#f97316` → `#1a2744`

Update structured data logo (line 99): `"logo": "https://www.drivepointexchange.com/logo-glass.png"`

Add Trustpilot script inside `<head>` (after line 141):
```tsx
<Script
  src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.boot.min.js"
  strategy="lazyOnload"
/>
```

Update body className (line 143):
```tsx
<body className={`${saira.variable} ${outfit.variable} font-outfit antialiased`}>
```

- [ ] **Step 2: Rewrite globals.css — new @theme block, navy scrollbar, frosted utilities**

Replace entire `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #f8fafc;
  --foreground: #0a1628;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-saira: var(--font-saira), 'Saira', sans-serif;
  --font-outfit: var(--font-outfit), 'Outfit', sans-serif;
  --font-sans: var(--font-outfit), 'Outfit', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace;

  /* Brand colors */
  --color-dpe-navy: #1a2744;
  --color-dpe-navy-deep: #0a1628;
  --color-dpe-blue: #3b82f6;
  --color-dpe-blue-light: #60a5fa;
  --color-dpe-green: #dc2626;
  --color-dpe-slate: #64748b;
  --color-dpe-bg: #f8fafc;
  --color-dpe-bg-alt: #e8edf4;
  --color-dpe-card: rgba(255,255,255,0.85);
  --color-dpe-card-border: rgba(255,255,255,0.40);
}

html {
  overflow-x: hidden;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-outfit), 'Outfit', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Navy scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #1a2744; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #3b82f6; }

/* Smooth transitions */
a, button, input, select, textarea, [class*="hover:"] {
  transition-property: color, background-color, border-color, opacity, transform, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

/* Range slider styles (keep existing blue gradients — already correct) */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-track {
  background: #e2e8f0; height: 12px; border-radius: 6px; border: 1px solid #cbd5e1;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  height: 24px; width: 24px; border-radius: 50%; border: 3px solid #ffffff;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer; transition: all 0.2s ease;
}
input[type="range"]::-webkit-slider-thumb:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4), 0 4px 8px rgba(0, 0, 0, 0.15);
}
input[type="range"]::-moz-range-track {
  background: #e2e8f0; height: 12px; border-radius: 6px; border: 1px solid #cbd5e1;
}
input[type="range"]::-moz-range-thumb {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  height: 24px; width: 24px; border-radius: 50%; border: 3px solid #ffffff;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer; transition: all 0.2s ease;
}
```

- [ ] **Step 3: Clean up tailwind.config.ts — remove orange, primary, brand**

Remove the `apex.orange` scale (lines 28-39), `primary` scale (lines 55-66), `brand` scale (lines 67-70). Keep `apex.blue`, `apex.gray`, `gray`, and all non-color config (fonts, shadows, borderRadius, backgroundImage). Update `fontFamily`:

```ts
fontFamily: {
  sans: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
  saira: ['var(--font-saira)', 'Saira', 'system-ui', 'sans-serif'],
  display: ['var(--font-saira)', 'Saira', 'system-ui', 'sans-serif'],
},
```

- [ ] **Step 4: Verify build compiles**

Run: `cd /c/dev/Apex/apex-auto && npm run build`
Expected: Build succeeds (warnings about unused classes are OK; errors are not)

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tailwind.config.ts
git commit -m "feat(theme): replace orange palette with navy/blue, add Saira + Outfit fonts"
```

---

## Task 2: Logo — Process and Update References

**Files:**
- Create: `public/logo-glass.png` (optimized from source)
- Modify: `components/Navigation.tsx:34-42`
- Modify: `components/Footer.tsx:39-45`

- [ ] **Step 0: MANUAL PREREQUISITE — Create transparent PNG**

The source file `public/Apex logo glass effe.png` (2.6 MB) has a gray background that MUST be removed to a true transparent background before proceeding. This cannot be reliably automated in CLI.

**Options (pick one):**
1. **remove.bg** — Upload to https://www.remove.bg, download transparent PNG
2. **Figma/Photoshop** — Open, select background, delete, export as PNG-24 with transparency
3. **ImageMagick** (if installed): `magick "public/Apex logo glass effe.png" -fuzz 15% -transparent "#c8c8c8" -resize 400x "public/logo-glass.png"`

Save the result as `public/logo-glass.png` (target < 300 KB, transparent background). Verify by opening the file — the background should be a checkerboard pattern in any image editor.

**Do NOT proceed to Step 1 until this is done.** The `mix-blend-mode: multiply` trick is a dev-only fallback — it fails on the dark footer background.

- [ ] **Step 1: Optimize and verify logo file exists**

```bash
ls -la "public/logo-glass.png"
# Verify: file exists, size < 500 KB, is a valid PNG
```

If the manual step wasn't done yet, use `mix-blend-mode: multiply` as a temporary dev fallback (nav only) and file an issue to get the transparent PNG from the design team.

- [ ] **Step 2: Update Navigation.tsx logo (lines 34-42)**

Replace:
```tsx
<Image
  src="/logo.png"
  alt="Drive Point Exchange Logo"
  width={160}
  height={60}
  className="h-16 w-auto"
/>
```
With:
```tsx
<Image
  src="/logo-glass.png"
  alt="Drive Point Exchange Logo"
  width={200}
  height={80}
  className="h-14 w-auto mix-blend-multiply"
  priority
/>
```

- [ ] **Step 3: Update Footer.tsx logo (lines 39-45)**

Replace:
```tsx
<Image
  src="/logo.png"
  alt="Drive Point Exchange Logo"
  width={160}
  height={60}
  className="h-12 w-auto"
/>
```
With:
```tsx
<Image
  src="/logo-glass.png"
  alt="Drive Point Exchange Logo"
  width={160}
  height={60}
  className="h-10 w-auto brightness-[2] contrast-[0.8]"
/>
```

Note: `brightness-[2] contrast-[0.8]` lightens the logo for the dark footer background. If this doesn't look right, switch to `invert filter` or provide a separate light variant.

- [ ] **Step 4: Create favicon from logo "A" mark**

Extract the triangular "A" mark from the logo for the browser tab favicon. Options:
1. **Manual** — Crop the "A" triangle from the logo in any image editor, export as 32x32 and 16x16 ICO
2. **Online** — Use https://favicon.io/favicon-converter/ with a cropped "A" mark PNG
3. Save to `app/favicon.ico` (Next.js App Router auto-serves this)

If the "A" mark cannot be cleanly extracted, use the full logo scaled down — Next.js Image optimization handles the sizing.

- [ ] **Step 5: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 6: Commit**

```bash
git add public/logo-glass.png app/favicon.ico components/Navigation.tsx components/Footer.tsx
git commit -m "feat(logo): replace old logo with glass-effect logo + favicon"
```

---

## Task 3: Navigation — Frosted Glass Restyle

**Files:**
- Modify: `components/Navigation.tsx:1-258`

- [ ] **Step 1: Update nav container (line 29)**

Replace:
```tsx
<nav className="bg-white shadow-carvana border-b border-gray-200 sticky top-0 z-50">
```
With:
```tsx
<nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-50">
```

- [ ] **Step 2: Replace all orange/primary hover classes**

Global replacements in Navigation.tsx:
- `hover:text-primary-600` → `hover:text-dpe-blue` (lines 52, 62, 76, 90, 167, 201, 215, 236)
- `bg-orange-500 hover:bg-orange-600` → `bg-dpe-navy hover:bg-dpe-navy-deep` (lines 131, 158)
- `bg-orange-50 text-orange-600` → `bg-blue-50 text-dpe-blue` (lines 110, 235)
- `text-orange-600` (checkmark SVGs) → `text-dpe-blue` (lines 117, 242)
- `hover:text-orange-500` → `hover:text-dpe-blue` (line 142)
- `text-orange-500` (24/7 number) → `text-dpe-blue` (line 251)
- `hover:text-orange-600` → `hover:text-dpe-navy` (line 251)

- [ ] **Step 3: Update mobile menu background (line 196)**

Replace `bg-gray-50` with `bg-white/90 backdrop-blur-xl`

- [ ] **Step 4: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 5: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat(nav): frosted glass nav bar with navy color scheme"
```

---

## Task 4: Footer — Navy Theme Restyle

**Files:**
- Modify: `components/Footer.tsx:1-135`

- [ ] **Step 1: Replace all orange references in Footer.tsx**

Global replacements:
- `bg-orange-500` → `bg-dpe-blue` (line 52, nationwide dot)
- `hover:text-orange-400` → `hover:text-dpe-blue-light` (lines 70, 87, 104, 123, 126)
- `text-orange-500` → `text-dpe-blue` (if any phone number styling)

- [ ] **Step 2: Update 24/7 phone link styling (line 58)**

Replace:
```tsx
<a href="tel:+17737821005" className="text-white font-semibold hover:text-orange-400 transition-colors">(773) 782-1005</a>
```
With:
```tsx
<a href="tel:+17737821005" className="text-white font-semibold hover:text-dpe-blue-light transition-colors">(773) 782-1005</a>
```

- [ ] **Step 3: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat(footer): replace orange with navy/blue theme"
```

---

## Task 5: Homepage Hero — Frosted Light Restyle

**Files:**
- Modify: `app/(home)/page.tsx:12-172`

- [ ] **Step 1: Upgrade Framer Motion variants (lines 12-36)**

Replace:
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```
With:
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 100, damping: 15 }
};
```

Apply same spring transition to `fadeInLeft` and `fadeInRight` (change `duration: 0.6` → `type: "spring", stiffness: 100, damping: 15`).

Update `staggerChildren` delay from `0.1` → `0.12`.

- [ ] **Step 2: Replace dark hero with frosted light hero (lines 82-172)**

Replace the hero section. Key changes:
- Remove the full-bleed background image + dark overlay (lines 83-92)
- Replace with frosted light gradient background
- Change all `text-white` → `text-[#0a1628]` (navy)
- Change all `text-gray-200` → `text-dpe-slate`
- Change `bg-orange-500` check/dollar icons → `bg-dpe-navy`
- Change CTA button `!bg-orange-500` → `bg-dpe-navy text-white hover:bg-dpe-navy-deep`
- Add frosted treatment to calculator card: `bg-white/70 backdrop-blur-md rounded-2xl shadow-lg shadow-blue-500/5 border border-white/40`

The hero section becomes:
```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#e8edf4]">
  {/* Decorative glow */}
  <div className="absolute inset-0 pointer-events-none"
    style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.08), transparent 60%)' }}
  />
  {/* Keep hero image as subtle decorative element */}
  <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
    <Image src="/auto/car-main hero.jpg" alt="" fill className="object-cover" priority />
  </div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
    {/* ... grid content with navy text ... */}
  </div>
</section>
```

- [ ] **Step 3: Verify dev server renders correctly**

Run: `cd /c/dev/Apex/apex-auto && npm run dev`
Check: http://localhost:3000 — hero should show frosted light background with navy text

- [ ] **Step 4: Commit**

```bash
git add app/\(home\)/page.tsx
git commit -m "feat(home): restyle hero to frosted light theme"
```

---

## Task 6: Homepage — Services Grid + Trust Section Restyle

**Files:**
- Modify: `app/(home)/page.tsx:175-284`

- [ ] **Step 1: Restyle services grid section (lines 175-235)**

- Section background: `bg-white` → `bg-[#f8fafc]`
- Service cards (line 204): Replace `bg-white rounded-carvana shadow-carvana-lg` with:
  `bg-white/70 backdrop-blur-md rounded-2xl shadow-lg shadow-blue-500/5 border border-white/40 hover:bg-white/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`
- Button (line 223): `!bg-orange-500 hover:!bg-blue-600` → `bg-dpe-navy hover:bg-dpe-navy-deep`

- [ ] **Step 2: Restyle trust section (lines 237-284)**

- Section background: `bg-gray-50` → `bg-white`
- Add divider above: `<div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />`

- [ ] **Step 3: Restyle CTA section (lines 376-407)**

- Background: `bg-gray-900` → `bg-dpe-navy-deep`
- CTA buttons (lines 394, 400): `!bg-orange-500 hover:!bg-blue-600` → `bg-dpe-green hover:bg-red-700`

- [ ] **Step 4: Commit**

```bash
git add app/\(home\)/page.tsx
git commit -m "feat(home): restyle services grid, trust section, CTA to frosted theme"
```

---

## Task 7: Trustpilot — Replace Testimonials

**Files:**
- Create: `components/TrustpilotReviews.tsx`
- Modify: `app/(home)/page.tsx:285-374` (replace testimonials section)

- [ ] **Step 1: Create TrustpilotReviews component**

```tsx
// components/TrustpilotReviews.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function TrustpilotReviews() {
  const microRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let loadAttempted = false;

    // Try to load widgets once Trustpilot script is ready
    const tryLoad = () => {
      if (loadAttempted) return;
      if (window.Trustpilot) {
        loadAttempted = true;
        if (microRef.current) window.Trustpilot.loadFromElement(microRef.current, true);
        if (carouselRef.current) window.Trustpilot.loadFromElement(carouselRef.current, true);
      }
    };

    // Attempt after 1s (script may already be loaded)
    const earlyTimer = setTimeout(tryLoad, 1000);

    // Fallback: if Trustpilot global still missing after 5s, show fallback link
    const fallbackTimer = setTimeout(() => {
      if (!window.Trustpilot) {
        setShowFallback(true);
      }
    }, 5000);

    return () => {
      clearTimeout(earlyTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-saira text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4 tracking-wide">
            What Our Customers Say
          </h2>
          <p className="text-lg text-dpe-slate">
            Verified reviews on Trustpilot
          </p>
        </div>

        {/* Micro Star Badge */}
        <div className="flex justify-center mb-8">
          <div
            ref={microRef}
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="5418015fb0d04a0c9cf721f2"
            data-businessunit-id="69ba16dc64b632407461914d"
            data-style-height="30px"
            data-style-width="250px"
            data-stars="1,2,3,4,5"
            data-review-languages="en"
          >
            <a href="https://www.trustpilot.com/review/drivepointexchange.com" target="_blank" rel="noopener noreferrer">
              Trustpilot
            </a>
          </div>
        </div>

        {/* Review Carousel */}
        <div
          ref={carouselRef}
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="69ba16dc64b632407461914d"
          data-style-height="350px"
          data-style-width="100%"
          data-stars="1,2,3,4,5"
          data-review-languages="en"
        >
          <a href="https://www.trustpilot.com/review/drivepointexchange.com" target="_blank" rel="noopener noreferrer">
            Trustpilot
          </a>
        </div>

        {/* Runtime fallback — shows if Trustpilot script blocked (ad blocker, etc.) */}
        {showFallback && (
          <div className="text-center mt-8">
            <a
              href="https://www.trustpilot.com/review/drivepointexchange.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dpe-blue hover:text-dpe-navy font-medium"
            >
              Read our verified reviews on Trustpilot →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Trustpilot type declaration**

Add to `app/layout.tsx` or a `types/trustpilot.d.ts`:
```ts
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force: boolean) => void;
    };
  }
}
```

- [ ] **Step 3: Replace testimonials in homepage (lines 285-374)**

In `app/(home)/page.tsx`:
- Add import: `import TrustpilotReviews from '../../components/TrustpilotReviews';`
- Remove `const testimonials = ...` (line 74)
- Delete entire testimonials section (lines 285-374)
- Replace with: `<TrustpilotReviews />`

- [ ] **Step 4: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 5: Commit**

```bash
git add components/TrustpilotReviews.tsx app/\(home\)/page.tsx
git commit -m "feat(reviews): replace hardcoded testimonials with Trustpilot widget"
```

---

## Task 8: Social Feed — UI Component

**Files:**
- Create: `components/SocialFeed.tsx`
- Modify: `app/(home)/page.tsx` (add section)

- [ ] **Step 1: Create SocialFeed component**

```tsx
// components/SocialFeed.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'tiktok';
  url: string;
  thumbnail: string | null;
  caption: string | null;
  posted_at: string | null;
}

const PLATFORM_CONFIG = {
  instagram: { color: '#e1306c', label: 'Instagram', handle: '@apexautosolutionsinc' },
  facebook: { color: '#1877f2', label: 'Facebook', handle: 'Drive Point Exchange' },
  tiktok: { color: '#010101', label: 'TikTok', handle: '@apexautosolutionsinc' },
} as const;

const PROFILE_URLS = {
  instagram: 'https://www.instagram.com/apexautosolutionsinc',
  facebook: 'https://www.facebook.com/apexautosolutions',
  tiktok: 'https://www.tiktok.com/@apexautosolutionsinc',
} as const;

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function SocialFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    fetch('/api/social/feed')
      .then(res => res.ok ? res.json() : { posts: [] })
      .then(data => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (prefersReducedMotion || isPaused || !scrollRef.current) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 272, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const showFallback = posts.length === 0;

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-saira text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4 tracking-wide">
            Follow Our Journey
          </h2>
          <p className="text-lg text-dpe-slate">
            Latest from our social channels
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {showFallback ? (
            // Fallback: follow cards
            (['instagram', 'facebook', 'tiktok'] as const).map(platform => (
              <a
                key={platform}
                href={PROFILE_URLS[platform]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-64 flex-shrink-0 snap-start bg-white/70 backdrop-blur-md border border-white/40 rounded-xl p-8 text-center hover:bg-white/90 hover:shadow-xl transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: PLATFORM_CONFIG[platform].color }}
                />
                <h3 className="font-saira font-bold text-[#0a1628] mb-1">
                  {PLATFORM_CONFIG[platform].label}
                </h3>
                <p className="text-sm text-dpe-slate mb-4">
                  {PLATFORM_CONFIG[platform].handle}
                </p>
                <span className="text-dpe-blue font-medium text-sm">
                  Follow us →
                </span>
              </a>
            ))
          ) : (
            <>
              {posts.map(post => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-64 flex-shrink-0 snap-start bg-white/70 backdrop-blur-md border border-white/40 rounded-xl overflow-hidden hover:bg-white/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  {post.thumbnail ? (
                    <div className="relative aspect-square">
                      <Image src={post.thumbnail} alt={post.caption || ''} fill className="object-cover" />
                    </div>
                  ) : (
                    <div
                      className="aspect-square flex items-center justify-center"
                      style={{ backgroundColor: PLATFORM_CONFIG[post.platform].color + '15' }}
                    >
                      <span className="text-4xl opacity-30">
                        {post.platform === 'instagram' ? '📷' : post.platform === 'facebook' ? '📘' : '🎵'}
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    {post.caption && (
                      <p className="text-sm text-[#0a1628] line-clamp-2 mb-3">{post.caption}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-dpe-slate">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: PLATFORM_CONFIG[post.platform].color }}
                      />
                      <span>{PLATFORM_CONFIG[post.platform].handle}</span>
                      {post.posted_at && <span className="ml-auto">{timeAgo(post.posted_at)}</span>}
                    </div>
                  </div>
                </a>
              ))}
              {/* End: follow cards */}
              {(['instagram', 'facebook', 'tiktok'] as const).map(platform => (
                <a
                  key={`follow-${platform}`}
                  href={PROFILE_URLS[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-48 flex-shrink-0 snap-start bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/70 transition-all duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-full mb-3"
                    style={{ backgroundColor: PLATFORM_CONFIG[platform].color }}
                  />
                  <span className="text-sm font-medium" style={{ color: PLATFORM_CONFIG[platform].color }}>
                    Follow on {PLATFORM_CONFIG[platform].label} →
                  </span>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add SocialFeed to homepage**

In `app/(home)/page.tsx`, add import:
```tsx
import SocialFeed from '../../components/SocialFeed';
```

Add `<SocialFeed />` after `<TrustpilotReviews />` and before the Final CTA section.

- [ ] **Step 3: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 4: Commit**

```bash
git add components/SocialFeed.tsx app/\(home\)/page.tsx
git commit -m "feat(social): add horizontal carousel social feed component"
```

---

## Task 9: Social Feed — Backend (Supabase + Cron)

**Files:**
- Create: `supabase-migration-social-posts.sql`
- Create: `app/api/social/refresh/route.ts`
- Create: `app/api/social/feed/route.ts`
- Create: `vercel.json`
- Modify: `.env.local` (add CRON_SECRET)
- Modify: `next.config.ts` (add remote image domains)

- [ ] **Step 1: Create Supabase migration**

```sql
-- supabase-migration-social-posts.sql
CREATE TABLE IF NOT EXISTS social_posts (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  caption TEXT,
  embed_html TEXT,
  posted_at TIMESTAMPTZ,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON social_posts FOR SELECT USING (true);
```

Run this migration in Supabase dashboard SQL editor.

- [ ] **Step 2: Create public feed API route**

```ts
// app/api/social/feed/route.ts
import { NextResponse } from 'next/server';
import { createBrowserClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createBrowserClient();
    const { data, error } = await supabase
      .from('social_posts')
      .select('id, platform, url, thumbnail, caption, posted_at')
      .order('posted_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return NextResponse.json(
      { posts: data || [] },
      {
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch {
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
```

- [ ] **Step 3: Create cron refresh API route**

```ts
// app/api/social/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Seed URLs — manually curated post URLs to fetch via oEmbed.
// Update this list as new content is posted, or replace with API-based
// discovery in Phase 2.
const SEED_POSTS = {
  tiktok: [
    // Add TikTok video URLs here as content is posted, e.g.:
    // 'https://www.tiktok.com/@apexautosolutionsinc/video/1234567890',
  ] as string[],
  instagram: [
    // Add Instagram post URLs here, e.g.:
    // 'https://www.instagram.com/p/ABC123/',
  ] as string[],
  facebook: [
    // Facebook doesn't have a clean oEmbed — we use page plugin embeds.
    // Add individual post URLs if available, e.g.:
    // 'https://www.facebook.com/apexautosolutions/posts/123456',
  ] as string[],
};

async function fetchTikTokOEmbed(url: string) {
  const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    id: `tt_${data.author_unique_id}_${url.split('/').pop()}`,
    platform: 'tiktok' as const,
    url,
    thumbnail: data.thumbnail_url || null,
    caption: data.title || null,
    embed_html: data.html || null,
    posted_at: new Date().toISOString(),
  };
}

async function fetchInstagramOEmbed(url: string, token: string) {
  const res = await fetch(
    `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${token}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return {
    id: `ig_${url.split('/p/')[1]?.replace('/', '') || Date.now()}`,
    platform: 'instagram' as const,
    url,
    thumbnail: data.thumbnail_url || null,
    caption: data.title || null,
    embed_html: data.html || null,
    posted_at: new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends this as Authorization header)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const results: { platform: string; success: boolean; count: number; error?: string }[] = [];

  // TikTok oEmbed (public, no auth needed)
  try {
    const posts = await Promise.all(SEED_POSTS.tiktok.map(fetchTikTokOEmbed));
    const valid = posts.filter(Boolean);
    if (valid.length > 0) {
      const { error } = await supabase.from('social_posts').upsert(valid, { onConflict: 'id' });
      if (error) throw error;
    }
    results.push({ platform: 'tiktok', success: true, count: valid.length });
  } catch (err) {
    results.push({ platform: 'tiktok', success: false, count: 0, error: String(err) });
  }

  // Instagram oEmbed (requires INSTAGRAM_OEMBED_TOKEN)
  const igToken = process.env.INSTAGRAM_OEMBED_TOKEN;
  if (!igToken) {
    console.warn('[social/refresh] INSTAGRAM_OEMBED_TOKEN not configured — skipping Instagram');
    results.push({ platform: 'instagram', success: false, count: 0, error: 'Token not configured' });
  } else {
    try {
      const posts = await Promise.all(SEED_POSTS.instagram.map(url => fetchInstagramOEmbed(url, igToken)));
      const valid = posts.filter(Boolean);
      if (valid.length > 0) {
        const { error } = await supabase.from('social_posts').upsert(valid, { onConflict: 'id' });
        if (error) throw error;
      }
      results.push({ platform: 'instagram', success: true, count: valid.length });
    } catch (err) {
      results.push({ platform: 'instagram', success: false, count: 0, error: String(err) });
    }
  }

  // Facebook — no reliable public oEmbed; store page plugin embed as single entry
  try {
    const fbEntry = {
      id: 'fb_page_apexautosolutions',
      platform: 'facebook' as const,
      url: 'https://www.facebook.com/apexautosolutions',
      thumbnail: null,
      caption: 'Follow Drive Point Exchange on Facebook',
      embed_html: null,
      posted_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('social_posts').upsert([fbEntry], { onConflict: 'id' });
    if (error) throw error;
    results.push({ platform: 'facebook', success: true, count: 1 });
  } catch (err) {
    results.push({ platform: 'facebook', success: false, count: 0, error: String(err) });
  }

  return NextResponse.json({ results, timestamp: new Date().toISOString() });
}
```

**Note on seed URLs:** The `SEED_POSTS` object must be populated with real post URLs as content is published. This is a Phase 1 limitation — the oEmbed APIs require specific post URLs; they cannot discover/list posts. Phase 2 (official APIs) will replace this with automatic post discovery. Until seed URLs are added, the feed will show the fallback "Follow us" cards, which is the designed graceful degradation.

- [ ] **Step 4: Create vercel.json**

```json
{
  "crons": [
    {
      "path": "/api/social/refresh",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

- [ ] **Step 5: Update next.config.ts — add remote image domains**

Add to `images` config in `next.config.ts`:
```ts
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  remotePatterns: [
    { protocol: 'https', hostname: '**.cdninstagram.com' },
    { protocol: 'https', hostname: '**.fbcdn.net' },
    { protocol: 'https', hostname: '**.tiktokcdn.com' },
    { protocol: 'https', hostname: 'widget.trustpilot.com' },
  ],
},
```

- [ ] **Step 6: Add CRON_SECRET to .env.local**

```bash
# Generate a secure random secret:
# openssl rand -hex 32
CRON_SECRET=<paste-random-secret-here>
```

- [ ] **Step 7: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 8: Commit**

```bash
git add supabase-migration-social-posts.sql app/api/social/ vercel.json next.config.ts
git commit -m "feat(social): add Supabase social_posts table, cron refresh API, feed endpoint"
```

---

## Task 10: Page Restyles — Services, Benefits, About Us, Contact, Calculator

**Files:**
- Modify: `app/services/page.tsx`
- Modify: `app/benefits/page.tsx`
- Modify: `app/about-us/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/calculator/page.tsx`

These are repetitive — the same pattern applies to each. Apply these global find-and-replace patterns across all 5 files:

- [ ] **Step 1: Batch find-and-replace across all 5 page files**

| Find | Replace | Scope |
|------|---------|-------|
| `!bg-orange-500` | `bg-dpe-navy` | All buttons |
| `hover:!bg-blue-600` | `hover:bg-dpe-navy-deep` | All button hovers |
| `!border-orange-500` | `border-dpe-navy` | Hero button borders |
| `hover:!border-blue-600` | `hover:border-dpe-navy-deep` | Hero button hover borders |
| `bg-orange-500` (non-button, e.g. CTA sections, dots) | `bg-dpe-navy` | CTA sections, feature indicators |
| `text-orange-500` | `text-dpe-blue` | Link text, accents |
| `text-primary-500` | `text-dpe-blue` | Team titles, CTA text |
| `bg-primary-500` | `bg-dpe-navy` | Statistics cards |
| `hover:text-primary-600` | `hover:text-dpe-blue` | Nav-style links |
| `focus:ring-primary-500` | `focus:ring-dpe-blue` | Form focus rings |
| `focus:ring-orange-500` | `focus:ring-dpe-blue` | Input focus rings |
| `border-orange-500` | `border-dpe-blue` | Loading spinners |
| `border-orange-200` | `border-blue-200` | Warning borders |
| `bg-orange-50` | `bg-blue-50` | Warning backgrounds |
| `rounded-carvana` | `rounded-2xl` | Card borders |
| `shadow-carvana-lg` | `shadow-lg shadow-blue-500/5` | Card shadows |
| `shadow-carvana` | `shadow-sm` | Light shadows |

- [ ] **Step 2: Add frosted glass treatment to service cards**

In each page, add `backdrop-blur-md border border-white/40` to the main card containers alongside the rounded-2xl shadow treatment.

- [ ] **Step 3: Add section heading font**

For all `<h2>` section titles in each page, add `font-saira` class.

- [ ] **Step 4: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 5: Commit**

```bash
git add app/services/page.tsx app/about-us/page.tsx app/benefits/page.tsx app/contact/page.tsx app/calculator/page.tsx
git commit -m "feat(pages): apply frosted glass theme to all content pages"
```

---

## Task 11: Calculator Components Restyle

**Files:**
- Modify: `components/LoanCalculator.tsx`
- Modify: `components/HomeLoanCalculator.tsx`
- Modify: `components/calculator/EmailModal.tsx`

- [ ] **Step 1: LoanCalculator.tsx — replace orange classes**

Apply same find-and-replace patterns:
- `focus:ring-orange-500` → `focus:ring-dpe-blue` (lines ~349, 374, 401, 422)
- `text-orange-500` → `text-dpe-blue` (line ~442)
- `bg-orange-50` → `bg-blue-50` (line ~469)
- `border-orange-200` → `border-blue-200`
- `bg-orange-500` → `bg-dpe-navy` (estimate button, line ~480)

- [ ] **Step 2: EmailModal.tsx — replace orange/primary classes**

- `focus:ring-primary-500` → `focus:ring-dpe-blue` (lines ~164, 178, 194, 209)
- `text-primary-500` → `text-dpe-blue` (lines ~221, 226)
- `!bg-orange-500` → `bg-dpe-navy` (submit button, line ~247)
- Modal backdrop already uses `bg-black/50 backdrop-blur-sm` — keep as-is

- [ ] **Step 3: HomeLoanCalculator.tsx — same pattern**

Apply same orange → navy/blue replacements.

- [ ] **Step 4: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`

- [ ] **Step 5: Commit**

```bash
git add components/LoanCalculator.tsx components/HomeLoanCalculator.tsx components/calculator/EmailModal.tsx
git commit -m "feat(calculator): restyle calculator components to navy/blue theme"
```

---

## Task 12: Translation Cleanup — Remove Testimonials

**Files:**
- Modify: `translations/en.json`
- Modify: `translations/es.json`
- Modify: `translations/fr.json`
- Modify: `translations/it.json`
- Modify: `translations/pl.json`

- [ ] **Step 1: Remove testimonials keys from all 5 translation files**

In each file, find and remove the `"testimonials"` key under `"home"`. This includes:
- `home.testimonials.title`
- `home.testimonials.subtitle`
- `home.testimonials.trustedByThousands`
- `home.testimonials.trustedDescription`
- `home.testimonials.customerRating`
- `home.testimonials.basedOnReviews`
- `home.testimonials.testimonials` (the array of 6 reviews)

Keep all other `home.*` keys intact.

- [ ] **Step 2: Verify build**

Run: `cd /c/dev/Apex/apex-auto && npm run build`
Check: No errors about missing translation keys (the Trustpilot component uses hardcoded English text, not i18n keys)

- [ ] **Step 3: Commit**

```bash
git add translations/
git commit -m "chore(i18n): remove hardcoded testimonials from all translation files"
```

---

## Task 13: Final Verification — Build + Visual Check

- [ ] **Step 1: Grep for remaining orange references**

```bash
cd /c/dev/Apex/apex-auto
grep -rn "orange" --include="*.tsx" --include="*.ts" --include="*.css" app/ components/ | grep -v node_modules | grep -v ".superpowers"
```

Any remaining `orange` references must be addressed.

- [ ] **Step 2: Grep for remaining primary references**

```bash
grep -rn "primary-" --include="*.tsx" --include="*.ts" app/ components/ | grep -v node_modules
```

Any remaining `primary-` class references must be replaced with `dpe-navy` or `dpe-blue`.

- [ ] **Step 3: Full production build**

```bash
cd /c/dev/Apex/apex-auto && npm run build
```

Expected: Clean build, zero errors.

- [ ] **Step 4: Visual smoke test**

```bash
cd /c/dev/Apex/apex-auto && npm run dev
```

Check each page:
- `/` — frosted hero, services grid, trust section, Trustpilot widget, social feed, navy CTA
- `/services` — navy buttons, frosted cards
- `/benefits` — navy dots, frosted cards
- `/about-us` — navy stats, frosted team cards
- `/contact` — blue focus rings, navy submit button
- `/calculator` — navy tabs, blue focus rings

- [ ] **Step 5: Commit any remaining fixes**

```bash
git add -A
git commit -m "fix: clean up remaining orange/primary references"
```
