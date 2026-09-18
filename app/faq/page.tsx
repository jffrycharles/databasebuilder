import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import FaqDeepLink from "@/components/ui/FaqDeepLink";
import FaqFallback from "@/components/sections/FaqFallback";
import CtaBand from "@/components/sections/CtaBand";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/lib/faq";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on importing your own data, customization, cancellation, security, pricing, sales training, the 7-day free trial and support.",
  alternates: { canonical: "/faq" },
  ...pageMeta({
    title: "FAQ — DatabaseBuilder CRM",
    description:
      "The questions we are asked most about the CRM, answered plainly.",
    path: "/faq",
  }),
};

const slug = (title: string) => `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export default function FaqPage() {
  const byId = (id: string) => FAQ_ITEMS.find((f) => f.id === id);

  /* Resolve the groups once. The rail badge, the heading count, the rendered
     rows and the structured data all read from this, so a mistyped id in
     FAQ_CATEGORIES can no longer produce a rail that promises three answers
     above a list showing two. */
  const groups = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    anchor: slug(cat.title),
    items: cat.ids.map(byId).filter((f): f is (typeof FAQ_ITEMS)[number] => Boolean(f)),
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
    <main>
      <script
        type="application/ld+json"
        // the content is our own, from lib/faq.ts — no user input reaches this
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqDeepLink />
      <PageHero
        label="FAQ"
        title={
          <>
            Your questions, <span className="text-db-red">answered.</span>
          </>
        }
        lede="Everything customers ask before they start, in plain language. If yours is not here, a person will answer it."
      />

      <section className="db-section db-section--airy bg-page">
        <div className="db-shell">
          {/* The group name sits to one side with the questions beside it. The
              heading used to be a two-line lockup, the name over a greyed
              "Related Questions" — the same two words under all four groups,
              set at display size. It said nothing four times, so the lockup is
              one line now and the column carries a count instead.

              The column is sticky: it held three lines against a group up to
              700px tall, so most of a 300px column was empty on every group. */}
          <div className="grid gap-[clamp(52px,6vw,110px)]">
            {groups.map((cat, i) => (
              <div key={cat.title}>
                <div
                  id={cat.anchor}
                  className="db-faq-group grid items-start gap-[clamp(20px,3vw,64px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
                >
                  <div className="lg:sticky lg:top-[calc(var(--db-header-h)+40px)]">
                    <h2 className="font-display text-db-red m-0 text-[clamp(28px,3vw,48px)] leading-[1.04] tracking-[.015em]">
                      {cat.title}
                    </h2>
                    <p className="text-ink-2 mt-3.5 max-w-[38ch] text-[clamp(14.5px,0.92vw,16.5px)] leading-[1.6]">
                      {cat.blurb}
                    </p>
                    <p className="text-ink-3 font-ui mt-5 text-[12.5px] font-semibold tracking-[.14em] uppercase">
                      {cat.items.length} question{cat.items.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <Accordion items={cat.items} openFirst={i === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqFallback />
      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
