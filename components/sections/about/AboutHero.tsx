"use client";

import { useEffect, useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ABOUT } from "@/lib/about";

/**
 * The years mark. It used to be a number floating in a pulsing radial blob;
 * now it hangs off a blue-to-red rule that ties it back to the headline, and
 * it carries two supporting facts so the figure is evidence rather than
 * decoration.
 */
function YearsMark() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = num.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 45,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.35,
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    }, root);

    return () => {
      ctx.revert();
      el.textContent = "45";
    };
  }, []);

  return (
    <div ref={root} className="db-years">
      <p className="db-years__figure">
        <span ref={num}>45</span>
        <em>yrs</em>
      </p>
      <p className="db-years__label db-body">
        of selling behind the product — most of it before CRMs existed
      </p>
      <ul className="db-years__facts db-sm text-white/55">
        <li>
          <b>20M</b> records
        </li>
        <li>
          <b>1</b> all-in-one price
        </li>
        <li>
          <b>No</b> setup fees
        </li>
      </ul>
    </div>
  );
}

export default function AboutHero() {
  return (
    <PageHero
      label="Our Story"
      title={
        <>
          Sales software, designed by <span className="text-db-red-hot">salespeople</span>
        </>
      }
      lede={ABOUT.standfirst}
      aside={<YearsMark />}
    />
  );
}
