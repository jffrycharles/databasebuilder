import Reveal from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import { Icon } from "@/components/ui/Icon";
import RevealText from "@/components/ui/RevealText";
import { ABOUT, ORIGIN, OWNERSHIP } from "@/lib/about";

/* Built as modules on one card system rather than as an editorial spread.

   Every surface here shares a single radius (16px), a single border
   (--color-line) and a single shadow, set once in `.db-saas-card`. That is
   most of what makes a page read as SaaS rather than as a brochure — not the
   decoration, but the fact that nothing invents its own values.

   The metrics lead, because they are the fastest thing to scan. The letter
   follows as a calm read. The ownership points, which were a vertical list,
   are now a 2x2 grid of icon cards. */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page db-section db-section--airy">
      <div className="db-shell">
        {/* the argument, revealing a word at a time as it arrives */}
        <RevealText className="text-ink mx-auto mb-[clamp(44px,5vw,84px)] max-w-[52ch] text-center text-[clamp(21px,2.25vw,35px)] leading-[1.42] font-normal tracking-[-.008em]">
          {ABOUT.standfirst}
        </RevealText>

        {/* ---- metrics lead: three cards, not one slab ---- */}
        <div className="grid gap-[clamp(14px,1.5vw,22px)] sm:grid-cols-3">
          {ORIGIN.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="db-saas-card db-saas-card--bar db-saas-card--lift h-full p-[clamp(22px,2.3vw,34px)]">
                <dl className="m-0">
                  <dt className="font-display text-ink m-0 text-[clamp(34px,3.4vw,54px)] leading-none tracking-[.01em]">
                    <CountUp value={s.value} />
                    <span className="text-db-red">{s.suffix}</span>
                  </dt>
                  <dd className="font-brand text-ink-2 m-0 mt-3.5 max-w-[24ch] text-[clamp(13.5px,0.9vw,15.5px)] leading-[1.55] font-medium">
                    {s.label}
                  </dd>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---- the letter ---- */}
        <div className="mt-[clamp(52px,6vw,110px)] grid items-start gap-[clamp(30px,4vw,76px)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-[calc(var(--db-header-h)+40px)]">
            <Reveal>
              <span className="db-pill">
                <i />
                Origin
              </span>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="font-body text-ink m-0 mt-5 max-w-[12ch] text-[clamp(28px,3vw,46px)] leading-[1.06] font-bold tracking-[-.028em]">
                Where it <span className="text-db-red">started</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="text-ink-2 mt-5 max-w-[40ch] text-[clamp(14.5px,0.95vw,16.5px)] leading-[1.7]">
                {ORIGIN.lead}
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="text-ink-2 space-y-5 text-[clamp(15px,0.96vw,17.5px)] leading-[1.75]">
                {ORIGIN.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <blockquote className="db-saas-card mt-[clamp(28px,3vw,48px)] m-0 overflow-hidden p-[clamp(24px,2.5vw,38px)]">
                <span
                  aria-hidden="true"
                  className="bg-db-red absolute inset-y-0 left-0 w-[3px]"
                />
                <p className="font-body text-ink m-0 max-w-[30ch] text-[clamp(19px,1.6vw,28px)] leading-[1.26] font-bold tracking-[-.022em]">
                  {ORIGIN.pullQuote}
                </p>
                <cite className="font-brand text-ink-3 mt-4 block text-[13px] font-medium tracking-[.02em] not-italic">
                  From the letter to our customers
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* ---- ownership: header, then the four points as a card grid ---- */}
        <div className="mt-[clamp(56px,6.5vw,118px)]">
          <Reveal className="mx-auto max-w-[58ch] text-center">
            <h3 className="font-body text-ink m-0 text-[clamp(24px,2.5vw,38px)] leading-[1.1] font-bold tracking-[-.026em]">
              {OWNERSHIP.title}
            </h3>
            <p className="text-ink-2 mx-auto mt-4 max-w-[54ch] text-[clamp(14.5px,0.95vw,16.5px)] leading-[1.7]">
              {OWNERSHIP.body}
            </p>
          </Reveal>

          <div className="mt-[clamp(28px,3vw,50px)] grid gap-[clamp(14px,1.5vw,22px)] sm:grid-cols-2">
            {OWNERSHIP.points.map((p, i) => (
              <Reveal key={p.text} delay={i * 70}>
                <div className="db-saas-card db-saas-card--lift flex h-full items-start gap-4 p-[clamp(20px,2vw,30px)]">
                  <span className="db-saas-icon">
                    <Icon name={p.icon} className="h-[19px] w-[19px]" />
                  </span>
                  <span className="text-ink pt-[9px] text-[clamp(14.5px,0.95vw,16.5px)] leading-[1.5] font-medium">
                    {p.text}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
