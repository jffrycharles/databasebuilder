/* Glowing sweeps for the inner-page heroes.

   No SVG filters. feGaussianBlur on an animated stroke forces Safari to
   re-rasterise the filter region every frame, which is what made these heroes
   lag. The bloom is now three stacked strokes at decreasing width and rising
   opacity — the same look, rendered once — and only a short dash moves, via
   stroke-dashoffset on an unfiltered path. */

const PATHS = [
  { d: "M-40 476C300 452 560 318 780 214 980 120 1220 74 1500 66", hue: "blue", run: "db-run--1" },
  { d: "M-40 596C260 574 520 500 760 396 1010 288 1240 236 1500 232", hue: "blue", run: "db-run--3" },
  { d: "M1500 152C1200 176 980 268 760 372 560 466 300 540 -40 556", hue: "red", run: "db-run--2" },
];

export default function GlowLines() {
  return (
    <svg
      className="db-lines"
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dbLineBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2e52ff" stopOpacity="0" />
          <stop offset="26%" stopColor="#2e52ff" stopOpacity=".95" />
          <stop offset="62%" stopColor="#8fa8ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#2e52ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dbLineRed" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#e23324" stopOpacity="0" />
          <stop offset="30%" stopColor="#e23324" stopOpacity=".95" />
          <stop offset="66%" stopColor="#ff8a76" stopOpacity="1" />
          <stop offset="100%" stopColor="#e23324" stopOpacity="0" />
        </linearGradient>
      </defs>

      {PATHS.map((p, i) => {
        const stroke = p.hue === "red" ? "url(#dbLineRed)" : "url(#dbLineBlue)";
        return (
          <g key={i}>
            <path d={p.d} stroke={stroke} strokeWidth="16" opacity=".10" />
            <path d={p.d} stroke={stroke} strokeWidth="7" opacity=".22" />
            <path d={p.d} stroke={stroke} strokeWidth="2.6" opacity=".7" />
            <path d={p.d} stroke={p.hue === "red" ? "#ffd9d2" : "#dce9ff"} strokeWidth="1.1" opacity=".9" />
            <path
              className={`db-run ${p.run}`}
              d={p.d}
              pathLength="100"
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeDasharray="6 94"
              strokeLinecap="round"
              opacity=".95"
            />
          </g>
        );
      })}
    </svg>
  );
}
