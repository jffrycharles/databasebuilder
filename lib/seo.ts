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
 * and Slack all fall back to a bare text row. /og.png is a 1200×630 render of
 * the brand lockup.
 *
 * It lives here rather than in app/layout.tsx because a Next layout may only
 * export `metadata`, `viewport` and its default component — any other export
 * fails the build's type check. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
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
