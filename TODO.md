# Drive Point Exchange — Developer TODO

This document scopes all frontend/visual work needed to rebrand from Drive Point Exchange to Drive Point Exchange. The site structure, layout, and functionality stay identical — only the visual identity, content, and branding change.

**Owner handles separately:** Resend API, DNS, email config, Supabase backend migration, Vercel deployment, domain setup.

---

## 1. Brand Identity & Color System

The new brand uses **royal blue + bright green** (no red). Update all color tokens.

### Logo Colors (from `public/logo.png`)
| Color | Hex | Usage |
|-------|-----|-------|
| Royal Blue | `#1934B5` | Primary — car silhouette, "DRIVE POINT" text, links, UI accents |
| Bright Green | `#2DB843` | Accent — upward arrows, "EXCHANGE" text, CTAs, action buttons |
| Deep Navy | `#0D1B4A` | Dark backgrounds, headers |
| Navy Deep | `#060F2E` | Deepest backgrounds |
| Light Blue | `#4A6FE0` | Hover states, lighter accents |
| Green Hover | `#239636` | CTA hover/active states |

### Files to Update
- [ ] `app/globals.css` — Rename `--color-apex-*` → `--color-dpe-*`, update all hex values
  - `--color-dpe-navy` → `--color-dpe-navy: #0D1B4A`
  - `--color-dpe-navy-deep` → `--color-dpe-navy-deep: #060F2E`
  - `--color-dpe-blue` → `--color-dpe-blue: #1934B5`
  - `--color-dpe-blue-light` → `--color-dpe-blue-light: #4A6FE0`
  - `--color-dpe-green` → `--color-dpe-green: #2DB843` (red is gone, replaced with green)
  - `--color-dpe-slate` → `--color-dpe-slate: #64748b` (keep value)
  - `--color-dpe-bg` → `--color-dpe-bg: #f8fafc` (keep value)
  - `--color-dpe-bg-alt` → `--color-dpe-bg-alt: #e8f4ec` (slight green tint)
  - `--color-dpe-card` → `--color-dpe-card` (keep value)
  - `--color-dpe-card-border` → `--color-dpe-card-border` (keep value)
  - Update rainbow/gradient vars (lines 7-12) to match blue/green palette
- [ ] `tailwind.config.ts` — Rename `apex` color key → `dpe`, update hex values for entire palette
  - Rename `dpe-blue` → `dpe-blue` (full 50-900 range, anchored to `#1934B5`)
  - Rename `apex-gray` → `dpe-gray` (keep values)
  - Add `dpe-green` palette (50-900 range, anchored to `#2DB843`)
  - Remove any red palette references
  - Rename `shadow-dpe` → `shadow-dpe`, `shadow-dpe-lg` → `shadow-dpe-lg`
  - Rename `border-dpe` → `border-dpe`
- [ ] `app/layout.tsx` line 152 — Update `theme-color` meta tag from `#1a2744` to `#0D1B4A`

### Component Class Renames (108+ occurrences)
Every `apex-*` Tailwind class must become `dpe-*`. Files with the most occurrences:

- [ ] `components/Navigation.tsx` — 14 occurrences (`text-dpe-blue`, `bg-dpe-green`, `hover:text-dpe-blue`, etc.)
- [ ] `components/Footer.tsx` — 10 occurrences
- [ ] `app/(home)/page.tsx` — 15+ occurrences (change all `bg-dpe-green`/`border-dpe-green`/`text-dpe-green` → `bg-dpe-green`/etc.)
- [ ] `app/about-us/page.tsx` — `bg-dpe-navy`, `text-dpe-blue` throughout
- [ ] `app/benefits/page.tsx` — `bg-dpe-navy`, `hover:bg-dpe-navy-deep`, `text-dpe-blue`
- [ ] `app/calculator/page.tsx` — `bg-dpe-navy`, `border-dpe-blue`
- [ ] `app/contact/page.tsx` — 25+ occurrences (form inputs, focus states)
- [ ] `app/services/page.tsx` — apex color scheme throughout
- [ ] `app/terms/page.tsx` — apex navy/blue styling
- [ ] `app/privacy/page.tsx` — apex navy/blue styling
- [ ] `app/layout.tsx` — `focus:text-dpe-navy`, `focus:ring-dpe-blue`
- [ ] `components/calculator/SummaryCard.tsx` — `bg-dpe-blue-500`
- [ ] `app/auth/admin/login/page.tsx` — check for apex colors

