import { SITE } from "@/lib/data";

type Props = {
  /** Wordmark size in px or a CSS length; the descriptor scales from it. */
  size?: number | string;
  tone?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
};

/** The DatabaseBuilder wordmark: one word, "Builder" always in brand red. */
export default function Logo({ size = 20, tone = "light", className = "", showTagline = true }: Props) {
  const ink = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white" : "text-ink-2";
  const taglineSize = typeof size === "number"
    ? Math.max(7, size * 0.37)
    : `max(7px, calc(${size} * 0.37))`;
  return (
    <span className={className}>
      <span
        className={`font-display block leading-none whitespace-nowrap italic ${ink}`}
        style={{ fontSize: size, letterSpacing: "-.005em" }}
      >
        Database<em className="text-db-red italic">Builder</em>
      </span>
      {showTagline && (
        <span
          className={`font-ui mt-1 block pl-[.34em] font-medium ${sub}`}
          style={{ fontSize: taglineSize, letterSpacing: ".34em" }}
        >
          {SITE.tagline.toUpperCase()}
        </span>
      )}
    </span>
  );
}
