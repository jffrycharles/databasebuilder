"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

let current: Lenis | null = null;

/** Available to anything that needs to drive the scroll (anchors, expanders). */
export function getLenis() {
  return current;
}

export function scrollToId(id: string) {
  const target = document.querySelector(id);
  if (!target) return;
  const header = document.querySelector<HTMLElement>(".db-header");
  const offset = -((header?.offsetHeight ?? 0) + 12);
  if (current) current.scrollTo(target as HTMLElement, { offset, duration: 1.05 });
  else {
    const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Anchor clicks are handled either way; only the easing is optional.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      scrollToId(href);
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onClick);

    if (prefersReducedMotion()) {
      return () => document.removeEventListener("click", onClick);
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });
    current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      current = null;
    };
  }, []);

  return null;
}
