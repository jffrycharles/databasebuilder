import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";
import { LEGAL_UPDATED } from "@/lib/legal";

/* Without this the routes are discoverable only by crawling internal
   links, and Google gets no lastmod or priority signal at all. `alternates`
   already declares a canonical on every page; this is the other half. */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-13");

  return [
    { url: `${SITE.url}/`, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/pricing`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/faq`, lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/privacy`, lastModified: new Date(LEGAL_UPDATED), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terms`, lastModified: new Date(LEGAL_UPDATED), changeFrequency: "yearly", priority: 0.3 },
  ];
}
