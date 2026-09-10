import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";
import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/faq";

/* The six questions people ask before they trial, pulled from the full list.
   Built on <details> so it works with no JavaScript and stays a server
   component — the open/close animation is CSS. */
const HOME_IDS = [
  "free-trial",
  "own-data",
  "advanced-features",
  "data-after-cancellation",
  "cancellation",
  "security",
];

export default function HomeFaq() {
  const items = HOME_IDS.map((id) => FAQ_ITEMS.find((f) => f.id === id)).filter(
    (f): f is (typeof FAQ_ITEMS)[number] => Boolean(f),
  );

  return (
    <section id="faq" data-surface="page" className="bg-page db-section">
      <div className="db-shell">
        <div className="grid gap-[clamp(28px,3.4vw,64px)] lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <h2 className="db-h2 text-ink">
              Questions, <span className="text-db-red">answered</span>
            </h2>
            <p className="db-lede text-ink-2 mt-4 max-w-[38ch]">
              The things people ask before they start a trial. If yours is not here, a person will
              answer it.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <SmartLink
                href="/faq"
                className="db-sm text-brand font-semibold underline underline-offset-4"
              >
                Read all {FAQ_ITEMS.length} questions
              </SmartLink>
              <SmartLink
                href="/contact"
                className="db-sm text-ink-2 hover:text-brand font-semibold underline underline-offset-4 transition-colors"
              >
                Ask us directly
              </SmartLink>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <Accordion items={items} openFirst />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
