"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/* Registering twice is harmless but noisy; guard it so React Strict Mode's
   double-invoke stays quiet. */
let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs a GSAP setup function inside a scope-bound context and reverts it on
 * unmount — every tween, ScrollTrigger and inline style it created is undone,
 * so remounts never stack duplicate animations.
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  const saved = useRef(setup);
  saved.current = setup;

  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context((self) => saved.current(self), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
