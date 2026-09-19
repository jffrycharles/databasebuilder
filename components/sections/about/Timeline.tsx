"use client";

import { useRef } from "react";
import Reveal from "@/components/animations/Reveal";
import { EASE, gsap, useGsap } from "@/lib/gsap";
import { TIMELINE } from "@/lib/about";

/* Where the rail meets the reader. The spine's scrub and every milestone's
   trigger are measured against the same line, so the fill arrives at a node
   on the frame that node lights. Move it and both move together. */
const LINE = "66%";

/**
 * The history, as a rail with the milestones alternating either side of it.
 *
 * The previous build put the card on one side and left the other side empty,
 * so half of a very tall section was blank page and the cards grew to fill the
 * silence: 44px shadows, 112px between rows. Here the year takes the opposite
 * side of the rail from its card. Nothing is blank, the years become the thing
 * you scan, and the cards can go back to being light: one hairline border, one
 * radius, no shadow at all.
 *
 * The rail fills as you scroll and each milestone comes alive as the fill
 * reaches its node. That is the section's whole motion idea: the line is
 * reading time, and the content arrives when the line gets there.
 */
export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;

      const fill = el.querySelector<HTMLElement>(".db-hist__spine i");
      const items = gsap.utils.toArray<HTMLElement>(".db-hist__item", el);

      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".db-hist",
              start: `top ${LINE}`,
              end: `bottom ${LINE}`,
              scrub: 0.4,
            },
          },
        );
      }

      const mm = gsap.matchMedia();

      mm.add(
        { wide: "(min-width: 1024px)", narrow: "(max-width: 1023.98px)" },
        (ctx) => {
          const wide = ctx.conditions?.wide ?? false;

          items.forEach((item, i) => {
            const node = item.querySelector<HTMLElement>(".db-hist__node");
            const year = item.querySelector<HTMLElement>(".db-hist__year span");
            const card = item.querySelector<HTMLElement>(".db-hist__card");
            const chip = item.querySelector<HTMLElement>(".db-hist__chip");
            const title = item.querySelector<HTMLElement>(".db-hist__title span");
            const body = item.querySelector<HTMLElement>(".db-hist__body");
            if (!node || !card) return;

            /* The node is the trigger, not the row: the fill's leading edge
               and the node's centre are then the same point on the page, so
               the light comes on exactly as the line arrives rather than a
               card-height early. */
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: node,
                start: `center ${LINE}`,
                once: true,
                onEnter: () => item.classList.add("is-on"),
              },
            });

            /* On desktop the card arrives from the side it lives on, so the
               alternation is in the movement as well as the layout. Stacked,
               there are no sides, so it just rises. */
            const from = wide ? (i % 2 ? 34 : -34) : 0;

            if (year) tl.from(year, { yPercent: 108, duration: 0.85, ease: EASE }, 0);
            tl.from(card, { x: from, y: 20, opacity: 0, duration: 0.8, ease: EASE }, 0.06);
            if (chip)
              tl.from(
                chip,
                { scale: 0.8, opacity: 0, duration: 0.5, ease: EASE, transformOrigin: "0% 50%" },
                0.3,
              );
            if (title) tl.from(title, { yPercent: 106, duration: 0.7, ease: EASE }, 0.26);
            if (body) tl.from(body, { y: 14, opacity: 0, duration: 0.65, ease: EASE }, 0.34);
          });
        },
      );

      return () => mm.revert();
    },
    root,
    [],
    { afterReady: true },
  );

  /* overflow-x-clip: on desktop each card starts 34px off to its own side, and
     until it scrolls into view that offset would push the right-hand cards
     past the viewport and raise a horizontal scrollbar at ~1024px. */
  return (
    <section
      id="history"
      ref={root}
      className="bg-page db-section db-section--airy relative overflow-x-clip"
    >
      <div className="db-shell relative z-[2]">
        <Reveal className="db-hist__head">
          <h2 className="db-hist__title-main">
            From frustration to a <span className="text-db-red">shipped</span> CRM
          </h2>
          <p className="db-hist__lede">
            Three years of research and implementation, after a career spent finding out what a
            salesperson actually needs on screen.
          </p>
        </Reveal>

        <div className="db-hist">
          <span className="db-hist__spine" aria-hidden="true">
            <i />
          </span>

          <ol className="db-hist__list">
            {TIMELINE.map((m) => (
              <li key={m.year} className="db-hist__item">
                <span className="db-hist__node" aria-hidden="true" />

                <p className="db-hist__year">
                  <span>{m.year}</span>
                </p>

                <article className="db-hist__card">
                  <span className="db-hist__chip">{m.tag}</span>
                  <h3 className="db-hist__title">
                    <span>{m.title}</span>
                  </h3>
                  <p className="db-hist__body">{m.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="border-line mt-[clamp(44px,5vw,88px)] border-t pt-[clamp(28px,3.2vw,52px)]">
          <p className="font-display text-ink text-center text-[clamp(19px,1.9vw,30px)] leading-snug">
            Salespeople close deals,<span className="text-db-red"> not software.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
