"use client";

import { useEffect } from "react";

/* Opening the question a link actually points at.

   Every question is a native <details> with an id, and the category rail links
   straight to one. Without this, clicking "Pricing & billing" — or landing on
   /faq#cancellation from search — scrolled you to a row that was still shut,
   so the answer you asked for was the one thing you could not see.

   It runs on hash change and once on mount (SmoothScroll intercepts in-page
   hash clicks, so `hashchange` does not always fire) and marks the row so it
   is obvious which one answered. Kept out of the Accordion itself so that
   stays a server component with no JavaScript of its own. */
export default function FaqDeepLink() {
  useEffect(() => {
    const open = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!(el instanceof HTMLDetailsElement)) return;

      el.open = true;
      document.querySelectorAll(".db-faq.is-targeted").forEach((n) => n.classList.remove("is-targeted"));
      el.classList.add("is-targeted");
    };

    /* A click on a same-page hash link, whether or not the hash changes —
       SmoothScroll rewrites the hash with replaceState, which fires no
       hashchange. Same guards it uses, so a cmd-click opening a new tab or an
       already-handled event does not also toggle a row here. */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const el = document.getElementById(href.slice(1));
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        document.querySelectorAll(".db-faq.is-targeted").forEach((n) => n.classList.remove("is-targeted"));
        el.classList.add("is-targeted");
      }
    };

    open();
    window.addEventListener("hashchange", open);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", open);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
