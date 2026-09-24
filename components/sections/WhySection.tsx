import Image from "next/image";
import Showcase from "@/components/dashboard/Showcase";
import WhyMotion from "@/components/sections/WhyMotion";
import { WHY_PARAGRAPHS } from "@/lib/data";

/* Keep the original capture at its native resolution, including when expanded.
   The Showcase bar is the way in — a second "open in a new tab" link under the
   picture was one affordance too many for the same thing. */
export default function WhySection() {
  return (
    <section id="why" className="db-section bg-page">
      <WhyMotion className="db-shell db-why-shell">
        <Showcase
          action="Enlarge dashboard"
          copy={
            <>
              <h2 className="font-display text-[clamp(38px,3.5vw,60px)] leading-[1.06] text-ink mb-[clamp(20px,1.8vw,30px)]">
                {/* One span per line so each can rise out of its own clip
                    (WhyMotion) without anything rewriting the markup. */}
                <span data-why-line className="block">
                  Why
                </span>{" "}
                {/* Black/Red: the wordmark rule on a light section. "Database"
                    takes the heading's own ink, "Builder" is always red. */}
                <span data-why-line className="block">
                  Database<span className="text-db-red">Builder</span>?
                </span>
              </h2>
              <div
                data-why-copy
                className="text-ink-2 max-w-[54ch] space-y-4 text-[clamp(15.5px,1vw,18px)] leading-[1.62]"
              >
                {WHY_PARAGRAPHS.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </>
          }
        >
          <figure className="db-why-figure m-0">
            {/* The site's own eyebrow — a red rule either side of the word,
                in the ink variant for a light section, exactly as "OUR STORY"
                is set on the story page. */}
            {/* The gap belongs to the frame below, not to the eyebrow:
                .db-eyebrow-rule sets `margin: 0` unlayered, which outranks a
                Tailwind margin utility however it is written. */}
            <figcaption className="db-eyebrow-rule db-eyebrow-rule--ink">
              <span aria-hidden="true" />
              Our Dialer Dash
              <span aria-hidden="true" />
            </figcaption>
            <div className="db-why-stage mt-[clamp(16px,1.6vw,26px)]">
              <div className="db-shot">
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
              </div>
            </div>
          </figure>
        </Showcase>
      </WhyMotion>
    </section>
  );
}
