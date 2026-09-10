import Reveal from "@/components/animations/Reveal";
import Showcase from "@/components/dashboard/Showcase";
import InboxApp from "@/components/dashboard/InboxApp";
import { WHY_PARAGRAPHS } from "@/lib/data";

export default function WhySection() {
  return (
    <section id="why" data-surface="page" className="db-section bg-page">
      <div className="db-shell">
        <Showcase
          action="See the conversation"
          copy={
            <Reveal>
              <h2 className="db-h2 text-ink mb-5">
                Why
                <br />
                Database<span className="text-db-red">Builder</span>?
              </h2>
              <div className="db-prose text-ink-2 max-w-[56ch]">
                {WHY_PARAGRAPHS.map((p) => (
                  <p key={p} className="db-body">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          }
        >
          <Reveal>
            <InboxApp />
          </Reveal>
        </Showcase>
      </div>
    </section>
  );
}
