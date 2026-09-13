"use client";

import { useEffect, useRef } from "react";
import Globe from "@/components/ui/Globe";
import Label from "@/components/ui/Label";
import { OrbitRings, WaveDivider } from "@/components/sections/HeroArt";
import HeroAtmosphere from "@/components/ui/HeroAtmosphere";
import { useAppReady } from "@/components/animations/AppShell";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";
import { ABOUT } from "@/lib/about";
import { SITE } from "@/lib/data";

/* Split so each word can rise out of a mask of its own. The last one carries
   the accent, the way the homepage headline does. */
const HEADLINE = ["Sales", "software,", "designed", "by", "salespeople"];

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
  const num = useRef<HTMLSpanElement>(null);
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
        /* the words climb out of their masks, one after another */
        .fromTo(
          ".db-word > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, stagger: 0.075, ease: "power4.out" },
          0.35,
        )
        .fromTo("[data-story-lede]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75 }, 0.72)
        .fromTo("[data-story-mark]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
        .fromTo(".db-story-cue", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.3);

      const counter = num.current;
      if (counter) {
        // the mark is still faded out here, so this never reads as a flicker
        counter.textContent = "0";
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: 45,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(obj.v));
            },
          },
          0.9,
        );
      }

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
      if (num.current) num.current.textContent = "45";
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

      <div className="db-story-copy db-shell relative z-[2] grid flex-1 content-center items-center gap-[clamp(28px,3.4vw,56px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,6vw,96px)] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)]">
        <div>
          <div data-story-label>
            <Label tone="dark" className="mb-5">
              Our Story
            </Label>
          </div>

          <h1 className="font-display m-0 max-w-[16ch] text-[clamp(32px,3.95vw,62px)] leading-[1.0] tracking-[.005em] text-white uppercase">
            {HEADLINE.map((word, i) => (
              <span key={word} className="db-word">
                <span className={i === HEADLINE.length - 1 ? "text-db-red-hot" : undefined}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-story-lede
            className="mt-5 max-w-[58ch] text-[clamp(15.5px,1.05vw,19px)] leading-[1.65] text-white/70"
          >
            {ABOUT.standfirst}
          </p>
        </div>

        {/* The homepage's lockup, with the years in place of the wordmark. */}
        <div className="db-story-stage">
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
            <p data-story-mark className="db-years__figure">
              <span ref={num}>45</span>
              <em>yrs</em>
            </p>
            <span ref={hintRef} className="db-globe-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 9L4 12l3 3M17 9l3 3-3 3M10.5 5.5 12 4l1.5 1.5M10.5 18.5 12 20l1.5-1.5" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              Drag to spin
            </span>
          </div>

          <p data-story-mark className="db-years__label">
            of selling behind the product — most of it before CRMs existed
          </p>
        </div>
      </div>

      {/* Reaches the light page below, which is where the story actually
          starts — and gives the bottom of the hero something to do. */}
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
