import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";
import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { SITE } from "@/lib/data";

/* The four questions asked before a trial.

   Deliberately NOT an accordion. Every answer is visible in the markup with no
   interaction, because a collapsed <details> is worth less to a crawler — and
   to an AI summarising the page — than plain question-and-answer text. That is
   the whole reason for the change, so the FAQPage structured data below sits
   alongside it and says the same thing in a machine-readable form. */
const HOME_IDS = ["own-data", "customization", "data-after-cancellation", "additional-costs"];

export default function HomeFaq() {
  const items = HOME_IDS.map((id) => FAQ_ITEMS.find((f) => f.id === id)).filter(
    (f): f is (typeof FAQ_ITEMS)[number] => Boolean(f),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join("\n\n") },
    })),
  };

  return (
    <section id="faq" className="bg-page db-section">
      <script
        type="application/ld+json"
        // our own copy, from lib/faq.ts — no user input reaches this
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="db-shell">
        <div className="grid items-start gap-[clamp(28px,3.4vw,72px)] lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <h2 className="font-display text-ink text-[clamp(28px,3vw,48px)] leading-[1.06] tracking-[.015em] text-balance">
              Most Commonly Asked <span className="text-db-red">Questions</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5">
              <SmartLink
                href="/faq"
                className="text-brand text-[clamp(14.5px,0.95vw,16.5px)] font-semibold underline underline-offset-4"
              >
                Read all {FAQ_ITEMS.length} questions
              </SmartLink>
              <SmartLink
                href="/contact"
                className="text-ink-2 hover:text-brand text-[clamp(14.5px,0.95vw,16.5px)] font-semibold underline underline-offset-4 transition-colors"
              >
                Ask us directly
              </SmartLink>
            </div>
          </Reveal>

          {/* The same card the FAQ page uses, with every row open — it looks
              like the rest of the site while the answers stay readable without
              interaction, which is the point of the change. */}
          <Reveal delay={90}>
            <Accordion items={items} openAll />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
