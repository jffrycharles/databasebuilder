import PageHero from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { CHANNELS, CONTACT } from "@/lib/contact";

export default function ContactHero() {
  return (
    <PageHero
      label="Contact Us"
      title={
        <>
          Your ideas, <span className="text-db-red-hot">our solution.</span>
        </>
      }
      lede={CONTACT.standfirst}
      aside={
        <div className="grid gap-2.5">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.icon === "pin" ? "_blank" : undefined}
              rel={c.icon === "pin" ? "noreferrer" : undefined}
              className="db-channel group flex items-center gap-4 rounded-[12px] border border-white/12 bg-white/[0.035] px-4 py-3.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-[#12306b] text-[#8fb6ff]">
                <Icon name={c.icon} className="h-[17px] w-[17px]" />
              </span>
              <span className="min-w-0">
                <span className="font-ui block text-[11px] tracking-[.16em] text-white/40 uppercase">
                  {c.title}
                </span>
                <span className="block text-[clamp(14.5px,0.95vw,16px)] leading-snug font-semibold text-white">
                  {c.lines[0]}
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                className="ml-auto h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      }
    />
  );
}
