import type { Metadata } from "next";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import Accordion from "@/components/ui/Accordion";
import FaqDeepLink from "@/components/ui/FaqDeepLink";
import FaqHero from "@/components/sections/faq/FaqHero";
import FaqMotion from "@/components/sections/faq/FaqMotion";
import CtaBand from "@/components/sections/CtaBand";
import { LIVE_FAQ_ITEMS, LIVE_FAQ_CATEGORIES } from "@/lib/faq-live";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to your questions about DatabaseBuilder's product and features, data, policies, and sales.",
  alternates: { canonical: "/faq" },
  ...pageMeta({
    title: "FAQ — DatabaseBuilder CRM",
    description:
      "Answers to your questions about DatabaseBuilder's product and features, data, policies, and sales.",
    path: "/faq",
  }),
};

const slug = (title: string) => `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const categoryImages = {
  product: { src: "/faq/product-features.webp", alt: "A sales professional reviewing a CRM dashboard", width: 1280, height: 1280 },
  data: { src: "/faq/data.webp", alt: "Business reports and customer data on a tablet", width: 1280, height: 1280 },
  policy: { src: "/faq/policy.webp", alt: "A privacy policy being reviewed on a laptop", width: 1280, height: 1280 },
  sales: { src: "/faq/sales.webp", alt: "A sales team speaking with customers", width: 768, height: 768 },
};

export default function FaqPage() {
  const byId = (id: string) => LIVE_FAQ_ITEMS.find((f) => f.id === id);

  /* Resolve the groups once. The heading, the rendered rows and the structured
     data all read from this, so a mistyped id in LIVE_FAQ_CATEGORIES can no longer
     produce a heading above a list that does not match it. */
  const groups = LIVE_FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    anchor: slug(cat.title),
    items: cat.ids.map(byId).filter((f): f is (typeof LIVE_FAQ_ITEMS)[number] => Boolean(f)),
  }));
  const shown = groups.flatMap((g) => g.items);

  /* Every answer is already in the DOM whether or not its row is open, so the
     markup and the structured data cannot drift apart. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/faq`,
    url: `${SITE.url}/faq`,
    inLanguage: "en",
    mainEntity: shown.map((f) => ({
      "@type": "Question",
      "@id": `${SITE.url}/faq#${f.id}`,
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        // paragraphs, not one run-on line
        text: f.answer.join("\n\n"),
      },
    })),
  };

  return (
    <main className="db-still db-faq-page">
      <script
        type="application/ld+json"
        // Restored FAQ content; escape characters that could close the script.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqDeepLink />
      <FaqMotion />
      <FaqHero />

      <div className="db-faq-content">
        {groups.map((cat) => (
          <section
            key={cat.title}
            id={cat.anchor}
            aria-labelledby={`${cat.anchor}-h`}
            className={`db-faq-section db-faq-group db-faq-section--${cat.kind}`}
          >
            <div className="db-faq-shell db-faq-section__layout">
              <Image
                {...categoryImages[cat.kind]}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1280px) 44vw, 585px"
                className="db-faq-section__photo"
              />

              <div className="db-faq-section__questions">
                <h2 id={`${cat.anchor}-h`} className="db-faq-section__title">
                  <span>{cat.title}</span>
                  <span>Related Questions</span>
                </h2>
                <Accordion items={cat.items} variant="plain" />
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
