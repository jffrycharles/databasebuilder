"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Window from "@/components/features/Window";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useGsap, useIsoLayoutEffect } from "@/lib/gsap";

/* The three real screens. Order is the carousel ring: screen 0 starts in
   front, the next one on the right, the one after on the left. */
const SCREENS = [
  {
    label: "Company database",
    short: "Database",
    src: "/features/company-db.png",
    alt: "The Company-DB lead grid: 17,405 records with tabs, filters, and columns for last called, total spent, total orders and rating.",
    width: 1920,
    height: 958,
    bob: 0.6,
  },
  {
    label: "Team management",
    short: "Team",
    src: "/features/manage-users.png",
    alt: "Manage Users, with company credits, dialer minutes and the team list.",
    width: 1407,
    height: 971,
    bob: -1.4,
  },
  {
    label: "Lead screen",
    short: "Lead screen",
    src: "/dashboard.webp",
    alt: "The lead screen with the dialer, the lead record and talking points.",
    width: 1550,
    height: 823,
    bob: 1.6,
  },
];

type Slot = "front" | "right" | "left";
const slotOf = (i: number, front: number): Slot =>
  (["front", "right", "left"] as const)[(i - front + SCREENS.length) % SCREENS.length];

/* Resting geometry of each slot, as a fraction of the stack's width S.
   Must match the [data-slot] rules in globals.css (which say the same thing
   in cqw): the back screens are 46/80 of the front one, pinned to the
   visual's top corners. */
const GEOMETRY: Record<Slot, { x: number; y: number; scale: number }> = {
  front: { x: 0, y: 0, scale: 1 },
  left: { x: -0.125, y: -0.075, scale: 0.575 },
  right: { x: 0.55, y: -0.075, scale: 0.575 },
};

/* Pointer parallax per unit of depth, and each slot's depth: the front
   screen moves with the pointer, the screens behind against it. */
const DEPTH: Record<Slot, number> = { front: 1, left: -1.5, right: -1.2 };
const TRAVEL_X = 10;
const TRAVEL_Y = 6;
const TILT_Y = 1.2;
const TILT_X = 0.8;

/**
 * The hero's product visual — one main screen with two behind it — and the
 * three swap places: click a screen behind to bring it forward (click the
 * front one for the next), swipe or drag left/right, or use the buttons
 * underneath. The Top Pick / Best Choice seal stays on the front corner.
 *
 * Each screen is its own element, and each motion owns its own level, so no
 * two tweens ever write the same transform:
 *
 *   .db-hv__screen   its slot: position, scale, stacking   (switching)
 *     .db-hv__depth  pointer parallax, idle float, hover   (ambient)
 *       .db-win      entrance
 *
 * Resting slots are pure CSS ([data-slot], in cqw), so they stay exact at
 * any width; GSAP only drives the move between two slots and then hands
 * back to the CSS. Switching works under prefers-reduced-motion too — the
 * screens swap instantly, and the ambient motion never starts.
 */
