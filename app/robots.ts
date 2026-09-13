import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

/* There was no robots.txt of any kind. /api is excluded because the contact
   endpoint accepts POST only and has nothing to index. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
