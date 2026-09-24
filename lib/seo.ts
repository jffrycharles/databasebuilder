import { SITE } from "@/lib/data";

/**
 * Whether this deploy is allowed into a search index.
 *
 * A staging copy of a marketing site is the classic way to end up competing
 * with yourself in Google: same copy, same headings, a second hostname. Set
 * NEXT_PUBLIC_NOINDEX=1 on anything that is not the live site. Vercel preview
 * and branch deploys are caught automatically; a plain Node host has no
 * VERCEL_ENV, so it defaults to indexable and the flag is what turns it off.
 */
export const IS_INDEXABLE =
  process.env.NEXT_PUBLIC_NOINDEX !== "1" &&
  (process.env.VERCEL_ENV ?? "production") === "production";

/* The card every share of this site renders.
 *
 * `summary_large_image` promises a picture; without one, X, LinkedIn, Facebook
 * and Slack all fall back to a bare text row. /og.jpg is a 1200×630 render of
 * the brand lockup — the globe, the wordmark and the line.
 *
 * JPEG, not the PNG it was: WhatsApp quietly drops a preview image over a few
 * hundred KB and shows a bare link instead, and the PNG was 369 KB. At quality
 * 88 this is 128 KB with no visible difference on the dark gradient. The PNG
 * stays for the JSON-LD organisation logo in app/layout.tsx.
 *
 * It lives here rather than in app/layout.tsx because a Next layout may only
 * export `metadata`, `viewport` and its default component — any other export
 * fails the build's type check. */
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  /* Emitted as og:image:type. Facebook and LinkedIn use it to pick a decoder
     before downloading, which is one less reason for a card to come back blank. */
  type: "image/jpeg",
  alt: "DatabaseBuilder — a simple alternative to your overpriced CRM",
} as const;

/**
 * Per-page Open Graph and Twitter metadata.
 *
 * Next replaces the whole `openGraph` object when a page declares one — it does
 * not deep-merge — so `siteName`, `locale`, `type` and `images` have to be
 * restated or they silently vanish from that page. `twitter` is never
 * back-filled from `openGraph` either, which is how /about, /pricing and
 * /contact all ended up sharing with the homepage's title and description.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  /** leading slash, e.g. "/pricing" */
  path: string;
  type?: "website" | "article";
}) {
  return {
    openGraph: {
      type,
      locale: "en_US",
      siteName: SITE.name,
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
