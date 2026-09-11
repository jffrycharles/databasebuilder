"use client";

import { useEffect, useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ABOUT } from "@/lib/about";

/** One number instead of a specification panel: the 45 years counts up once,
    then breathes. Everything else in the hero is type. */
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
        duration: 1.6,
        ease: "power2.out",
        delay: 0.25,
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
      gsap.fromTo(
        ".db-years__glow",
        { opacity: 0.35, scale: 0.94 },
        { opacity: 0.7, scale: 1.04, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true },
      );
    }, root);

    return () => {
      ctx.revert();
      el.textContent = "45";
    };
  }, []);

  return (
    <div ref={root} className="db-years">
      <span className="db-years__glow" aria-hidden="true" />
      <p className="db-years__figure">
        <span ref={num}>45</span>
        <em>yrs</em>
      </p>
      <p className="db-years__label">
        of selling behind the product — most of it before CRMs existed
      </p>
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
