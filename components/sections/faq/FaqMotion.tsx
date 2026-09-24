"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, settleTriggers, useGsap } from "@/lib/gsap";

/**
 * The FAQ page's motion, in one place.
 *
 * The page is server-rendered and owns no animation. Rather than turn four
 * sections into client components for one entrance each, this mounts once
 * inside <main>, scopes one gsap.context to the page and animates what it
 * finds.
 *
 * TWO RULES THIS FILE KEEPS
 *
 * 1. It never changes the DOM. An earlier version ran SplitText over the
 *    section headings; SplitText rewrites an element's children, which
 *    destroyed the two <span>s the heading is built from and collapsed
 *    "Product & Features / Related Questions" into five ragged lines. The
 *    masked reveal below is done with clip-path on the element that already
 *    exists instead — see `rise`.
 *
 * 2. It never animates a property CSS is also transitioning. The questions'
 *    <summary> has a CSS transition on transform for its hover nudge, and
 *    GSAP writing transform to that same element every frame makes the
 *    browser re-transition each frame — a visible stutter. So the entrance
 *    moves the heading inside the summary, and the summary is left to CSS.
 *
 * Every tween is a from/fromTo that ends in clearProps, so the page's resting
 * state is its CSS state: with JavaScript off, or under
 * prefers-reduced-motion (where useGsap never builds), it is complete and
 * still.
 */

/* The house curves. A long, soft landing for things arriving; a firm
   in-and-out for things that travel across the screen. */
const LAND = "power4.out";
const TRAVEL = "power4.inOut";

/**
 * A masked rise without a mask element.
 *
 * The element slides up by its own height while its clip-path's bottom inset
 * shrinks by the same amount on the same curve. clip-path lives in the
 * element's own coordinates, so as the element moves up the clip's bottom
 * edge moves with it — and because the two change in lockstep, the visible
 * edge stays fixed on screen at the element's resting baseline. The text
 * appears to climb out from behind a line that isn't there.
 */
const rise = {
  from: { yPercent: 100, clipPath: "inset(0% 0% 100% 0%)" },
  to: { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", clearProps: "transform,clipPath" },
};

export default function FaqMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGsap(
    () => {
      const page = anchor.current?.closest<HTMLElement>(".db-faq-page");
      if (!page) return;

      const q = gsap.utils.selector(page);
      const media = gsap.matchMedia();

      /* ---- hero ---------------------------------------------------------- */
      const hero = page.querySelector<HTMLElement>(".db-faq-hero");
      const photo = hero?.querySelector<HTMLElement>(".db-faq-hero__image");
      const heading = hero?.querySelector<HTMLElement>("h1");
      const lede = hero?.querySelector<HTMLElement>("p");

      if (hero) {
        const intro = gsap.timeline();

        /* The photograph settles in from slightly close, and comes to rest at
           1.08 rather than 1 — that 4% of overscan on each edge is what the
           scroll drift below spends, so the picture can move without ever
           uncovering the edge of the band. */
        if (photo) {
          intro.fromTo(photo, { scale: 1.16 }, { scale: 1.08, duration: 2.6, ease: "power2.out" }, 0);
        }

        /* "FAQ" and its red rule are drawn on together, left to right, the
           way the rule would be if you ran a pen under the word. */
        if (heading) {
          intro.fromTo(
            heading,
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: TRAVEL, clearProps: "clipPath" },
            0.2,
          );
        }

        /* The lede comes up out of a soft focus. Blur on one short paragraph,
           once, is cheap; it is what stops a fade reading as two states
           swapping. */
        if (lede) {
          intro.fromTo(
            lede,
            { autoAlpha: 0, y: 14, filter: "blur(8px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.95, ease: "power3.out", clearProps: "filter,transform" },
            0.7,
          );
        }

        /* As you scroll away the photograph drifts a little behind the type.
           3% against 4% of overscan, so there is always picture at the edge. */
        if (photo) {
          media.add("(min-width: 768px)", () => {
            gsap.fromTo(
              photo,
              { yPercent: 0 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
              },
            );
          });
        }
      }

      /* ---- the four category sections ------------------------------------ */
      q(".db-faq-section").forEach((section) => {
        const image = section.querySelector<HTMLElement>(".db-faq-section__photo");
        const lines = section.querySelectorAll<HTMLElement>(".db-faq-section__title span");
        /* the heading inside each question — see rule 2 above */
        const questions = section.querySelectorAll<HTMLElement>(".db-faq__q h3");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        });

        /* The photograph is uncovered left to right while it relaxes from a
           slight zoom. The two share one tween so they move in lockstep, and
           the clip starts inset on every side by exactly the amount the zoom
           overhangs — (1 - 1/1.12) / 2 = 5.36% — so the enlarged picture is
           trimmed back to its own box and never spills out of the grid. */
        if (image) {
          tl.fromTo(
            image,
            { clipPath: "inset(5.36% 100% 5.36% 5.36%)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.35,
              ease: TRAVEL,
              clearProps: "clipPath,transform",
            },
            0,
          );
        }

        /* "Product & Features", then "Related Questions", each climbing out
           of its own line. */
        if (lines.length) {
          tl.fromTo(lines, rise.from, { ...rise.to, duration: 0.95, ease: LAND, stagger: 0.12 }, 0.35);
        }

        /* The questions follow in the same voice, quicker and closer
           together, so the list reads as a list rather than as a slab. */
        if (questions.length) {
          tl.fromTo(
            questions,
            rise.from,
            { ...rise.to, duration: 0.75, ease: "power3.out", stagger: 0.07 },
            0.62,
          );
        }
      });

      /* Opening an answer moves everything below it, and every trigger below
         is then measured against a page that has shifted. Once per open, not
         once per frame. */
      let settle = 0;
      const onToggle = () => {
        window.clearTimeout(settle);
        settle = window.setTimeout(() => ScrollTrigger.refresh(), 420);
      };
      page.addEventListener("toggle", onToggle, true);

      settleTriggers();

      return () => {
        window.clearTimeout(settle);
        page.removeEventListener("toggle", onToggle, true);
        media.revert();
      };
    },
    anchor,
    [],
    { afterReady: true },
  );

  /* An anchor, not a wrapper: a stray <div> in the page's own grid would be a
     layout bug waiting to happen. */
  return <span ref={anchor} hidden aria-hidden="true" />;
}
