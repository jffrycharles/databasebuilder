import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LEADERS } from "@/lib/about";

/* Compact profiles retain the matching 3:4 portraits and align within each row. */
export default function Leadership() {
  return (
    <section
      id="leadership"
      className="db-leadership db-section db-section--airy relative"
    >
      <div className="db-shell db-leadership__shell relative z-[2]">
        <SectionHeading
          tone="dark"
          label="Leadership"
          align="center"
          display
          title={
            <>
              The people behind Database<span className="text-db-red">Builder</span>
            </>
          }
          lede="Between them, decades on the phone and in the data."
          className="mb-[clamp(32px,3vw,48px)]"
        />

        <div className="db-team-grid">
          {LEADERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70} className="h-full">
              <article className="db-team-card">
                <div className="db-team-card__photo">
                  {p.photo ? (
                    <Image
                      src={p.photo}
                      alt={`${p.name}, ${p.role}`}
                      fill
                      sizes="(min-width: 1200px) 340px, (min-width: 704px) 320px, (min-width: 640px) calc((100vw - 64px) / 2), (min-width: 360px) 320px, calc(100vw - 40px)"
                      className="object-cover object-center"
                    />
                  ) : (
                    <span className="text-ink-3 font-display absolute inset-0 grid place-items-center text-[clamp(30px,3vw,44px)]">
                      {p.initials}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-[18px]">
                  {/* Oswald, the "Leadership" eyebrow's face, in normal case.
                      Condensed, so a step larger than the 18px Roboto it
                      replaced to keep the same presence. */}
                  <h3 className="font-ui text-ink m-0 text-[21px] leading-tight font-medium tracking-[.01em]">
                    {p.name}
                  </h3>
                  <p className="db-team-card__role m-0 mt-2 text-[13px] leading-snug">
                    {p.role}
                  </p>

                  <span className="db-team-card__since mt-3 self-start">{p.since}</span>

                  <p className="text-ink-2 mt-3 min-h-[6.4em] flex-1 text-[14px] leading-[1.6]">
                    {p.summary}
                  </p>

                  <details className="db-more group mt-3">
                    <summary className="text-brand inline-flex cursor-pointer list-none items-center gap-1.5 text-[14px] font-semibold">
                      <span className="group-open:hidden">Read more</span>
                      <span className="hidden group-open:inline">Show less</span>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true">
                        <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <p className="text-ink-2 mt-4 text-[16px] leading-[1.65]">
                      {p.bio}
                    </p>
                    {p.quote && (
                      <blockquote className="border-db-red text-ink mt-4 border-l-2 pl-3.5 text-[16px] leading-[1.65] font-semibold">
                        {p.quote}
                      </blockquote>
                    )}
                  </details>

                  {/* email only — the client asked for phone numbers off the
                      site: listed numbers were being scraped and spam-called. */}
                  <div className="mt-auto pt-4">
                    <a
                      href={`mailto:${p.email}`}
                      className="db-team-btn"
                      aria-label={`Email ${p.name} at ${p.email}`}
                    >
                      <Icon name="mail" className="h-4 w-4" />
                      Email
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
