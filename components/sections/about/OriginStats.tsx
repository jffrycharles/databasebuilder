"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import CountUp from "@/components/animations/CountUp";
import { ORIGIN } from "@/lib/about";

/**
 * The three figures, as a typographic band rather than three cards.
 *
 * The numerals carry the composition: one shared baseline, one rule above
 * them, short hairlines between. Everything else is set quietly underneath,
 * so the three numbers are the only thing you have to scan.
 *
 * The motion is the most restrained of the four blocks on purpose. The
 * numbers already animate themselves (CountUp), so the block only draws its
 * rule and lifts the three groups a few pixels. Anything more and two
 * animations would be competing over the same three elements.
 */
export default function OriginStats() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const el = root.current;
    if (!el) return;
    const rule = el.querySelector(".db-stats__rule");
    const groups = el.querySelectorAll(".db-stat");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none none" },
    });

    /* `from`, never `to`: the resting state is the finished state, so if the
       script never runs the band is simply there. */
    if (rule) tl.from(rule, { scaleX: 0, duration: 0.85, ease: "expo.out" }, 0);
    tl.from(groups, { opacity: 0, y: 12, duration: 0.6, ease: "expo.out", stagger: 0.07 }, 0.12);
  }, root);

  return (
    <div ref={root}>
      <i className="db-stats__rule" aria-hidden="true" />
      <div className="db-stats">
        {ORIGIN.stats.map((s) => (
          <div key={s.unit} className="db-stat">
            <p className="db-stat__fig">
              <span className="db-stat__num">
                <CountUp value={s.value} />
                {s.suffix}
              </span>
              <span className="db-stat__unit">{s.unit}</span>
            </p>
            <p className="db-stat__desc">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
