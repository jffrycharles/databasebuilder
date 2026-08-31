"use client";

/* One IntersectionObserver reveals every `.db-anim` element on the page.
   A shared observer beats one ScrollTrigger per element: the browser does the
   work off the main thread and there is nothing to refresh on resize. The
   actual movement is a CSS transition, so it stays on the compositor. */

let observer: IntersectionObserver | null = null;
const queue = new Set<Element>();

function ensure() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      let i = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const own = Number(el.dataset.revealDelay ?? 0);
        const delay = own || i * 70;
        window.setTimeout(() => el.classList.add("is-in"), delay);
        observer?.unobserve(el);
        queue.delete(el);
        i++;
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return observer;
}

export function observeReveal(el: Element | null) {
  if (!el) return () => {};
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.classList.add("is-in");
    return () => {};
  }
  const io = ensure();
  if (!io) {
    el.classList.add("is-in");
    return () => {};
  }
  queue.add(el);
  io.observe(el);
  return () => {
    io.unobserve(el);
    queue.delete(el);
  };
}
