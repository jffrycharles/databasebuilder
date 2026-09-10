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

/** The same closing band on every page: one globe, one heading, one button. */
export default function CtaBand({
  id = "contact",
  showTrialLength = false,
  showSignOff = false,
}: Props) {
  return (
    <section id={id} data-surface="page" className="db-cta-section bg-page">
      <div className="db-shell">
        <Reveal>
          <div className="db-cta-band">
            <Globe
              className="db-cta-globe"
              interactive
              rings={15}
              density={25}
              spin={26}
              fill="#4da3ff"
              label={`${SITE.name} globe. Drag to spin it, press Enter for a pulse.`}
            />
            <div className="db-cta-message">
              <h2 className="db-h2">
                A productive CRM shouldn&apos;t cost a{" "}
                <span className="text-db-red-hot">fortune.</span>
              </h2>
              {showSignOff && (
                <p className="db-cta-signoff font-display">
                  Salespeople close deals,
                  <span className="text-db-red-hot"> not software.</span>
                </p>
              )}
            </div>
            <div className="db-cta-action">
              <p className="db-body text-white/75">
                {showTrialLength
                  ? "Start your 7-day free trial today and see the difference."
                  : "Start your free trial today and see the difference."}
              </p>
              <CtaButton block>
                {showTrialLength ? "Start 7-Day Free Trial" : "Start Free Trial"}
              </CtaButton>
              <p className="text-db-cyan db-xs flex items-center justify-center gap-2">
                <Icon name="check" className="h-4 w-4 shrink-0" />
                No long-term commitment required
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
