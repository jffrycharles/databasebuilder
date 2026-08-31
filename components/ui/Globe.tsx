"use client";

import { useEffect, useRef } from "react";
import { createSphere, type SphereOptions } from "@/lib/sphere";
import { registerHeroGlobe } from "@/lib/globe-handoff";

type Props = SphereOptions & {
  className?: string;
  /** register this instance as the hero globe the loader hands off to */
  isHero?: boolean;
};

export default function Globe({
  className,
  isHero = false,
  rings = 15,
  density = 25,
  spin = 22,
  fill = "#fff",
  interactive = false,
  drive = false,
  label,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sphere = createSphere(el, { rings, density, spin, fill, interactive, drive, label });
    const unregister = isHero ? registerHeroGlobe(el) : undefined;
    return () => {
      unregister?.();
      sphere.destroy();
    };
  }, [rings, density, spin, fill, interactive, drive, label, isHero]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden={interactive ? undefined : true}
      data-hero-globe={isHero ? "" : undefined}
    />
  );
}
