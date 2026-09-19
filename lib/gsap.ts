"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/* Registering twice is harmless but noisy; guard it so React Strict Mode's
   double-invoke stays quiet. */
let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };

/** The page's arrival curve. Long tail, no overshoot: things land, they do not
    bounce. Used by every authored entrance so the whole page shares one hand. */
export const EASE = "expo.out";

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* =========================================================================
   The page-ready gate

   The boot loader covers the whole viewport for up to 3.6s. Any entrance that
   plays during that window plays behind the overlay: reload part-way down the
   page and every section already on screen runs its reveal while it is still
   hidden, so what you get when the loader lifts is the finished state and
   nothing to watch. Measured: 600ms after a reload at 2400px, with the loader
   still up, the ownership rows were at opacity 0.99 and the quote line was
   4.9px from home.

   So section timelines wait for this gate, and ScrollTrigger recalculates once
   the loader is gone — the hero's globe and the font swap both change the
   document's height, and every start position measured before that is stale.
   ========================================================================= */
let pageReady = false;
const waiting = new Set<() => void>();

/** Called by AppShell the moment the loader is off the screen. */
export function markPageReady() {
  if (pageReady) return;
  pageReady = true;
  for (const fn of waiting) fn();
  waiting.clear();
  /* Two frames, not one: the loader's removal is a React commit, and the
     layout it leaves behind is only final after the browser has painted it. */
  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
}

/** Whatever happens to the loader, the page is never held past this. */
if (typeof window !== "undefined") {
  window.setTimeout(markPageReady, 4200);
  /* next/font swaps the face in after first paint, which re-measures every
     paragraph on the page and moves every trigger with it. ScrollTrigger
     refreshes on resize and load; it knows nothing about a font swap. */
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/** Runs `fn` now if the loader has lifted, otherwise when it does. */
export function onPageReady(fn: () => void) {
  if (pageReady) {
    fn();
    return () => {};
  }
  waiting.add(fn);
  return () => waiting.delete(fn);
}

type GsapOptions = {
  /** Hold the setup until the boot loader is off the screen. Sections that
      animate on arrival want this; the hero, which is choreographed with the
      loader on purpose, does not. */
  afterReady?: boolean;
};

/**
 * Runs a GSAP setup function inside a scope-bound context and reverts it on
 * unmount — every tween, ScrollTrigger, SplitText and inline style it created
 * is undone, so remounts never stack duplicate animations.
 */
/* Every afterReady section builds in the same tick, so the refresh is
   collapsed into one call rather than run once per component. */
let refreshQueued = false;
function queueRefresh() {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}

/**
 * Settle every ScrollTrigger against the page as it currently measures.
 *
 * Call this after anything that moves content without resizing the window,
 * because ScrollTrigger only recalculates on resize. A SplitText re-split is
 * the case that matters here: `autoSplit` rebuilds its lines when the webfont
 * lands, the old reveal is reverted and a new one is created from the hidden
 * state, and the new trigger carries start/end measured against the old
 * layout. Scroll past that section faster than the re-split and the trigger
 * never fires, so the text stays masked off-screen permanently. Measured: a
 * fast wheel pass left 28 of 28 elements invisible, and one refresh cleared
 * all 28.
 */
export function settleTriggers() {
  queueRefresh();
}

/* The webfont swap moves every trigger below it on the page. */
if (typeof document !== "undefined" && document.fonts) {
  document.fonts.ready.then(() => queueRefresh());
}

export function useGsap(
  setup: (ctx: gsap.Context) => void,
  scope: RefObject<Element | null>,
  deps: unknown[] = [],
  { afterReady = false }: GsapOptions = {},
) {
  const saved = useRef(setup);
  saved.current = setup;

  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    if (prefersReducedMotion()) return;

    let ctx: gsap.Context | null = null;
    const build = () => {
      if (!scope.current) return;
      ctx = gsap.context((self) => saved.current(self), scope);
      /* Settle every trigger against where the page actually is.
         A deferred build can happen with the viewport already past a
         trigger's start: a deep link, the End key, a scroll position restored
         on reload, or simply a fast flick while the loader is still up. Those
         triggers are created but never fire, and for a masked line reveal the
         resting state is off-screen, so the text stays invisible for good.
         One refresh recomputes them all and snaps each to the progress the
         current scroll implies. */
      if (afterReady) queueRefresh();
    };

    const cancel = afterReady ? onPageReady(build) : (build(), () => {});
    return () => {
      cancel();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
