import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";
import { IS_INDEXABLE } from "@/lib/seo";

/* The crawlers that only render a share card — they read og: tags and fetch
   the image, they do not build a search index. Facebook (which also serves
   Messenger and Instagram DMs), X, LinkedIn and Slack all document that they
   obey robots.txt, so a blanket `Disallow: /` is exactly why a staging link
   pastes as a bare URL with no picture. Letting them through is what makes the
   card testable before launch; `noindex` on every page is the thing actually
   keeping staging out of search, and it still applies to all of these. */
const PREVIEW_CRAWLERS = [
  "facebookexternalhit",
  "Facebot",
  "WhatsApp",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot-LinkExpanding",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
];

/* There was no robots.txt of any kind. /api is excluded because the contact
   endpoint accepts POST only and has nothing to index. */
export default function robots(): MetadataRoute.Robots {
  /* Staging says no to every indexer, and offers no sitemap to follow — but
     a named group wins over `*`, so the preview crawlers above still get in. */
  if (!IS_INDEXABLE) {
    return {
      rules: [
        ...PREVIEW_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
        { userAgent: "*", disallow: "/" },
      ],
    };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
