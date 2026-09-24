"use client";

import { useRef } from "react";
import SmartLink from "@/components/ui/SmartLink";
import HeroAtmosphere from "@/components/ui/HeroAtmosphere";
import { WaveDivider } from "@/components/sections/HeroArt";
import { EASE, gsap, onPageReady, SplitText, useIsoLayoutEffect } from "@/lib/gsap";
/* A type import only: importing the module itself would pull the full text
   of both documents into the browser bundle. */
import type { LegalHeroProps } from "@/lib/legal";

/**
 * The opener for /privacy and /terms. The FAQ's half-height band, because a
 * legal page is looked up rather than browsed, with the two things a reader
 * checks before anything else — how current it is, and how long it is — and
 * a switch to the other document.
 *
 * The headline is split by SplitText rather than by hand: the two titles are
 * different lengths and "Terms & Conditions" wraps on a phone, so the words
 * are measured in the browser. The split keeps an aria-label on the heading
 * and hides the pieces, so it still reads as one phrase.
 */
export default function LegalHero({ path, title, lede, updated, updatedLabel, minutes, links }: LegalHeroProps) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    /* matchMedia rather than a one-off check: switch reduced motion on while
       the page is open and everything below is reverted on the spot. With it
       on from the start, none of it runs and the opener is simply there. */
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      (ctx) => {
        // Nothing shows while the loader is still on screen.
        el.classList.add("db-legal-hold");

        /* A named method, so it runs later — when the page is handed over —
           but everything it creates still belongs to this context and is
           reverted with it. */
        const play = ctx.add("play", () => {
          /* The hold comes off first, in the same task: GSAP reads the current
             transform as a tween's starting point, and a hold still in place
             would become a permanent offset. */
          el.classList.remove("db-legal-hold");

          const title = el.querySelector<HTMLElement>("[data-legal-title]");
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.addLabel("label")
            .fromTo("[data-legal-label]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, "label")
            /* the rules draw outward from the word */
            .fromTo(
              "[data-legal-rule]",
              { clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)") },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: EASE },
              "label+=0.05",
            )
            .addLabel("title", "label+=0.1");

          if (title) {
            const split = SplitText.create(title, {
              type: "words",
              mask: "words",
              tag: "span",
              wordsClass: "db-rword",
            });
            tl.from(split.words, { yPercent: 118, duration: 0.9, stagger: 0.08, ease: "power4.out" }, "title");
          }

          tl.addLabel("details", "title+=0.38").fromTo(
            "[data-legal-fade]",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
            "details",
          );
        });

        const cancel = onPageReady(play as () => void);
        return () => {
          cancel();
          el.classList.remove("db-legal-hold");
        };
      },
      el,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      tabIndex={-1}
      ref={root}
      className="db-legal-hero db-page-band db-page-band--half db-under-header flex flex-col"
    >
      <HeroAtmosphere />

      <div className="db-shell relative z-[2] flex flex-1 flex-col items-center justify-center pt-[clamp(24px,3vw,44px)] pb-[clamp(30px,3.4vw,54px)] text-center">
        <p data-legal-label className="db-eyebrow-rule">
          <span aria-hidden="true" data-legal-rule />
          Legal
          <span aria-hidden="true" data-legal-rule />
        </p>

        <h1
          data-legal-title
          className="font-display m-0 mt-[clamp(18px,1.7vw,28px)] text-[clamp(40px,4.6vw,72px)] leading-[1.02] tracking-[.02em] text-white"
        >
          {title[0]} <span className="text-db-red">{title[1]}</span>
        </h1>

        <p
          data-legal-fade
          className="mt-[clamp(16px,1.4vw,24px)] mb-0 max-w-[54ch] text-[clamp(15px,1vw,18px)] leading-[1.62] text-balance text-white/70"
        >
          {lede}
        </p>

        <p data-legal-fade className="db-legal-hero__meta">
          <span>
            Last updated <time dateTime={updated}>{updatedLabel}</time>
          </span>
          <span aria-hidden="true" className="db-legal-hero__dot" />
          <span>{minutes} min read</span>
        </p>

        <nav data-legal-fade aria-label="Legal documents" className="db-legal-switch">
          {links.map((d) => (
            <SmartLink
              key={d.path}
              href={d.path}
              aria-current={d.path === path ? "page" : undefined}
              className="db-legal-switch__item"
            >
              {d.name}
            </SmartLink>
          ))}
        </nav>
      </div>

      <WaveDivider />
    </section>
  );
}
