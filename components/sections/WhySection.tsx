import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import Showcase from "@/components/dashboard/Showcase";
import { WHY_PARAGRAPHS } from "@/lib/data";

/* Keep the original capture at its native resolution, including when expanded.
   The Showcase bar is the way in — a second "open in a new tab" link under the
   picture was one affordance too many for the same thing. */
export default function WhySection() {
  return (
    <section id="why" className="db-section bg-page">
      <div className="db-shell">
        <Showcase
          action="Enlarge dashboard"
          copy={
            <Reveal>
              <h2 className="font-display text-[clamp(25px,2.45vw,40px)] leading-[1.08] text-balance text-ink mb-5">
                Why
                <br />
                {/* Black/Red: the wordmark rule on a light section. "Database"
                    takes the heading's own ink, "Builder" is always red. */}
                Database<span className="text-db-red">Builder</span>?
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
                /* served as-is: Next's optimiser re-encodes a 1550px UI capture
                   and softens the 10px type in it */
                unoptimized
                className="db-shot__img"
              />
            </figure>
          </Reveal>
        </Showcase>
      </div>
    </section>
  );
}
