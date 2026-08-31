import Globe from "@/components/ui/Globe";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/data";

export default function CtaBand() {
  return (
    <section id="contact" className="db-section bg-page">
      <div className="db-shell">
        <Reveal>
          <div className="db-cta-band grid items-center gap-8 rounded-[18px] px-6 py-10 text-center text-white sm:px-11 sm:py-12 lg:grid-cols-[minmax(180px,240px)_minmax(0,1fr)] lg:gap-12 lg:px-14 lg:py-14 lg:text-left">
            <Globe
              className="mx-auto h-[clamp(120px,18vw,200px)] w-[clamp(120px,18vw,200px)] [filter:drop-shadow(0_0_34px_rgba(46,125,255,.55))]"
              interactive
              rings={15}
              density={25}
              spin={26}
              fill="#4da3ff"
              label={`${SITE.name} globe. Drag to spin it, press Enter for a pulse.`}
            />
            <div className="text-center">
              <h2 className="font-body m-0 mb-2.5 text-[clamp(24px,2.5vw,40px)] leading-tight font-bold tracking-[-.02em]">
                A productive CRM shouldn&apos;t cost a <span className="text-db-red-hot">fortune.</span>
              </h2>
              <p className="m-0 mb-7 text-[clamp(15px,1vw,19px)] text-white/80">
                Start your free trial today and see the difference.
              </p>
              <CtaButton className="text-[clamp(18px,2.05vw,32px)]" />
              <p className="text-db-cyan mt-4 flex items-center justify-center gap-2 text-[14px] font-semibold">
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
