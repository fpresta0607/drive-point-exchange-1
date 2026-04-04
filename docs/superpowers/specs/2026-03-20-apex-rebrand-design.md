# Drive Point Exchange — Website Rebrand & Feature Spec

**Date:** 2026-03-20
**Status:** Draft
**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Supabase, Vercel

---

## Overview

Holistic rebrand of the Drive Point Exchange website to match the new glass-effect logo. Four workstreams:

1. **Logo & brand identity** — new logo, color palette, typography
2. **Frosted Light theme** — full site restyle with glassmorphic aesthetic
3. **Trustpilot integration** — replace hardcoded testimonials with live Trustpilot widget
4. **Social media feed** — horizontal carousel pulling from Instagram, Facebook, TikTok via oEmbed + Vercel cron

---

## 1. Logo & Brand Identity

### Logo

- **Source:** `public/Apex logo glass effe.png` (2.6 MB) — glass-etched effect with navy "A" mark, car silhouette, "APEX AUTO SOLUTIONS INC." text
- **Processing:** Create a true transparent-background PNG for universal use. Use CSS `mix-blend-mode: multiply` as a quick dev fallback on light backgrounds only — but the production asset must be a real transparent PNG since `multiply` breaks on the dark footer (`bg-gray-900`). If manual trimming is needed, create two variants: `logo-glass.png` (full) and `logo-glass-light.png` (inverted/white version for dark backgrounds).
- **Optimized asset:** Create `public/logo-glass.png` — optimized and resized (target < 200 KB) for web delivery via Next.js Image component (WebP/AVIF auto-conversion)
- **Sizes:** Nav: `h-14 w-auto`, Footer: `h-10 w-auto`
- **Favicon:** Extract the triangular "A" mark, save as `app/favicon.ico`

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `apex.navy` | `#1a2744` | Primary — headings, nav, buttons, footer |
| `apex.navy-deep` | `#0a1628` | Hero overlays, darkest backgrounds |
| `apex.blue` | `#3b82f6` | Accent — links, hover states, active indicators |
| `apex.blue-light` | `#60a5fa` | Secondary accent — subtle highlights |
| `apex.red` | `#dc2626` | CTA highlight — urgency buttons, badge accents |
| `apex.slate` | `#64748b` | Secondary text |
| `apex.bg` | `#f8fafc` | Page background |
| `apex.bg-alt` | `#e8edf4` | Alternate section background |
| `apex.card` | `rgba(255,255,255,0.85)` | Frosted card background |
| `apex.card-border` | `rgba(255,255,255,0.40)` | Card border |
| `apex.text` | `#0a1628` | Primary text |

**Removed:** `apex.orange` (`#f97316`) and all orange variants. Orange scrollbar styling replaced with navy/blue.

**Migration — `primary` and `brand` token replacement:** The existing codebase uses `primary-600`, `text-primary-600`, `bg-orange-50`, `text-orange-600`, `focus:ring-primary-500` etc. extensively (Navigation.tsx language selector, focus rings, hover states). All `primary-*` references must be mapped to `apex.navy` equivalents and all `orange-*` references to `apex.blue` or `apex.navy`. Specific mappings:
- `primary-600` / `text-orange-600` → `text-dpe-blue` (`#3b82f6`)
- `bg-orange-50` → `bg-blue-50`
- `focus:ring-primary-500` → `focus:ring-dpe-blue`
- `text-orange-400` (footer hover) → `text-dpe-blue-light` (`#60a5fa`)
- Language selector active state (`bg-orange-50 text-orange-600`) → `bg-blue-50 text-dpe-blue`

### Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Section titles | Saira | 800 | Uppercase, letter-spacing 1-2px |
| Subheadings | Saira | 700 | Normal case |
| Body text | Outfit | 400 | Normal |
| Body emphasis | Outfit | 500 | Normal |
| Nav links | Outfit | 500 | Normal |
| CTA buttons | Saira | 600 | Uppercase, letter-spacing 1px |

**Loading:** Google Fonts via `next/font/google` for optimal loading (swap display, subset latin).

**Tailwind v4 font registration:** Since the project uses Tailwind CSS v4 (imports via `@import "tailwindcss"`), fonts must be registered in `globals.css` using `@theme` blocks, not in `tailwind.config.ts`:

```css
@theme {
  --font-saira: 'Saira', sans-serif;
  --font-outfit: 'Outfit', sans-serif;
}
```

This generates `font-saira` and `font-outfit` utility classes. The `next/font/google` CSS variables (`--font-saira`, `--font-outfit`) are wired to the HTML element in `layout.tsx` and consumed by the `@theme` block.

