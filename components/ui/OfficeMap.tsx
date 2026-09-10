"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/contact";

/* ---------------------------------------------------------------------------
   The office on a dark vector basemap.

   OpenFreeMap serves OpenStreetMap-derived tiles with no account, no API key
   and commercial use allowed, and its `dark` style is dark at the source — so
   the frame needs a filter and a vignette rather than a CSS invert.

   maplibre-gl is pinned to v5 deliberately: v6 is ESM-only and derives its
   worker URL from import.meta.url, which webpack rewrites to a non-http value.
   The worker never spawns, and since the worker fetches the tiles the map
   renders as an empty grid with no error raised.

   If WebGL is missing, the network is down or the style fails, the brand grid
   and the address card stay — both are real content, and the directions link
   still works.
   --------------------------------------------------------------------------- */

const STYLE_URL =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "https://tiles.openfreemap.org/styles/dark";

export default function OfficeMap() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    let map: import("maplibre-gl").Map | null = null;
    let cancelled = false;
    let timer: number | undefined;

    // nothing is fetched — library, stylesheet or tiles — until it is close
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        void start();
      },
      { rootMargin: "300px" },
    );
    io.observe(node);

    async function start() {
      try {
        const [{ Map, Marker }] = await Promise.all([
          import("maplibre-gl"),
          // @ts-expect-error — stylesheet has no type declaration
          import("maplibre-gl/dist/maplibre-gl.css"),
        ]);
        if (cancelled || !node) return;

        const soft = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        map = new Map({
          container: node,
          style: STYLE_URL,
          center: [CONTACT.lng, CONTACT.lat],
          zoom: soft ? 15 : 13.4,
          attributionControl: { compact: true },
          cooperativeGestures: true, // a plain wheel scroll passes to the page
          dragRotate: false,
          pitchWithRotate: false,
        });

        // a marker in the brand's own language rather than the default pin
        const pin = document.createElement("div");
        pin.className = "db-pin";
        pin.innerHTML = '<span class="db-pin__dot"></span><span class="db-pin__ring"></span>';
        new Marker({ element: pin, anchor: "center" })
          .setLngLat([CONTACT.lng, CONTACT.lat])
          .addTo(map);

        map.on("load", () => {
          if (cancelled) return;
          setReady(true);
          if (!soft) map?.easeTo({ zoom: 15.1, duration: 1800, essential: true });
        });
        map.on("error", () => setFailed(true));

        // a style that never resolves should not leave a black hole
        timer = window.setTimeout(() => {
          if (!cancelled && !map?.loaded()) setFailed(true);
        }, 8000);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    return () => {
      cancelled = true;
      io.disconnect();
      window.clearTimeout(timer);
      map?.remove();
    };
  }, []);

  return (
    <div className="db-map">
      <div ref={host} className="db-map__canvas" aria-hidden={!ready} />
      {!ready && !failed && (
        <div className="db-map__fallback" role="img" aria-label={`Map of ${CONTACT.address.line1}`}>
          <span className="db-map__grid" />
        </div>
      )}
      {failed && (
        /* WebGL, the library or the vector tiles are unavailable — OpenStreetMap's
           embed needs neither a key nor WebGL, so the office is still on a map. */
        <iframe
          title={`Map of ${CONTACT.address.line1}, ${CONTACT.address.line2}`}
          className="db-map__embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${CONTACT.lng - 0.006}%2C${
            CONTACT.lat - 0.003
          }%2C${CONTACT.lng + 0.006}%2C${CONTACT.lat + 0.003}&layer=mapnik&marker=${CONTACT.lat}%2C${CONTACT.lng}`}
        />
      )}
      <span className="db-map__vignette" aria-hidden="true" />
    </div>
  );
}
