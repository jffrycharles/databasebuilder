"use client";

import { useRef } from "react";
import { EASE, gsap, useGsap } from "@/lib/gsap";

/**
 * The Features page's motion, in one place — the FaqMotion pattern: mounted
 * once inside <main>, one gsap.context scoped to the page, animating what it
 * finds by data attribute. The page itself stays a server component. The
 * hero's product visual runs its own motion (HeroVisual), because switching
 * its screens is interaction that has to work with reduced motion too.
 *
 * - [data-fx="shot"]   each screenshot rises into place as it arrives, and
 *   its [data-fx="detail"] crops follow it in, one after another
 * - [data-fx="float"]  layered panels drift a little against the scroll, on
 *   wide screens only
 *
 * No clip reveals, no light, no glow. Under prefers-reduced-motion useGsap
 * never builds, so the page is complete and still.
 */
export default function FeaturesMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsap(
    () => {
      const page = anchor.current?.closest<HTMLElement>("main");
      if (!page) return;
      const q = gsap.utils.selector(page);
      const media = gsap.matchMedia();

      /* ---- the Best Choice picture (staging option) ------------------ */
      /* The stage rises in and the picture inside settles from slightly
         close. Only present when the build chose the picture hero. */
      const render = q('[data-fx="render"]')[0];
      if (render) {
        const img = render.querySelector("img");
        gsap
          .timeline({ defaults: { ease: EASE } })
          .fromTo(render, { autoAlpha: 0, y: 56 }, { autoAlpha: 1, y: 0, duration: 1.3, clearProps: "transform,opacity,visibility" }, 0.25)
          .fromTo(img, { scale: 1.06 }, { scale: 1, duration: 2.2, clearProps: "transform" }, 0.25);
      }

      /* ---- screenshots and their detail crops ------------------------ */
      q('[data-fx="shot"]').forEach((shot) => {
        const details = shot.querySelectorAll('[data-fx="detail"]');
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: { trigger: shot, start: "top 84%", once: true },
        });
        tl.fromTo(
          shot.querySelectorAll(".db-win"),
          { autoAlpha: 0, y: 44, scale: 0.975 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.14,
            clearProps: "transform,opacity,visibility",
          },
        );
        if (details.length) {
          tl.fromTo(
            details,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              clearProps: "transform,opacity,visibility",
            },
            0.45,
          );
        }
      });

      /* ---- layered panels drift, wide screens only ------------------- */
      media.add("(min-width: 1024px)", () => {
        q('[data-fx="float"]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 6 },
            {
              yPercent: -6,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });
      });
    },
    anchor,
    [],
    { afterReady: true },
  );

  return <span ref={anchor} hidden />;
}