---

## 2. Frosted Light Theme

### Navigation Bar

```
bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm
sticky top-0 z-50
```

- Logo left, nav links center (Outfit 500), CTA button right
- Primary CTA: navy button with phone number `(888) 990-7112`
- Secondary: `(773) 782-1005 24/7 Service` in slate text
- Mobile: frosted slide-out menu with `bg-white/90 backdrop-blur-xl`

### Hero Sections

- Background: `bg-gradient-to-br from-[#f8fafc] via-white to-[#e8edf4]`
- Subtle radial blue glow: `radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.08), transparent 60%)`
- Hero text: Saira 800, navy (`text-[#0a1628]`), subtle text-shadow glow

**Homepage hero migration:** The current hero uses a full-bleed dark photo with `bg-gradient-to-r from-black/70 via-black/50 to-black/30` overlay and `text-white` headings. This must be fully replaced:
- Remove dark overlay gradient and background image
- Switch hero text from `text-white` → `text-[#0a1628]` (navy)
- The inline calculator card (right column) currently uses `bg-white rounded-2xl` which worked on a dark background — on the new light background, add `border border-white/40 shadow-lg shadow-blue-500/5` for visual separation
- Keep the hero image as a decorative element positioned to the side or as a subtle background, not a full-bleed overlay

### Cards

```
bg-white/70 backdrop-blur-md border border-white/40
shadow-lg shadow-blue-500/5 rounded-2xl
hover:bg-white/90 hover:border-blue-200/50 hover:shadow-xl
transition-all duration-200 hover:-translate-y-0.5
```

### Section Transitions

- Alternate `#f8fafc` and `white` backgrounds
- Dividers: `bg-gradient-to-r from-transparent via-slate-200 to-transparent h-px`

### Buttons

| Type | Classes |
|------|---------|
| Primary CTA | `bg-[#1a2744] text-white hover:bg-[#0a1628] rounded-xl px-6 py-3 font-saira font-semibold tracking-wide` |
| Secondary | `bg-white/60 backdrop-blur border border-slate-200 text-[#1a2744] hover:bg-white/80 rounded-xl` |
| Accent CTA | `bg-[#dc2626] text-white hover:bg-[#b91c1c] rounded-xl` |

### Framer Motion

- Keep existing variants: `fadeInUp`, `fadeInLeft`, `fadeInRight`
- Upgrade transitions: `type: "spring", stiffness: 100, damping: 15`
- Stagger children: `0.12s` delay (up from `0.1s`)
- Card hover: `whileHover: { scale: 1.02, transition: { duration: 0.2 } }`
- Hero parallax-lite: subtle `translateY` on scroll via `useScroll` + `useTransform`

### Scrollbar

Replace orange with navy theme:
- Track: `#f1f5f9`
- Thumb: `#1a2744`, hover: `#3b82f6`

### Pages Restyled

Every page gets the frosted treatment. Key changes per page:

- **Homepage** `(home)/page.tsx` — hero restyle, services grid cards → frosted, trust section → frosted, remove testimonials, add Trustpilot + Social Feed sections
- **Services** `services/page.tsx` — hero gradient, service cards → frosted glass
- **Benefits** `benefits/page.tsx` — feature cards → frosted, CTA buttons → navy/red
- **About Us** `about-us/page.tsx` — team cards → frosted, values section restyle
- **Contact** `contact/page.tsx` — form inputs → frosted styling, button → navy
- **Calculator** `calculator/page.tsx` — tab switcher → navy active state, calculator cards → frosted
- **LoanCalculator** + **HomeLoanCalculator** — input fields, sliders, result cards all get frosted treatment
- **EmailModal** — frosted overlay (`bg-black/40 backdrop-blur-sm`), modal card → frosted

---

## 3. Trustpilot Integration

### What It Replaces

The current testimonials section in `(home)/page.tsx` (lines 285-374):
- Static "4.9" rating with hardcoded stars
- 6 hardcoded testimonials from i18n JSON (Ray Martinez, Tyrone Johnson, Carla Rodriguez, Brett Mitchell, Lora Chen, Michael Washington)
- Car image with glassmorphic hover

All of this is removed and replaced.

### Implementation

**New component:** `components/TrustpilotReviews.tsx`

