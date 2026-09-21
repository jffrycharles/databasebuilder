"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

let current: Lenis | null = null;

/** Available to anything that needs to drive the scroll (anchors, expanders). */
export function getLenis() {
  return current;
}

/**
 * How hard the smoothing pulls toward where the wheel has actually asked to be,
 * per frame. Lenis takes either this or a `duration`, and the difference is the
 * whole feel of the page.
 *
 * It used to run `duration: 1.05` with a cubic ease-out, which restarts a
 * 1.05-second animation on every wheel event. Measured in Chrome, in both dev
 * and a production build: after the last wheel event the page kept moving for
 * ~890ms. On a trackpad, where you expect the content to stop when your fingers
 * stop, that reads as the page lagging behind you rather than as smoothness.
 *
 * `lerp` is frame-rate independent and settles geometrically: at 0.22 the
 * remaining distance is under a pixel in about 13 frames, so the glide is
 * ~200ms. Enough easing that a notched mouse wheel is not a staircase, not
 * enough to feel disconnected from the input.
 */
const LERP = 0.22;

export function scrollToId(id: string) {
  const target = document.querySelector(id);
  if (!target) return;
  const header = document.querySelector<HTMLElement>(".db-header");
  const offset = -((header?.offsetHeight ?? 0) + 12);
  if (current) current.scrollTo(target as HTMLElement, { offset, duration: 0.9 });
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
        if (current) current.scrollTo(0, { duration: 0.9 });
        else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    };
    document.addEventListener("click", onClick, true);

    /* A touch screen already has momentum scrolling, tuned by the OS and
       running off the main thread. Smoothing it a second time in JavaScript can
       only add latency and take the scroll off the compositor, so on a coarse
       pointer the page simply scrolls. */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion() || coarse) {
      return () => document.removeEventListener("click", onClick, true);
    }

    const lenis = new Lenis({
      lerp: LERP,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    /* Lenis needs the real elapsed time to integrate against; GSAP's lag
       smoothing would hand it a clamped delta after a slow frame and the scroll
       would visibly stall. */
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
