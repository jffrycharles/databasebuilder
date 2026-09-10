import Globe from "@/components/ui/Globe";
import SmartLink from "@/components/ui/SmartLink";
import Logo from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/animations/Reveal";
import { FOOTER_COLUMNS, SITE, SOCIALS } from "@/lib/data";

export default function Footer() {
  const link = "db-sm text-ink-2 hover:text-brand transition-colors";

  return (
    <footer className="db-footer bg-page">
      <div className="db-shell">
        <div className="border-line grid grid-cols-2 gap-x-8 gap-y-8 border-t pt-7 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <Reveal className="col-span-2 sm:col-span-1">
            <SmartLink
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${SITE.name} home`}
            >
              <Globe
                className="h-[38px] w-[38px] shrink-0"
                rings={11}
                density={17}
                spin={30}
                fill="#0d1526"
              />
              <Logo size={20} tone="dark" />
            </SmartLink>
            <p className="db-sm text-ink-2 mt-5 max-w-[36ch]">
              Sales software designed by salespeople. Click-to-dial calling, automatic recording,
              email and two-way SMS — all in one price, with real humans on support.
            </p>
            <p className="db-xs text-ink-3 mt-4">
              No long-term commitment. Billed monthly. 30-day cancellation.
            </p>
          </Reveal>

          {FOOTER_COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={80 + i * 60}>
              <h2 className="db-kicker text-ink mb-4">{col.title}</h2>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className={link}>
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={260}>
            <h2 className="db-kicker text-ink mb-4">Stay connected</h2>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="bg-navy hover:bg-brand grid h-9 w-9 place-items-center rounded-full text-white transition hover:-translate-y-0.5"
                >
                  <Icon name={s.icon} className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="border-line text-ink-3 db-xs mt-[clamp(32px,3vw,52px)] flex flex-wrap items-center gap-5 border-t py-6">
          <span>© {new Date().getFullYear()} DatabaseBuilder. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
