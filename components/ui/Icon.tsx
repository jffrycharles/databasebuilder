/* Icon set lifted verbatim from the original sprite: one <symbol> per icon,
   defined once and referenced with <use>. */

export const ICON_NAMES = [
  "api", "bell", "bolt", "cal", "card", "chart", "chat", "check", "clip", "clock", "dots", "fb", "gear", "grid", "headset", "li", "mail", "monitor", "phone", "pin", "plus", "rec", "search", "send", "share", "shield", "swap", "tag", "tw", "upload", "user", "video", "voicemail", "yt",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Rendered once, near the top of <body>. */
export function IconSprite() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <g id="i-api"><rect x="4" y="4" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="13" y="4" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="4" y="13" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="13" y="13" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-bell"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.6 2.4H4.4L6 16z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M10 21h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-bolt"><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></g>
        <g id="i-cal"><rect x="3.5" y="5.5" width="17" height="15" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3.5 10h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-card"><rect x="3" y="5.5" width="18" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3 10h18" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-chart"><path d="M4 20V10M9.5 20V5M15 20v-7M20.5 20V8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/></g>
        <g id="i-chat"><path d="M4 5.5h16v10H9l-5 4V5.5z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></g>
        <g id="i-check"><path d="M4.5 12.5l5 5L19.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g id="i-clip"><path d="M15 7l-6.5 6.5a3.2 3.2 0 0 0 4.5 4.5L20 11a5.2 5.2 0 0 0-7.4-7.4L5.5 10.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g id="i-clock"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M12 7.5V12l3.4 2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-dots"><circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/></g>
        <g id="i-fb"><path d="M14.5 8.5h2.2V5.4h-2.7c-2.4 0-3.9 1.5-3.9 4v2.1H8v3.1h2.1V21h3.3v-6.4h2.3l.4-3.1h-2.7V9.9c0-.9.4-1.4 1.1-1.4z" fill="currentColor"/></g>
        <g id="i-gear"><circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-grid"><rect x="4" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-headset"><path d="M5 14v-2a7 7 0 0 1 14 0v2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><rect x="3" y="13" width="4" height="7" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7"/><rect x="17" y="13" width="4" height="7" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-li"><path d="M5.5 9.5h3V20h-3zM7 4.4a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10.6 9.5h2.9v1.4c.5-.9 1.6-1.7 3.2-1.7 2.5 0 3.8 1.6 3.8 4.5V20h-3v-5.6c0-1.4-.5-2.2-1.7-2.2-1.1 0-1.9.7-1.9 2.2V20h-3.3z" fill="currentColor"/></g>
        <g id="i-mail"><rect x="3" y="5.5" width="18" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3.8 7l8.2 6 8.2-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></g>
        <g id="i-monitor"><rect x="3" y="4.5" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M9 20h6M12 16.5V20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-phone"><path d="M4 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v4c0 1-1 2-2 2A15 15 0 0 1 2 5c0-1 1-2 2-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></g>
        <g id="i-pin"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-plus"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></g>
        <g id="i-rec"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.2" fill="currentColor"/></g>
        <g id="i-search"><circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M15.6 15.6L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g id="i-send"><path d="M3.5 12L20.5 4 15 20l-4.2-5.6L3.5 12z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></g>
        <g id="i-share"><circle cx="6" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17" cy="6" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17" cy="18" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M8.2 10.9l6.6-3.6M8.2 13.1l6.6 3.6" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-shield"><path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 12l2.2 2.2L15.5 10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-swap"><path d="M4 8h13l-3-3M20 16H7l3 3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g id="i-tag"><path d="M11 3.5H20.5V13L11.5 22 2.5 13l8.5-9.5z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/></g>
        <g id="i-tw"><path d="M20 6.6c-.6.3-1.3.5-2 .6a3.3 3.3 0 0 0-5.7 2.3v.7A9.3 9.3 0 0 1 5 6.7s-3.5 8 4.5 11.4c-1.5.9-3.2 1.3-5 1.2 8 4.4 17.5 0 17.5-10.3 0-.3 0-.5-.1-.8.7-.7 1.3-1.5 1.6-2.4-.6.3-1.2.6-1.9.7z" fill="currentColor"/></g>
        <g id="i-upload"><path d="M12 16V4.5M7.5 9L12 4.5 16.5 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.5 15v3.5h15V15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g id="i-user"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M4.5 20c1.2-4 4-5.6 7.5-5.6S18.3 16 19.5 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></g>
        <g id="i-video"><rect x="3" y="6" width="12" height="12" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M15 10.5l6-3v9l-6-3z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></g>
        <g id="i-voicemail"><circle cx="6.5" cy="13" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="17.5" cy="13" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M6.5 16.4h11" stroke="currentColor" strokeWidth="1.7"/></g>
        <g id="i-yt"><path d="M21 8.4c-.2-1.3-.8-2.1-2.1-2.3-2.2-.3-4.5-.3-6.9-.3s-4.7 0-6.9.3C3.8 6.3 3.2 7.1 3 8.4c-.2 1.2-.2 2.4-.2 3.6s0 2.4.2 3.6c.2 1.3.8 2.1 2.1 2.3 2.2.3 4.5.3 6.9.3s4.7 0 6.9-.3c1.3-.2 1.9-1 2.1-2.3.2-1.2.2-2.4.2-3.6s0-2.4-.2-3.6zM10.2 15.1V8.9l5.3 3.1-5.3 3.1z" fill="currentColor"/></g>
      </defs>
    </svg>
  );
}
