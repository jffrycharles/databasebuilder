"use client";

import { useEffect, useRef } from "react";
import Globe from "@/components/ui/Globe";
import CtaButton from "@/components/ui/CtaButton";
import NeonCard from "@/components/ui/NeonCard";
import { FloorRibbons, OrbitRings, WaveDivider } from "./HeroArt";
import { useAppReady } from "@/components/animations/AppShell";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";
import { HERO_CARDS, SITE } from "@/lib/data";

export default function Hero() {
  const ready = useAppReady();
  const root = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  /* Hold the hero only while the loader is still on screen — and never on a
     remount after it has landed. Adding the hold unconditionally was what left
     the heading, buttons and globe stuck at opacity 0 when navigating back to
     Home, because the entrance below would then decline to replay. */
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    if (ready) el.classList.remove("db-hero-hold");
    else el.classList.add("db-hero-hold");
  }, [ready]);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;

    // Whatever happens below, the hero ends up visible. An entrance that never
    // starts must not be able to hide the page's own content.
    const show = () => el.classList.remove("db-hero-hold");
    const safety = window.setTimeout(show, 1400);

    if (prefersReducedMotion() || played.current) {
      show();
      return () => window.clearTimeout(safety);
    }
    played.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: () => el.classList.remove("db-hero-hold"),
      });

      tl.fromTo(".db-globe-el", { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(".db-orbit", { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.9 }, "-=0.25")
        .fromTo(
          "[data-hero-reveal]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 },
          "-=0.6",
        )
        .fromTo(
          ".db-neon-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.45",
        )
        .fromTo(".db-floor", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.8");

      // show the drag affordance once, then leave it to hover
      const hint = hintRef.current;
      if (hint) {
        gsap.delayedCall(1.1, () => hint.classList.add("is-shown"));
        gsap.delayedCall(5.4, () => hint.classList.remove("is-shown"));
      }
    }, el);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
      show(); // reverting inline styles must not re-hide the hero
    };
  }, [ready]);

  return (
    <section id="top" tabIndex={-1} ref={root} className="db-hero-bg relative overflow-hidden">
      <div className="relative z-[5] mx-auto grid w-full max-w-[1640px] grow items-center gap-[clamp(34px,4vw,52px)] px-5 pt-[34px] pb-[56px] sm:px-7 lg:grid-cols-[42%_58%] lg:gap-5 lg:px-10 lg:pb-[104px]">
        {/* ---- pitch ---- */}
        <div>
          <h1
            data-hero-reveal
            className="font-display mb-[clamp(22px,3vw,40px)] text-[clamp(32px,3.62vw,62px)] leading-[1.05] tracking-[.005em] text-white"
          >
            A Productive CRM Doesn&apos;t
            <br />
            Need to Cost a Fortune
          </h1>
          <p
            data-hero-reveal
            className="font-body mb-[clamp(22px,3vw,40px)] text-[clamp(16px,1.65vw,27px)] leading-[1.42] font-light text-[#f2f5fb]"
          >
            A Simple Alternative to
            <br />
            your Overpriced CRM Software
          </p>
          <div data-hero-reveal>
            <CtaButton className="text-[clamp(18px,2.05vw,34px)]">Start 7-Day Free Trial</CtaButton>
          </div>
          <p
            data-hero-reveal
            className="font-ui border-db-cyan text-db-cyan mt-[clamp(22px,3vw,34px)] border-l-[3px] pl-4 text-[clamp(14px,1.35vw,22px)] font-light tracking-[.01em]"
          >
            No long-term commitment required
          </p>
        </div>

        {/* ---- stage: globe, rings and cards scale as one composition ---- */}
        {/* the ribbons read --db-spd from here, so the globe publishes it on
            this subtree rather than on <html> */}
        <div className="db-stage" data-spin-scope>
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
            <div
              data-hero-reveal
              className="font-display -mt-1.5 text-[clamp(28px,4.3vw,70px)] leading-none tracking-[-.005em] whitespace-nowrap text-white italic"
            >
              <em className="italic">Database</em>
              <em className="text-db-red italic">Builder</em>
            </div>
            <div
              data-hero-reveal
              className="font-ui mt-2.5 block pl-[.52em] text-[clamp(10px,1.45vw,24px)] font-medium tracking-[.52em] text-white"
            >
              SALES SOLUTION
            </div>
            <span ref={hintRef} className="db-globe-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 9L4 12l3 3M17 9l3 3-3 3M10.5 5.5 12 4l1.5 1.5M10.5 18.5 12 20l1.5-1.5" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
              Drag to spin
            </span>
          </div>

          <div className="relative z-[4] grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-[clamp(10px,1.5vw,26px)]">
            {HERO_CARDS.map((card) => (
              <NeonCard key={card.art} card={card} />
            ))}
          </div>

          <FloorRibbons />
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
