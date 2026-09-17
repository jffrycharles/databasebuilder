import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LEADERS } from "@/lib/about";

/* Four across on wide screens, two on tablets, one on phones, on the same dark
   band the timeline uses.

   The portraits are circular, and that is load-bearing rather than a style
   choice: all four were shot on different pale backdrops, so cropped square
   onto a dark card each one arrived as a bright rectangle with a hard seam
   along its edge. A circle has no edge to catch. Where a photograph is missing
   the monogram fills the same disc, so the row never collapses.

   The grid is `items-start` so that opening one card's biography grows only
   that card. Stretching every cell to the tallest is what left three of the
   four with a hole in the middle of them. */
export default function Leadership() {
  return (
    <section
      id="leadership"
      className="db-page-band db-section db-section--airy relative"
    >
      <div className="db-shell relative z-[2]">
        <SectionHeading
          tone="dark"
          label="Leadership"
          align="center"
          display
          title={
            <>
              {/* White/Red: the wordmark rule on this dark band. It used to run
                  the whole word red, which is the one thing the rule does not
                  do — "Database" carries the surface, "Builder" is the red. */}
              The people behind Database<span className="text-db-red">Builder</span>
            </>
          }
          lede="Between them, decades on the phone and in the data."
          className="mb-[clamp(40px,4.6vw,76px)]"
        />

        <div className="grid items-start gap-[clamp(18px,1.8vw,28px)] sm:grid-cols-2 xl:grid-cols-4">
          {LEADERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <article className="db-team-card flex h-full flex-col p-[clamp(22px,2.2vw,32px)] text-center">
                <div className="db-team-card__avatar">
                  {p.photo ? (
                    <Image
                      src={p.photo}
                      alt={`${p.name}, ${p.role}`}
                      fill
                      sizes="(max-width: 640px) 136px, 10vw"
                      className="object-cover object-[50%_22%]"
                    />
                  ) : (
                    <span className="db-mono db-mono--flush absolute inset-0 text-[clamp(24px,2.4vw,34px)]">
                      <span>{p.initials}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-body m-0 mt-[clamp(18px,1.7vw,26px)] text-[clamp(18px,1.35vw,23px)] leading-tight font-bold tracking-[-.012em] text-white">
                  {p.name}
                </h3>
                <p className="m-0 mt-2 min-h-[2.75em] text-[clamp(13px,0.86vw,14.5px)] leading-snug text-white/55">
                  {p.role}
                </p>

                <span className="db-team-card__since mx-auto mt-3.5">{p.since}</span>

                <p className="mt-5 min-h-[5em] text-[clamp(13.5px,0.86vw,15px)] leading-[1.65] text-white/65">
                  {p.summary}
                </p>

                <details className="db-more group mt-2">
                  <summary className="text-db-cyan mx-auto inline-flex cursor-pointer list-none items-center gap-1.5 text-[13.5px] font-semibold">
                    <span className="group-open:hidden">Read more</span>
                    <span className="hidden group-open:inline">Show less</span>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true">
                      <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-left text-[clamp(13.5px,0.86vw,15px)] leading-[1.65] text-white/60">
                    {p.bio}
                  </p>
                  {p.quote && (
                    <blockquote className="border-db-red mt-3.5 border-l-2 pl-3.5 text-left text-[clamp(13.5px,0.86vw,15px)] leading-[1.55] font-semibold text-white">
                      {p.quote}
                    </blockquote>
                  )}
                </details>

                {/* email only — the client asked for phone numbers off the
                    site: listed numbers were being scraped and spam-called. */}
                <div className="mt-auto flex justify-center pt-[clamp(20px,2vw,28px)]">
                  <a
                    href={`mailto:${p.email}`}
                    className="db-team-btn"
                    aria-label={`Email ${p.name} at ${p.email}`}
                  >
                    <Icon name="mail" className="h-[17px] w-[17px]" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
