import Reveal from "@/components/animations/Reveal";
import MapFrame from "@/components/ui/MapFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { CONTACT } from "@/lib/contact";

export default function MapSection() {
  return (
    <section className="db-page-band py-[clamp(60px,6.5vw,116px)]">
      <div className="db-shell relative z-[2]">
        <div className="grid items-center gap-[clamp(24px,3vw,52px)] lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <MapFrame />
          </Reveal>

          <Reveal delay={90}>
            <SectionHeading
              tone="dark"
              display
              label="The office"
              title={
                <>
                  Chicago, <span className="text-db-red-hot">since day one.</span>
                </>
              }
              lede="On Peterson Avenue, with the sales floor the CRM was built for sitting in the same building."
            />

            <address className="mt-6 not-italic">
              <span className="block text-[clamp(16px,1.1vw,19px)] leading-snug font-semibold text-white">
                {CONTACT.address.line1}
              </span>
              <span className="block text-[clamp(15px,1vw,17px)] text-white/60">
                {CONTACT.address.line2}
              </span>
            </address>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noreferrer"
                className="font-ui inline-flex items-center gap-2 rounded-[9px] border border-white/25 px-4 py-2.5 text-[14px] font-semibold tracking-[.03em] text-white uppercase transition hover:border-white hover:bg-white/10"
              >
                <Icon name="pin" className="h-4 w-4" />
                Get directions
              </a>
              <a
                href={CONTACT.phone.href}
                className="font-ui inline-flex items-center gap-2 rounded-[9px] border border-white/25 px-4 py-2.5 text-[14px] font-semibold tracking-[.03em] text-white uppercase transition hover:border-white hover:bg-white/10"
              >
                <Icon name="phone" className="h-4 w-4" />
                {CONTACT.phone.label}
              </a>
            </div>

            <p className="mt-5 text-[12.5px] leading-snug text-white/35">
              Basemap © OpenFreeMap, data © OpenStreetMap contributors.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
