import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import Showcase from "@/components/dashboard/Showcase";
import { WHY_PARAGRAPHS } from "@/lib/data";

/* The product screen is the client's own capture of the live application, not
   a rebuild of it — Adam asked for "the real user dash image on the website",
   and a screenshot of the thing you are selling is worth more than a tidier
   drawing of it.

   It keeps the Showcase expander, which is doing real work here: at the
   section's ~700px the screen is legible as a composition but not as text, and
   expanding it to the full shell brings it up to near its native 1550px. */
export default function WhySection() {
  return (
    <section id="why" className="db-section bg-page">
      <div className="db-shell">
        <Showcase
          action="See the full dashboard"
          copy={
            <Reveal>
              <h2 className="font-display text-[clamp(25px,2.45vw,40px)] leading-[1.08] text-balance text-ink mb-5">
                Why
                <br />
                {/* Adam's red/blue test: the wordmark in the heading picks up the
                    logo's own two colours instead of running black on red. */}
                <span className="text-db-blue">Database</span>
                <span className="text-db-red">Builder</span>?
              </h2>
              <div className="text-ink-2 max-w-[54ch] space-y-3.5 text-[clamp(15px,0.9vw,17.5px)] leading-[1.62]">
                {WHY_PARAGRAPHS.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          }
        >
          <Reveal>
            <figure className="db-shot m-0">
              <Image
                src="/dashboard.webp"
                alt="The DatabaseBuilder lead screen: a dialer with click-to-dial and call recording on the left, the full business lead record in the middle, and talking points with local time, weather and one-click research on the right."
                width={1550}
                height={823}
                sizes="(max-width: 1023px) 92vw, (max-width: 1400px) 58vw, 820px"
                quality={90}
                className="db-shot__img"
              />
            </figure>
          </Reveal>
        </Showcase>
      </div>
    </section>
  );
}
