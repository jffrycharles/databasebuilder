import SectionHeading from "@/components/ui/SectionHeading";
import SmartLink from "@/components/ui/SmartLink";
import CompareMotion from "@/components/sections/CompareMotion";
import CompareTable, { MarkIcon } from "@/components/sections/CompareTable";
import CompareChart from "@/components/sections/CompareChart";
import { COMPARE_LEDE } from "@/lib/comparison";
import type { Mark } from "@/lib/comparison";
import { VARIANT } from "@/lib/variants";

/* The legend reads left to right the way the marks rank: ours, then the three
   ways a competitor falls short or charges. */
const LEGEND: { mark: Mark; label: string }[] = [
  { mark: "yes", label: "Included" },
  { mark: "no", label: "Not included" },
  /* the pills already say "Add-on" / "Additional"; the label finishes the thought */
  { mark: "addon", label: "costs extra" },
  { mark: "additional", label: "billed separately" },
];

/**
 * DatabaseBuilder vs other CRMs, redesigned as a comparison table.
 *
 * History, so the next change knows what it is undoing: this was an HTML table
 * once before, and Adam asked for his PNG chart back. The chart then carried
 * the section until this redesign, which keeps every one of its 37 rows and
 * its title and subtitle (lib/comparison.ts), as real text in the site's own
 * type. public/comparison.png is left in place in case he wants it again.
 *
 * Dark, per the client's note: the dashboard section above and the chart were
 * two light sections running into each other with nothing between them.
 *
 * Staging builds show the chart picture instead (lib/variants.ts).
 */
export default function FeaturesSection() {
  if (VARIANT.compare === "image") return <CompareChart />;
  return (
    <section id="features" className="db-section db-features db-features--table">
      <div className="db-shell">
        <SectionHeading
          tone="dark"
          label="How we compare"
          align="center"
          display
          size="lg"
          title={
            <>
              Database<span className="text-db-red">Builder</span> vs Other CRMs
            </>
          }
          lede={COMPARE_LEDE}
          className="mb-[clamp(26px,2.6vw,40px)]"
        />

        {/* the key comes first, so the marks are learned before they are met */}
        <ul className="db-cmp-legend" aria-label="Key">
          {LEGEND.map(({ mark, label }) => (
            <li key={mark}>
              <MarkIcon mark={mark} />
              {label}
            </li>
          ))}
        </ul>

        <CompareMotion className="mx-auto max-w-[1100px]">
          <CompareTable />
        </CompareMotion>

        <p className="mx-auto mt-[clamp(20px,2vw,28px)] max-w-[760px] text-center text-[14px] leading-relaxed text-white/75">
          Everything marked included is in the subscription. Dialer minutes, SMS usage, additional
          phone numbers and custom programming are charged separately.{" "}
          <SmartLink
            href="/pricing#usage"
            className="font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white"
          >
            View pricing details
          </SmartLink>
        </p>
      </div>
    </section>
  );
}
