"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, useGsap } from "@/lib/gsap";

/**
 * The "Why DatabaseBuilder?" entrance, in the hero's own hand.
 *
 * The hero lands its globe from slightly small while the pitch rises in a line
 * at a time behind it. This section does the same thing with its own parts:
 * the dashboard settles up out of a slight lean while the heading climbs out
 * of its lines and the copy follows.
 *
 * Like FaqMotion it never rewrites the DOM (no SplitText: it would tear up the
 * red "Builder" span) and never tweens a property CSS is transitioning — the
 * "Enlarge dashboard" label transitions its own transform, so the button is
 * faded as a whole and only its bars are scaled. Every entrance tween ends in
 * clearProps, so with JavaScript off, or under prefers-reduced-motion (where
 * useGsap never builds), the section is complete and still.
 */

/* A masked rise without a mask element: the line moves up by its own height
   while its clip's bottom edge closes by the same amount, so the text climbs
   out from behind a line that isn't there. The clip is opened 20% past the top
   and bottom so Anton's cap tops and the tail of the "y" in "Why" are never
   shaved on the way in. */
const RISE_FROM = { yPercent: 100, clipPath: "inset(-20% -4% 100% -4%)" };
const RISE_TO = { yPercent: 0, clipPath: "inset(-20% -4% -20% -4%)" };

export default function WhyMotion({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      const tl = gsap.timeline({
        defaults: { ease: EASE, clearProps: "all" },
        scrollTrigger: { trigger: el, start: "top 74%", once: true },
      });

      tl.fromTo(q("[data-why-line]"), RISE_FROM, { ...RISE_TO, duration: 1, stagger: 0.12 }, 0)
        .fromTo(
          q(".db-shot"),
          { autoAlpha: 0, y: 64, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.3 },
          0.1,
        )
        .fromTo(q("figcaption"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.05)
        /* the rules draw outward from the word, the way the eyebrow reads */
        .fromTo(
          q("figcaption > span"),
          { scaleX: 0, transformOrigin: (i: number) => (i === 0 ? "100% 50%" : "0% 50%") },
          { scaleX: 1, duration: 0.9 },
          0.15,
        )
        .fromTo(
          q("[data-why-copy] > p"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
          0.25,
        )
        .fromTo(q(".db-eyebrow"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.6)
        .fromTo(
          q(".db-eyebrow__bars i"),
          { scaleX: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, duration: 0.8, stagger: 0.08 },
          0.6,
        );

      /* The lean is scrubbed, not played: the screen tips up to face you as
         you scroll to it, the way the hero's floor sits under its globe. It
         ends at exactly 0deg, where force3D's "auto" drops the element back
         to a 2D transform, so the 10px type in the capture is not left
         rasterised on a 3D layer. */
      const stage = q(".db-why-stage")[0];
      if (stage) {
        gsap.fromTo(
          stage,
          { rotationX: 12, transformOrigin: "50% 100%" },
          {
            rotationX: 0,
            ease: "none",
            scrollTrigger: { trigger: stage, start: "top 94%", end: "top 40%", scrub: 0.6 },
          },
        );
      }
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
