# Service Page CTAs + "Follow Our Journey" Redesign

**Date:** 2026-05-01
**Status:** Approved (brainstorming)

## Goals

1. Add a per-service call-to-action section to every individual service page, matching the home page's editorial CTA pattern.
2. Redesign the "Follow Our Journey" home-page section into a Harvey-style two-column experience where each platform icon swaps the video shown in the left column.

## Non-Goals

- No new dedicated `/journey` page — the redesign stays an in-place section on the home page.
- No changes to the existing `/api/social/feed` API contract.
- No admin UI for curating featured videos — latest post per platform is selected automatically.
- No new Trustpilot, calculator, or services-tabs work.

---

## Part 1 — Service Page CTA

### Behavior

Every individual service page (`/services/auto-refinance`, `vehicle-coverage`, `home-refinance`, `auto-insurance`, `life-insurance`, `credit-consultations`) renders a CTA section below the existing white "ServiceLayout" card. The CTA visually matches the home page's bottom CTA section (lines 437-510 of `app/(home)/page.tsx`):

- Two-column grid (`lg:grid-cols-[1.4fr_1fr]`) on desktop, single column on mobile.
- Left column: kicker → large editorial headline → short subtitle → primary button.
- Right column: `Main office` label → phone number `(888) 351-0782` (linked) → supporting line.
- Section background: `bg-white` with `border-t border-slate-200/70`, `py-28` vertical rhythm.
- Animation: same `staggerChildren` + `fadeInUp` framer-motion pattern as the home CTA.

