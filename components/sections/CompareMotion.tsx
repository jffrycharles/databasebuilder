"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, ScrollTrigger, useGsap } from "@/lib/gsap";

/**
 * The comparison's one motion: rows fade up as they reach the viewport, a few
 * at a time, once. ScrollTrigger.batch collects whatever arrives together, so
 * a fast scroll brings in a screenful at once instead of queueing 37 rows of tweens.
 *
 * The cells move, not the <tr>: transforms on table rows are unreliable
 * across browsers, and the cells carry our column's panel, so the panel
 * builds down the table with its rows. Everything ends in clearProps, and
 * under prefers-reduced-motion useGsap never builds, so the table is simply
 * there.
 */
export default function CompareMotion({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const el = root.current;
      if (!el) return;
      const rows = gsap.utils.toArray<HTMLTableRowElement>(".db-cmp__group, .db-cmp__row", el);
      const cells = (rs: Element[]) => rs.flatMap((r) => Array.from(r.children));

      gsap.set(cells(rows), { autoAlpha: 0, y: 12 });

      ScrollTrigger.batch(rows, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(cells(batch), {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: EASE,
            /* per row, not per cell: a row's three cells land together */
            stagger: { each: 0.035, grid: [batch.length, 3], axis: "y" },
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });
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
