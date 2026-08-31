import { SITE } from "@/lib/data";

type Props = {
  /** wordmark size in px (the descriptor scales from it) */
  size?: number;
  tone?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
};

/** The DatabaseBuilder wordmark: one word, "Builder" always in brand red. */
export default function Logo({ size = 20, tone = "light", className = "", showTagline = true }: Props) {
  const ink = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white" : "text-ink-2";
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
          style={{ fontSize: Math.max(7, size * 0.37), letterSpacing: ".34em" }}
        >
          {SITE.tagline.toUpperCase()}
        </span>
      )}
    </span>
  );
}
