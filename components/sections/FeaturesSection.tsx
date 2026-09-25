import SectionHeading from "@/components/ui/SectionHeading";
import SmartLink from "@/components/ui/SmartLink";
import CompareMotion from "@/components/sections/CompareMotion";
import CompareTable from "@/components/sections/CompareTable";
import CompareChart from "@/components/sections/CompareChart";
import { COMPARE_LEDE } from "@/lib/comparison";
import { VARIANT } from "@/lib/variants";

/**
 * DatabaseBuilder vs other CRMs, redesigned as a comparison table.
 *
 * History, so the next change knows what it is undoing: this was an HTML table
 * once before, and Adam asked for his PNG chart back. The chart then carried
 * the section until this redesign, which keeps every one of its rows and
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
          title={
            <>
              Database<span className="text-db-red">Builder</span> vs Other CRMs
            </>
          }
          lede={COMPARE_LEDE}
          className="mb-[clamp(28px,2.6vw,40px)]"
        />

        <CompareMotion className="mx-auto max-w-[900px]">
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
