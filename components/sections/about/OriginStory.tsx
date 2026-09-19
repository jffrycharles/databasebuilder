import Reveal from "@/components/animations/Reveal";
import Standfirst from "./Standfirst";
import OriginStats from "./OriginStats";
import WhereItStarted from "./WhereItStarted";
import FounderQuote from "./FounderQuote";
import DataOwnership from "./DataOwnership";
import { ABOUT } from "@/lib/about";

/* The standfirst is one sentence of diagnosis and one of answer. Split on the
   sentence break rather than storing it twice, so the copy has exactly one
   home in lib/about.ts and the two halves can never drift apart. */
const BREAK = ABOUT.standfirst.indexOf(". ");
const DIAGNOSIS = BREAK < 0 ? "" : ABOUT.standfirst.slice(0, BREAK + 1);
const ANSWER = BREAK < 0 ? ABOUT.standfirst : ABOUT.standfirst.slice(BREAK + 2);

/**
 * Our story.
 *
 * Four blocks, four layout families, on purpose. The previous build ran all
 * of this through one ruled sheet: every row hairlined, every cell the same
 * white, so the numbers, the story and the data promise all carried the same
 * weight and roughly a third of it was empty. A spec sheet is the right
 * shape for specs and the wrong shape for a founder's story.
 *
 * So: a typographic band for the figures, an asymmetric spread for the
 * story, a full-bleed dark moment for his line, and a white panel of rows
 * for the promise. The quote sits outside the shell because it bleeds; the
 * other three sit inside it.
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

          {/* One paragraph, two tones, not two paragraphs. Set as separate
              blocks the halves broke into two centred slabs of the same width
              and stopped reading as a single sentence. */}
          <Standfirst
            diagnosis={DIAGNOSIS}
            answer={ANSWER}
            className="font-body mx-auto m-0 mt-[clamp(12px,1.1vw,18px)] max-w-[36ch] text-center text-[clamp(23px,2.3vw,37px)] leading-[1.17] tracking-[-.018em] text-balance"
          />
        </Reveal>

        <div className="mt-[clamp(44px,5vw,88px)]">
          <OriginStats />
        </div>

        <div className="mt-[clamp(50px,5.6vw,104px)]">
          <WhereItStarted />
        </div>
      </div>

      <div className="mt-[clamp(50px,5.6vw,104px)]">
        <FounderQuote />
      </div>

      <div className="db-shell relative z-[1] mt-[clamp(-30px,-2.4vw,-18px)]">
        {/* the panel rides up over the seam of the dark band, so the contrast
            step reads as one move rather than two stacked sections */}
        <DataOwnership />
      </div>
    </section>
  );
}
