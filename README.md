# DatabaseBuilder — marketing site

The DatabaseBuilder website, built as a Next.js App Router project with
GSAP + Lenis driving the motion. The homepage, Pricing and FAQ follow Adam
Berman's September 2026 rebranding outline.

## September 2026 content update

- Updated the four hero cards, including the red Advanced Features card and
  the two-way SMS wording and supporting descriptions.
- Applied the supplied Why DatabaseBuilder copy, correcting obvious typos.
- Included all 21 features in the brief's order, with green checks and the
  source's ten key items emphasised.
- Added `/faq` with all 11 questions and full answers, using native keyboard-
  accessible accordions that work without JavaScript.
- Added `/pricing` with a package for up to three users, additional users,
  the 7-day trial, cancellation terms and separately billed usage/services.
- Set Pricing and FAQ navigation to their actual pages.
- Limited the import/export format badges to CSV, as specified in the brief.
- About and Contact page files and their content are unchanged. The existing
  design, loading screen, globe, animations and product mockups are retained.
- This update is a local project package; no deployment was performed.

**Pricing amounts are pending.** Adam marked pricing TBA. In `lib/pricing.ts`,
`baseMonthly` and `additionalUserMonthly` are deliberately `null`. The page
shows "Contact us for pricing" until approved amounts are supplied. The dollar
symbol follows the outline; confirm the currency alongside the prices.

**Validation:** `npm run build` passed, including TypeScript checks. Built HTML
was checked for the 21 checklist items, ten emphasized key items, all 11 FAQ
answers, the three-user pricing package, pending amounts, usage-charge copy,
and Pricing/FAQ navigation. All 12 About/Contact files were compared with the
original ZIP and are byte-for-byte unchanged. The review browser could not
access the local server, so visual and interactive browser checks remain for
local review with `npm run dev`.

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
  page.tsx              home — server component, composes the five sections
  about/page.tsx        /about — our story
  contact/page.tsx      /contact — your ideas, our solution
  pricing/page.tsx      /pricing — package, additional users and usage charges
  faq/page.tsx          /faq — all 11 questions from the rebranding outline
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
    about/              AboutHero, OriginStory, Timeline, QuoteBand,
                        Leadership, ArchiveLinks
    contact/            ContactHero, ContactForm
  ui/
    Globe.tsx           React wrapper around the sphere engine
    Icon.tsx            34-icon sprite + <Icon name="…" />
    AmbientField.tsx    drifting light beams used by the About/Contact heroes
    SmartLink.tsx       router link for internal hrefs, anchor for the rest
    Logo.tsx  CtaButton.tsx  NeonCard.tsx

lib/
  data.ts               shared copy and list data (nav, checklist, KPIs, threads…)
  about.ts              timeline, leadership bios, origin copy
  contact.ts            address, phone, email, enquiry subjects
  pricing.ts            package size, pending price amounts and usage charges
  faq.ts                approved FAQ copy, with typos and punctuation corrected
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

**Client vs server.** The five `page.tsx` files, `Footer` and most About
sections are server components. Only the hero, header, dashboards, showcase,
globe, timeline, contact form and animation wrappers opt into `"use client"`.

**About and Contact.** Both pages share the homepage's palette, type and glow
but not its composition — no globe stage, no neon card row. Their recurring
device is `AmbientField` (slow vertical light beams) over a thin
blue→white→red rule. Content comes from the original databasebuilder.com:
the Our Team and History pages and the CEO's letter.

**The contact form has no backend.** It validates in the browser and hands a
fully composed message to the visitor's mail client, then shows a confirmation
panel with the same details. To post to a real endpoint, replace `handoff()` in
`components/sections/contact/ContactForm.tsx` with a fetch to your API route and
keep the existing `sent` state for the confirmation.

## Deploying to the existing Vercel project

Use the existing DatabaseBuilder project. Do not create another project.
This downloaded working folder has no `.vercel/project.json` link or Git history.

1. Run `npx vercel login` and sign in with the account that owns DatabaseBuilder.
2. Run `npx vercel project ls` in the owning team and confirm the existing project.
3. Run `npx vercel link`, choose that team, and choose the **existing** DatabaseBuilder
   project. Verify `.vercel/project.json` matches the confirmed project before deploying.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Verify all five pages on desktop and mobile, then run exactly:

```bash
npx vercel --prod
```

Confirm the production alias loads on desktop and mobile before sharing it with the
client. No deployment was performed during this refinement pass: the CLI required
sign-in and no existing project link could be verified.

The contact form prepares an email in the visitor's mail app; it does not submit to
a backend. Pricing amounts remain pending approved figures. Placeholder legal and
unconfigured social links have been removed until real destinations are supplied.


## Notes

- Fonts are subset and self-hosted through `next/font/local` — no third-party
  request and no layout shift.
- The brand gradient scrollbar lives in `globals.css`; there is no progress bar
  anywhere on the page.
- Content lives in `lib/data.ts`. Editing the checklist, KPIs, conversations or
  footer links there updates every place they render.
