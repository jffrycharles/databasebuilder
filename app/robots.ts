import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";
import { IS_INDEXABLE } from "@/lib/seo";

/* There was no robots.txt of any kind. /api is excluded because the contact
   endpoint accepts POST only and has nothing to index. */
export default function robots(): MetadataRoute.Robots {
  /* Staging says no to everything, and offers no sitemap to follow. */
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
