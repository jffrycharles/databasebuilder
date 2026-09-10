import Reveal from "@/components/animations/Reveal";
import Showcase from "@/components/dashboard/Showcase";
import DashboardApp from "@/components/dashboard/DashboardApp";
import { Icon } from "@/components/ui/Icon";
import { PILLARS } from "@/lib/data";

export default function BuiltForSection() {
  return (
    <section id="benefits" data-surface="page" className="db-section bg-page">
      <div className="db-shell">
        <Showcase
          action="See the dashboard"
          copy={
            <Reveal>
              <h2 className="db-h2 text-ink mb-5">
                Built for
                <br />
                <span className="text-db-red">Salespeople.</span>
                <br />
                Focused on <span className="text-db-red">Results.</span>
              </h2>
              <p className="db-body text-ink-2 max-w-[56ch]">
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
                      <h3 className="db-h4 text-ink mb-1">
                        {p.title}
                      </h3>
                      <p className="db-sm text-ink-2">{p.body}</p>
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
