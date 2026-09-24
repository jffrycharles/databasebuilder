"use client";

import { useRef } from "react";
import { EASE, gsap, settleTriggers, SplitText, useGsap } from "@/lib/gsap";
import { ORIGIN } from "@/lib/about";

/* Four passages, in the order they were written: where he started, what he
   did without, why he built this, what it had to be. All passages share the
   same readable type size; the lead keeps its darker tone. */
const PASSAGES = [ORIGIN.lead, ...ORIGIN.body];

/**
 * The founder's story as an editorial spread.
 *
 * Desktop holds the title still on the left while the passages move past it
 * on the right, so you always know whose story you are in the middle of, and
 * a hairline rail beside the title fills as you work through it. Previously
 * this was an 84px headline over three slabs of body text at one width: the
 * heading shouted, the passages ran together, and the left column was a hole
 * the height of the story once you had read its one paragraph.
 *
 * Each passage arrives a line at a time out of its own mask. That is the one
 * motion on the page that is literally reading order, which is why the
 * story gets it and nothing else does.
 */
export default function WhereItStarted() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;

      const head = el.querySelector<HTMLElement>(".db-story__head");
      const flow = el.querySelector<HTMLElement>(".db-story__flow");
      const fill = el.querySelector<HTMLElement>(".db-story__rail i");
      const rules = gsap.utils.toArray<HTMLElement>(".db-story__rule", el);

      /* The title comes in word by word. Words and not lines, because it is
         two words long and a line reveal on two words is a block reveal. */
      if (head) {
        SplitText.create(head, {
          type: "words",
          mask: "words",
          tag: "span",
          wordsClass: "db-rword",
          autoSplit: true,
          /* The tween is returned so SplitText reverts it on the next
             re-split, and the triggers are settled because that re-split
             just moved everything below this heading. */
          onSplit: (self) => {
            const tween = gsap.from(self.words, {
              yPercent: 118,
              duration: 0.95,
              ease: EASE,
              stagger: 0.09,
              scrollTrigger: { trigger: head, start: "top 88%", once: true },
            });
            settleTriggers();
            return tween;
          },
        });
      }

      /* Line by line, each passage on its own trigger, so the story keeps
         pace with the reader rather than firing as one block when the
         section's top edge happens to cross a line. */
      gsap.utils.toArray<HTMLElement>(".db-story__p", el).forEach((p) => {
        SplitText.create(p, {
          type: "lines",
          mask: "lines",
          tag: "span",
          linesClass: "db-rline",
          autoSplit: true,
          onSplit: (self) => {
            const tween = gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: EASE,
              stagger: 0.07,
              scrollTrigger: { trigger: p, start: "top 86%", once: true },
            });
            settleTriggers();
            return tween;
          },
        });
      });

      rules.forEach((r) => {
        gsap.from(r, {
          scaleX: 0,
          duration: 0.9,
          ease: EASE,
          scrollTrigger: { trigger: r, start: "top 92%", once: true },
        });
      });

      /* Scrubbed, not played: this one is a readout of where you are, so it
         has to track the scroll rather than run on its own clock. */
      if (fill && flow) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: flow, start: "top 72%", end: "bottom 78%", scrub: 0.45 },
          },
        );
      }
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <div ref={root} className="db-story">
      <div className="db-story__aside">
        <div className="db-story__stick">
          <h2 className="db-story__head">
            Where it <span className="text-db-red">started</span>
          </h2>
          <span className="db-story__rail" aria-hidden="true">
            <i />
          </span>
        </div>
      </div>

      <div className="db-story__flow">
        {PASSAGES.map((text, i) => (
          <div key={text} className="db-story__block">
            {i > 0 && <i className="db-story__rule" aria-hidden="true" />}
            <p className={`db-story__p ${i === 0 ? "db-story__p--lead" : ""}`}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
