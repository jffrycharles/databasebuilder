"use client";

import { useRef } from "react";
import { gsap, useGsap } from "@/lib/gsap";

/* ---------------------------------------------------------------------------
   The inner-page hero background.

   This replaces the three full-bleed neon rails that used to sweep across
   every inner hero: at 18px of stroke they crossed the headline and the lede,
   and they were the loudest thing on a page whose job is to introduce type.

   What is here instead:
     · a faint measured grid, masked to the right of the composition
     · thin data paths — mostly elbowed routes, the way a network diagram is
       drawn, plus two long soft curves so it does not read as a circuit board
     · short light trails running the routes, blue one way and red the other
     · data points at the junctions, breathing very slowly
     · two soft radial pools, one blue low-right and one faint red top-right

   The whole paths layer is masked away from the left column, so the headline
   always sits on clean ground. Motion is a single entrance plus a slow scroll
   parallax; nothing loops fast enough to pull the eye off the words.
   --------------------------------------------------------------------------- */

/** Elbowed routes read as data flow; the two curves keep it from feeling technical. */
const ROUTES = [
  { d: "M596 118H872l64 64h304l56 56h124", hue: "blue", run: "db-run--1" },
  { d: "M704 296h316l60-60h268l52 52h60", hue: "blue", run: "db-run--f1" },
  { d: "M552 432h268l72 72h288l56-56h224", hue: "red", run: "db-run--3" },
  { d: "M980 640v-96l64-64h416", hue: "blue", run: null },
  { d: "M700 560C880 560 1010 486 1160 486s262 44 396 44", hue: "red", run: "db-run--2" },
  { d: "M840 40C1010 40 1096 150 1240 150s200-46 320-46", hue: "blue", run: null },
];

/** Junctions and free-floating points. Kept few — this is punctuation, not confetti. */
const NODES = [
  { x: 872, y: 118, r: 3 },
  { x: 936, y: 182, r: 2.2 },
  { x: 1240, y: 182, r: 3 },
  { x: 1020, y: 296, r: 3 },
  { x: 1080, y: 236, r: 2.2 },
  { x: 820, y: 432, r: 3 },
  { x: 892, y: 504, r: 2.2 },
  { x: 1180, y: 504, r: 3 },
  { x: 1044, y: 480, r: 2.2 },
  { x: 1160, y: 486, r: 2.6 },
  { x: 1348, y: 104, r: 1.8 },
  { x: 764, y: 236, r: 1.6 },
  { x: 1300, y: 372, r: 1.6 },
  { x: 960, y: 596, r: 1.6 },
];

export default function HeroField() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const scope = root.current;
    if (!scope) return;

    // paths draw themselves in, once
    gsap.fromTo(
      scope.querySelectorAll<SVGPathElement>("[data-route]"),
      { strokeDasharray: 1200, strokeDashoffset: 1200 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.09,
        delay: 0.15,
        clearProps: "strokeDasharray,strokeDashoffset",
      },
    );

    gsap.from(scope.querySelectorAll<SVGCircleElement>("[data-node]"), {
      opacity: 0,
      scale: 0,
      transformOrigin: "50% 50%",
      duration: 0.5,
      ease: "back.out(2)",
      stagger: 0.045,
      delay: 0.75,
    });

    // and then breathe, slowly and out of phase
    scope.querySelectorAll<SVGCircleElement>("[data-node]").forEach((dot, i) => {
      gsap.to(dot, {
        opacity: 0.28,
        duration: 2.6 + (i % 5) * 0.55,
        delay: 1.4 + i * 0.12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    // a little depth on scroll — restrained, and only while the band is in view
    gsap.to(scope, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: {
        trigger: scope.parentElement,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }, root);

  return (
    <div ref={root} className="db-heroart" aria-hidden="true">
      <span className="db-heroart__glow" />
      <span className="db-heroart__grid" />
      <svg
        className="db-heroart__paths"
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="dbRouteBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2e52ff" stopOpacity="0" />
            <stop offset="34%" stopColor="#5b83ff" stopOpacity=".75" />
            <stop offset="100%" stopColor="#8fb0ff" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id="dbRouteRed" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#e23324" stopOpacity="0" />
            <stop offset="38%" stopColor="#ff6a58" stopOpacity=".7" />
            <stop offset="100%" stopColor="#ffb0a4" stopOpacity=".16" />
          </linearGradient>
        </defs>

        {ROUTES.map((r, i) => {
          const stroke = r.hue === "red" ? "url(#dbRouteRed)" : "url(#dbRouteBlue)";
          const core = r.hue === "red" ? "#ffb9ac" : "#c7d9ff";
          return (
            <g key={i}>
              <path
                data-route
                d={r.d}
                stroke={stroke}
                strokeWidth="1.25"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {r.run && (
                <path
                  className={`db-run ${r.run}`}
                  d={r.d}
                  pathLength="100"
                  stroke={core}
                  strokeWidth="2"
                  strokeDasharray="3 97"
                  strokeLinecap="round"
                  opacity=".8"
                />
              )}
            </g>
          );
        })}

        {NODES.map((n, i) => (
          <circle
            key={i}
            data-node
            className="db-heroart__dot"
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i % 4 === 2 ? "#ff8b7a" : "#a9c4ff"}
            opacity={n.r > 2.4 ? 0.75 : 0.5}
          />
        ))}
      </svg>
    </div>
  );
}
