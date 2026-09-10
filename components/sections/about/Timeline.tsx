"use client";

import { useRef } from "react";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, useGsap } from "@/lib/gsap";
import { TIMELINE } from "@/lib/about";

/** Milestones alternate either side of a centred spine on desktop and collapse
    to a single left-hand rail on smaller screens. The spine fills to scroll
    position; each card arrives from its own side as its node lights. */
export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useGsap(() => {
    const fill = root.current?.querySelector(".db-spine i");
    const nodes = gsap.utils.toArray<HTMLElement>(".db-node", root.current!);
    const cards = gsap.utils.toArray<HTMLElement>("[data-milestone]", root.current!);

    if (fill) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 68%", end: "bottom 82%", scrub: 0.4 },
        },
      );
    }

    cards.forEach((card, i) => {
      const fromLeft = card.dataset.side === "left";
      gsap.fromTo(
        card,
        { opacity: 0, x: window.innerWidth >= 1024 ? (fromLeft ? -24 : 24) : 14, y: 8 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.68,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
            onEnter: () => nodes[i]?.classList.add("is-lit"),
          },
        },
      );
    });
  }, root);

  return (
    <section id="history" ref={root} className="db-page-band db-section relative">
      <div className="db-shell relative z-[2]">
        <SectionHeading
          tone="dark"
          align="center"
          label="History"
          title={
            <>
              From frustration to a <span className="text-db-red-hot">shipped</span> CRM
            </>
          }
          lede="Three years of research and implementation, after a career spent finding out what a salesperson actually needs on screen."
          className="mb-[clamp(32px,3.6vw,58px)]"
        />

        <div className="relative mx-auto max-w-[1040px] pl-8 sm:pl-10 lg:pl-0">
          <span className="db-spine left-[5px] lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true">
            <i />
          </span>

          <ol className="m-0 list-none p-0">
            {TIMELINE.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={m.year}
                  className="relative pb-[clamp(20px,2.4vw,36px)] last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-[clamp(36px,4.6vw,80px)]"
                >
                  <span
                    className="db-node top-[22px] left-[-33px] sm:left-[-40px] lg:left-1/2 lg:-translate-x-1/2"
                    aria-hidden="true"
                  />
                  <div
                    data-milestone
                    data-side={left ? "left" : "right"}
                    className={left ? "lg:col-start-1 lg:text-right" : "lg:col-start-2 lg:row-start-1"}
                  >
                    <div className="db-surface p-[clamp(18px,1.8vw,28px)]">
                      <div className={`mb-2.5 flex items-baseline gap-3 ${left ? "lg:justify-end" : ""}`}>
                        <span className="font-display text-[clamp(21px,1.9vw,30px)] leading-none text-white">
                          {m.year}
                        </span>
                        <span className="db-kicker text-[#8fb6ff]">{m.tag}</span>
                      </div>
                      <h3 className="db-h3 text-white">{m.title}</h3>
                      <p
                        className={`db-sm mt-2.5 max-w-[52ch] text-white/60 ${left ? "lg:ml-auto" : ""}`}
                      >
                        {m.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-[clamp(32px,3.6vw,56px)] border-t border-white/10 pt-8">
          <p className="font-display text-center text-[clamp(18px,1.8vw,28px)] leading-snug text-white uppercase">
            Salespeople close deals,<span className="text-db-red-hot"> not software.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
