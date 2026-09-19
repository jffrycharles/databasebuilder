"use client";

import { useRef } from "react";
import { EASE, gsap, ScrollTrigger, useGsap } from "@/lib/gsap";

/* Geometry, not a screenshot.
 *
 * The section's claim is that the records leave with you, so the mark shows
 * exactly that and nothing else: rows lift off the stack, cross, and land in
 * a tray. It is deliberately not a picture of the product — a fake dashboard
 * drawn out of rectangles would be claiming a screen that does not exist, and
 * this claim does not need one. Three chips, two outlines, one arrow.
 *
 * Chip travel is computed from the index rather than written out three times:
 * they start on the stack's own row lines and land stacked in the tray. */
const DX = 170;
const dy = (i: number) => 77 - 26 * i;

export default function ExportMark({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;

      const chips = el.querySelectorAll<SVGRectElement>(".db-xp__chip");
      const outlines = el.querySelectorAll<SVGElement>(".db-xp__outline");
      const strokes = el.querySelectorAll<SVGPathElement>(".db-xp__draw");
      const rows = el.querySelectorAll<SVGRectElement>(".db-xp__row");

      /* Measured, not guessed: a hard-coded dash length is wrong the moment
         anyone edits the path data. */
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
      intro
        .from(
          outlines,
          { opacity: 0, scale: 0.94, transformOrigin: "50% 50%", duration: 0.7, ease: EASE },
          0,
        )
        .from(
          rows,
          {
            opacity: 0,
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: 0.5,
            ease: EASE,
            stagger: 0.05,
          },
          0.12,
        )
        .to(strokes, { strokeDashoffset: 0, duration: 0.7, ease: EASE, stagger: 0.08 }, 0.3);

      /* The loop is the point of the mark: "as often as you want it" is one of
         the four promises sitting next to it. It is paused whenever the mark
         is off screen, so it costs nothing while you are elsewhere. */
      const cycle = gsap.timeline({ repeat: -1, repeatDelay: 1.9, paused: true });
      cycle
        .fromTo(
          chips,
          { x: 0, y: 0, opacity: 0 },
          {
            x: DX,
            y: (i: number) => dy(i),
            opacity: 1,
            duration: 1.05,
            ease: "power2.inOut",
            stagger: 0.16,
          },
          0,
        )
        .to(chips, { opacity: 0, duration: 0.34, ease: "power1.in", stagger: 0.06 }, 1.85);

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? cycle.play() : cycle.pause()),
      });
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 280 170"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* the stack you own */}
      <rect
        className="db-xp__outline db-xp__panel"
        x="8.5"
        y="26.5"
        width="104"
        height="117"
        rx="10"
      />
      {[47, 65, 83, 101, 119].map((y) => (
        <rect key={y} className="db-xp__row" x="25" y={y} width="71" height="6" rx="3" />
      ))}

      {/* the copies leaving */}
      {[47, 65, 83].map((y) => (
        <rect key={y} className="db-xp__chip" x="25" y={y} width="52" height="6" rx="3" />
      ))}

      <path className="db-xp__draw db-xp__arrow" d="M126 85h34" />
      <path className="db-xp__draw db-xp__arrow" d="M153 78.5l7.5 6.5-7.5 6.5" />

      {/* the tray you keep it in */}
      <path className="db-xp__draw db-xp__down" d="M221 44v50" />
      <path className="db-xp__draw db-xp__down" d="M210.5 84l10.5 11 10.5-11" />
      <path
        className="db-xp__outline db-xp__tray"
        d="M182 106v20a10 10 0 0 0 10 10h58a10 10 0 0 0 10-10v-20"
      />
    </svg>
  );
}
