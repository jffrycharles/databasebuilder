"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";

/**
 * Text that brightens a word at a time as it scrolls into view.
 *
 * Opacity only, scrubbed to scroll position — no layout work per frame, and
 * `useGsap` bails under prefers-reduced-motion, which leaves every word at its
 * natural opacity rather than stuck dim.
 */
export default function RevealText({
  children,
  className = "",
  from = 0.2,
}: {
  children: string;
  className?: string;
  from?: number;
}) {
  const root = useRef<HTMLParagraphElement>(null);

  useGsap(() => {
    const words = root.current?.querySelectorAll(".db-rw");
    if (!words?.length) return;
    gsap.fromTo(
      words,
      { opacity: from },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.45,
        },
      },
    );
  }, root);

  return (
    <p ref={root} className={className}>
      {children.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="db-rw">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
