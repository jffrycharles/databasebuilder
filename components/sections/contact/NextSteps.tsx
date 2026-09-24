import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACT_STEPS } from "@/lib/contact";

/**
 * What happens after you write in.
 *
 * The page had a form and a map and nothing between them, which left the
 * hardest question unanswered: what happens to the message. A numbered run of
 * four steps is the standard answer on a good SaaS contact page, and it is
 * cheap here because every line is a commitment the site already makes
 * elsewhere — the form's one-business-day promise, the "a person reads it"
 * line on the email channel, the FAQ's free data import.
 *
 * It also fixes the band rhythm. The page ran dark hero, light form, light
 * map, dark CTA — two lights together in the middle. This sits between them.
 */
export default function NextSteps() {
  return (
    <section id="what-happens" className="db-page-band db-section db-section--airy relative">
      <div className="db-shell relative z-[2]">
        <SectionHeading
          tone="dark"
          label="After you write in"
          align="center"
          display
          title={
            <>
              No message goes into <span className="text-db-red">a void.</span>
            </>
          }
          lede="Four steps, and a person at every one of them."
          className="mb-[clamp(36px,4vw,64px)]"
        />

        <ol className="m-0 grid list-none gap-[clamp(20px,2.2vw,34px)] p-0 sm:grid-cols-2 xl:grid-cols-4">
          {CONTACT_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li className="db-step h-full">
                <span className="db-step__n">{s.n}</span>
                <h3 className="font-body m-0 mt-[clamp(14px,1.4vw,20px)] text-[clamp(17px,1.25vw,21px)] leading-tight font-bold text-white">
                  {s.title}
                </h3>
                <p className="m-0 mt-2.5 text-[clamp(13.5px,0.88vw,15.5px)] leading-[1.62] text-white/60">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

      </div>
    </section>
  );
}
