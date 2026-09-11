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
    /* Captured before the Next router sees it: a link that points at the page
       we are already on is a scroll, not a navigation. Anything else (another
       route, an external URL, mailto/tel) is left alone. */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const raw = link.getAttribute("href");
      if (!raw || raw === "#") return;

      let url: URL;
      try {
        url = new URL(raw, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      if (url.hash) {
        if (!document.querySelector(url.hash)) return;
        e.preventDefault();
        e.stopPropagation();
        scrollToId(url.hash);
        history.replaceState(null, "", url.hash);
      } else {
        // "Home" while already home: take them back to the top
        e.preventDefault();
        e.stopPropagation();
        if (current) current.scrollTo(0, { duration: 1 });
        else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    };
    document.addEventListener("click", onClick, true);

    if (prefersReducedMotion()) {
      return () => document.removeEventListener("click", onClick, true);
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
      document.removeEventListener("click", onClick, true);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      current = null;
    };
  }, []);

  return null;
}
