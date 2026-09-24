import Reveal from "@/components/animations/Reveal";
import Standfirst from "./Standfirst";
import OriginStats from "./OriginStats";
import { ABOUT } from "@/lib/about";

/* Keep the two tones in sync with the single source of copy. */
const BREAK = ABOUT.standfirst.indexOf(". ");
const DIAGNOSIS = BREAK < 0 ? "" : ABOUT.standfirst.slice(0, BREAK + 1);
const ANSWER = BREAK < 0 ? ABOUT.standfirst : ABOUT.standfirst.slice(BREAK + 2);

export default function StoryOverview() {
  return (
    <section id="overview" className="bg-page">
      <div className="db-shell db-section">
        <Reveal>
          <Standfirst
            diagnosis={DIAGNOSIS}
            answer={ANSWER}
            className="font-body mx-auto m-0 mt-[clamp(12px,1.1vw,18px)] max-w-[36ch] text-center text-[clamp(23px,2.3vw,37px)] leading-[1.17] tracking-[-.018em] text-balance"
          />
        </Reveal>

        <div className="mt-[clamp(44px,5vw,88px)]">
          <OriginStats />
        </div>
      </div>
    </section>
  );
}
