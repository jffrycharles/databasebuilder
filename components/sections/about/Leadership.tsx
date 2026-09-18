import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LEADERS } from "@/lib/about";

/* Four across on wide screens, two on tablets, one on phones, on the black
   band the timeline hands over to.

   White cards, rectangular portraits. Adam asked for both, and the reason is
   sound: every headshot was shot on pale grey, so the previous dark card put a
   grey rectangle inside a near-black one on a black band. Nothing separated
   the three. A white card gives the photograph an edge to stop at, and the
   section keeps the black he wanted.

   The crops are normalised to his own photo — same head height, same eyeline
   — so the four faces read as one row rather than four different zooms.

   The grid is `items-start` so opening one biography grows only that card.
   Stretching every cell to the tallest is what left three of the four with a
   hole in the middle of them. */
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
              The people behind Database<span className="text-db-red">Builder</span>
            </>
          }
          lede="Between them, decades on the phone and in the data."
          className="mb-[clamp(40px,4.6vw,76px)]"
        />

        {/* Capped well inside the shell. At the full 1560 the four cards run to
            ~340px each and a 4:5 portrait becomes a 425px-tall photograph —
            Adam's note was "they do not have to large images". */}
        <div className="mx-auto grid max-w-[960px] items-start gap-[clamp(14px,1.3vw,22px)] sm:grid-cols-2 xl:grid-cols-4">
          {LEADERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <article className="db-team-card h-full">
                <div className="db-team-card__photo">
                  {p.photo ? (
                    <Image
                      src={p.photo}
                      alt={`${p.name}, ${p.role}`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 23vw"
                      className="object-cover object-[50%_30%]"
                    />
                  ) : (
                    <span className="text-ink-3 font-display absolute inset-0 grid place-items-center text-[clamp(30px,3vw,44px)]">
                      {p.initials}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-[clamp(14px,1.2vw,18px)]">
                  <h3 className="font-body text-ink m-0 text-[clamp(17px,1.25vw,20px)] leading-tight font-bold tracking-[-.012em]">
                    {p.name}
                  </h3>
                  <p className="text-ink-3 m-0 mt-1 text-[clamp(12.5px,0.84vw,14px)] leading-snug">
                    {p.role}
                  </p>

                  <span className="db-team-card__since mt-3 self-start">{p.since}</span>

                  <p className="text-ink-2 mt-3 min-h-[4.4em] text-[clamp(12.5px,0.82vw,14px)] leading-[1.6]">
                    {p.summary}
                  </p>

                  <details className="db-more group mt-1.5">
                    <summary className="text-brand inline-flex cursor-pointer list-none items-center gap-1.5 text-[13px] font-semibold">
                      <span className="group-open:hidden">Read more</span>
                      <span className="hidden group-open:inline">Show less</span>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true">
                        <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <p className="text-ink-2 mt-2.5 text-[clamp(13px,0.85vw,14.5px)] leading-[1.6]">
                      {p.bio}
                    </p>
                    {p.quote && (
                      <blockquote className="border-db-red text-ink mt-3 border-l-2 pl-3.5 text-[clamp(13px,0.85vw,14.5px)] leading-[1.5] font-semibold">
                        {p.quote}
                      </blockquote>
                    )}
                  </details>

                  {/* email only — the client asked for phone numbers off the
                      site: listed numbers were being scraped and spam-called. */}
                  <div className="mt-auto pt-[clamp(12px,1.1vw,16px)]">
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
