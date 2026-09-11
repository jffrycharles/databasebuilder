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
    <section id="faq" className="bg-page db-section">
      <div className="db-shell">
        <div className="grid gap-[clamp(28px,3.4vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="font-body text-ink text-[clamp(28px,2.7vw,44px)] leading-[1.08] font-bold tracking-[-.02em]">
              Questions, <span className="text-db-red">answered</span>
            </h2>
            <p className="text-ink-2 mt-3 max-w-[38ch] text-[clamp(15px,0.9vw,17.5px)] leading-[1.6]">
              The things people ask before they start a trial. If yours is not here, a person will
              answer it.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <SmartLink
                href="/faq"
                className="text-brand text-[15px] font-semibold underline underline-offset-4"
              >
                Read all {FAQ_ITEMS.length} questions
              </SmartLink>
              <SmartLink
                href="/contact"
                className="text-ink-2 hover:text-brand text-[15px] font-semibold underline underline-offset-4 transition-colors"
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