The primary button reads **"Start your application"** and links to `/contact`. There is **no secondary button** (the home CTA has "Explore services" — service pages don't need that since the user is already on a service page).

### Per-service copy

| Page slug | Kicker | Headline | Subtitle |
|---|---|---|---|
| `auto-refinance` | Lower your payment | Ready to refinance your auto loan? | See how much you could save with a rate built for your updated credit profile. |
| `vehicle-coverage` | Protect what you drive | Cover your vehicle, not your wallet. | Get protection that covers the repairs your factory warranty doesn't. |
| `home-refinance` | Unlock your home's value | Ready to refinance your home? | Lower your rate, shorten your term, or tap into your equity — on your terms. |
| `auto-insurance` | Right-size your premium | Stop overpaying for auto insurance. | Compare nationwide carriers in one consultation — no obligation. |
| `life-insurance` | Protect your family | Ready to secure your family's future? | Find the right life insurance policy without the high-pressure sales pitch. |
| `credit-consultations` | Build a stronger profile | Ready to take control of your credit? | One conversation with a specialist can change your trajectory — start today. |

### Architecture

- New component: `components/ServiceCTA.tsx` — receives `kicker`, `title`, `subtitle` props and renders the section. Phone number, button label, and right-column supporting copy are hardcoded (not props) since they are constant across all service pages.
- Modified: `components/ServiceLayout.tsx` — accepts a new optional prop:
  ```ts
  cta?: {
    kicker: string;
    title: string;
    subtitle: string;
  }
  ```
  When provided, renders `<ServiceCTA {...cta} />` between the centered white card and the `<Footer />`. When omitted, no CTA renders (preserves backward compatibility).
- Modified: 6 service page files (`app/services/*/page.tsx`) — each passes its `cta` prop with the copy from the table above.

### Why a new component (not inline in ServiceLayout)

`ServiceCTA` is a self-contained editorial section with its own animation context, background, and layout grid. Inlining it would push `ServiceLayout` past 200 lines and tangle two unrelated visual concerns (the centered white-card hero and the full-bleed CTA band). Extracting keeps each file focused on one purpose.

---

## Part 2 — "Follow Our Journey" Harvey-style Redesign

### Behavior

The current `SocialFeed` section renders all platform embeds side-by-side (or a 4-icon fallback if none). The redesign replaces this with a two-column layout:

- **Left column (≈55% width)**: a single video player showing the latest post for the currently-selected platform. Uses the existing `EmbedCard` component, wrapped in `AnimatePresence` for cross-fade transitions when the platform changes.
- **Right column (≈45% width)**: section kicker + headline + subtitle at the top, followed by 4 stacked clickable platform "feature blocks" (Instagram → Facebook → TikTok → YouTube).

### Platform block content

Each block contains: platform icon (existing icon component), platform name, short blurb. Clicking the block sets it active and swaps the left-column video.

| Platform | Name | Blurb |
|---|---|---|
| Instagram | Instagram | Behind-the-scenes and customer wins. |
| Facebook | Facebook | Community stories and updates. |
| TikTok | TikTok | Quick tips and moments. |
| YouTube | YouTube | Long-form deep dives. |

### Active vs inactive states

- **Active block**: `border-white/30`, `bg-white/[0.04]` background, left-edge accent bar in `dpe-green` (4px wide), block contents at full opacity.
- **Inactive block**: `border-white/10`, transparent background, no accent bar, contents at `text-white/55`. On hover: `border-white/20`, `text-white/80`.

### Default selection

On mount, the active platform is the **first platform with a post** in the order Instagram → Facebook → TikTok → YouTube. If none have posts, the section falls back to the existing 4-icon profile-link layout (no video player).

### Per-platform missing-post behavior

If a platform has no post in the feed:
- Its block remains visible and clickable.
- Clicking it does **not** swap the left video — instead the block acts as an external link to the platform's profile (`PROFILE_URLS[platform]`, opens in new tab).
- The block's blurb is replaced with `Visit profile →` text styling.

### Aspect ratio handling

Different platforms have different native video shapes:
- Instagram, TikTok: vertical, render in `aspect-[9/16]` container.
- Facebook, YouTube: horizontal, render in `aspect-video` container.

The left column container's aspect ratio updates based on the active platform, with a smooth height transition (framer-motion `layout` animation, 250ms ease).

### Section styling

- Background: `bg-slate-950` (was `bg-[#f8fafc]`) — moves the section into the editorial dark band aesthetic that matches the home services section.
- Hairline grid overlay (matching the home hero): `linear-gradient` 1px lines at 120px spacing, `opacity-[0.06]`.
- Heading uses the same editorial treatment as the home services band: `text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.025em] leading-[1.02]`.
- Section kicker uses existing `<SectionKicker tone="white" align="left">` with text "Behind the wheel".

### Mobile layout (`< md`)

- Stacks vertically: kicker + headline at top, then video player, then platform blocks.
- Platform blocks become a horizontal scroll-snap row of 4 fixed-width cards (each ~280px wide) below the video, instead of a vertical list.
- Aspect ratio of the video container caps at `max-h-[80vh]` to prevent overflow.

### Data flow

- Reuses `/api/social/feed` unchanged. Response shape: `{ posts: SocialPost[] }`.
- On fetch, client groups posts by `post.platform` and keeps the first per platform (the API already returns posts ordered by recency per platform; no additional sorting needed).
- Active platform stored in component state (`useState<Platform>`).
- `EmbedCard` for the active platform's post renders inside the left column. When the active platform changes, `AnimatePresence` cross-fades the previous embed out and the new one in.

### Files affected

- **New:** `components/social/JourneyShowcase.tsx` — the Harvey-style two-column showcase, including data fetching, state, and fallback handling.
- **Modified:** `components/SocialFeed.tsx` — reduced to a thin wrapper that renders `<JourneyShowcase />`. The dynamic import in `app/(home)/page.tsx` continues to work without change.
- **Reused:** `components/social/EmbedCard.tsx` (unchanged).
- **Reused:** existing platform icon components (`InstagramIcon`, `FacebookIcon`, `TiktokIcon`, `YoutubeIcon`).
- **Reused:** `SectionKicker` for the section kicker.

### Why a new file vs editing SocialFeed.tsx in place

`JourneyShowcase` is a substantively different component from the original 4-up grid — different state, different layout, different fallback. Keeping `SocialFeed.tsx` as a thin wrapper preserves the existing dynamic-import wiring on the home page while moving the new logic into a focused file.

---

## Out of scope (explicitly)

- Trustpilot section changes
- Calculator changes
- Service tab band changes
- Admin UI for curating featured videos
- Backend changes to the social feed API
- New `/journey` page
- Localization of new copy strings (will follow existing patterns when i18n keys are added later if requested)

## Risks and mitigations

- **Aspect ratio shifts feel janky:** mitigated with framer-motion `layout` transition and a fixed `max-h` on mobile.
- **Slow initial post fetch leaves left column empty:** keep a low-effort skeleton (already exists in `EmbedCard`'s `OEmbedCard`).
- **Dark background reduces contrast for embedded posts:** Instagram/Facebook embeds have white backgrounds inside the iframe, so they will sit on the dark band without visual issue. TikTok and YouTube embeds are dark already.

## Acceptance criteria

### Service page CTA
- [ ] All 6 service pages render a CTA section below the existing white card.
- [ ] Each CTA shows the per-service copy from the table.
- [ ] Primary button reads "Start your application" and links to `/contact`.
- [ ] Phone number `(888) 351-0782` is clickable (`tel:` link) on the right column.
- [ ] CTA matches home CTA visually: kicker, headline sizing, button styling, phone panel styling, framer-motion stagger.
- [ ] Mobile: collapses to single column; phone panel falls below copy.

### Follow Our Journey
- [ ] Section background is `bg-slate-950` with hairline grid overlay.
- [ ] On desktop, two-column layout with video on left, platform list on right.
- [ ] Default active platform is the first one with a post (Instagram → Facebook → TikTok → YouTube preference).
- [ ] Clicking a platform block with a post swaps the left-column video with cross-fade.
- [ ] Active block has `dpe-green` left accent bar + elevated background.
- [ ] Clicking a platform block with no post opens the platform profile in a new tab.
- [ ] When no platforms have posts, the section falls back to the existing 4-icon profile-link layout.
- [ ] Mobile: video stacks above a horizontal scroll-snap row of platform cards.
- [ ] Aspect ratio adapts: 9:16 for IG/TikTok, 16:9 for FB/YouTube.
