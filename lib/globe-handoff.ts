"use client";

/* The loading screen and the hero share one globe identity. The loader owns a
   globe in the middle of the screen; when loading finishes it measures both
   positions at runtime (never hard-coded) and glides its globe onto the hero's
   globe, which only becomes visible once the travelling one has landed. */

type Rect = { x: number; y: number; size: number };

let heroGlobe: SVGSVGElement | null = null;
const listeners = new Set<() => void>();

export function registerHeroGlobe(el: SVGSVGElement | null) {
  heroGlobe = el;
  listeners.forEach((fn) => fn());
  return () => {
    if (heroGlobe === el) heroGlobe = null;
  };
}

export function onHeroGlobe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function measure(el: Element | null): Rect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (!r.width) return null;
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, size: r.width };
}

/** Where the loader globe has to travel to, worked out from live geometry. */
export function heroGlobeTarget(): Rect | null {
  return measure(heroGlobe);
}
