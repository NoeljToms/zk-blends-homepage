# ZK Blends

Premium one-page barber site. Next.js 15 (App Router) · TypeScript · Tailwind · Framer Motion · Cal.com.

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Without any Cal credentials the booking flow runs in **mock mode** — availability and confirmation are generated locally so the UI is fully demoable.

## Project layout

```
src/
  app/
    layout.tsx              root metadata + fonts
    page.tsx                one-page composition
    opengraph-image.tsx     dynamic OG card
    api/availability/       Cal.com slot fetch
    api/book/               Cal.com booking create
  components/
    Header.tsx              sticky nav
    Footer.tsx
    StickyMobileCTA.tsx     mobile-only Book pill
    sections/               Hero, Services, Gallery, Reels, About, BookingSection
    booking/
      BookingFlow.tsx       6-step orchestrator
      Steps.tsx             Service/Date/Time/Details/Review/Confirm
      Stepper.tsx
    ui/                     Button, Container, Section, Reveal, Logo
  config/
    site.ts                 brand, contact, location, booking defaults
    services.ts             service catalog (price/duration/Cal env key)
    media.ts                hero/gallery/reels/about asset catalog
  lib/
    cal.ts                  Cal.com integration with mock fallback
    booking.ts              date/slot helpers, validators
    schemas.ts              zod schemas for API routes
    utils.ts                cn, date helpers
public/
  hero/ gallery/ reels/ about/   drop real assets here
```

## Real assets

Drop new images into `/public/{hero,gallery,reels,about}/` and point `src/config/media.ts` entries at them. Remote Unsplash URLs are placeholders until then.

For reels, populate `MediaReel.src` with an MP4 (and ensure `poster` matches the same frame). Click-to-play is intentional — no autoplay.

## Connecting Cal.com

Set these in `.env.local`:

```
CAL_API_KEY=cal_live_…
CAL_USERNAME=zkblends
CAL_EVENT_TYPE_HAIRCUT=123456
CAL_EVENT_TYPE_BEARD_HAIRCUT=123457
CAL_TIMEZONE=America/New_York
```

The integration layer (`src/lib/cal.ts`) talks to Cal.com v2 (`/slots/available`, `/bookings`). If `CAL_API_KEY` is missing or a service has no `CAL_EVENT_TYPE_*` mapping, that path silently falls back to mock data — useful for partial rollouts.

## Adding a service

Add an entry to `services` in `src/config/services.ts`. The booking flow, services section, and JSON-LD all read from this list.

## Performance

- Tailwind only — no CSS framework runtime.
- Framer Motion is the only client-heavy lib; it's hoisted via `experimental.optimizePackageImports`.
- `prefers-reduced-motion` is respected globally.
- Images use `next/image` with AVIF/WebP, lazy by default, eager only above the fold.
- Reels are click-to-play; no autoplay video.
- API routes are cached with short SWR.

## Deploy

Vercel — zero config. Set the env vars in the project settings, point a domain at it.
