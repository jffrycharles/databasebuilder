import Globe from "@/components/ui/Globe";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/data";

type Props = {
  /** unique per page — the homepage keeps "contact" */
  id?: string;
  showTrialLength?: boolean;
  /** Adam's closing line from the outline — the homepage signs off with it */
  showSignOff?: boolean;
};

/**
 * The trial band.
 *
 * Composed rather than centred. Everything readable is locked to the panel's
 * left edge, which is what gives the black field an anchor — the previous
 * version centred a column of five elements inside a wide track, so the copy
 * floated with dead space either side of it and the globe sat stranded in a
 * column of its own. Here the globe balances the right instead of occupying a
 * separate one, and the closing strip runs the full width so the panel has a
 * base: it also rehouses the sign-off and the commitment line, which were
 * orphaned underneath the button.
 *
 * The sign-off is deliberately small. Set at display size it was a second
 * headline arguing with the first across a glowing button.
 */
export default function CtaBand({
  id = "contact",
  showTrialLength = false,
  showSignOff = false,
}: Props) {
  return (
    <section id={id} className="db-section bg-page">
      <div className="db-shell">
        <Reveal>
          <div
            data-cta-band
            className="db-trial-band px-[clamp(24px,4vw,72px)] pt-[clamp(36px,4.2vw,64px)] pb-[clamp(24px,2.4vw,36px)] text-white"
          >
            <div className="grid items-center gap-[clamp(30px,3.6vw,60px)] lg:grid-cols-[minmax(0,1fr)_auto]">
              {/* the globe balances the right — on mobile it crowns the stack */}
              <Globe
                className="db-trial-band__globe order-1 h-[clamp(124px,22vw,328px)] w-[clamp(124px,22vw,328px)] lg:order-2"
                interactive
                rings={15}
                density={25}
                spin={26}
                label={`${SITE.name} globe. Drag to spin it, press Enter for a pulse.`}
              />

              <div className="order-2 lg:order-1">
                <h2 className="font-display m-0 max-w-[27ch] text-[clamp(24px,3vw,48px)] leading-[1.08] tracking-[.015em]">
                  A productive CRM shouldn&apos;t cost a <span className="text-db-red-hot">fortune.</span>
                </h2>
                <p className="mt-[clamp(12px,1.15vw,19px)] mb-0 max-w-[44ch] text-[clamp(15px,1vw,18.5px)] leading-[1.6] text-white/70">
                  {showTrialLength
                    ? "Start your 7-day free trial today and see the difference."
                    : "Start your free trial today and see the difference."}
                </p>
                <CtaButton className="mt-[clamp(22px,2.2vw,36px)] text-[clamp(17px,1.75vw,27px)]">
                  {showTrialLength ? "Start 7-Day Free Trial" : "Start Free Trial"}
                </CtaButton>
              </div>
            </div>

            {/* The base of the panel. Carries whichever of the two closing lines
                this page asked for, so a missing sign-off leaves a strip that is
                still deliberate rather than a hole. */}
            <div className="mt-[clamp(28px,3vw,48px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/10 pt-[clamp(16px,1.5vw,24px)]">
              {showSignOff && (
                <p className="font-display m-0 text-[clamp(14px,1.22vw,20px)] leading-none tracking-[.045em] text-white/85">
                  Salespeople close deals,
                  <span className="text-db-red-hot"> not software.</span>
                </p>
              )}
              <p className="text-db-cyan m-0 flex items-center gap-2 text-[13.5px] font-semibold">
                <Icon name="check" className="h-4 w-4" />
                No long-term commitment required
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
