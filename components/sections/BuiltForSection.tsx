import Reveal from "@/components/animations/Reveal";
import Showcase from "@/components/dashboard/Showcase";
import DashboardApp from "@/components/dashboard/DashboardApp";
import { Icon } from "@/components/ui/Icon";
import { PILLARS } from "@/lib/data";

export default function BuiltForSection() {
  return (
    <section id="pricing" className="db-section bg-page">
      <div className="db-shell">
        <Showcase
          action="See the dashboard"
          copy={
            <Reveal>
              <h2 className="font-body text-ink mb-5 text-[clamp(28px,2.7vw,44px)] leading-[1.08] font-bold tracking-[-.02em]">
                Built for
                <br />
                <span className="text-db-red">Salespeople.</span>
                <br />
                Focused on <span className="text-db-red">Results.</span>
              </h2>
              <p className="text-ink-2 max-w-[54ch] text-[clamp(15px,0.9vw,17.5px)] leading-[1.62]">
                DatabaseBuilder gives your team the tools to work smarter, close more deals, and grow faster —
                without the complexity or the high price tag.
              </p>
              <ul className="mt-5 flex list-none flex-col gap-4 p-0">
                {PILLARS.map((p) => (
                  <li key={p.title} className="grid grid-cols-[34px_minmax(0,1fr)] items-start gap-3.5">
                    <span className="border-brand text-brand grid h-[34px] w-[34px] place-items-center rounded-full border-2">
                      <Icon name={p.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <h3 className="font-body text-ink m-0 mb-1 text-[clamp(15px,0.9vw,16.5px)] font-bold">
                        {p.title}
                      </h3>
                      <p className="text-ink-2 m-0 text-[clamp(14.5px,0.85vw,16px)] leading-relaxed">{p.body}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          }
        >
          <Reveal>
            <DashboardApp />
          </Reveal>
        </Showcase>
      </div>
    </section>
  );
}
