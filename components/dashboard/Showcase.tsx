"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/components/animations/SmoothScroll";

type Props = {
  /** the text column — collapses away while the dashboard is expanded */
  copy: ReactNode;
  /** label on the colour-bar control, e.g. "See the conversation" */
  action: string;
  children: ReactNode;
};

/**
 * The clickable colour bars expand the product screen to the full width of the
 * section: the copy collapses, the grid animates to a single column and the
 * screen stays flat and inside its section. No modal, no overlay, no zoom.
 *
 * The copy's inner width is frozen in pixels before the track collapses —
 * otherwise the paragraphs reflow into a one-word-per-line column and the
 * section grows to four times its height while the animation runs.
 */
export default function Showcase({ copy, action, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [armed, setArmed] = useState(false);
  const copyCol = useRef<HTMLDivElement>(null);
  const copyInner = useRef<HTMLDivElement>(null);
  const app = useRef<HTMLDivElement>(null);
  const hover = useRef<number | undefined>(undefined);

  /* Layout changed, so every trigger below needs its measurements back. */
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 720);
    return () => window.clearTimeout(t);
  }, [expanded]);

  useEffect(() => () => window.clearTimeout(hover.current), []);

  const arm = () => {
    window.clearTimeout(hover.current);
    // a cursor merely crossing the bars shouldn't fire anything
    hover.current = window.setTimeout(() => setArmed(true), 380);
  };
  const disarm = () => {
    window.clearTimeout(hover.current);
    setArmed(false);
  };

  const toggle = () => {
    const inner = copyInner.current;
    const col = copyCol.current;

    if (!expanded) {
      if (inner && col) inner.style.width = `${col.clientWidth}px`;
      setExpanded(true);
      if (!prefersReducedMotion()) {
        window.setTimeout(() => {
          const el = app.current;
          if (!el) return;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(el, { offset: -110, duration: 0.9 });
          else el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 260);
      }
    } else {
      setExpanded(false);
      // let the track finish opening before the copy is free to reflow again
      window.setTimeout(() => {
        if (inner) inner.style.width = "";
      }, 680);
    }
  };

  return (
    <div className="db-showcase" data-expanded={expanded ? "true" : "false"}>
      <div ref={copyCol} className="db-showcase__copy" aria-hidden={expanded}>
        <div ref={copyInner}>
          {copy}
          <button
            type="button"
            className={`db-eyebrow ${armed ? "is-armed" : ""}`}
            onMouseEnter={arm}
            onMouseLeave={disarm}
            onFocus={() => setArmed(true)}
            onBlur={() => setArmed(false)}
            onClick={toggle}
            tabIndex={expanded ? -1 : 0}
          >
            <span className="db-eyebrow__bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="db-eyebrow__label">
              {action}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div ref={app} className="db-app-wrap">
        <div
          /* named properties, not `all`: `all` also animates the margin and
             the colours, and at 500ms the row visibly lagged the click */
          className={`overflow-hidden transition-[max-height,opacity] duration-[260ms] ease-out ${
            expanded ? "mb-4 max-h-16 opacity-100" : "mb-0 max-h-0 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={toggle}
            tabIndex={expanded ? 0 : -1}
            className="text-ink-2 hover:text-brand border-line inline-flex items-center gap-2.5 rounded-full border bg-white px-4 py-2 text-[14px] font-medium shadow-sm transition-colors"
          >
            <span className="db-eyebrow__bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Back to overview
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
