import Reveal from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import { Icon } from "@/components/ui/Icon";
import RevealText from "@/components/ui/RevealText";
import { ABOUT, ORIGIN, OWNERSHIP } from "@/lib/about";

/* One section, three rows, hairlines between them.
 *
 * It used to be four full-width blocks stacked — a centred standfirst, a row of
 * three stat cards, the letter, then a centred ownership header over a 2x2 —
 * each one centre-heading-then-grid, each one starting again from the left
 * margin. Four sections' worth of vertical, 1779px of it, for one section's
 * worth of argument.
 *
 * Now every row is a 2-column split on the same 0.92/1.08 grid, divided by a
 * rule rather than by 110px of air: the claim carries the metrics beside it,
 * the origin label carries the letter beside it, the ownership header carries
 * its four points beside it. The eye runs down one seam instead of re-finding
 * the left margin four times, and the horizontal space does the work the
 * padding was doing.
 *
 * Nothing new is invented: --color-line for the rules, .db-saas-card for the
 * one surface that is still a card, .db-pill, .db-saas-icon, and the existing
 * type scale throughout.
 */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page db-section">
      <div className="db-shell">
        <div className="db-origin">
          {/* ---- the claim, with the numbers beside it ---- */}
          <div className="db-origin__row">
            <div>
              <RevealText className="text-ink max-w-[26ch] text-[clamp(23px,2.35vw,40px)] leading-[1.22] font-normal tracking-[-.018em]">
                {ABOUT.standfirst}
              </RevealText>
            </div>

            <dl className="m-0 self-center">
              {ORIGIN.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 70}>
                  <div className="db-origin__stat">
                    <dt className="font-display text-ink m-0 shrink-0 text-[clamp(28px,2.6vw,40px)] leading-none tracking-[.01em] tabular-nums">
                      <CountUp value={s.value} />
                      <span className="text-db-red">{s.suffix}</span>
                    </dt>
                    <dd className="font-brand text-ink-2 m-0 text-[clamp(13px,0.86vw,14.5px)] leading-[1.5] font-medium">
                      {s.label}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* ---- the letter ---- */}
          <div className="db-origin__row">
            <div className="lg:sticky lg:top-[calc(var(--db-header-h)+40px)] lg:self-start">
              <Reveal>
                <span className="db-pill">
                  <i />
                  Origin
                </span>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="font-body text-ink m-0 mt-4 max-w-[11ch] text-[clamp(26px,2.7vw,40px)] leading-[1.06] font-bold tracking-[-.028em]">
                  Where it <span className="text-db-red">started</span>
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="text-ink-2 mt-4 max-w-[38ch] text-[clamp(14px,0.92vw,16px)] leading-[1.65]">
                  {ORIGIN.lead}
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="text-ink-2 space-y-4 text-[clamp(14.5px,0.94vw,16.5px)] leading-[1.72]">
                  {ORIGIN.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={120}>
                <blockquote className="db-saas-card m-0 mt-[clamp(20px,2vw,32px)] overflow-hidden p-[clamp(20px,2vw,30px)]">
                  <span aria-hidden="true" className="bg-db-red absolute inset-y-0 left-0 w-[3px]" />
                  <p className="font-body text-ink m-0 max-w-[34ch] text-[clamp(17px,1.35vw,24px)] leading-[1.28] font-bold tracking-[-.022em]">
                    {ORIGIN.pullQuote}
                  </p>
                  <cite className="font-brand text-ink-3 mt-3 block text-[12.5px] font-medium tracking-[.02em] not-italic">
                    From the letter to our customers
                  </cite>
                </blockquote>
              </Reveal>
            </div>
          </div>

          {/* ---- ownership: the header holds its own column ---- */}
          <div className="db-origin__row">
            <Reveal className="lg:self-start">
              <h3 className="font-body text-ink m-0 max-w-[15ch] text-[clamp(23px,2.3vw,34px)] leading-[1.1] font-bold tracking-[-.026em]">
                {OWNERSHIP.title}
              </h3>
              <p className="text-ink-2 mt-4 max-w-[42ch] text-[clamp(14px,0.92vw,16px)] leading-[1.65]">
                {OWNERSHIP.body}
              </p>
            </Reveal>

            <ul className="db-origin__points m-0 grid list-none gap-x-[clamp(16px,1.6vw,28px)] gap-y-0 p-0 sm:grid-cols-2">
              {OWNERSHIP.points.map((p, i) => (
                <Reveal key={p.text} delay={i * 60}>
                  <li className="db-origin__point">
                    <span className="db-saas-icon shrink-0">
                      <Icon name={p.icon} className="h-[17px] w-[17px]" />
                    </span>
                    <span className="text-ink text-[clamp(13.5px,0.9vw,15.5px)] leading-[1.5] font-medium">
                      {p.text}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
