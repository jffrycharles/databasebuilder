import Reveal from "@/components/animations/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import SmartLink from "@/components/ui/SmartLink";
import { Icon } from "@/components/ui/Icon";
import { PRICING, PLAN_INCLUDES } from "@/lib/pricing";

/* Prices are still TBA in the outline, so this section sells the shape of the
   pricing — one plan, everything in it — and sends people to /pricing for the
   detail rather than inventing a number. */
export default function PricingTeaser() {
  const hasPrice = PRICING.baseMonthly !== null;

  return (
    <section id="pricing" className="bg-page db-section">
      <div className="db-shell">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <h2 className="font-display text-[clamp(25px,2.45vw,40px)] leading-[1.08] text-balance text-ink">
            One plan. <span className="text-db-red">Everything in it.</span>
          </h2>
          <p className="text-ink-2 mt-3 text-[clamp(15px,0.9vw,17.5px)] leading-[1.6]">
            No tiers, no à la carte add-ons, and no paying extra for the features that make the
            difference.
            Our all-in-one price keeps the product easy to understand.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* the offer */}
          <Reveal>
            <div className="db-card-flat flex h-full flex-col p-[clamp(22px,2.4vw,36px)]">
              <span className="db-chip bg-brand/10 text-brand self-start">
                <i />
                All-in-one pricing
              </span>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {hasPrice ? (
                  <>
                    <span className="font-display text-ink text-[clamp(44px,5vw,72px)] leading-none">
                      {PRICING.currencySymbol}
                      {PRICING.baseMonthly}
                    </span>
                    <span className="text-ink-2 text-[clamp(15px,1vw,17px)]">per month</span>
                  </>
                ) : (
                  <span className="font-display text-ink text-[clamp(21px,1.95vw,32px)] leading-[1.12] text-balance">
                    Straightforward monthly pricing
                  </span>
                )}
              </div>

              <p className="text-ink-2 mt-3 text-[clamp(14.5px,0.9vw,16.5px)] leading-[1.6]">
                Includes up to {PRICING.includedUsers} users, with additional user licences
                available. Change the number of licences month to month, and cancel with 30 days&apos;
                notice.
              </p>

              <ul className="mt-6 grid list-none gap-2.5 p-0">
                {PLAN_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon name="check" className="text-green mt-0.5 h-[18px] w-[18px] shrink-0" />
                    <span className="text-ink text-[clamp(14px,0.88vw,16px)] leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                <CtaButton className="text-[clamp(16px,1.15vw,19px)]">
                  Start 7-Day Free Trial
                </CtaButton>
                <SmartLink
                  href="/pricing"
                  className="text-brand text-[15px] font-semibold underline underline-offset-4"
                >
                  See full pricing
                </SmartLink>
              </div>
            </div>
          </Reveal>

          {/* what sits outside the subscription, said plainly */}
          <Reveal delay={110}>
            <div className="bg-navy flex h-full flex-col rounded-[16px] p-[clamp(22px,2.4vw,36px)] text-white">
              <h3 className="font-body m-0 text-[clamp(18px,1.4vw,24px)] font-bold tracking-[-.01em]">
                What you will never be charged for
              </h3>
              <ul className="mt-5 grid list-none gap-3 p-0">
                {[
                  "Setup fees — there are none",
                  "Advanced features held behind a higher tier",
                  "Support, when you need a person",
                  "Getting your own data back out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/10 text-[#8fb6ff]">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[clamp(14px,0.9vw,15.5px)] leading-snug text-white/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[clamp(13.5px,0.88vw,15px)] leading-[1.62] text-white/60">
                A few third-party services are billed separately — dialer minutes, SMS usage and any
                extra phone numbers. Buy them in bulk or pay as you go.
              </p>

              <SmartLink
                href="/pricing"
                className="text-db-cyan mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold"
              >
                How usage billing works
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SmartLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
