import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SmartLink from "@/components/ui/SmartLink";

/**
 * Adam's comparison chart, as his own artwork.
 *
 * This was rebuilt as an HTML table for a while — the argument being that a
 * table can be read by a screen reader and quoted by a search engine, and an
 * image cannot. Adam saw the rebuild and wanted his PNG back, including the
 * headings I had added to caption each block. His chart, his call.
 *
 * The one thing an image cannot do is carry its own text, so the alt text does
 * it instead: the whole comparison, in reading order, for anyone on a screen
 * reader and for anything crawling the page.
 */
const ALT =
  "DatabaseBuilder vs Other CRMs: more advanced features at no additional cost. " +
  "Individual features included with DatabaseBuilder and not with other CRMs: click to " +
  "dial calling, customizable data fields and dashboard, sales pipeline management, call " +
  "history and activity tracking, workflow management, email, templates and account sync, " +
  "data import module, scalable as needed, safe and secure platform, user permissions " +
  "levels, calendar and lead management, automatic call recording, auto voicemail library, " +
  "built-in SMS text campaigns, local presence, integrated video conferencing, data export " +
  "module. " +
  "Team and training features included with DatabaseBuilder but an add-on with other CRMs: " +
  "user account and lead management, company data share, team tracking and monitoring, " +
  "call monitoring, whisper coaching, live call transfer with popup notification, customer " +
  "profile popup on transfer. " +
  "Included with DatabaseBuilder and not with other CRMs: all-in-one pricing, talking " +
  "points, integrated Google and social media, live customer support, no long-term " +
  "contract, 30-day cancellation, not overly complicated, affordable pricing. " +
  "Charged separately by both: custom API integration, dialer minutes and SMS messages, " +
  "additional phone numbers, data cloud storage, additional user licenses.";

/** The comparison as Adam's chart picture — the staging option
    (lib/variants.ts). The same section as before the table redesign. */
export default function CompareChart() {
  return (
    /* Dark, per the client's note: the dashboard section above and this chart
       were two light sections running into each other with nothing between
       them. The band is the page's own black, as Leadership on /about is. */
    <section id="features" className="db-section db-features">
      <div className="db-shell">
        <Reveal>
          <p className="db-eyebrow-rule">
            <span aria-hidden="true" />
            How we compare
            <span aria-hidden="true" />
          </p>
          {/* capped at the PNG's native 791px so the Excel text is never upscaled */}
          <figure className="db-compare-frame mx-auto mt-[clamp(20px,2vw,32px)] mb-0">
            <Image
              src="/comparison.png"
              alt={ALT}
              width={791}
              height={1146}
              sizes="(max-width: 880px) 90vw, 791px"
              quality={95}
              className="db-compare-frame__sheet"
            />
          </figure>
        </Reveal>

        <p className="mx-auto mt-6 max-w-[851px] text-center text-[13.5px] leading-relaxed text-white/65">
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
