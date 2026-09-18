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

  /* The chrome is fixed and transparent over the top of the page, so the
     opening band of every page has to reserve its exact height. Measuring it
     beats guessing: the bar is two different heights across the breakpoint,
     and the logo lockup decides it. */
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    /* The mobile panel is positioned out of flow, so this only ever measures
       the bar itself — opening the menu cannot inflate it. */
    const publish = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty("--db-header-h", `${h}px`);
    };

    const ro = new ResizeObserver(publish);
    ro.observe(el);
    publish();

    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--db-header-h");
    };
  }, []);

  /* transparent at the top, chrome once you leave it, out of the way going
     down, back the moment you scroll up */
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

  const navLink =
    "font-ui text-[clamp(15px,1.1vw,19px)] whitespace-nowrap text-white uppercase tracking-[.055em] transition-colors hover:text-db-red";

  return (
    <header
      ref={ref}
      className="db-header px-4 py-3 sm:px-10 sm:py-[18px]"
      data-nav-open={open ? "true" : "false"}
    >
      <div className="relative mx-auto flex max-w-[1640px] items-center gap-2 sm:gap-11">
        <SmartLink href="/" aria-label={`${SITE.name} home`} className="flex shrink-0 items-center gap-2 sm:gap-3.5">
          <Globe
            className="block h-[42px] w-[42px] shrink-0 sm:h-[64px] sm:w-[64px]"
            rings={11}
            density={17}
            spin={26}
          />
          <Logo size={20} className="sm:hidden" />
          <Logo size={30} className="hidden sm:block" />
        </SmartLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[clamp(16px,1.6vw,38px)] xl:flex">
          {NAV_LINKS.map((l) =>
            l.children ? (
              /* Hover opens it on a pointer; focus-within opens it from the
                 keyboard, so it is reachable without a mouse. */
              <div key={l.label} className="db-nav-group relative">
                <SmartLink
                  href={l.href}
                  aria-current={l.href === pathname ? "page" : undefined}
                  className={`${navLink} inline-flex items-center gap-1.5 ${l.href === pathname ? "text-db-red" : ""}`}
                >
                  {l.label}
                  <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                    <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </SmartLink>
                <div className="db-nav-menu">
                  {l.children.map((c) => (
                    <SmartLink key={c.label} href={c.href} className="db-nav-menu__item">
                      {c.label}
                    </SmartLink>
                  ))}
                </div>
              </div>
            ) : (
              <SmartLink
                key={l.label}
                href={l.href}
                aria-current={l.href === pathname ? "page" : undefined}
                className={`${navLink} ${l.href === pathname ? "text-db-red" : ""}`}
              >
                {l.label}
              </SmartLink>
            ),
          )}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="db-mobile-nav"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="ml-auto cursor-pointer p-1.5 xl:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="db-burger block" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-[26px] xl:ml-auto">
          <a href={SITE.login} className={`hidden sm:inline ${navLink}`}>
            Sign In
          </a>
          <a
            href={SITE.register}
            className="font-ui bg-db-red hover:bg-db-red-hot rounded-[5px] px-3 py-2 text-[14px] font-medium tracking-[.055em] text-white uppercase transition hover:-translate-y-px"
          >
            Try Free
          </a>
        </div>
      </div>

      <nav id="db-mobile-nav" className="db-mobile-nav" aria-hidden={!open}>
        <div className="mx-auto flex w-full max-w-[1640px] flex-col gap-1 px-4 pt-3 pb-5 sm:px-10">
          {NAV_LINKS.map((l) => (
            <div key={l.label}>
              <SmartLink
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-ui flex items-center gap-2 py-2 text-[19px] tracking-[.055em] text-white uppercase"
              >
                {l.label}
                {/* the same chevron the desktop nav uses, so a parent item
                    looks like a parent item on a phone too */}
                {l.children && (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white/55" aria-hidden="true">
                    <path
                      d="M6 9.5l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </SmartLink>
              {l.children?.map((c) => (
                <SmartLink
                  key={c.label}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="font-ui block py-1.5 pl-5 text-[16px] tracking-[.055em] text-white/65 uppercase"
                >
                  {c.label}
                </SmartLink>
              ))}
            </div>
          ))}
          <a
            href={SITE.login}
            className="font-ui py-2 text-[19px] tracking-[.055em] text-white uppercase sm:hidden"
          >
            Sign In
          </a>
        </div>
      </nav>
    </header>
  );
}
