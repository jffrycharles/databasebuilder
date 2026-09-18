import Reveal from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import { Icon } from "@/components/ui/Icon";
import DotArt from "./DotArt";
import { ABOUT, ORIGIN, OWNERSHIP } from "@/lib/about";

const STAT_ART = ["sphere", "rise", "ring"] as const;

/**
 * The origin section, built out of panels rather than paragraphs.
 *
 * Two rounds of this were still "text on a flat background": first four
 * stacked centred blocks, then the same content on hairlines. Hairlines are
 * not a surface — the eye had nothing to land on, so nothing looked designed.
 *
 * So: filled panels, a tonal break, and a mark on every metric. The marks are
 * dot matrices, which is the one motif that can be borrowed from a reference
 * without borrowing the reference — the wordmark's own globe is built out of
 * dots, so a dot grid reads as DatabaseBuilder rather than as someone else.
 *
 * The pull quote is the tonal break. One near-black panel inside a light
 * section does more for the page than any amount of extra spacing, and it puts
 * the founder's line where the eye goes first.
 *
 * The scrubbed word-by-word brighten on the opening statement is gone. It drew
 * attention to itself rather than to the sentence, and it was the only place
 * on the page that animated type.
 */
export default function OriginStory() {
  return (
    <section id="origin" className="bg-page db-section">
      <div className="db-shell">
        {/* ---- the claim, and the three numbers as panels ---- */}
        <div className="grid items-end gap-[clamp(26px,3vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="db-rule mb-6 block" />
            <p className="font-body text-ink m-0 max-w-[20ch] text-[clamp(26px,2.8vw,46px)] leading-[1.14] font-bold tracking-[-.026em]">
              Most CRM companies answered complexity by adding{" "}
              <span className="text-ink-3">more of it.</span>
            </p>
            <p className="text-ink-2 mt-5 max-w-[42ch] text-[clamp(14.5px,0.94vw,16.5px)] leading-[1.65]">
              We went the other way: one simple system, one all-in-one price, built the way a
              salesperson actually works.
            </p>
          </Reveal>

          <div className="grid gap-[clamp(10px,1vw,14px)] sm:grid-cols-3 lg:grid-cols-3">
            {ORIGIN.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="db-panel h-full">
                  <DotArt shape={STAT_ART[i]} className="text-db-red h-[34px] w-[34px]" />
                  <p className="font-display text-ink m-0 mt-auto pt-[clamp(24px,3vw,44px)] text-[clamp(28px,2.6vw,40px)] leading-none tracking-[.01em] tabular-nums">
                    <CountUp value={s.value} />
                    <span className="text-db-red">{s.suffix}</span>
                  </p>
                  <p className="font-brand text-ink-2 m-0 mt-2.5 text-[clamp(12.5px,0.82vw,14px)] leading-[1.45] font-medium">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---- the letter, with the quote as the tonal break ---- */}
        <div className="mt-[clamp(30px,3.4vw,56px)] grid gap-[clamp(10px,1vw,14px)] lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
          <Reveal>
            <div className="db-panel db-panel--flush h-full">
              <span className="db-pill self-start">
                <i />
                Origin
              </span>
              <h2 className="font-body text-ink m-0 mt-4 max-w-[12ch] text-[clamp(24px,2.4vw,36px)] leading-[1.06] font-bold tracking-[-.028em]">
                Where it <span className="text-db-red">started</span>
              </h2>
              <div className="text-ink-2 mt-4 space-y-3.5 text-[clamp(14px,0.92vw,16px)] leading-[1.68]">
                <p>{ORIGIN.lead}</p>
                {ORIGIN.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <blockquote className="db-panel db-panel--dark m-0 h-full justify-center">
              <DotArt shape="grid" className="h-[34px] w-[34px] shrink-0 text-white/25" />
              <p className="font-body m-0 mt-[clamp(20px,2.2vw,34px)] text-[clamp(20px,1.85vw,32px)] leading-[1.24] font-bold tracking-[-.022em] text-white">
                {ORIGIN.pullQuote}
              </p>
              <cite className="font-brand mt-5 block text-[12.5px] font-medium tracking-[.02em] text-white/50 not-italic">
                Adam Berman, from the letter to our customers
              </cite>
            </blockquote>
          </Reveal>
        </div>

        {/* ---- ownership ---- */}
        <div className="mt-[clamp(30px,3.4vw,56px)] grid gap-[clamp(10px,1vw,14px)] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <Reveal>
            <div className="db-panel db-panel--flush h-full">
              <h3 className="font-body text-ink m-0 max-w-[13ch] text-[clamp(22px,2.2vw,32px)] leading-[1.1] font-bold tracking-[-.026em]">
                Your data is never <span className="text-db-red">held hostage</span>
              </h3>
              <p className="text-ink-2 mt-4 text-[clamp(13.5px,0.9vw,15.5px)] leading-[1.65]">
                {OWNERSHIP.body}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-[clamp(10px,1vw,14px)] sm:grid-cols-2">
            {OWNERSHIP.points.map((p, i) => (
              <Reveal key={p.text} delay={i * 60}>
                <div className="db-panel h-full">
                  <span className="db-saas-icon">
                    <Icon name={p.icon} className="h-[17px] w-[17px]" />
                  </span>
                  <p className="text-ink m-0 mt-auto pt-[clamp(18px,2vw,30px)] text-[clamp(13.5px,0.9vw,15.5px)] leading-[1.5] font-medium">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
