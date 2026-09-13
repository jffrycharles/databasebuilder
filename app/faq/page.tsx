import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import Accordion from "@/components/ui/Accordion";
import FaqDeepLink from "@/components/ui/FaqDeepLink";
import CtaBand from "@/components/sections/CtaBand";
import CtaButton from "@/components/ui/CtaButton";
import SmartLink from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "@/lib/faq";
import { SITE } from "@/lib/data";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on importing your own data, customization, cancellation, security, pricing, sales training, the 7-day free trial and support.",
  alternates: { canonical: "/faq" },
  ...pageMeta({
    title: "FAQ — DatabaseBuilder CRM",
    description:
      "The questions we are asked most about the CRM, answered plainly.",
    path: "/faq",
  }),
};

const slug = (title: string) => `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

export default function FaqPage() {
  const byId = (id: string) => FAQ_ITEMS.find((f) => f.id === id);

  /* Resolve the groups once. The rail badge, the heading count, the rendered
     rows and the structured data all read from this, so a mistyped id in
     FAQ_CATEGORIES can no longer produce a rail that promises three answers
     above a list showing two. */
  const groups = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    anchor: slug(cat.title),
    items: cat.ids.map(byId).filter((f): f is (typeof FAQ_ITEMS)[number] => Boolean(f)),
  }));
  const shown = groups.flatMap((g) => g.items);

  /* Every answer is already in the DOM whether or not its row is open, so the
     markup and the structured data cannot drift apart. */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/faq`,
    url: `${SITE.url}/faq`,
    inLanguage: "en",
    mainEntity: shown.map((f) => ({
      "@type": "Question",
      "@id": `${SITE.url}/faq#${f.id}`,
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        // paragraphs, not one run-on line
        text: f.answer.join("\n\n"),
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // the content is our own, from lib/faq.ts — no user input reaches this
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqDeepLink />
      <PageHero
        label="FAQ"
        title={
          <>
            Your questions, <span className="text-db-red-hot">answered.</span>
          </>
        }
        lede="Everything customers ask before they start, in plain language. If yours is not here, a person will answer it."
        aside={
          <div className="rounded-[16px] border border-white/12 bg-white/[0.035] p-[clamp(18px,1.8vw,26px)]">
            <p className="font-ui text-[11.5px] tracking-[.16em] text-white/40 uppercase">
              Rather just ask
            </p>
            <a
              href={CONTACT.phone.href}
              className="font-body mt-2 block text-[clamp(19px,1.6vw,26px)] font-bold text-white transition-opacity hover:opacity-80"
            >
              {CONTACT.phone.label}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-db-cyan mt-2 inline-flex items-center gap-2 text-[14.5px] font-semibold"
            >
              <Icon name="mail" className="h-4 w-4" />
              {CONTACT.email}
            </a>
          </div>
        }
      />

      <section className="db-section db-section--airy bg-page">
        <div className="db-shell">
          <div className="grid gap-[clamp(34px,4.4vw,84px)] lg:grid-cols-[0.72fr_1.28fr]">
            {/* left rail: orientation and a way out. It stays put while the
                list scrolls, which is the whole point of having it. */}
            <div className="db-faq-rail">
              <SectionHeading
                display
                label={`${shown.length} questions`}
                title={
                  <>
                    Grouped so you can find <span className="text-db-red">yours</span>
                  </>
                }
                lede={`${groups.length} groups, from what happens to your data through to what support looks like once you are running.`}
              />

              <Reveal delay={90}>
                <nav className="mt-[clamp(26px,2.6vw,40px)] grid gap-2.5" aria-label="FAQ sections">
                  {groups.map((c) => (
                    <a
                      key={c.title}
                      href={`#${c.anchor}`}
                      className="db-card-flat db-faq-railrow text-ink hover:border-brand/40 group flex items-center gap-3 px-[clamp(16px,1.3vw,20px)] py-[clamp(13px,1.15vw,17px)] transition-colors"
                    >
                      {c.title}
                      <span className="text-ink-3 ml-auto text-[13px] font-normal">
                        {c.items.length}
                        <span className="sr-only"> questions</span>
                      </span>
                      <svg viewBox="0 0 24 24" className="text-brand h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
                        <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </nav>
              </Reveal>

              <Reveal delay={150}>
                <div className="bg-navy mt-[clamp(22px,2.2vw,34px)] rounded-[16px] p-[clamp(22px,2.2vw,34px)] text-white">
                  <h3 className="font-display m-0 text-[clamp(19px,1.5vw,26px)] leading-none tracking-[.01em] uppercase">
                    Still not sure it fits?
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-white/70">
                    Take the 7-day trial, or talk it through with someone who uses the product daily.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <CtaButton className="text-[15px]">Start Free Trial</CtaButton>
                    <SmartLink href="/contact" className="text-db-cyan text-[14.5px] font-semibold">
                      Contact us
                    </SmartLink>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* right: every question, grouped */}
            <div className="grid gap-[clamp(44px,4.8vw,86px)]">
              {groups.map((cat, i) => (
                <Reveal key={cat.title} delay={i * 60}>
                  {/* the rail links here, so the group's own title and blurb
                      are what you land on */}
                  <div id={cat.anchor} className="db-faq-group mb-[clamp(16px,1.7vw,28px)]">
                    <h2 className="font-display text-ink m-0 text-[clamp(18px,1.45vw,25px)] leading-none tracking-[.01em] uppercase">
                      {cat.title}
                    </h2>
                    <p className="text-ink-2 mt-2 text-[clamp(14px,0.88vw,15.5px)]">{cat.blurb}</p>
                  </div>
                  <Accordion items={cat.items} openFirst={i === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand id="trial" showTrialLength />
    </main>
  );
}
