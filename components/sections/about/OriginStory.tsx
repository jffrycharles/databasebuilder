import Reveal from "@/components/animations/Reveal";
import BuildingArt from "./BuildingArt";
import WhereItStarted from "./WhereItStarted";
import FounderQuote from "./FounderQuote";
import { ABOUT } from "@/lib/about";

/** The building opens the story; the quote and figures follow the timeline. */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page">
      <div className="db-shell db-section">
        <BuildingArt />

        <div className="mt-[clamp(54px,6vw,110px)]">
          <Reveal className="mb-[clamp(28px,3vw,44px)]">
            <p className="db-eyebrow-rule db-eyebrow-rule--ink">
              <span aria-hidden="true" />
              {ABOUT.kicker}
              <span aria-hidden="true" />
            </p>
          </Reveal>
          <WhereItStarted />
        </div>
      </div>

      <FounderQuote />
    </section>
  );
}
