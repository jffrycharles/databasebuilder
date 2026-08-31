/* The hero's light architecture. The orbit uses a square viewBox centred on
   the ring's own centre, so its parent can be a square box pinned to the
   globe's centre — that keeps the rings perfectly circular and the globe
   inside them at every screen size. */

export function OrbitRings() {
  return (
    <svg viewBox="70 -50 760 760" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="dbArchBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="11" />
        </filter>
        <linearGradient id="dbArchG" x1=".3" y1="0" x2="1" y2=".85">
          <stop offset="0%" stopColor="#1226f0" />
          <stop offset="52%" stopColor="#2e52ff" />
          <stop offset="78%" stopColor="#5b3ce0" />
          <stop offset="100%" stopColor="#e23324" />
        </linearGradient>
        <linearGradient id="dbArchFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1226f0" stopOpacity="0" />
          <stop offset="46%" stopColor="#1f3cf6" stopOpacity=".85" />
          <stop offset="100%" stopColor="#2e52ff" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="dbArchCore" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e6f2ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#eef6ff" stopOpacity=".9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
      </defs>
      <g filter="url(#dbArchBlur)">
        <circle cx="450" cy="330" r="272" stroke="url(#dbArchG)" strokeWidth="24" opacity=".55" />
        <circle cx="450" cy="330" r="272" stroke="url(#dbArchFade)" strokeWidth="9" />
        <circle cx="450" cy="330" r="303" stroke="url(#dbArchG)" strokeWidth="6" opacity=".5" />
        <circle cx="450" cy="330" r="334" stroke="url(#dbArchG)" strokeWidth="4" opacity=".32" />
      </g>
      <circle cx="450" cy="330" r="272" stroke="url(#dbArchCore)" strokeWidth="2.4" />
      <g className="db-runners" strokeLinecap="round" fill="none">
        <circle
          className="db-run db-run--1"
          cx="450"
          cy="330"
          r="272"
          pathLength="100"
          stroke="#2e52ff"
          strokeWidth="9"
          strokeDasharray="8 92"
          opacity=".8"
        />
        <circle
          className="db-run db-run--2"
          cx="450"
          cy="330"
          r="272"
          pathLength="100"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="5 95"
        />
        <circle
          className="db-run db-run--3 max-sm:hidden"
          cx="450"
          cy="330"
          r="303"
          pathLength="100"
          stroke="#7f96ff"
          strokeWidth="3"
          strokeDasharray="4 96"
          opacity=".7"
        />
      </g>
    </svg>
  );
}

export function FloorRibbons() {
  return (
    <svg className="db-floor" viewBox="0 0 1200 300" fill="none" aria-hidden="true">
      <defs>
        <filter id="dbFloorGlow" x="-15%" y="-60%" width="130%" height="260%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id="dbFloorG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1226f0" stopOpacity="0" />
          <stop offset="12%" stopColor="#1226f0" stopOpacity=".9" />
          <stop offset="34%" stopColor="#2e52ff" stopOpacity="1" />
          <stop offset="52%" stopColor="#8fa8ff" stopOpacity="1" />
          <stop offset="70%" stopColor="#ff7a63" stopOpacity="1" />
          <stop offset="88%" stopColor="#e23324" stopOpacity=".9" />
          <stop offset="100%" stopColor="#e23324" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dbFloorCore" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e6f2ff" stopOpacity="0" />
          <stop offset="16%" stopColor="#e6f2ff" stopOpacity=".85" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="84%" stopColor="#ffefea" stopOpacity=".85" />
          <stop offset="100%" stopColor="#ffefea" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dbFloorDim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1226f0" stopOpacity="0" />
          <stop offset="24%" stopColor="#2e52ff" stopOpacity=".5" />
          <stop offset="60%" stopColor="#7a5bf0" stopOpacity=".45" />
          <stop offset="86%" stopColor="#e23324" stopOpacity=".5" />
          <stop offset="100%" stopColor="#e23324" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter="url(#dbFloorGlow)">
        <ellipse cx="600" cy="130" rx="470" ry="78" stroke="url(#dbFloorDim)" strokeWidth="3" />
        <ellipse cx="600" cy="150" rx="530" ry="98" stroke="url(#dbFloorG)" strokeWidth="13" opacity=".5" />
        <ellipse cx="600" cy="150" rx="530" ry="98" stroke="url(#dbFloorG)" strokeWidth="4" />
        <ellipse cx="600" cy="176" rx="585" ry="120" stroke="url(#dbFloorG)" strokeWidth="3.5" />
        <ellipse cx="600" cy="206" rx="575" ry="112" stroke="url(#dbFloorDim)" strokeWidth="2.5" opacity=".55" />
      </g>
      <ellipse cx="600" cy="150" rx="530" ry="98" stroke="url(#dbFloorCore)" strokeWidth="1.8" />
      <ellipse cx="600" cy="176" rx="585" ry="120" stroke="url(#dbFloorCore)" strokeWidth="1.4" opacity=".7" />
      <g className="db-runners" fill="none" strokeLinecap="round">
        <ellipse
          className="db-run db-run--f1"
          cx="600"
          cy="150"
          rx="530"
          ry="98"
          pathLength="100"
          stroke="#6f8dff"
          strokeWidth="9"
          strokeDasharray="7 93"
          opacity=".75"
        />
        <ellipse
          className="db-run db-run--f2"
          cx="600"
          cy="150"
          rx="530"
          ry="98"
          pathLength="100"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeDasharray="5 95"
        />
        <ellipse
          className="db-run db-run--f3 max-sm:hidden"
          cx="600"
          cy="176"
          rx="585"
          ry="120"
          pathLength="100"
          stroke="#ffb3a6"
          strokeWidth="3"
          strokeDasharray="4 96"
          opacity=".7"
        />
      </g>
    </svg>
  );
}

/** One shallow elliptical arc that hands the dark hero over to the white page. */
export function WaveDivider() {
  return (
    <div className="db-wave relative z-[6] -mb-px">
      <svg className="db-curve" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="dbWaveLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2e52ff" stopOpacity="0" />
            <stop offset="16%" stopColor="#2e52ff" stopOpacity=".85" />
            <stop offset="46%" stopColor="#a8c4ff" stopOpacity=".9" />
            <stop offset="72%" stopColor="#ff8a76" stopOpacity=".7" />
            <stop offset="100%" stopColor="#e23324" stopOpacity="0" />
          </linearGradient>
          <filter id="dbWaveGlow" x="-4%" y="-260%" width="108%" height="620%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <path d="M0 28C420 134 1000 134 1440 60V140H0Z" fill="#f1f4f8" />
        <path
          d="M0 28C420 134 1000 134 1440 60"
          fill="none"
          stroke="url(#dbWaveLine)"
          strokeWidth="7"
          opacity=".45"
          filter="url(#dbWaveGlow)"
        />
        <path d="M0 28C420 134 1000 134 1440 60" fill="none" stroke="url(#dbWaveLine)" strokeWidth="1.6" />
      </svg>
    </div>
  );
}
