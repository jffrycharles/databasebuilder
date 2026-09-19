"use client";

import { useRef } from "react";
import { EASE, gsap, useGsap } from "@/lib/gsap";
import { ORIGIN } from "@/lib/about";

/* Only the two measured figures count. 45 years and 20 million records are
   quantities that got bigger over time, so watching them arrive says
   something. "1" is not a quantity, it is the whole claim — counting from
   zero to one is a gag, and it would land on the page's sharpest line. It
   gets a typographic entrance instead. */
const COUNTED = new Set(["Years", "Records"]);

export default function OriginStats() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;

      const rule = el.querySelector<HTMLElement>(".db-fig-rule");
      const divs = el.querySelectorAll<HTMLElement>(".db-fig__div");
      const figs = gsap.utils.toArray<HTMLElement>(".db-fig", el);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });

      /* The rule first, because it is the shelf the figures stand on. Drawn,
         not faded: a hairline that fades in reads as a rendering artefact. */
      if (rule) tl.from(rule, { scaleX: 0, duration: 1.05, ease: EASE }, 0);

      figs.forEach((fig, i) => {
        const at = 0.16 + i * 0.13;
        const live = fig.querySelector<HTMLElement>(".db-fig__live");
        const val = fig.querySelector<HTMLElement>(".db-fig__val");
        const unit = fig.querySelector<HTMLElement>(".db-fig__unit span");
        const desc = fig.querySelector<HTMLElement>(".db-fig__desc span");
        const target = Number(fig.dataset.value ?? 0);
        const counts = fig.dataset.count === "1";

        /* The numeral rises out of its own box. The box is the cell and the
           digits are tabular, so neither this nor the count that follows
           moves anything else on the row by a pixel. */
        if (live) tl.from(live, { yPercent: 118, duration: 1, ease: EASE }, at);

        if (counts && val) {
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                val.textContent = String(Math.round(o.v));
              },
              onComplete: () => {
                val.textContent = String(target);
              },
            },
            at + 0.08,
          );
        }

        /* The unit and the line under it are one thought, so they arrive
           together behind the number rather than as two more events. */
        if (unit) tl.from(unit, { yPercent: 105, duration: 0.7, ease: EASE }, at + 0.3);
        if (desc) tl.from(desc, { yPercent: 60, opacity: 0, duration: 0.7, ease: EASE }, at + 0.38);
      });

      /* Last: the hairlines between the cells close the band off. Going first
         they read as the point of the section, which they are not. They are
         vertical between columns and horizontal between stacked rows, so the
         axis they draw on flips with the layout. */
      if (divs.length) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 760px)", () => {
          tl.from(divs, { scaleY: 0, duration: 0.8, ease: EASE, stagger: 0.08 }, 0.42);
        });
        mm.add("(max-width: 759.98px)", () => {
          tl.from(divs, { scaleX: 0, duration: 0.8, ease: EASE, stagger: 0.08 }, 0.42);
        });
      }
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <div ref={root} className="db-figs">
      <i className="db-fig-rule" aria-hidden="true" />
      <dl className="db-figs__row">
        {ORIGIN.stats.map((s, i) => {
          const counts = COUNTED.has(s.unit);
          const final = `${s.value}${s.suffix}`;
          return (
            <div
              key={s.unit}
              className="db-fig"
              data-value={s.value}
              data-count={counts ? "1" : "0"}
            >
              {i > 0 && <i className="db-fig__div" aria-hidden="true" />}

              <dt className="db-fig__num">
                {/* The live figure is taken out of the flow so it can be
                    masked, which leaves the box with no height of its own.
                    This holds it open at exactly the finished figure's size.
                    Hidden rather than absent, and not read out: the live
                    figure carries the value. */}
                <span className="db-fig__ghost" aria-hidden="true">
                  {final}
                </span>
                <span className="db-fig__live">
                  <span className="db-fig__val">{s.value}</span>
                  {s.suffix}
                </span>
              </dt>

              <dd className="db-fig__unit">
                <span>{s.unit}</span>
              </dd>
              <dd className="db-fig__desc">
                <span>{s.label}</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