export default function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);
  /* where each screen was, on screen, the moment a switch was asked for */
  const from = useRef<{ m: DOMMatrix; slot: Slot }[] | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const reapply = useRef<() => void>(() => {});

  const screens = () => gsap.utils.toArray<HTMLElement>(".db-hv__screen", root.current);

  const go = useCallback(
    (next: number) => {
      const target = (next + SCREENS.length) % SCREENS.length;
      if (target === front) return;
      from.current = screens().map((el, i) => ({
        m: new DOMMatrix(getComputedStyle(el).transform),
        slot: slotOf(i, front),
      }));
      setFront(target);
    },
    [front],
  );

  /* After React has moved the [data-slot] attributes: animate each screen
     from where it actually was to its new slot, then give it back to CSS. */
  useIsoLayoutEffect(() => {
    const was = from.current;
    const stack = root.current?.querySelector<HTMLElement>(".db-hv__stack");
    if (!was || !stack) return;
    from.current = null;
    const S = stack.clientWidth;
    const reduce = prefersReducedMotion();

    screens().forEach((el, i) => {
      const slot = slotOf(i, front);
      const g = GEOMETRY[slot];
      gsap.killTweensOf(el);
      if (reduce) {
        gsap.set(el, { clearProps: "transform,zIndex" });
        return;
      }
      /* the incoming front passes over everything; a screen wrapping from
         one side to the other passes under everything */
      const wrap = (was[i].slot === "left" && slot === "right") || (was[i].slot === "right" && slot === "left");
      gsap.fromTo(
        el,
        { x: was[i].m.m41, y: was[i].m.m42, scale: was[i].m.a, zIndex: slot === "front" ? 3 : wrap ? 0 : 1 },
        {
          x: g.x * S,
          y: g.y * S,
          scale: g.scale,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => gsap.set(el, { clearProps: "transform,zIndex" }),
        },
      );
    });
    /* a screen that has just gone back must not keep its hover lift */
    gsap.to(gsap.utils.toArray(".db-hv__depth", root.current), { scale: 1, duration: 0.4, overwrite: "auto" });
    reapply.current();
  }, [front]);

  /* swipe or drag: a mostly-horizontal move of 40px or more */
  const onPointerDown = (e: ReactPointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      swiped.current = true;
      go(front + (dx < 0 ? 1 : -1));
    }
  };
  const onScreenClick = (i: number) => {
    if (swiped.current) return;
    go(i === front ? front + 1 : i);
  };

  /* ---- ambient motion: entrance, idle float, pointer parallax, hover ---- */
  useGsap(
    () => {
      const el = root.current;
      const hero = el?.closest<HTMLElement>(".db-fx-hero");
      if (!el || !hero) return;
      const q = gsap.utils.selector(el);
      const done = { clearProps: "transform,opacity,visibility" };

      /* entrance: the front window rises in, the two behind slide out
         from under it, the seal lands last */
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      q(".db-hv__screen").forEach((screen, i) => {
        const win = screen.querySelector(".db-win");
        const slot = slotOf(i, 0);
        if (!win) return;
        if (slot === "front") tl.fromTo(win, { autoAlpha: 0, y: 56 }, { autoAlpha: 1, y: 0, duration: 1.3, ...done }, 0.3);
        else tl.fromTo(win, { autoAlpha: 0, x: slot === "left" ? 90 : -90 }, { autoAlpha: 1, x: 0, duration: 1.3, ...done }, 0.7);
      });
      const seal = q(".db-award img")[0];
      if (seal) tl.fromTo(seal, { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 1, scale: 1, duration: 0.8, ...done }, 1.15);

      /* idle float: yPercent, so it composes with the pointer's x/y */
      const layers = gsap.utils.toArray<HTMLElement>("[data-bob]", el);
      const floats = layers.map((layer, i) =>
        gsap.to(layer, {
          yPercent: Number(layer.dataset.bob) || 0,
          duration: 4.6 + i * 1.15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          paused: true,
        }),
      );
      ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => floats.forEach((t) => (self.isActive ? t.play() : t.pause())),
      });

      /* pointer parallax and hover: desktop, with a real pointer only */
      const media = gsap.matchMedia();
      media.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        let nx = 0;
        let ny = 0;
        const movers = layers.map((layer) => {
          const depth = () => Number(layer.dataset.depth) || 0;
          const opts = { duration: 1.25 - Math.min(Math.abs(depth()), 2) * 0.15, ease: "power3.out" };
          gsap.set(layer, { transformPerspective: 1100 });
          const toX = gsap.quickTo(layer, "x", opts);
          const toY = gsap.quickTo(layer, "y", opts);
          const toRY = gsap.quickTo(layer, "rotationY", opts);
          const toRX = gsap.quickTo(layer, "rotationX", opts);
          return () => {
            const d = depth();
            toX(nx * d * TRAVEL_X);
            toY(ny * d * TRAVEL_Y);
            toRY(nx * d * TILT_Y);
            toRX(-ny * d * TILT_X);
          };
        });
        const apply = () => movers.forEach((move) => move());
        reapply.current = apply;

        const clamp = gsap.utils.clamp(-1, 1);
        const onMove = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const r = el.getBoundingClientRect();
          nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
          ny = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2));
          apply();
        };
        const onLeave = () => {
          nx = 0;
          ny = 0;
          apply();
        };

        /* hover lift on a screen behind (scale: nothing else writes it) */
        const hovered = gsap.utils.toArray<HTMLElement>("[data-hover]", el);
        const handlers = hovered.map((layer) => {
          const isSeal = layer.classList.contains("db-award");
          const enter = () => {
            const back = isSeal || layer.closest<HTMLElement>(".db-hv__screen")?.dataset.slot !== "front";
            if (back) gsap.to(layer, { scale: isSeal ? 1.06 : 1.025, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          };
          const leave = () => {
            gsap.to(layer, { scale: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" });
          };
          layer.addEventListener("pointerenter", enter);
          layer.addEventListener("pointerleave", leave);
          return { layer, enter, leave };
        });

        hero.addEventListener("pointermove", onMove, { passive: true });
        hero.addEventListener("pointerleave", onLeave);
        return () => {
          reapply.current = () => {};
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
          handlers.forEach(({ layer, enter, leave }) => {
            layer.removeEventListener("pointerenter", enter);
            layer.removeEventListener("pointerleave", leave);
          });
          gsap.killTweensOf(hovered, "scale");
          gsap.set(hovered, { scale: 1 });
        };
      });
    },
    root,
    [],
    { afterReady: true },
  );

  return (
    <div className="db-hv-wrap">
      <div
        ref={root}
        className="db-hv"
        role="group"
        aria-roledescription="carousel"
        aria-label="DatabaseBuilder product screens"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipe.current = null)}
      >
        <div className="db-hv__stack">
          {SCREENS.map((s, i) => {
            const slot = slotOf(i, front);
            return (
              <div
                key={s.src}
                className="db-hv__screen"
                data-slot={slot}
                aria-hidden={slot !== "front"}
                onClick={() => onScreenClick(i)}
              >
                <div className="db-hv__depth" data-depth={DEPTH[slot]} data-bob={s.bob} data-hover>
                  <Window
                    tone="dark"
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    url="app.databasebuilder.com"
                    ratio="2 / 1"
                    priority={i === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {/* the seal sits over the right-hand screen's corner, so a click on it
            does what a click on that corner would: bring the next screen in */}
        <div className="db-award" data-depth="2" data-bob="-3" data-hover onClick={() => !swiped.current && go(front + 1)}>
          <Image src="/features/best-choice-seal.png" alt="Top Pick — Best Choice Sales Software award" width={224} height={188} />
        </div>
      </div>

      {/* plain buttons: the keyboard way in, and a label for what is showing */}
      <div className="db-hv-tabs" role="group" aria-label="Choose a screen">
        {SCREENS.map((s, i) => (
          <button key={s.src} type="button" aria-pressed={i === front} aria-label={s.label} onClick={() => go(i)}>
            {s.short}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {SCREENS[front].label}
      </p>
    </div>
  );
}
