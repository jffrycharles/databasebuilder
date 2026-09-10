import Reveal from "@/components/animations/Reveal";
import MapFrame from "@/components/ui/MapFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { CONTACT } from "@/lib/contact";

/** The office, on the same dark band the history and the heroes use — so the
    map arrives as part of the site rather than as an embedded widget. */
export default function MapSection() {
  return (
    <section id="office" className="db-page-band db-section">
      <div className="db-shell relative z-[2]">
        <div className="grid items-center gap-[var(--db-gap-lg)] lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <MapFrame />
          </Reveal>

          <Reveal delay={90}>
            <SectionHeading
              tone="dark"
              label="The office"
              title={
                <>
                  Chicago, <span className="text-db-red-hot">since day one.</span>
                </>
              }
              lede="On Peterson Avenue, with the sales floor the CRM was built for sitting in the same building."
            />

            <address className="mt-7 not-italic">
              <span className="db-h4 block text-white">{CONTACT.address.line1}</span>
              <span className="db-body mt-0.5 block text-white/60">{CONTACT.address.line2}</span>
            </address>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noreferrer"
                className="db-btn db-btn--ghost db-btn--sm"
              >
                <Icon name="pin" className="h-4 w-4" />
                Get directions
              </a>
              <a href={CONTACT.phone.href} className="db-btn db-btn--ghost db-btn--sm">
                <Icon name="phone" className="h-4 w-4" />
                {CONTACT.phone.label}
              </a>
            </div>

            <p className="db-xs mt-6 text-white/35">
              Basemap © OpenFreeMap, data © OpenStreetMap contributors.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
