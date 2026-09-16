import Reveal from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CHECKLIST } from "@/lib/data";
import SmartLink from "@/components/ui/SmartLink";

function Column({ items, from }: { items: typeof CHECKLIST; from: number }) {
  return (
    /* h-full keeps the two panels level — 21 items split 11/10, so one column
       always carries an extra row.

       The padding is on the card, not the rows: the rows keep their original
       rhythm and the list simply stops sitting flush against the card's edges. */
    <div className="db-card-flat h-full px-[clamp(10px,1vw,18px)] py-[clamp(14px,1.3vw,24px)]">
      <ol start={from} className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li
            key={item.label}
            className={`grid grid-cols-[26px_26px_minmax(0,1fr)_26px] items-center gap-2 px-3 py-[.72em] text-[clamp(13.5px,0.85vw,16px)] leading-snug sm:gap-3 sm:px-4 ${
              i === 0 ? "" : "border-t border-[#f1f4f8]"
            }`}
          >
            <span className="text-brand">
              <Icon name={item.icon} className="h-[1.25em] w-[1.25em]" />
            </span>
            <span className="text-ink-3 text-right text-[clamp(13px,0.8vw,15px)] font-semibold">
              {from + i}.
            </span>
            <span>{item.featured ? <strong className="font-semibold">{item.label}</strong> : item.label}</span>
            <span className="text-green justify-self-end">
              <Icon name="check" className="h-4 w-4" />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function FeaturesSection() {
  const half = Math.ceil(CHECKLIST.length / 2);

  return (
    <section id="features" className="db-section bg-page">
      <div className="db-shell">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <h2 className="font-display text-[clamp(25px,2.45vw,40px)] leading-[1.08] text-balance text-ink">
            Product Features <span className="text-db-red">Checklist</span>
          </h2>
          <p className="text-ink-2 mt-3 text-[clamp(15px,0.9vw,17.5px)]">
            Everything your sales team needs to close more deals.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Column items={CHECKLIST.slice(0, half)} from={1} />
          </Reveal>
          <Reveal delay={120}>
            <Column items={CHECKLIST.slice(half)} from={half + 1} />
          </Reveal>
        </div>

        <p className="text-ink-2 mt-5 text-center text-[13.5px] leading-relaxed">
          Features are included in the subscription. Dialer minutes, SMS usage, additional phone numbers
          and custom programming are charged separately.{" "}
          <SmartLink href="/pricing#usage" className="text-brand font-semibold underline underline-offset-4">
            View pricing details
          </SmartLink>
        </p>

      </div>
    </section>
  );
}
