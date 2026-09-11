import Reveal from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ARCHIVE_LINKS } from "@/lib/about";

/** Deep links to the original team, history and CEO letter pages. */
export default function ArchiveLinks() {
  return (
    <section className="bg-page pt-[clamp(58px,6vw,112px)] pb-[clamp(58px,6vw,112px)]">
      <div className="db-shell">
        <Reveal className="mb-[clamp(28px,3vw,44px)]">
          <p className="db-kicker text-brand mb-3">Read further</p>
          <span className="db-rule db-rule--sm block" />
        </Reveal>

        <div className="grid gap-[clamp(16px,1.6vw,24px)] md:grid-cols-3">
          {ARCHIVE_LINKS.map((l, i) => (
            <Reveal key={l.label} delay={i * 90}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="db-card-flat db-leader group flex h-full items-start gap-4 p-5"
              >
                <span className="bg-brand/10 text-brand grid h-10 w-10 shrink-0 place-items-center rounded-[10px]">
                  <Icon name={l.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="font-body text-ink flex items-center gap-2 text-[clamp(15.5px,1vw,17.5px)] font-bold">
                    {l.label}
                    <svg viewBox="0 0 24 24" className="text-brand h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
                      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-ink-2 mt-1 block text-[clamp(13.5px,0.85vw,15px)] leading-snug">
                    {l.note}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
