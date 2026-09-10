import Reveal from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import Label from "@/components/ui/Label";
import { Icon } from "@/components/ui/Icon";
import { ORIGIN, OWNERSHIP } from "@/lib/about";

/* The story reads as a piece of writing: one measured column at a comfortable
   line length, a lead paragraph a step up from the body, and the numbers on a
   hairline rail beside it rather than boxed into a card of their own. */
export default function OriginStory() {
  return (
    <section id="origin" data-surface="page" className="db-section bg-page">
      <div className="db-shell db-shell--narrow">
        <div className="grid gap-[var(--db-gap-lg)] lg:grid-cols-[1.25fr_0.75fr]">
          {/* the letter, in the CEO's own framing */}
          <div>
            <Reveal>
              <Label className="mb-4">Where it started</Label>
            </Reveal>

            <Reveal delay={70}>
              <p className="db-dropcap text-ink max-w-[58ch] text-[var(--db-lede)] leading-[1.62] font-light">
                {ORIGIN.lead}
              </p>
            </Reveal>

            <Reveal delay={130}>
              <div className="db-prose text-ink-2 mt-7 max-w-[58ch]">
                {ORIGIN.body.map((p) => (
                  <p key={p} className="db-body">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* the numbers, on a rail */}
          <Reveal delay={90} className="lg:pt-1.5">
            <span className="db-rule db-rule--sm mb-6" />
            <dl className="db-rows m-0 grid">
              {ORIGIN.stats.map((s) => (
                <div key={s.label} className="grid gap-1 py-5 first:pt-0 last:pb-0">
                  <dt className="font-body text-ink text-[clamp(30px,2.7vw,42px)] leading-none font-bold tracking-[-.02em]">
                    <CountUp value={s.value} />
                    <span className="text-db-red">{s.suffix}</span>
                  </dt>
                  <dd className="db-sm text-ink-2 m-0 max-w-[26ch]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* what the story means for the customer's own data */}
        <Reveal delay={60} className="mt-[clamp(40px,4vw,72px)]">
          <div className="border-line grid gap-[var(--db-gap)] border-t pt-[clamp(28px,3vw,48px)] lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="db-h2 text-ink max-w-[16ch]">{OWNERSHIP.title}</h2>
              <span className="db-rule mt-6" />
            </div>
            <div>
              <p className="db-body text-ink-2 max-w-[58ch]">{OWNERSHIP.body}</p>
              <ul className="db-rows m-0 mt-6 grid list-none p-0">
                {OWNERSHIP.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                    <Icon name={p.icon} className="text-brand mt-0.5 h-[18px] w-[18px] shrink-0" />
                    <span className="db-sm text-ink">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
