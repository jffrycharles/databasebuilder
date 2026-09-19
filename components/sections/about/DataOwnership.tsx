"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { OWNERSHIP } from "@/lib/about";

/**
 * The data promise, as the contrast step after the dark band.
 *
 * Four rows, not four cards. The four are one promise in four parts, and a
 * card grid cuts them into four unrelated claims that happen to sit next to
 * each other. Rows keep them reading as a list of things that are all true
 * at once, and give each one the width to be read rather than skimmed.
 *
 * The hover is a tint on the icon and a three-pixel nudge on the line. No
 * lift and no cursor change: these rows do not go anywhere, and motion that
 * promises a click that is not there is worse than no motion.
 */
export default function DataOwnership() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const el = root.current;
    if (!el) return;
    const head = el.querySelectorAll("[data-head]");
    const rows = el.querySelectorAll(".db-own-row");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
    tl.from(head, { opacity: 0, y: 16, duration: 0.66, ease: "expo.out", stagger: 0.08 }, 0);
    tl.from(rows, { opacity: 0, y: 14, duration: 0.6, ease: "expo.out", stagger: 0.065 }, 0.2);
  }, root);

  return (
    <div ref={root} className="db-own">
      <div className="db-own__intro">
        <h2 className="db-own__head" data-head>
          Your data is never <span className="text-db-red">held hostage</span>
        </h2>
        <p className="db-own__lede" data-head>
          {OWNERSHIP.body}
        </p>
      </div>

      <ul className="db-own__rows m-0 list-none p-0">
        {OWNERSHIP.points.map((p) => (
          <li key={p.text} className="db-own-row">
            <span className="db-own-row__icon" aria-hidden="true">
              <Icon name={p.icon} className="h-[19px] w-[19px]" />
            </span>
            <p className="db-own-row__text">{p.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
