import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";
import { COMPARISON_GROUPS, COMPARISON_LEDE, type CompareMark } from "@/lib/data";

/**
 * Adam's "DatabaseBuilder vs Other CRMs" chart, rebuilt as a real table.
 *
 * It replaces the old one-column features checklist, which only ever said
 * "we have this" twenty-one times. The whole argument of the chart is the
 * second column: the same list, priced as add-ons everywhere else.
 *
 * It is a `<table>` rather than a grid of divs on purpose. The row headers and
 * column headers are what make it legible to a screen reader, and they are
 * also what lets a search engine or an answer engine quote a single row of it
 * — which, for a page whose entire job is the comparison, is the point.
 *
 * The five blocks are his, kept in his order and separated the way his artwork
 * separates them, with a heavy rule instead of a black bar.
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="db-section bg-page">
      <div className="db-shell">
        <Reveal className="mx-auto mb-[clamp(22px,2.4vw,38px)] max-w-[760px] text-center">
          <h2 className="font-display text-ink text-[clamp(25px,2.45vw,40px)] leading-[1.08] text-balance">
            <span className="text-db-blue">Database</span>
            <span className="text-db-red">Builder</span>{" "}
            <span className="text-ink-3">vs Other CRMs</span>
          </h2>
          <p className="text-ink-2 mt-3 text-[clamp(15px,0.9vw,17.5px)] leading-[1.55]">
            {COMPARISON_LEDE}
          </p>
        </Reveal>

        <Reveal>
          <div className="db-compare">
            <table>
              <caption className="sr-only">
                Feature comparison between DatabaseBuilder and other CRM companies
              </caption>
              <colgroup>
                <col />
                <col className="db-compare__col" />
                <col className="db-compare__col" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="db-compare__head">
                    Features
                  </th>
                  <th scope="col">
                    <span className="db-compare__pill db-compare__pill--db">DatabaseBuilder</span>
                  </th>
                  <th scope="col">
                    <span className="db-compare__pill db-compare__pill--other">Other CRMs</span>
                  </th>
                </tr>
              </thead>

              {COMPARISON_GROUPS.map((group, gi) => (
                <tbody key={group[0].label} className={gi > 0 ? "db-compare__group" : undefined}>
                  {group.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className={row.featured ? "db-compare__row is-featured" : "db-compare__row"}>
                        {row.label}
                      </th>
                      <td>
                        <Mark value={row.db} />
                      </td>
                      <td>
                        <Mark value={row.other} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Reveal>

        <p className="text-ink-2 mt-5 text-center text-[13.5px] leading-relaxed">
          Everything marked included is in the subscription. Dialer minutes, SMS usage, additional
          phone numbers and custom programming are charged separately.{" "}
          <SmartLink href="/pricing#usage" className="text-brand font-semibold underline underline-offset-4">
            View pricing details
          </SmartLink>
        </p>
      </div>
    </section>
  );
}

/* The four states of a cell. Each carries its own text for assistive tech and
   for anything reading the page without the styling — a bare tick is only a
   tick to someone who can see the column it sits under. */
function Mark({ value }: { value: CompareMark }) {
  if (value === "yes") {
    return (
      <span className="db-mark db-mark--yes">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5.5 12.5l4.4 4.4L18.6 7.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="db-mark db-mark--no">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 7.5l9 9M16.5 7.5l-9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Not available</span>
      </span>
    );
  }
  return <span className="db-mark__text">{value === "addon" ? "Add-On" : "Additional"}</span>;
}
