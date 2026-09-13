import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LEADERS } from "@/lib/about";

/* Four across on wide screens, two on tablets, one on phones. The portrait
   frame is a fixed square so every card lines up whatever the source image is;
   `object-cover` with a top-weighted position crops the sides, never the head.
   Where a photograph is missing the monogram fills the same frame, so the row
   never collapses.

   The four photographs were shot against four different backdrops — two greys,
   a beige and a tan — which made the row look like four unrelated pictures.
   `.db-portrait` pulls the saturation back a touch so they read as one set.

   Tenure sits on the photograph rather than in the body copy: it is the one
   fact a leadership card is really answering, and putting it there keeps the
   text block to name, role and summary. */
export default function Leadership() {
  return (
    <section id="leadership" className="db-section db-section--airy bg-page">
      <div className="db-shell">
        <SectionHeading
          label="Leadership"
          align="center"
          display
          title={
            <>
              The people behind <span className="text-db-red">DatabaseBuilder</span>
            </>
          }
          lede="Between them, decades on the phone and in the data. Their direct lines are listed because that is the standard we hold support to."
          className="mb-[clamp(40px,4.6vw,76px)]"
        />

        <div className="grid gap-[clamp(20px,2vw,32px)] sm:grid-cols-2 xl:grid-cols-4">
          {LEADERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <article className="db-card-flat db-leader flex h-full flex-col overflow-hidden">
                <div className="db-portrait">
                  {p.photo ? (
                    <Image
                      src={p.photo}
                      alt={`${p.name}, ${p.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-[50%_28%]"
                    />
                  ) : (
                    <span className="db-mono db-mono--flush absolute inset-0 text-[clamp(28px,3vw,40px)]">
                      <span>{p.initials}</span>
                    </span>
                  )}
                  <span className="db-leader__since">{p.since}</span>
                </div>

                <div className="flex flex-1 flex-col p-[clamp(16px,1.5vw,22px)]">
                  <h3 className="font-body text-ink m-0 text-[clamp(16.5px,1.15vw,19px)] leading-tight font-bold">
                    {p.name}
                  </h3>
                  <p className="text-brand m-0 mt-1.5 min-h-[2.6em] text-[clamp(13px,0.85vw,14.5px)] leading-snug font-semibold">
                    {p.role}
                  </p>

                  <p className="text-ink-2 mt-3 min-h-[4.8em] text-[clamp(13.5px,0.86vw,15px)] leading-[1.6]">
                    {p.summary}
                  </p>

                  <details className="db-more group mt-2">
                    <summary className="text-brand inline-flex cursor-pointer list-none items-center gap-1.5 text-[13.5px] font-semibold">
                      <span className="group-open:hidden">Read more</span>
                      <span className="hidden group-open:inline">Show less</span>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true">
                        <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <p className="text-ink-2 mt-2 text-[clamp(13.5px,0.86vw,15px)] leading-[1.6]">
                      {p.bio}
                    </p>
                    {p.quote && (
                      <blockquote className="border-db-red text-ink mt-3.5 border-l-2 pl-3.5 text-[clamp(13.5px,0.86vw,15px)] leading-[1.55] font-semibold">
                        {p.quote}
                      </blockquote>
                    )}
                  </details>

                  <div className="border-line mt-auto grid gap-1.5 border-t pt-3.5 text-[13.5px]">
                    <a
                      href={`tel:${p.phone.replace(/\D/g, "")}`}
                      className="text-ink-2 hover:text-brand inline-flex items-center gap-2 transition-colors"
                    >
                      <Icon name="phone" className="text-brand h-4 w-4 shrink-0" />
                      {p.phone}
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="text-ink-2 hover:text-brand inline-flex min-w-0 items-center gap-2 transition-colors"
                    >
                      <Icon name="mail" className="text-brand h-4 w-4 shrink-0" />
                      <span className="truncate">{p.email}</span>
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
