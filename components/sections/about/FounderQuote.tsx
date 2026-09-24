"use client";

import { useRef } from "react";
import { EASE, gsap, ScrollTrigger, useGsap } from "@/lib/gsap";
import DotArt from "./DotArt";
import { ORIGIN, LEADERS } from "@/lib/about";

/* The attribution's role comes from the leadership data rather than being
   written here, so the page cannot end up claiming two different titles for
   the same person. */
const ADAM = LEADERS.find((l) => l.name === "Adam Berman");

/* Break at complete clauses so the quote stays readable across screen sizes.
   The words still come from their single source in lib/about.ts. */
const BREAK_AFTER = ["complicated,", "or service,", "the deal."];

function toLines(text: string, after: string[]) {
  const out: string[] = [];
  let rest = text;
  for (const mark of after) {
    const i = rest.indexOf(mark);
    if (i < 0) continue;
    out.push(rest.slice(0, i + mark.length).trim());
    rest = rest.slice(i + mark.length);
  }
  out.push(rest.trim());
  return out.filter(Boolean);
}

const LINES = toLines(ORIGIN.pullQuote, BREAK_AFTER);

/**
 * The founder's line, given the page's one authored moment.
 *
 * Full bleed, centred, and the only dark band in the section: everything else
 * on the page is a column you read down, and this is the one thing you stop
 * for. The lines are set by hand to break on a comma or a full stop,
 * and the accent under them is what carries the eye down to his name.
 *
 * Each line comes up out of its own mask, one after the other, then the rule
 * draws out from the middle and the attribution arrives behind it. Nothing
 * here fades: the text sits at full opacity throughout and the mask does the
 * work, so a line is either not yet arrived or completely readable.
 */
export default function FounderQuote() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;

      const mark = el.querySelector<HTMLElement>(".db-say__mark");
      const lines = el.querySelectorAll<HTMLElement>(".db-say__line");
      const rule = el.querySelector<HTMLElement>(".db-say__rule");
      const by = el.querySelectorAll<HTMLElement>(".db-say__by > *");
      const art = el.querySelector<HTMLElement>(".db-say__art");

      /* The dot motif is the globe's own vocabulary — it spins elsewhere on
         this page. At 5% opacity a slow turn reads as ambient texture, not
         a distraction, so the one dark band with no other motion isn't
         perfectly still. */
      if (art) {
        /* Only while the band is on screen: a turn nobody can see is work
           nobody asked for, and this page is already sensitive to that. */
        const spin = gsap.to(art, {
          rotation: 360,
          duration: 110,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
          paused: true,
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? spin.resume() : spin.pause()),
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });

      if (mark) {
        tl.from(mark, { yPercent: 55, opacity: 0, duration: 0.85, ease: EASE }, 0);
      }

      tl.from(lines, { yPercent: 112, duration: 1.05, ease: EASE, stagger: 0.11 }, 0.12);

      /* Out from the centre, under the line it belongs to: an accent that
         draws from one end would point at one side of a centred block. */
      if (rule) tl.from(rule, { scaleX: 0, duration: 0.7, ease: EASE }, 0.62);

      tl.from(by, { y: 14, opacity: 0, duration: 0.65, ease: EASE, stagger: 0.07 }, 0.72);
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <section ref={root} className="db-say" aria-label="From the founder">
      <DotArt shape="sphere" className="db-say__art" />
      <div className="db-shell relative">
        <blockquote className="db-say__quote">
          <span className="db-say__mark" aria-hidden="true">
            &ldquo;
          </span>

          <p className="db-say__text">
            {LINES.map((line) => (
              <span key={line} className="db-say__clip">
                <span className="db-say__line">{line}</span>
              </span>
            ))}
          </p>

          <i className="db-say__rule" aria-hidden="true" />

          <cite className="db-say__by">
            <span className="db-say__name">Adam Berman</span>
            {ADAM && <span className="db-say__role">{ADAM.role}</span>}
            <span className="db-say__src">From the letter to our customers</span>
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
