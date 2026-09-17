"use client";

import { useRef } from "react";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, useGsap } from "@/lib/gsap";
import { TIMELINE } from "@/lib/about";

/** A centre rail with the milestones alternating either side of it on desktop,
    stacked against a left-hand rail on phones. The spine fills as the section
    scrolls and each node lights as its own card arrives — one scrubbed tween
    on a 2px element plus one fire-once tween per card, all transform and
    opacity, so nothing here touches layout while you scroll. */
export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    const fill = root.current?.querySelector(".db-tl__spine i");
    const items = gsap.utils.toArray<HTMLElement>(".db-tl__item", root.current!);

    if (fill) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".db-tl", start: "top 70%", end: "bottom 76%", scrub: 0.4 },
        },
      );
    }

    /* On desktop a card arrives from the side it lives on, so the alternation
       is legible in the movement as well as the layout. */
    const sideways = window.matchMedia("(min-width: 1024px)").matches;

    items.forEach((item, i) => {
      const card = item.querySelector(".db-tl__card");
      const node = item.querySelector(".db-tl__node");
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 26, x: sideways ? (i % 2 ? 40 : -40) : 0 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
            onEnter: () => node?.classList.add("is-lit"),
          },
        },
      );
    });
  }, root);

  /* overflow-x-clip: the entrance starts each card 40px off to its own side,
     and until it scrolls into view that offset pushed the right-hand cards past
     the viewport and produced a horizontal scrollbar at ~1024px. */
  return (
    <section
      id="history"
      ref={root}
      className="bg-page db-section db-section--airy relative overflow-x-clip"
    >
      <div className="db-shell relative z-[2]">
        <SectionHeading
          align="center"
          display
          label="History"
          title={
            <>
              From frustration to a <span className="text-db-red">shipped</span> CRM
            </>
          }
          lede="Three years of research and implementation, after a career spent finding out what a salesperson actually needs on screen."
          className="mb-[clamp(46px,6vw,104px)]"
        />

        <div className="db-tl mx-auto max-w-[1180px]">
          <span className="db-tl__spine" aria-hidden="true">
            <i />
          </span>

          <ol className="db-tl__list">
            {TIMELINE.map((m) => (
              <li key={m.year} className="db-tl__item">
                <span className="db-tl__node" aria-hidden="true" />

                <article className="db-tl__card">
                  <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-display text-[clamp(24px,2.1vw,36px)] leading-none tracking-[.01em] text-white">
                      {m.year}
                    </span>
                    <span className="db-chip bg-white/10 text-db-red">
                      <i />
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="font-body m-0 text-[clamp(18px,1.45vw,25px)] leading-[1.22] font-bold tracking-[-.018em] text-white">
                    {m.title}
                  </h3>
                  <p className="mt-3.5 max-w-[52ch] text-[clamp(14.5px,0.93vw,16.5px)] leading-[1.68] text-white/65">
                    {m.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="border-line mt-[clamp(48px,6vw,104px)] border-t pt-[clamp(30px,3.4vw,56px)]">
          <p className="font-display text-ink text-center text-[clamp(19px,1.9vw,30px)] leading-snug">
            Salespeople close deals,<span className="text-db-red"> not software.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
