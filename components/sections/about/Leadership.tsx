import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LEADERS } from "@/lib/about";

/* Two across on desktop rather than four narrow columns, so each portrait can
   carry real weight beside the name.

   The photographs are 268-320px square at source, so the frame is capped at
   224px wide: wide enough to anchor the card, narrow enough that nothing is
   ever upscaled into softness. Below 560px the portrait becomes a byline
   circle and the biography runs full width — a deliberate small-screen
   composition rather than a stretched version of the large one. */
export default function Leadership() {
  return (
    <section id="leadership" data-surface="page" className="db-section bg-page">
      <div className="db-shell db-shell--narrow">
        <SectionHeading
          label="Leadership"
          title={
            <>
              The people behind <span className="text-db-red">DatabaseBuilder</span>
            </>
          }
          lede="Between them, decades on the phone and in the data. Their direct lines are listed because that is the standard we hold support to."
          className="mb-[clamp(28px,3vw,48px)]"
        />

        <div className="db-leaders">
          {LEADERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <article className="db-card db-card--lift db-leader h-full">
                <div className="db-leader__photo db-portrait">
                  {p.photo ? (
                    <Image
                      src={p.photo}
                      alt={`${p.name}, ${p.role}`}
                      fill
                      sizes="(max-width: 559px) 112px, (max-width: 899px) 25vw, 224px"
                      className="object-cover object-[50%_22%]"
                    />
                  ) : (
                    <span className="db-mono absolute inset-0 text-[clamp(26px,2.6vw,38px)]">
                      {p.initials}
                    </span>
                  )}
                </div>

                <div className="db-leader__head min-w-0">
                  <h3 className="db-h3 text-ink">{p.name}</h3>
                  <p className="db-sm text-brand mt-1 font-semibold">{p.role}</p>
                </div>

                <div className="db-leader__body flex min-w-0 flex-col">
                  <p className="db-sm text-ink-2">{p.summary}</p>

                  <details className="db-more group mt-2.5">
                    <summary className="db-link db-sm cursor-pointer list-none">
                      <span className="group-open:hidden">Read more</span>
                      <span className="hidden group-open:inline">Show less</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9.5l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </summary>
                    <p className="db-sm text-ink-2 mt-2.5">{p.bio}</p>
                  </details>

                  <div className="border-line mt-auto flex flex-wrap gap-x-5 gap-y-1.5 border-t pt-4">
                    <a
                      href={`tel:${p.phone.replace(/\D/g, "")}`}
                      className="db-sm text-ink-2 hover:text-brand inline-flex items-center gap-2 transition-colors"
                    >
                      <Icon name="phone" className="text-brand h-4 w-4 shrink-0" />
                      {p.phone}
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="db-sm text-ink-2 hover:text-brand inline-flex min-w-0 items-center gap-2 transition-colors"
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
