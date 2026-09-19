"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";

/** How dim a word starts. Not lower: the words are real copy, and anyone who
    stops scrolling mid-sweep is reading them at this opacity. */
const DIM = 0.26;

/* The words are split here, in the markup, rather than by SplitText at
   runtime. SplitText would have to wait for the webfont to land and re-split
   on every resize, and a split that runs early leaves the paragraph measured
   against the fallback face. Splitting in JSX means the spans are server
   rendered, the text is complete and readable before a line of JavaScript
   runs, and nothing has to be re-split, ever. */
function split(text: string, tone: string) {
  return text.split(/(\s+)/).map((chunk, i) =>
    /^\s+$/.test(chunk) ? (
      chunk
    ) : (
      <span key={i} className={`db-sf__w ${tone}`}>
        {chunk}
      </span>
    ),
  );
}

/**
 * The origin statement, resolving as you arrive at it.
 *
 * A word-by-word brighten was tried on this paragraph before and removed,
 * because it "drew attention to itself rather than to the sentence". The
 * reason it did is that it was scrubbed across the paragraph's whole height:
 * the sentence only finished resolving once you had scrolled past it, so the
 * motion became a gate you had to scroll through in order to read.
 *
 * This one finishes early — the sweep completes while the paragraph is still
 * in the lower part of the viewport, before it reaches the place you actually
 * read from. So it is a greeting rather than a gate, and by the time the words
 * are in front of you they are already at full strength.
 *
 * Opacity only, so there is no layout work per frame. The dim state is applied
 * by the tween, never by CSS — `useGsap` bails entirely under
 * prefers-reduced-motion, so if it were a stylesheet rule those users would be
 * left looking at the dim state permanently.
 */
export default function Standfirst({
  diagnosis,
  answer,
  className = "",
}: {
  diagnosis: string;
  answer: string;
  className?: string;
}) {
  const root = useRef<HTMLParagraphElement>(null);

  useGsap(() => {
    const el = root.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".db-sf__w");
    if (!words.length) return;

    /* ScrollTrigger belongs on the timeline, never on a child tween. */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        // resolved by the time the sentence reaches reading height
        end: "center 62%",
        scrub: 0.4,
      },
    });

    tl.fromTo(
      words,
      { opacity: DIM },
      {
        opacity: 1,
        duration: 0.6,
        // scrubbed, so the tween itself stays linear and the scroll does the easing
        ease: "none",
        /* `amount` spreads the words across a fixed span rather than adding
           time per word, so a longer sentence sweeps at the same speed rather
           than more slowly. The start times are linear on purpose: easing them
           bunches one end of the sentence and leaves the other trailing, and
           what this should look like is an even pass across the line at
           reading pace. */
        stagger: { amount: 1.6 },
      },
    );

    /* next/font swaps the face in after first paint. That changes this
       paragraph's height, which moves the trigger's own start and end —
       ScrollTrigger recalculates on resize but knows nothing about a font
       swap. */
    let live = true;
    document.fonts?.ready.then(() => {
      if (live) ScrollTrigger.refresh();
    });
    return () => {
      live = false;
    };
  }, root);

  return (
    <p ref={root} className={className}>
      {split(diagnosis, "text-ink-3")} {split(answer, "text-ink")}
    </p>
  );
}
