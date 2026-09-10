import Reveal from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CHECKLIST, VALUE_CARDS } from "@/lib/data";
import SmartLink from "@/components/ui/SmartLink";

function Column({ items, from }: { items: typeof CHECKLIST; from: number }) {
  return (
    <div className="db-card px-1.5 py-2.5">
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
    <section id="features" data-surface="page" className="db-section bg-page">
      <div className="db-shell">
        <Reveal className="mx-auto mb-[clamp(28px,3vw,48px)] max-w-[660px] text-center">
          <h2 className="db-h2 text-ink">
            Product Features <span className="text-db-red">Checklist</span>
          </h2>
          <p className="db-lede text-ink-2 mt-4">
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

        <p className="db-sm text-ink-2 mx-auto mt-6 max-w-[78ch] text-center">
          Features are included in the subscription. Dialer minutes, SMS usage, additional phone numbers
          and custom programming are charged separately.{" "}
          <SmartLink href="/pricing#usage" className="text-brand font-semibold underline underline-offset-4">
            View pricing details
          </SmartLink>
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="db-card db-card--lift h-full p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[9px] text-white"
                    style={{ background: card.tint }}
                  >
                    <Icon name={card.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="db-h4 text-ink">
                    {card.title}
                  </h3>
                </div>
                <p className="db-sm text-ink-2">{card.body}</p>
                {card.formats && (
                  <div className="mt-4 flex gap-3.5">
                    {card.formats.map((f) => (
                      <div key={f.label} className="text-center">
                        <span
                          className="font-display mb-1.5 grid h-[46px] w-[40px] place-items-center rounded-md text-[9.5px] font-bold text-white"
                          style={{ background: f.tint }}
                        >
                          {f.label}
                        </span>
                        <span className="text-green text-[12px]">✓</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
