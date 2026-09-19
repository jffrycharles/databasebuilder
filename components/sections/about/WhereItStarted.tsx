"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { ORIGIN } from "@/lib/about";

/**
 * The founder's story as an asymmetric editorial spread.
 *
 * The heading holds the left column, the opening paragraph sits low and to
 * the right of it, and the rest of the story starts inboard of both. The eye
 * steps down and across instead of reading three stacked slabs of the same
 * width, and the paragraphs keep a 64ch measure at every size.
 *
 * The order the paragraphs already have is the reading order: where he
 * started, what he did without, why he built this, what it had to be. No
 * dates or facts are added to carry it.
 */
export default function WhereItStarted() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const el = root.current;
    if (!el) return;
    const bits = el.querySelectorAll("[data-rise]");
    if (!bits.length) return;

    gsap.from(bits, {
      opacity: 0,
      y: 18,
      duration: 0.72,
      ease: "expo.out",
      stagger: 0.075,
      scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none none" },
    });
  }, root);

  return (
    <div ref={root} className="db-origin-grid">
      <h2 className="db-origin-head db-origin-grid__head" data-rise>
        Where it <span className="text-db-red">started</span>
      </h2>

      <p className="db-origin-lead db-origin-grid__lead" data-rise>
        {ORIGIN.lead}
      </p>

      <div className="db-origin-body db-origin-grid__body">
        {ORIGIN.body.map((p) => (
          <p key={p} data-rise>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