```
Section wrapper:
  bg-white, frosted card container
  Heading: "What Our Customers Say" (Saira 700)
  Subtitle: "Verified reviews on Trustpilot" (Outfit 400, slate)

Trustpilot widget (two widgets):

1. Micro Star badge (compact rating display at top of section):
   data-template-id="5418015fb0d04a0c9cf721f2"  (Micro Star / Pop-Up)
   data-style-height="30px"

2. Review Carousel (main review display, replaces testimonials):
   data-template-id="53aa8912dec7e10d38f59f36"  (Carousel template)
   data-style-height="350px"

Both share:
  data-locale="en-US"
  data-businessunit-id="69ba16dc64b632407461914d"
  data-style-width="100%"
  data-stars="1,2,3,4,5"
  data-review-languages="en"

Note: The widget token (data-token) is a client-side embed token designed
to be in public HTML — this is not a secret API key. Trustpilot documents
this as a public attribute. It is safe to hardcode in the component.
```

**Bootstrap script:** Added to `app/layout.tsx` `<head>`:
```html
<script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.boot.min.js" async />
```

**Fallback:** If widget fails to load (ad blocker, network), render a styled link:
- Trustpilot logo + "Read our verified reviews on Trustpilot →"
- Detect via `window.Trustpilot` check after 3-second timeout

**Cleanup:** Remove `home.testimonials` key from all 5 translation files (en, es, fr, it, pl).

---

## 4. Social Media Feed

### UI Component

**New component:** `components/SocialFeed.tsx`

**Section layout:**
- Heading: "Follow Our Journey" (Saira 700)
- Subtitle: "Latest from our social channels" (Outfit 400, slate)
- Horizontal carousel with CSS `overflow-x: auto` + `scroll-snap-type: x mandatory`
- Auto-scroll: `useEffect` interval (5s) incrementing a `scrollLeft` offset by one card width (256px + gap). Pauses on hover (`onMouseEnter`/`onMouseLeave`). Loops back to start when reaching the end. Respects `prefers-reduced-motion` — disables auto-scroll if user prefers reduced motion.
- Drag-to-scroll on mobile via Framer Motion `drag="x"` with `dragConstraints` calculated from container/content width

**Post cards:**
- `w-64 flex-shrink-0 snap-start`
- Frosted glass card: `bg-white/70 backdrop-blur-md border border-white/40 rounded-xl overflow-hidden`
- Image top: `aspect-square` for IG/FB, `aspect-[9/16]` (cropped via `object-cover max-h-64`) for TikTok
- Caption: 2-line truncation (`line-clamp-2`), Outfit 400, 13px
- Footer: platform dot (IG: `#e1306c`, FB: `#1877f2`, TT: `#010101`) + handle + relative timestamp
- Click: opens original post URL in new tab

**End cards:** "Follow us" cards for each platform with platform colors and external link.

### Data Architecture — Phase 1 (oEmbed + Supabase)

