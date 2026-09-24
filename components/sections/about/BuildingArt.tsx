"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";

/**
 * The storefront render that opens the story, shot like drone footage.
 *
 * The same treatment as the /faq hero photograph: as it comes into view the
 * picture settles from slightly close to rest at 1.08, then keeps moving — a
 * very slow push in and a small pan, back and forth on a long sine, so the
 * still render reads as a camera holding on the building. As you scroll past,
 * it drifts a little against the page.
 *
 * Nothing is drawn on top and the picture is never hidden; it only ever moves
 * inside its frame. The 1.08 rest leaves 4% of overscan on every edge, which
 * is what the pan and the drift spend, so no edge is ever uncovered. Under
 * prefers-reduced-motion useGsap never builds and it is a still picture.
 */
export default function BuildingArt() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      const frame = root.current;
      const drift = frame?.querySelector<HTMLElement>(".db-building__drift");
      const img = frame?.querySelector<HTMLElement>(".db-building__img");
      if (!frame || !drift || !img) return;

      /* The camera move. Moving on screen, not arriving, so an in-and-out
         curve; 16s a leg so it is felt rather than watched. Held until the
         settle has finished, and paused whenever the picture is off screen. */
      const camera = gsap.to(img, {
        scale: 1.13,
        xPercent: 1.6,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });
      let settled = false;
      const onScreen = ScrollTrigger.create({
        trigger: frame,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (!settled) return;
          if (self.isActive) camera.play();
          else camera.pause();
        },
      });

      /* The settle: from slightly close to its resting 1.08, on a long
         ease-out so it lands softly rather than stopping. */
      gsap.fromTo(
        img,
        { scale: 1.16 },
        {
          scale: 1.08,
          duration: 2.6,
          ease: "power2.out",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
          onComplete: () => {
            settled = true;
            if (onScreen.isActive) camera.play();
          },
        },
      );

      /* Scroll drift on its own layer, so it never fights the camera move.
         3% against 4% of overscan. */
      gsap.fromTo(
        drift,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <div ref={root} className="db-building mx-auto w-full max-w-[1180px]">
      <div className="db-building__drift">
        <Image
          src="/about/building.png"
          alt="Building exterior with DatabaseBuilder Sales Solution and RAI Media signage"
          width={2058}
          height={764}
          sizes="(min-width: 1280px) 1180px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 32px)"
          className="db-building__img block h-auto w-full"
        />
      </div>
    </div>
  );
}
