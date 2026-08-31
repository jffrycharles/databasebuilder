import Reveal from "@/components/animations/Reveal";
import Showcase from "@/components/dashboard/Showcase";
import InboxApp from "@/components/dashboard/InboxApp";
import { WHY_PARAGRAPHS } from "@/lib/data";

export default function WhySection() {
  return (
    <section id="why" className="db-section bg-page">
      <div className="db-shell">
        <Showcase
          action="See the conversation"
          copy={
            <Reveal>
              <h2 className="font-body text-ink mb-5 text-[clamp(28px,2.7vw,44px)] leading-[1.08] font-bold tracking-[-.02em]">
                Why
                <br />
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
            <InboxApp />
          </Reveal>
        </Showcase>
      </div>
    </section>
  );
}
