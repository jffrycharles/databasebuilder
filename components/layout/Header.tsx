"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SmartLink from "@/components/ui/SmartLink";
import Globe from "@/components/ui/Globe";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, SITE } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  /* sticky chrome: solid once you leave the top, out of the way going down,
     back the moment you scroll up */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      el.classList.toggle("is-stuck", y > 20);
      const soft = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!soft && el.dataset.navOpen !== "true") {
        if (y > last + 4 && y > 260) el.classList.add("is-hidden");
        else if (y < last - 4 || y < 120) el.classList.remove("is-hidden");
      }
      last = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  /* close the panel on outside click or Escape */
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1280px)");
    const onBreak = (e: MediaQueryListEvent) => e.matches && setOpen(false);

    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreak);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreak);
    };
  }, [open]);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={ref}
      className="db-header px-4 py-3 sm:px-10 sm:py-[18px]"
      data-nav-open={open ? "true" : "false"}
    >
      <div className="relative mx-auto flex max-w-[1640px] items-center gap-2 sm:gap-11">
        <SmartLink
          href="/"
          aria-label={`${SITE.name} home`}
          className="flex shrink-0 items-center gap-2 sm:gap-3.5"
        >
          <Globe
            className="hidden h-[42px] w-[42px] shrink-0 min-[360px]:block sm:h-[64px] sm:w-[64px]"
            rings={11}
            density={17}
            spin={26}
          />
          <Logo size={20} className="sm:hidden" />
          <Logo size={30} className="hidden sm:block" />
        </SmartLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[clamp(18px,1.7vw,38px)] xl:flex">
          {NAV_LINKS.map((l) => (
            <SmartLink
              key={l.label}
              href={l.href}
              aria-current={current(l.href) ? "page" : undefined}
              className="db-nav-link"
            >
              {l.label}
            </SmartLink>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="db-mobile-nav"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="-mr-2 ml-auto grid h-11 w-11 shrink-0 cursor-pointer place-items-center xl:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="db-burger block" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-4 sm:gap-[26px] xl:ml-auto">
          <a href={SITE.login} className="db-nav-link hidden sm:inline">
            Sign In
          </a>
          <a href={SITE.register} className="db-btn db-btn--primary db-btn--sm">
            Try Free
          </a>
        </div>
      </div>

      <nav id="db-mobile-nav" className="db-mobile-nav" aria-hidden={!open}>
        <div className="mx-auto flex w-full max-w-[1640px] flex-col px-4 pt-2 pb-5 sm:px-10">
          {NAV_LINKS.map((l) => (
            <SmartLink
              key={l.label}
              href={l.href}
              aria-current={current(l.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="db-mobile-link"
            >
              {l.label}
            </SmartLink>
          ))}
          <a href={SITE.login} className="db-mobile-link sm:hidden">
            Sign In
          </a>
        </div>
      </nav>
    </header>
  );
}
