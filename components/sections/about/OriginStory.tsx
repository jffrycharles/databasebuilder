import Reveal from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import { Icon } from "@/components/ui/Icon";
import DotArt from "./DotArt";
import Standfirst from "./Standfirst";
import { ABOUT, ORIGIN, OWNERSHIP } from "@/lib/about";

/* The standfirst is one sentence of diagnosis and one of answer. Split on the
   sentence break rather than storing it twice, so the copy has exactly one
   home in lib/about.ts and the two halves can never drift apart. */
const BREAK = ABOUT.standfirst.indexOf(". ");
const DIAGNOSIS = BREAK < 0 ? "" : ABOUT.standfirst.slice(0, BREAK + 1);
const ANSWER = BREAK < 0 ? ABOUT.standfirst : ABOUT.standfirst.slice(BREAK + 2);

/**
 * The origin section as one ruled sheet.
 *
 * Earlier rounds were separate cards floating on the page ground, and they
 * read as unrelated boxes that happened to be stacked. This is a single
 * bordered module whose rows are divided by hairlines it carries itself, so
 * the metrics, the story, the founder's line and the data promise read as one
 * document rather than four.
 *
 * The quote is a row of that sheet, not a band between two of them. It is the
 * one tonal break, and putting it inside the border is what stops it reading
 * as a separate advert dropped into the middle of the section.
 *
 * Two reveals, not ten. A ruled grid whose cells arrive one at a time shows
 * its hairlines building in sequence, which looks broken rather than staged.
 */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page db-section">
      <div className="db-shell">
        <Reveal>
          <p className="db-eyebrow-rule db-eyebrow-rule--ink">
            <span aria-hidden="true" />
            {ABOUT.kicker}
            <span aria-hidden="true" />
          </p>

          {/* One paragraph, two tones — not two paragraphs. Set as separate
              blocks the halves broke into two centred slabs of the same width
              and stopped reading as a single sentence. */}
          <Standfirst
            diagnosis={DIAGNOSIS}
            answer={ANSWER}
            className="font-body mx-auto m-0 mt-[clamp(12px,1.1vw,18px)] max-w-[36ch] text-center text-[clamp(23px,2.3vw,37px)] leading-[1.17] tracking-[-.018em] text-balance"
          />
        </Reveal>

        <Reveal className="mt-[clamp(22px,2.2vw,38px)]">
          <div className="db-sheet">
            <div className="db-sheet-row db-sheet-row--tight db-sheet-row--3">
              {ORIGIN.stats.map((s) => (
                <div key={s.unit}>
                  {/* numeral and unit on one baseline: the unit belongs to the
                      figure, and set underneath it the eye had to choose
                      between the unit and the description */}
                  <p className="db-metric__fig m-0">
                    <span className="font-display text-ink text-[clamp(32px,3.1vw,50px)] leading-none tracking-[.01em] tabular-nums">
                      <CountUp value={s.value} />
                      <span className="text-db-red">{s.suffix}</span>
                    </span>
                    <span className="font-brand text-ink-3 text-[clamp(11px,0.76vw,12.5px)] leading-[1.15] font-semibold tracking-[.18em] uppercase">
                      {s.unit}
                    </span>
                  </p>
                  <p className="text-ink-2 m-0 mt-[clamp(7px,0.7vw,10px)] text-[clamp(13px,0.86vw,15px)] leading-[1.5]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="db-sheet-row db-sheet-row--prose">
              <div>
                <h2 className="font-body text-ink m-0 max-w-[16ch] text-[clamp(24px,2.4vw,36px)] leading-[1.06] font-bold tracking-[-.028em] text-balance">
                  Where it <span className="text-db-red">started</span>
                </h2>
                <p className="text-ink-2 m-0 mt-[clamp(11px,1.1vw,16px)] text-[clamp(13.5px,0.9vw,15px)] leading-[1.58]">
                  {ORIGIN.lead}
                </p>
              </div>
              <div className="text-ink-2 text-[clamp(13.5px,0.9vw,15px)] leading-[1.58]">
                {ORIGIN.body.map((p, i) => (
                  <p key={p} className={i ? "m-0 mt-[clamp(9px,0.9vw,13px)]" : "m-0"}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <blockquote className="db-sheet-quote m-0">
              <DotArt shape="grid" className="h-[30px] w-[30px] shrink-0 text-white/25" />
              <p className="font-body m-0 text-[clamp(19px,1.7vw,29px)] leading-[1.24] font-bold tracking-[-.022em] text-white">
                {ORIGIN.pullQuote}
              </p>
              <cite className="db-sheet-quote__by font-brand text-[12.5px] leading-[1.4] font-medium tracking-[.02em] text-white/70 not-italic">
                Adam Berman, from the letter to our customers
              </cite>
            </blockquote>

            <div className="db-sheet-row db-sheet-row--prose">
              <h3 className="font-body text-ink m-0 max-w-[24ch] text-[clamp(21px,2.1vw,31px)] leading-[1.1] font-bold tracking-[-.026em] text-balance">
                Your data is never <span className="text-db-red">held hostage</span>
              </h3>
              <p className="text-ink-2 m-0 text-[clamp(13.5px,0.9vw,15px)] leading-[1.58]">
                {OWNERSHIP.body}
              </p>
            </div>

            <div className="db-sheet-row db-sheet-row--tight db-sheet-row--4">
              {OWNERSHIP.points.map((p) => (
                <div key={p.text} className="db-point">
                  <span className="db-saas-icon">
                    <Icon name={p.icon} className="h-[17px] w-[17px]" />
                  </span>
                  <p className="text-ink m-0 text-[clamp(13.5px,0.88vw,15px)] leading-[1.45] font-medium">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
