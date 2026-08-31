"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { observeReveal } from "@/lib/reveal";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** ms — stagger siblings by hand when they should arrive in a set order */
  delay?: number;
  id?: string;
};

/** Fades and lifts its children in once they scroll into view. */
export default function Reveal({ children, as: Tag = "div", className = "", delay, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => observeReveal(ref.current), []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`db-anim ${className}`}
      data-reveal-delay={delay ? String(delay) : undefined}
    >
      {children}
    </Tag>
  );
}
