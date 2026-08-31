"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Globe from "@/components/ui/Globe";
import { heroGlobeTarget, measure } from "@/lib/globe-handoff";
import { prefersReducedMotion } from "@/lib/gsap";

/* -------------------------------------------------------------------------
   Ready state
   The hero waits for this before it plays its entrance, so the loading globe
   and the hero globe are never on screen at the same time.
   ------------------------------------------------------------------------- */
const ReadyContext = createContext(false);
export const useAppReady = () => useContext(ReadyContext);

const MIN_MS = 1150; // let the loader breathe even on a warm cache
const MAX_MS = 3600; // never hold the page hostage

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const bootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  /** Measure both globes now, then send the loader's globe to the hero's spot. */
  const handoff = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const boot = bootRef.current;
    const mark = markRef.current;
    const from = measure(mark);
    const to = heroGlobeTarget();
    const soft = prefersReducedMotion();

    if (boot && mark && from && to && !soft) {
      // the sphere sits at 70% of the mark box, so match that when scaling
      const scale = to.size / (from.size * 0.7);
      boot.style.setProperty("--boot-dx", `${to.x - from.x}px`);
      boot.style.setProperty("--boot-dy", `${to.y - from.y}px`);
      boot.style.setProperty("--boot-scale", `${scale}`);
      boot.classList.add("is-shifting");
    }

    const travel = soft ? 0 : 620;
    window.setTimeout(() => {
      setReady(true); // hero fades up as the globe lands
      document.documentElement.classList.remove("db-loading");
    }, travel);
    window.setTimeout(() => {
      boot?.classList.add("is-done");
      setGone(true);
    }, travel + (soft ? 0 : 520));
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("db-loading");
    const t0 = performance.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - t0));
      window.setTimeout(handoff, wait);
    };

    const bail = window.setTimeout(handoff, MAX_MS);

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    const fontsReady = fonts?.ready ?? Promise.resolve();
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((res) => window.addEventListener("load", () => res(), { once: true }));

    Promise.all([fontsReady, loaded]).then(finish).catch(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(bail);
      document.documentElement.classList.remove("db-loading");
    };
  }, [handoff]);

  return (
    <ReadyContext.Provider value={ready}>
      {!gone && (
        <div
          ref={bootRef}
          className="db-boot"
          role="status"
          aria-label="Loading DatabaseBuilder"
          aria-live="polite"
        >
          <div className="db-boot__content">
            <div ref={markRef} className="db-boot__mark">
              <svg viewBox="0 0 200 200" fill="none" className="db-boot__rings" aria-hidden="true">
                <circle cx="100" cy="100" r="95" stroke="rgba(120,150,255,.14)" strokeWidth="2" />
                <circle
                  className="db-boot-spin db-boot-spin--b"
                  cx="100"
                  cy="100"
                  r="95"
                  pathLength="100"
                  stroke="#2e52ff"
                  strokeWidth="3"
                  strokeDasharray="16 84"
                  strokeLinecap="round"
                />
                <circle
                  className="db-boot-spin db-boot-spin--r"
                  cx="100"
                  cy="100"
                  r="88"
                  pathLength="100"
                  stroke="#e23324"
                  strokeWidth="2.5"
                  strokeDasharray="9 91"
                  strokeLinecap="round"
                />
              </svg>
              <Globe className="db-boot__sphere" rings={15} density={25} spin={11} />
            </div>
            <div className="db-boot__brand font-display text-[clamp(26px,3vw,42px)] leading-none text-white italic">
              Database<em className="text-db-red italic">Builder</em>
            </div>
            <div className="db-boot__brand font-ui mt-3 pl-[.52em] text-[clamp(9px,1vw,13px)] font-medium tracking-[.52em] text-white/60">
              SALES SOLUTION
            </div>
          </div>
        </div>
      )}
      {children}
    </ReadyContext.Provider>
  );
}