**Tip:** Global find-and-replace `dpe-green` → `dpe-green`, `dpe-blue` → `dpe-blue`, `dpe-navy` → `dpe-navy`, `dpe-slate` → `dpe-slate`, `dpe-bg` → `dpe-bg`, `dpe-card` → `dpe-card`, `shadow-dpe` → `shadow-dpe`, `border-dpe` → `border-dpe`. Then verify visually.

---

## 2. Logo & Favicon

- [ ] Replace `public/logo.png` with Drive Point Exchange logo (used in nav, footer, emails)
- [ ] Update `public/logo.png` if needed (currently the DPE logo is already here)
- [ ] Replace `app/favicon.ico` with Drive Point Exchange favicon (crop from logo or create new)
- [ ] Update all logo `alt` text:
  - `components/Navigation.tsx` line 74: `alt="Drive Point Exchange Logo"` → `alt="Drive Point Exchange Logo"`
  - `components/Footer.tsx` line 48: same change
- [ ] Update logo image `src` if filename changes (currently `/logo.png` in nav + footer + email templates)

---

## 3. Image Replacement

All images in `public/auto/` are Apex-branded and need replacement with Drive Point Exchange equivalents.

### Hero & General
- [ ] `car-hero.jpg` — Main hero image
- [ ] `car.jpg` — General car image
- [ ] `car-loan.jpg` — Loan-related imagery
- [ ] `car-loan3.jpg` — Loan-related imagery
- [ ] `car-loan4.jpg` — Loan-related imagery
- [ ] `loan3.jpg` — Loan-related imagery

### Service Images
- [ ] `svc-auto-insurance.jpg`
- [ ] `svc-auto-refinance.jpg`
- [ ] `svc-credit-consultations.jpg`
- [ ] `svc-extended-warranty.jpg`
- [ ] `svc-home-refinance.jpg`
- [ ] `svc-life-insurance.jpg`
- [ ] `svc-vehicle-coverage.jpg`

### Benefit Images
- [ ] `benefits-hero.jpg`
- [ ] `benefit-extended.jpg`
- [ ] `benefit-maintenance.jpg`
- [ ] `benefit-rental.jpg`
- [ ] `benefit-road-hazard.jpg`
- [ ] `benefit-roadside.jpg`
- [ ] `benefit-trip.jpg`

### Press/Media
- [ ] `Forbes-Logo-1999-present.png` — Remove or replace if Drive Point Exchange doesn't have Forbes feature
- [ ] `forbes.png` — Same as above

**Image guidelines:** Keep same dimensions/aspect ratios as originals. Use professional stock or AI-generated images. Ensure images are optimized (WebP or compressed JPEG, <200KB each where possible).

---

## 4. Text Content — Company Name & Copy

Replace all "Drive Point Exchange" / "Drive Point Exchange" references with "Drive Point Exchange".

### Metadata & SEO (every layout file)
- [ ] `app/layout.tsx` — Title, description, author, creator, publisher, OpenGraph, Twitter, Schema.org org name, URL, logo, description, address, phone, email, social links, founded date
- [ ] `app/(home)/layout.tsx` — Page title, image alt, canonical URL
- [ ] `app/about-us/layout.tsx` — Title, description, OG, Twitter, canonical
- [ ] `app/services/layout.tsx` — Title, description, canonical
- [ ] `app/benefits/layout.tsx` — Title, description, canonical
- [ ] `app/calculator/layout.tsx` — Title, description, canonical
- [ ] `app/contact/layout.tsx` — Title, description, OG, canonical
- [ ] `app/privacy/layout.tsx` — Title, description, canonical
- [ ] `app/terms/layout.tsx` — Title, description, canonical

### Page Content
- [ ] `app/(home)/page.tsx` — Hero tagline, CTA text, section headings, contact info
- [ ] `app/about-us/page.tsx` — Team names, company stats (founded year, customer count), company story
- [ ] `app/contact/page.tsx` — Phone numbers, email, office address, Google Maps embed URL, business hours
- [ ] `app/services/page.tsx` — Service descriptions referencing company name
- [ ] `app/benefits/page.tsx` — Benefit descriptions
- [ ] `app/privacy/page.tsx` — Company name in privacy policy text, email references
- [ ] `app/terms/page.tsx` — Company name in terms text, email references
- [ ] `app/admin/page.tsx` — Dashboard title "Drive Point Exchange Lead Management"

### Components
- [ ] `components/Navigation.tsx` — Phone numbers, logo alt text
- [ ] `components/Footer.tsx` — Phone numbers, logo alt text, company description
- [ ] `components/SocialFeed.tsx` — Social media profile URLs (Instagram, Facebook, TikTok, YouTube)

