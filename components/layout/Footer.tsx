import Globe from "@/components/ui/Globe";
import Logo from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/animations/Reveal";
import { FOOTER_COLUMNS, SITE, SOCIALS } from "@/lib/data";

export default function Footer() {
  const link = "text-[clamp(14px,0.85vw,15.5px)] text-ink-2 hover:text-brand transition-colors";

  return (
    <footer className="border-line border-t bg-[#f6f8fb] pt-14">
      <div className="db-shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <Reveal>
            <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
              <Globe className="h-[38px] w-[38px] shrink-0" rings={11} density={17} spin={30} fill="#0d1526" />
              <Logo size={20} tone="dark" />
            </a>
            <p className="text-ink-2 mt-5 max-w-[34ch] text-[clamp(13.5px,.82vw,15px)] leading-relaxed">
              Sales software designed by salespeople. Click-to-dial calling, automatic recording, email and
              two-way SMS — all in one price, with real humans on support.
            </p>
            <p className="text-ink-3 mt-4 text-[clamp(13px,.8vw,14.5px)]">
              No long-term commitment. Billed monthly. 30-day cancellation.
            </p>
          </Reveal>

          {FOOTER_COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={80 + i * 60}>
              <h2 className="font-ui text-ink m-0 mb-3.5 text-[11px] font-bold tracking-[.13em] uppercase">
                {col.title}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={260}>
            <h2 className="font-ui text-ink m-0 mb-3.5 text-[11px] font-bold tracking-[.13em] uppercase">
              Stay connected
            </h2>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="bg-navy hover:bg-brand grid h-[34px] w-[34px] place-items-center rounded-full text-white transition hover:-translate-y-0.5"
                >
                  <Icon name={s.icon} className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="border-line text-ink-3 mt-11 flex flex-wrap items-center gap-5 border-t py-5 text-[12.5px]">
          <span>© {new Date().getFullYear()} DatabaseBuilder. All rights reserved.</span>
          <span className="flex gap-5 sm:ml-auto">
            <a href="#top" className="hover:text-brand">
              Privacy Policy
            </a>
            <a href="#top" className="hover:text-brand">
              Terms of Service
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
