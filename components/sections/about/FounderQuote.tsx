"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import DotArt from "./DotArt";
import { ORIGIN, LEADERS } from "@/lib/about";

/* The attribution's role comes from the leadership data rather than being
   written here, so the page cannot end up claiming two different titles for
   the same person. */
const ADAM = LEADERS.find((l) => l.name === "Adam Berman");

/**
 * The founder's line, given the page's one authored moment.
 *
 * Full bleed and the only dark band in the section, with the quote mark
 * oversized in brand red and the line set large enough to be read from
 * across a desk. It is the single sentence on this page in his own voice and
 * it used to be the smallest thing on it.
 *
 * The reveal is a mask, not a fade: the line slides up from behind its own
 * edge. That makes it the one motion on the page that is not a rise, which
 * is what marks it as the moment rather than another section arriving.
 */
export default function FounderQuote() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    const el = root.current;
    if (!el) return;
    const mark = el.querySelector(".db-quote__mark");
    const line = el.querySelector(".db-quote__line");
    const by = el.querySelector(".db-quote__by");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 74%", toggleActions: "play none none none" },
    });

    if (mark) tl.from(mark, { opacity: 0, y: 14, duration: 0.55, ease: "expo.out" }, 0);
    /* yPercent on the inner line inside an overflow-clipped wrapper: the text
       is masked by its own box, so nothing is ever hidden by opacity and the
       resting state needs no inline style at all. */
    if (line) tl.from(line, { yPercent: 105, duration: 1, ease: "expo.out" }, 0.1);
    if (by) tl.from(by, { opacity: 0, y: 12, duration: 0.6, ease: "expo.out" }, 0.45);
  }, root);

  return (
    <section ref={root} className="db-quote-band" aria-label="From the founder">
      <DotArt shape="sphere" className="db-quote-band__art" />
      <div className="db-shell relative">
        <blockquote className="m-0">
          <span className="db-quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <span className="db-quote__clip">
            <span className="db-quote__line block">{ORIGIN.pullQuote}</span>
          </span>
          <cite className="db-quote__by">
            <span className="db-quote__name">Adam Berman</span>
            {ADAM && <span className="db-quote__role">{ADAM.role}</span>}
            <span className="db-quote__src">From the letter to our customers</span>
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
