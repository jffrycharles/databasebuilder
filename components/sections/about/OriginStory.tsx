import Reveal from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import Label from "@/components/ui/Label";
import { Icon } from "@/components/ui/Icon";
import { ORIGIN, OWNERSHIP } from "@/lib/about";

/* Three stacked movements rather than one crowded two-column block:

   1. a masthead — the heading on the left, the opening paragraph facing it,
   2. the three figures, full width, at the largest type on the page,
   3. the rest of the letter, with the ownership panel beside it.

   Each one is allowed to end on its own line, which is what stops the section
   reading as two columns of unequal length. */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page db-section db-section--airy">
      <div className="db-shell">
        {/* ---- masthead ---- */}
        <div className="grid items-start gap-[clamp(26px,3vw,58px)] lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <Label className="mb-6">Origin</Label>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="db-origin__title max-w-[9ch]">
                Where it <span className="text-db-red">started</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <span className="db-rule mt-7 block" />
            </Reveal>
          </div>

          <Reveal delay={160}>
            <p className="db-dropcap db-origin__lead">{ORIGIN.lead}</p>
          </Reveal>
        </div>

        {/* ---- the three figures ---- */}
        <Reveal delay={90}>
          <dl className="border-line mt-[clamp(46px,5.5vw,96px)] mb-0 grid overflow-hidden rounded-[20px] border bg-white sm:grid-cols-3">
            {ORIGIN.stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-[clamp(24px,2.6vw,44px)] ${
                  i ? "border-line border-t sm:border-t-0 sm:border-l" : ""
                }`}
              >
                <dt className="db-stat__figure">
                  <CountUp value={s.value} />
                  <span className="text-db-red">{s.suffix}</span>
                </dt>
                <dd className="text-ink-2 m-0 mt-4 max-w-[22ch] text-[clamp(14px,0.92vw,16.5px)] leading-[1.55]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ---- the rest of the letter, and what it means for your data ---- */}
        <div className="mt-[clamp(46px,5.5vw,100px)] grid items-start gap-[clamp(38px,5vw,92px)] lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <div>
            <Reveal>
              <div className="text-ink-2 max-w-[62ch] space-y-5 text-[clamp(15.5px,0.98vw,18px)] leading-[1.72]">
                {ORIGIN.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-[clamp(34px,3.6vw,60px)]">
              <blockquote className="db-pullquote">
                <p className="font-body text-ink m-0 max-w-[26ch] text-[clamp(20px,1.75vw,31px)] leading-[1.24] font-bold tracking-[-.022em]">
                  {ORIGIN.pullQuote}
                </p>
                <cite className="text-ink-3 mt-4 block text-[13.5px] not-italic">
                  From the letter to our customers
                </cite>
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={90}>
            <div className="bg-navy rounded-[20px] p-[clamp(26px,2.6vw,44px)] text-white">
              <h3 className="font-body m-0 max-w-[20ch] text-[clamp(20px,1.6vw,28px)] leading-[1.2] font-bold tracking-[-.018em]">
                {OWNERSHIP.title}
              </h3>
              <p className="mt-4 max-w-[48ch] text-[clamp(14px,0.9vw,16px)] leading-[1.66] text-white/70">
                {OWNERSHIP.body}
              </p>
              <ul className="mt-8 grid list-none gap-4 p-0">
                {OWNERSHIP.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-3.5">
                    <span className="mt-px grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-[#8fb6ff]">
                      <Icon name={p.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-[clamp(14px,0.9vw,15.5px)] leading-[1.5] text-white/85">
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
