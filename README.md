# DatabaseBuilder — marketing site

The DatabaseBuilder website, built as a Next.js App Router project. Same design,
copy and artwork as before — now organised into typed React components with
GSAP + Lenis driving the motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run typecheck
```

Requires Node 18.18+ (Node 20 or 22 recommended).

---

## Project structure

```
app/
  layout.tsx            metadata, self-hosted fonts, icon sprite, app shell
  page.tsx              server component — composes the five sections
  globals.css           design tokens + every custom rule the site needs
  fonts/                subset woff2: Anton, Oswald, Roboto

components/
  animations/
    AppShell.tsx        loading screen, globe hand-off, "app is ready" context
    SmoothScroll.tsx    Lenis, wired into the GSAP ticker and ScrollTrigger
    Reveal.tsx          scroll-in wrapper (shared IntersectionObserver)
    CountUp.tsx         number that counts up when it first appears
  dashboard/
    AppChrome.tsx       shared product sidebar + frame
    InboxApp.tsx        inbox mock — conversations, thread, composer
    DashboardApp.tsx    KPI mock — counters, pipeline bars, activity
    Showcase.tsx        colour-bar control that expands a dashboard in place
  layout/
    Header.tsx          sticky header, hide-on-scroll, mobile menu
    Footer.tsx
  sections/
    Hero.tsx            hero + entrance timeline
    HeroArt.tsx         orbit rings, floor ribbons, wave divider
    WhySection.tsx  FeaturesSection.tsx  BuiltForSection.tsx  CtaBand.tsx
  ui/
    Globe.tsx           React wrapper around the sphere engine
    Icon.tsx            34-icon sprite + <Icon name="…" />
    Logo.tsx  CtaButton.tsx  NeonCard.tsx

lib/
  data.ts               all copy and list data (nav, checklist, KPIs, threads…)
  sphere.ts             the dot-sphere renderer and its interactions
  gsap.ts               plugin registration, reduced-motion helper, useGsap
  reveal.ts             one shared IntersectionObserver for scroll reveals
  globe-handoff.ts      lets the loader find the hero globe at runtime

public/favicon.svg
```

## How the pieces fit

**Loading screen → hero.** `AppShell` renders the loader (server-rendered, so it
covers the page from the first paint). When fonts and `load` have settled — and
at least 1.15s has passed — it measures its own globe and the hero globe with
`getBoundingClientRect`, sets `--boot-dx/dy/scale`, and lets CSS glide the mark
into place. The hero holds still behind it until the globe lands, so the two are
never visible at once. No coordinates are hard-coded, so it lands correctly at
any viewport size.

**The globe.** `lib/sphere.ts` is plain TypeScript: latitude rings of dots,
bucketed by brightness into eight `<path>` elements so a frame costs eight
attribute writes instead of ~1,400. One shared `requestAnimationFrame` drives
every instance and stops when the last one unmounts. Drag to spin (with
momentum), hover to lean, click or Enter to pulse, arrow keys to steer.

**The hero composition.** `.db-stage` defines `--globe`; the orbit is a square
box pinned to the globe's centre with `aspect-ratio: 1`, and the ring SVG uses a
square viewBox centred on the ring itself. The rings therefore stay perfectly
circular and the globe can never drift outside them, at any width.

**Scrolling.** Lenis runs off the GSAP ticker with `lagSmoothing(0)`, and every
`lenis.on("scroll")` calls `ScrollTrigger.update()`. Anchor links are intercepted
and routed through Lenis with the sticky header's height as an offset. All of it
is skipped entirely when `prefers-reduced-motion` is set.

**Dashboard expansion.** The coloured bars collapse the copy column and grow the
screen to the full section width — in place, flat, no modal. The copy's width is
frozen in pixels first, otherwise its paragraphs reflow into a one-word-per-line
column and the section triples in height mid-animation.

**Client vs server.** `page.tsx`, `Footer` and `FeaturesSection` are server
components. Only the hero, header, dashboards, showcase, globe and animation
wrappers opt into `"use client"`.

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project**, import the repo.
3. Framework preset is detected as **Next.js**; leave the build command
   (`next build`) and output directory as they are. There are no environment
   variables to set.
4. Deploy.

Or from the command line:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Set the production domain in **Project → Settings → Domains**, then update
`SITE.url` in `lib/data.ts` so canonical and Open Graph URLs match.

## Notes

- Fonts are subset and self-hosted through `next/font/local` — no third-party
  request and no layout shift.
- The brand gradient scrollbar lives in `globals.css`; there is no progress bar
  anywhere on the page.
- Content lives in `lib/data.ts`. Editing the checklist, KPIs, conversations or
  footer links there updates every place they render.
