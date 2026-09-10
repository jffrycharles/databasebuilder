"use client";

import dynamic from "next/dynamic";

/* MapLibre touches `window` at import time, so the map is client-only. This
   thin wrapper exists because `ssr: false` is only allowed inside a client
   component — the section around it stays a server component. */
const OfficeMap = dynamic(() => import("@/components/ui/OfficeMap"), {
  ssr: false,
  loading: () => (
    <div className="db-map">
      <div className="db-map__fallback">
        <span className="db-map__grid" />
      </div>
      <span className="db-map__vignette" aria-hidden="true" />
    </div>
  ),
});

export default function MapFrame() {
  return <OfficeMap />;
}
