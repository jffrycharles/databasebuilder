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
 * Four blocks, four layout families, four motions, on purpose. A band of
 * figures under one rule; an editorial spread with the title held still while
 * the story runs past it; a full-bleed dark centrepiece for his line; a white
 * band for the data promise. Nothing here repeats the block above it, in
 * layout or in the way it arrives.
 *
 * The last two are full-bleed, so they sit outside the shell rather than
 * inside it, and the section's own rhythm padding belongs to the top half
 * alone.
 */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page">
      <div className="db-shell db-section">
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

        <div className="mt-[clamp(54px,6vw,110px)]">
          <WhereItStarted />
        </div>
      </div>

      <FounderQuote />
      <DataOwnership />
    </section>
  );
}
