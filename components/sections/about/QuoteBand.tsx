import Reveal from "@/components/animations/Reveal";
import Label from "@/components/ui/Label";
import { Icon } from "@/components/ui/Icon";

/* The founder's line. The section runs black so it joins the leadership band
   above it and the timeline below into one dark stretch — a pale strip between
   two dark sections read as a seam rather than a division. */
export default function QuoteBand() {
  return (
    <section className="bg-db-black pb-[clamp(62px,7vw,128px)]">
      <div className="db-shell">
        <Reveal>
          <figure className="db-cta-band m-0 grid items-center gap-[clamp(28px,3.4vw,64px)] rounded-[20px] px-[clamp(24px,3.8vw,68px)] py-[clamp(38px,4.8vw,76px)] lg:grid-cols-[1.25fr_0.75fr]">
            <blockquote className="relative m-0">
              <Label tone="dark" className="mb-5">
                From the founder
              </Label>
              <p className="font-body m-0 max-w-[30ch] text-[clamp(20px,2.1vw,34px)] leading-[1.24] font-bold tracking-[-.015em] text-white">
                Selling hasn&apos;t changed very much over the years.
                <span className="text-db-red-hot"> Only the technology around it has.</span>
              </p>
              <p className="mt-4 max-w-[46ch] text-[clamp(14.5px,0.95vw,16.5px)] leading-[1.6] text-white/65">
                You present a product, give a price, and close the deal. It&apos;s not complicated, so
                there&apos;s no reason your CRM should be either.
              </p>
            </blockquote>

            <figcaption className="border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[clamp(24px,2.6vw,44px)]">
              <div className="flex items-center gap-3.5">
                <span className="db-mono h-[48px] w-[48px] shrink-0">
                  <span>AB</span>
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-white">Adam Berman</span>
                  <span className="block text-[13.5px] text-white/55">President / CEO</span>
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-[1.6] text-white/60">
                Forty-five years of selling, most of it before CRMs existed.
              </p>
              <a
                href="https://databasebuilder.com/wp-content/uploads/2022/05/about-us.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-db-cyan mt-4 inline-flex items-center gap-2 text-[14px] font-semibold hover:opacity-80"
              >
                Read the full letter
                <Icon name="upload" className="h-4 w-4 rotate-90" />
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
