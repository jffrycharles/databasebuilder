import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { ABOUT, ORIGIN } from "@/lib/about";

/**
 * The founder's line, set as an editorial pull-quote on the light page.
 *
 * It used to be a navy radial band — the same recipe as the closing call to
 * action three sections below it, so the page said the same visual thing
 * twice. A rule, a large quote and an attribution carry it better and leave
 * the dark bands to the hero and the history.
 */
export default function QuoteBand() {
  return (
    <section data-surface="page" className="db-section--sm bg-page" data-quote>
      <div className="db-shell db-shell--narrow">
        <Reveal>
          <figure className="border-line m-0 grid gap-[var(--db-gap)] border-y py-[clamp(32px,3.6vw,60px)] lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <blockquote className="relative m-0 pl-[clamp(18px,2vw,32px)]">
              <span className="db-rule db-rule--vert absolute inset-y-0 left-0" aria-hidden="true" />
              <p className="db-h2 text-ink max-w-[24ch]">
                Selling hasn&apos;t changed very much over the years.
                <span className="text-db-red"> Only the technology around it has.</span>
              </p>
              <p className="db-lede text-ink-2 mt-5 max-w-[46ch]">{ORIGIN.pullQuote}</p>
            </blockquote>

            <figcaption className="lg:text-right">
              <span className="db-h4 text-ink block">Adam Berman</span>
              <span className="db-sm text-ink-3 mt-0.5 block">President / CEO, DatabaseBuilder</span>
              <SmartLink
                href={ABOUT.ceoLetter}
                className="db-link db-sm mt-4 lg:justify-end"
              >
                Read the full letter
                <Icon name="upload" className="rotate-90" />
              </SmartLink>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