**Storage: Supabase** (NOT `public/` — Vercel's filesystem is read-only at runtime). Social feed data is stored in a Supabase table and fetched client-side or via ISR.

**Supabase table:** `social_posts`

```sql
CREATE TABLE social_posts (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok')),
  url TEXT NOT NULL,
  thumbnail TEXT,
  caption TEXT,
  embed_html TEXT,
  posted_at TIMESTAMPTZ,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: public read, service-role write
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON social_posts FOR SELECT USING (true);
```

**API routes:**

1. `app/api/social/refresh/route.ts` — Cron endpoint (GET — Vercel crons invoke GET), protected by `CRON_SECRET` via Authorization header:
   - **TikTok:** `https://www.tiktok.com/oembed?url={video_url}` — public, no auth
   - **Facebook:** FB Page Plugin embed URL construction — public, no auth
   - **Instagram:** Requires Meta Graph API access token (`INSTAGRAM_OEMBED_TOKEN` env var) — the oEmbed endpoint has required auth since 2021. Obtain via Meta Developer Console → create app → get client token. If token not configured, skip IG and log warning.
   - Upserts results into `social_posts` table via Supabase service-role client

2. `app/api/social/feed/route.ts` — Public GET endpoint, reads from `social_posts`, returns JSON. Cached with `Cache-Control: s-maxage=3600, stale-while-revalidate=7200`.

**Cron schedule:** `vercel.json`

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

Runs every 6 hours. Vercel Cron on Hobby tier supports 1 cron up to daily frequency — may need Pro for 6-hour interval; fallback to daily on Hobby.

**Fallback:** If Supabase query returns empty or errors, render static "Follow us on [platform]" cards with links to each profile.

### Phase 2 — Official APIs (Future)

- Meta Graph API for Instagram + Facebook (requires Meta Business app review)
- TikTok Display API (requires developer app approval)
- Same `social-feed.json` schema — UI component unchanged
- API route swaps from oEmbed to official API calls
- Token refresh logic added to API route

---

## 5. File Change Map

### New Files

| File | Purpose |
|------|---------|
| `components/TrustpilotReviews.tsx` | Trustpilot widget wrapper (micro star + carousel) with fallback |
| `components/SocialFeed.tsx` | Horizontal carousel for social posts |
| `app/api/social/refresh/route.ts` | Cron endpoint — fetches oEmbed data, writes to Supabase |
| `app/api/social/feed/route.ts` | Public GET endpoint — reads cached posts from Supabase |
| `public/logo-glass.png` | Optimized transparent PNG logo |
| `vercel.json` | Cron schedule configuration |
| `supabase-migration-social-posts.sql` | Migration to create `social_posts` table |

### Modified Files

| File | Changes |
|------|---------|
| `app/layout.tsx` | Trustpilot script, fonts (Saira + Outfit via `next/font/google`), updated metadata, schema.org logo URL → `logo-glass.png`, `theme-color` meta → `#1a2744` |
| `app/globals.css` | `@theme` block with new color tokens + font families (Tailwind v4 approach), CSS vars, navy scrollbar, frosted utilities. This is where all new Tailwind tokens go — NOT in `tailwind.config.ts`. |
| `tailwind.config.ts` | Remove `apex.orange`, `primary` (orange), and `brand` scales. Remaining config (if any) is minimal since v4 uses `@theme` in CSS. |
| `app/(home)/page.tsx` | Replace testimonials → TrustpilotReviews, add SocialFeed, restyle all sections |
| `components/Navigation.tsx` | New logo, frosted glass nav, navy buttons |
| `components/Footer.tsx` | New logo, navy color scheme |
| `app/services/page.tsx` | Frosted theme restyle |
| `app/about-us/page.tsx` | Frosted theme restyle |
| `app/benefits/page.tsx` | Frosted theme restyle |
| `app/contact/page.tsx` | Frosted theme restyle |
| `app/calculator/page.tsx` | Frosted theme restyle |
| `components/LoanCalculator.tsx` | Frosted cards/inputs |
| `components/HomeLoanCalculator.tsx` | Frosted cards/inputs |
| `components/calculator/EmailModal.tsx` | Frosted modal overlay |
| `next.config.ts` | Allow Trustpilot + oEmbed image domains |
| `translations/en.json` | Remove testimonials strings |
| `translations/es.json` | Remove testimonials strings |
| `translations/fr.json` | Remove testimonials strings |
| `translations/it.json` | Remove testimonials strings |
| `translations/pl.json` | Remove testimonials strings |
| `.gitignore` | Already added `.superpowers/` |

### Removed

- Testimonials section code from `(home)/page.tsx`
- `home.testimonials` keys from all 5 translation files
- `public/logo.png` replaced by `public/logo-glass.png`

---

## 6. Environment Variables

New env vars needed in Vercel dashboard + `.env.local`:

```
CRON_SECRET=<random-secret-for-cron-auth>
INSTAGRAM_OEMBED_TOKEN=<meta-app-client-token>  # Required for IG oEmbed (auth required since 2021)
```

**Instagram token setup:** Create a Meta Developer app at developers.facebook.com → Settings → Advanced → Client Token. This is a free-tier token for oEmbed only, no app review needed. Without this token, the cron job will skip Instagram posts and log a warning.

TikTok and Facebook oEmbed endpoints are public — no tokens needed.

---

## 7. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Trustpilot widget blocked by ad blockers | Fallback link to Trustpilot page |
| oEmbed endpoints rate-limited or down | Supabase stores last-known-good data; fallback "Follow us" cards |
| Instagram oEmbed token not configured | Cron skips IG, logs warning; feed shows FB + TikTok only |
| Vercel Hobby cron limited to daily | Use daily schedule; upgrade to Pro for 6-hour if needed |
| Glass logo background not fully transparent via CSS blend | Create true transparent PNG; use `mix-blend-mode` only as dev shortcut |
| Logo on dark footer background | Provide light/inverted logo variant or use `brightness`/`invert` CSS filter |
| `backdrop-filter` not supported on older browsers | Graceful degradation — solid white background, no blur |
| `primary-*` orange classes missed during migration | Grep for `orange`, `primary-` across all files during implementation |

---

## 8. Out of Scope

- YouTube integration (no credentials provided for YouTube content API — only email login shared)
- Official Meta/TikTok API integration (Phase 2, requires app review)
- Payment processing, SMS notifications
- SEO overhaul beyond metadata updates
- New pages or routes
- Admin panel (`app/admin/`) and auth pages (`app/auth/`) — these will inherit global CSS changes (scrollbar, body bg, font) but are not explicitly restyled
