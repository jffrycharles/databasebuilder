"use client";

import { useRef } from "react";
import { EASE, gsap, SplitText, useGsap } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import ExportMark from "./ExportMark";
import { OWNERSHIP } from "@/lib/about";

/**
 * The data promise, as a band of its own.
 *
 * It used to be a white card floating on the page ground, riding up over the
 * seam of the dark band above it, with the heading squeezed to 18 characters
 * so it broke after "never". A promise this plain does not need a container
 * to be taken seriously, and the container was what made the heading cramped.
 * So: the section is the surface, the introduction gets a real measure, and
 * the four promises sit in a quartet divided by hairlines rather than boxed
 * into four cards.
 *
 * The mark on the right is the claim drawn as geometry: rows leaving a stack
 * and landing in a tray. Not a product screenshot, because the promise is
 * about what happens to the records, not about a screen.
 */
export default function DataOwnership() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;

      const head = el.querySelector<HTMLElement>(".db-keys__head");
      const lede = el.querySelector<HTMLElement>(".db-keys__lede");
      const rules = el.querySelectorAll<HTMLElement>(".db-key__rule");
      const icons = el.querySelectorAll<HTMLElement>(".db-key__icon");
      const texts = el.querySelectorAll<HTMLElement>(".db-key__text");

      if (head) {
        SplitText.create(head, {
          type: "lines",
          mask: "lines",
          tag: "span",
          linesClass: "db-rline",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              duration: 0.95,
              ease: EASE,
              stagger: 0.09,
              scrollTrigger: { trigger: head, start: "top 86%", once: true },
            }),
        });
      }

      if (lede) {
        gsap.from(lede, {
          y: 18,
          opacity: 0,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: lede, start: "top 88%", once: true },
        });
      }

      /* One timeline for the quartet, so it reads as a set being laid out
         rather than four things that each noticed the viewport separately:
         the rules rule off the cells, the icons land in them, the lines
         follow. Three passes across the same four cells, each a beat behind
         the last. */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".db-keys__grid", start: "top 84%", once: true },
      });
      tl.from(rules, { scaleX: 0, duration: 0.85, ease: EASE, stagger: 0.075 }, 0)
        .from(
          icons,
          {
            scale: 0.84,
            opacity: 0,
            duration: 0.6,
            ease: EASE,
            stagger: 0.075,
            transformOrigin: "50% 50%",
          },
          0.14,
        )
        .from(texts, { y: 16, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.075 }, 0.22);
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <section ref={root} className="db-keys" aria-labelledby="own-head">
      <div className="db-shell">
        <div className="db-keys__top">
          <div className="db-keys__intro">
            <h2 id="own-head" className="db-keys__head">
              Your data is never <span className="text-db-red">held hostage</span>
            </h2>
            <p className="db-keys__lede">{OWNERSHIP.body}</p>
          </div>

          <div className="db-keys__figure">
            <ExportMark className="db-keys__art" />
          </div>
        </div>

        <ul className="db-keys__grid">
          {OWNERSHIP.points.map((p) => (
            <li key={p.text} className="db-key">
              <i className="db-key__rule" aria-hidden="true" />
              <span className="db-key__icon" aria-hidden="true">
                <Icon name={p.icon} className="h-[20px] w-[20px]" />
              </span>
              <p className="db-key__text">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