### Email & Backend
- [ ] `lib/email-templates.ts` — `companyName`, `logoUrl`, `supportPhone`, `supportEmail`, `DEFAULT_SITE_URL`
- [ ] `app/api/email/route.ts` — Email subject lines and content referencing company

### Domain References
Replace `drivepointexchange.com` with the new domain everywhere:
- [ ] `app/sitemap.ts` line 4
- [ ] `app/robots.ts` lines 4, 45, 46
- [ ] `next.config.ts` line 86 (SEO redirect)
- [ ] `components/TrustpilotReviews.tsx` lines 74, 82 (Trustpilot review links)
- [ ] `scripts/create-admin-user.js` line 82 (email domain check)

---

## 5. Translations (5 language files)

All translation files contain "Drive Point Exchange" references and business-specific copy.

- [ ] `translations/en.json` — Primary. Update all company name refs, service descriptions, email templates, CTA text, footer description
- [ ] `translations/es.json` — Spanish equivalent
- [ ] `translations/fr.json` — French equivalent
- [ ] `translations/it.json` — Italian equivalent
- [ ] `translations/pl.json` — Polish equivalent

**Key strings to update:** Search for "Apex", "apex", company description, email subject lines, team signatures.

---

## 6. External Service Placeholders

These need new accounts/IDs. Developer should leave env-var placeholders; owner configures.

- [ ] `components/ConsentScripts.tsx` line 9 — GTM container ID `GTM-5J37J72S` → use env var `NEXT_PUBLIC_GTM_ID`
- [ ] `components/TrustpilotReviews.tsx` line 68 — `data-businessunit-id` → use env var or update with new Trustpilot business unit
- [ ] `components/SocialFeed.tsx` lines 14-17 — Social media URLs → update to Drive Point Exchange profiles
- [ ] `app/layout.tsx` lines 128-130 — Schema.org social links → update

---

## 7. Mobile Optimization Audit

Verify every page renders correctly on mobile after the rebrand:

- [ ] Navigation — hamburger menu, mobile drawer, touch targets ≥44px
- [ ] Hero section — text sizing, image scaling, CTA button spacing
- [ ] Loan calculators — input fields, sliders, result cards on small screens
- [ ] Contact form — input fields, labels, submit button, Google Maps embed
- [ ] Footer — stacked layout, readable links, adequate spacing
- [ ] Benefits/Services cards — card grid collapse to single column
- [ ] Admin dashboard — table scrolling, filter controls
- [ ] Test on: iPhone SE (375px), iPhone 14 (390px), iPad (768px), Galaxy S21 (360px)

---

## 8. Fonts (Evaluate)

Current fonts are **Saira** (headings) and **Outfit** (body). These were chosen for Apex's brand.

- [ ] Evaluate whether Saira + Outfit fit Drive Point Exchange's identity
- [ ] If changing: update `app/layout.tsx` (lines 12-24 font imports), `tailwind.config.ts` (lines 59-63 fontFamily), `app/globals.css` (lines 18-21 font vars)
- [ ] If keeping: no changes needed

---

## Quick Reference — Find & Replace Checklist

| Search | Replace With | Scope |
|--------|-------------|-------|
| `Drive Point Exchange` | `Drive Point Exchange` | All files |
| `Drive Point Exchange` | `Drive Point Exchange` | All files |
| `Drive Point Exchange` | `Drive Point Exchange` | All files |
| `dpe-blue` | `dpe-blue` | CSS/TSX class names |
| `dpe-navy` | `dpe-navy` | CSS/TSX class names |
| `dpe-green` | `dpe-green` | CSS/TSX class names |
| `dpe-slate` | `dpe-slate` | CSS/TSX class names |
| `dpe-bg` | `dpe-bg` | CSS/TSX class names |
| `dpe-card` | `dpe-card` | CSS/TSX class names |
| `shadow-dpe` | `shadow-dpe` | Tailwind classes |
| `border-dpe` | `border-dpe` | Tailwind classes |
| `drivepointexchange.com` | `new-domain.com` | URLs |
| `logo.png` | `logo-dpe.png` (or keep filename) | Image refs |
| `--color-apex-` | `--color-dpe-` | CSS variables |

---

## Definition of Done

- [ ] All Apex references removed — `grep -ri "apex" app/ components/ lib/ translations/` returns zero results
- [ ] New color scheme applied — all CTA buttons are green, all primary UI is royal blue
- [ ] All images replaced with Drive Point Exchange branded versions
- [ ] Logo + favicon updated
- [ ] Site builds without errors: `npm run build`
- [ ] Site renders correctly on mobile (375px-768px viewports)
- [ ] Translations updated in all 5 languages
- [ ] No hardcoded secrets or API keys in source code
