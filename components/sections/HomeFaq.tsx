import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";
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
        <Reveal className="mx-auto mb-[clamp(32px,4vw,64px)] max-w-[760px] text-center">
          <h2 className="font-display text-ink text-[clamp(28px,3vw,48px)] leading-[1.06] tracking-[.015em] text-balance">
            Most Commonly Asked <span className="text-db-red">Questions</span>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <SmartLink
              href="/faq"
              className="text-brand text-[clamp(16px,1.15vw,20px)] font-semibold underline underline-offset-4"
            >
              Read all {FAQ_ITEMS.length} questions
            </SmartLink>
            <SmartLink
              href="/contact"
              className="text-ink-2 hover:text-brand text-[clamp(16px,1.15vw,20px)] font-semibold underline underline-offset-4 transition-colors"
            >
              Ask us directly
            </SmartLink>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-[900px] gap-[clamp(26px,3vw,46px)]">
          {items.map((f, i) => (
            <Reveal key={f.id} delay={i * 70}>
              <div className="border-line border-t pt-[clamp(20px,2.2vw,34px)]">
                <h3 className="db-faq__q text-ink m-0">{f.question}</h3>
                <div className="text-ink-2 mt-3 grid max-w-[74ch] gap-3 text-[clamp(15px,0.95vw,17.5px)] leading-[1.7]">
                  {f.answer.map((para) => (
                    <p key={para} className="m-0">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
