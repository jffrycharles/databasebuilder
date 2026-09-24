"use client";

import { useEffect, useRef } from "react";
import Globe from "@/components/ui/Globe";
import Logo from "@/components/ui/Logo";
import { FloorRibbons, OrbitRings, WaveDivider } from "@/components/sections/HeroArt";
import HeroAtmosphere from "@/components/ui/HeroAtmosphere";
import { useAppReady } from "@/components/animations/AppShell";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";
import { SITE } from "@/lib/data";

/**
 * The story opener, built on the homepage hero's own lockup: the globe inside
 * its orbit rings, with the line underneath it. There the line reads
 * DatabaseBuilder / Sales Solution; here it reads 45 / yrs. Same composition,
 * same rings, same running lights — so the two heroes are recognisably the
 * same place, and this page gets the mark the site already owns instead of a
 * shape invented for it.
 *
 * The globe registers as the hero globe, so the loader's globe flies into it
 * on this page exactly as it does on the homepage.
 */
export default function AboutHero() {
  const ready = useAppReady();
  const root = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  /* Hold the hero only while the loader is still on screen. */
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    if (ready) el.classList.remove("db-story-hold");
    else el.classList.add("db-story-hold");
  }, [ready]);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;

    // However this goes, the hero ends up readable.
    const show = () => el.classList.remove("db-story-hold");
    const safety = window.setTimeout(show, 1600);

    if (prefersReducedMotion()) {
      show();
      return () => window.clearTimeout(safety);
    }

    /* No "have I played this already?" latch. Strict Mode runs this effect
       twice on mount, and a latch makes the second run bail — which is why an
       entrance guarded that way never plays under `next dev`. */
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onStart: show });

      /* The homepage's own entrance order: globe, then rings, then the type. */
      tl.fromTo(".db-globe-el", { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(".db-orbit", { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.9 }, "-=0.25")
        .fromTo("[data-story-label]", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6 }, 0.25)
        .fromTo("[data-story-mark]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
        .fromTo(".db-story-cue", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.3);


      // show the drag affordance once, then leave it to hover
      const hint = hintRef.current;
      if (hint) {
        gsap.delayedCall(1.6, () => hint.classList.add("is-shown"));
        gsap.delayedCall(5.8, () => hint.classList.remove("is-shown"));
      }

      gsap.to(".db-story-cue__ring svg", {
        y: 4,
        duration: 1.05,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* The backdrop parallaxes itself; this only has to carry the copy. */
      const scrub = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.45 },
      });

      scrub.to(".db-story-copy", { yPercent: -7, opacity: 0.25, ease: "none" }, 0);
      scrub.to(".db-story-cue-wrap", { opacity: 0, ease: "none" }, 0);

    }, el);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
      show(); // reverting inline styles must not re-hide the hero
    };
  }, [ready]);

  return (
    <section
      id="top"
      tabIndex={-1}
      ref={root}
      className="db-page-band db-page-band--full db-under-header flex flex-col"
    >
      <HeroAtmosphere />

      <div className="db-story-copy db-shell relative z-[2] flex flex-1 flex-col items-center justify-center pt-[clamp(20px,2.6vw,40px)] pb-[clamp(36px,4vw,64px)] text-center">
        <p data-story-label className="db-eyebrow-rule">
          <span aria-hidden="true" />
          About us
          <span aria-hidden="true" />
        </p>

        <h1
          data-story-label
          aria-label={`${SITE.name} — ${SITE.tagline}`}
          className="m-0 mt-[clamp(12px,1.4vw,22px)] font-normal text-center"
        >
          <Logo size="clamp(26px,4.6vw,66px)" />
        </h1>

        {/* The homepage's own lockup — globe inside its orbit, wordmark beneath —
            so the two heroes are recognisably the same place. The four feature
            cards that sit under it on the homepage are not part of this page. */}
        {/* The stage needs an explicit width: --orbit is min(96%, …) of it, and in
            this centred column the stage is shrink-to-fit, which collapsed the ring
            to barely wider than the globe. */}
        <div
          className="db-stage mt-9 w-full max-w-[clamp(300px,34vw,470px)] md:mt-[clamp(10px,1.2vw,22px)]"
          data-spin-scope
        >
          <div className="db-orbit">
            <OrbitRings />
          </div>

          <div className="db-lockup">
            <Globe
              className="db-globe-el"
              isHero
              interactive
              drive
              rings={15}
              density={25}
              spin={22}
              label={`${SITE.name} globe. Drag to spin it, press Enter for a pulse.`}
            />
            {/* Keep the anniversary figure beneath the brand lockup. */}
            <div
              data-story-mark
              className="font-display mt-1 text-[clamp(40px,5.4vw,92px)] leading-[0.88] tracking-[.01em] whitespace-nowrap text-white"
            >
              45<span className="text-db-red">+</span>
            </div>
            <div
              data-story-mark
              className="font-ui mt-1 block pl-[.52em] text-[clamp(10px,1.2vw,19px)] font-medium tracking-[.52em] text-white/85"
            >
              YEARS
            </div>
            <span ref={hintRef} className="db-globe-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 9L4 12l3 3M17 9l3 3-3 3M10.5 5.5 12 4l1.5 1.5M10.5 18.5 12 20l1.5-1.5" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              Drag to spin
            </span>
          </div>

          {/* the sweeping arcs under the lockup — they brighten with the globe's
              spin speed, which it publishes on [data-spin-scope] above */}
          <FloorRibbons />
        </div>
      </div>

      <div className="db-story-cue-wrap">
        <div className="db-shell">
          <a href="#origin" className="db-story-cue">
            <span className="db-story-cue__ring" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
            Read the story
          </a>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
