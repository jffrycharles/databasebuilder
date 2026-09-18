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
  "DatabaseBuilder vs Other CRMs. Included with both: click to dial calling, " +
  "customizable data fields and dashboard, sales pipeline management, call history " +
  "and activity tracking, workflow management, built-in email, templates and account " +
  "sync, data import module, scalable as needed, safe and secure platform, user " +
  "permissions levels, calendar and lead management. " +
  "Included with DatabaseBuilder but an add-on elsewhere: automatic call recording, " +
  "auto voicemail library, built-in SMS text campaigns, local presence, integrated " +
  "video conferencing, data export module, sales and admin training, team account and " +
  "lead management, company data share, team performance tracking and monitoring, call " +
  "monitoring, whisper coaching, live call transfer with popup notification, customer " +
  "profile popup on transfer. " +
  "Offered by DatabaseBuilder and not by other CRMs: all-in-one pricing, talking points, " +
  "integrated Google and social media search, live customer support, no long-term " +
  "contract, 30-day cancellation, not overly complicated, affordable pricing. " +
  "Charged separately by both: custom API integration, dialer minutes and SMS messages, " +
  "additional phone numbers, data cloud storage, additional user licenses.";

export default function FeaturesSection() {
  return (
    <section id="features" className="db-section bg-page">
      <div className="db-shell">
        <Reveal>
          <figure className="mx-auto m-0 max-w-[1020px]">
            <Image
              src="/comparison.webp"
              alt={ALT}
              width={1189}
              height={1323}
              sizes="(max-width: 1080px) 92vw, 1020px"
              quality={92}
              className="block h-auto w-full rounded-[14px]"
            />
          </figure>
        </Reveal>

        <p className="text-ink-2 mt-6 text-center text-[13.5px] leading-relaxed">
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
