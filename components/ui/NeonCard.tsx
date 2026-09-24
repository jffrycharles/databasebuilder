import type { HeroCard } from "@/lib/data";

/* The four illustrations, lifted from the original artwork. */
function CardArt({ art }: { art: HeroCard["art"] }) {
  switch (art) {
    case "checklist":
      return (
        <svg viewBox="0 0 96 116" fill="none" aria-hidden="true">
          <rect x="4" y="12" width="88" height="100" rx="7" fill="#fff" stroke="#0d1424" strokeWidth="3" />
          <rect x="33" y="3" width="30" height="16" rx="4" fill="#fff" stroke="#0d1424" strokeWidth="3" />
          <circle cx="48" cy="11" r="3.4" fill="#0d1424" />
          <g stroke="#1faa4a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M17 40l6 6 11-13" />
            <path d="M17 64l6 6 11-13" />
            <path d="M17 88l6 6 11-13" />
          </g>
          <g fill="#0d1424">
            <rect x="44" y="37" width="36" height="5" rx="2.5" />
            <rect x="44" y="61" width="36" height="5" rx="2.5" />
            <rect x="44" y="85" width="36" height="5" rx="2.5" />
          </g>
        </svg>
      );
    case "dialer":
      return (
        <svg viewBox="0 0 116 116" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="108" height="108" rx="12" fill="#fff" />
          <text
            x="70"
            y="34"
            fontFamily="var(--font-ui), Arial, sans-serif"
            fontSize="21"
            fontWeight="600"
            fill="#0d1424"
            textAnchor="middle"
          >
            REC
          </text>
          <circle cx="95" cy="27" r="8" fill="#e23324" />
          <path
            d="M32 42c-5 0-9 4-9 9 0 24 19 43 43 43 5 0 9-4 9-9v-7c0-2.4-1.6-4.4-4-5l-10-2.4c-2.4-.5-4 .3-5.4 2l-3.6 4.6a37 37 0 0 1-18-18l4.6-3.6c1.8-1.4 2.6-3 2-5.4L38.6 40c-.6-2.4-2.6-4-5-4H32Z"
            fill="#122c5c"
          />
        </svg>
      );
    case "messaging":
      return (
        <svg viewBox="0 0 124 116" fill="none" aria-hidden="true">
          <rect x="4" y="8" width="56" height="100" rx="8" fill="#fff" />
          <rect x="10" y="20" width="44" height="76" rx="2" fill="#0d1424" />
          <circle cx="32" cy="102" r="3.6" fill="#0d1424" />
          <rect x="30" y="12" width="12" height="3" rx="1.5" fill="#0d1424" />
          <rect x="46" y="30" width="66" height="46" rx="5" fill="#fff" stroke="#0d1424" strokeWidth="4" />
          <path d="M48 35l31 24 31-24" stroke="#0d1424" strokeWidth="4" fill="none" strokeLinejoin="round" />
          <path
            d="M78 82h34a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H94l-11 8v-8h-5a6 6 0 0 1-6-6V88a6 6 0 0 1 6-6Z"
            fill="#fff"
          />
          <g fill="#0d1424">
            <circle cx="88" cy="95" r="3.4" />
            <circle cx="99" cy="95" r="3.4" />
            <circle cx="110" cy="95" r="3.4" />
          </g>
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 124 116" fill="none" aria-hidden="true">
          <path d="M18 62V52a44 44 0 0 1 88 0v10" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
          <rect x="4" y="54" width="22" height="40" rx="11" fill="#fff" />
          <rect x="98" y="54" width="22" height="40" rx="11" fill="#fff" />
          <path d="M109 94v6a10 10 0 0 1-10 10H74" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="68" cy="110" rx="9" ry="6" fill="#fff" />
          <circle cx="62" cy="62" r="29" fill="#fff" />
          <text
            x="62"
            y="70"
            fontFamily="var(--font-ui), Arial, sans-serif"
            fontSize="22"
            fontWeight="600"
            fill="#e23324"
            textAnchor="middle"
          >
            LIVE
          </text>
        </svg>
      );
  }
}

export default function NeonCard({ card }: { card: HeroCard }) {
  return (
    /* No rounded-[14px] here: the corner now lives in .db-neon-card, and an
       unlayered rule in globals.css beats a utility for the same property. */
    <div
      className={`db-neon-card flex flex-col items-center px-[clamp(10px,1vw,18px)] pt-[clamp(12px,1.6vw,26px)] pb-[clamp(14px,1.8vw,28px)] ${
        card.tone === "red" ? "db-neon-card--red" : ""
      }`}
    >
      <h2 className="db-neon-card__title font-ui m-0 flex h-[2.36em] shrink-0 items-center justify-center text-center leading-[1.18] font-medium tracking-[.01em] whitespace-pre text-white">
        {card.title}
      </h2>
      <div className="my-[clamp(12px,1.7vw,24px)] flex h-[clamp(50px,6.8vw,112px)] shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-auto">
        <CardArt art={card.art} />
      </div>
      <p className="db-neon-card__included font-ui m-0 mt-auto flex min-h-[2.4em] shrink-0 items-center justify-center text-center font-semibold tracking-[.16em] whitespace-nowrap text-white/85 uppercase">
        {card.description}
      </p>
    </div>
  );
}
