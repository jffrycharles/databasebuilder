import type { Metadata } from "next";
import Globe from "@/components/ui/Globe";
import HeroAtmosphere from "@/components/ui/HeroAtmosphere";
import { OrbitRings, WaveDivider } from "@/components/sections/HeroArt";
import SmartLink from "@/components/ui/SmartLink";
import { NAV_LINKS, SITE } from "@/lib/data";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page is not here. Find the product, pricing, FAQ and contact details for DatabaseBuilder.",
  robots: { index: false, follow: true },
};

/* Next's built-in 404 is an unstyled white page with no header, no footer and
   no way back. This puts the site's own globe at the centre, turning, with the
   number under it where the homepage puts its wordmark — so a mistyped URL
   still lands somewhere that looks like the site, and it lists where to go
   next rather than dead-ending. */
export default function NotFound() {
  return (
    <main>
      <section
        id="top"
        tabIndex={-1}
        className="db-page-band db-page-band--full db-under-header flex flex-col"
      >
        <HeroAtmosphere />

        <div className="db-shell relative z-[2] flex flex-1 flex-col items-center justify-center gap-[clamp(22px,2.4vw,38px)] py-[clamp(48px,5vw,84px)] text-center">
          <div className="db-404-stage">
            <div className="db-orbit">
              <OrbitRings />
            </div>

            <div className="db-lockup">
              <Globe
                className="db-globe-el"
                interactive
                rings={15}
                density={25}
                spin={16}
                label={`${SITE.name} globe. Drag to spin it.`}
              />
              <p className="db-404__figure">404</p>
            </div>
          </div>

          <h1 className="font-display m-0 max-w-[16ch] text-[clamp(28px,3.4vw,54px)] leading-[1.02] tracking-[.005em] text-balance text-white">
            That page is <span className="text-db-red">not here.</span>
          </h1>

          <p className="m-0 max-w-[52ch] text-[clamp(15px,1vw,18px)] leading-[1.65] text-white/70">
            It may have been renamed, or the link that brought you here may be out of date.
            Everything below is one click away.
          </p>

          <nav aria-label="Where to go next" className="flex flex-wrap justify-center gap-2.5">
            {NAV_LINKS.map((l) => (
              <SmartLink
                key={l.href}
                href={l.href}
                className="db-channel font-ui rounded-[11px] border border-white/14 bg-white/[0.04] px-[clamp(14px,1.2vw,20px)] py-[clamp(10px,0.9vw,14px)] text-[clamp(13.5px,0.92vw,15.5px)] font-medium tracking-[.055em] text-white"
              >
                {l.label}
              </SmartLink>
            ))}
          </nav>

          <p className="m-0 text-[13.5px] leading-relaxed text-white/45">
            Still stuck? Call{" "}{" "}
            or email{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-db-cyan font-semibold">
              {CONTACT.email}
            </a>
            .
          </p>
        </div>

        <WaveDivider />
      </section>
    </main>
  );
}
