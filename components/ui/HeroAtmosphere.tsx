"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* The moving backdrop behind every dark page opener.

   Three soft blooms and the brand's column lines, and that is all. No lines
   sweeping across the band, and no geometry either — just light. Each bloom does two things on two different clocks: it wanders,
   and it breathes. The periods are prime-ish to each other so the light never
   settles into a repeating pose.

   Everything is transform and opacity — no CSS or SVG filters — so the layers
   are painted once, promoted, and then only ever moved. `data-depth` scales
   how far a layer travels as the page scrolls, which separates them.

   The component owns its own animation so any hero can simply drop it in. */
/* Halved travel, no scale, and one tween per bloom instead of two.

   The old recipe ran six infinite tweens — a wander and a separate opacity
   breath on each of three blooms — and the wander animated `scale`, which
   re-rasterises a 1000px gradient every frame rather than just moving it.
   What is left is a slow drift on transform only: still alive, a third of the
   work, and nothing on the page visibly pulses. */
const BLOOMS = [
  { sel: ".db-atmos__blob--a", x: 24, y: -18, d: 30 },
  { sel: ".db-atmos__blob--b", x: -20, y: 16, d: 37 },
  { sel: ".db-atmos__blob--c", x: 16, y: 20, d: 44 },
];

export default function HeroAtmosphere() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const band = el.closest("section");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".db-atmos__blob",
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 1.5, stagger: 0.12, ease: "power2.out" },
      );
      gsap.fromTo(
        ".db-atmos__cols",
        { opacity: 0, xPercent: -4 },
        { opacity: 1, xPercent: 0, duration: 1.3, delay: 0.15, ease: "power2.out" },
      );

      BLOOMS.forEach((b, i) => {
        gsap.to(b.sel, {
          x: b.x,
          y: b.y,
          duration: b.d,
          // the entrance is still tweening scale until 1.5s — wait it out
          delay: 1.7 + i * 1.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      if (band) {
        const scrub = gsap.timeline({
          scrollTrigger: { trigger: band, start: "top top", end: "bottom top", scrub: 0.45 },
        });
        gsap.utils.toArray<HTMLElement>("[data-depth]", el).forEach((layer) => {
          const depth = Number(layer.dataset.depth) || 1;
          scrub.to(layer, { yPercent: -9 * depth, ease: "none" }, 0);
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="db-atmos" aria-hidden="true">
      <div className="db-atmos__layer" data-depth="0.45">
        <span className="db-atmos__blob db-atmos__blob--a" />
        <span className="db-atmos__blob db-atmos__blob--b" />
        <span className="db-atmos__blob db-atmos__blob--c" />
      </div>

      <div className="db-atmos__cols" data-depth="0.85" />

      {/* keeps the reading side of the band dark; the only layer that never moves */}
      <span className="db-atmos__scrim" />
    </div>
  );
}
