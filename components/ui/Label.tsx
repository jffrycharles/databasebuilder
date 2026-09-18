/** The eyebrow above a heading.
 *
 *  A rule either side of the word, not a single bar stuck on its left. The
 *  bar-on-the-left version read as a leftover mark — the client's words were
 *  blunter than that — while the flanked treatment is the one the page
 *  openers already use for "ABOUT US" and "CONTACT US". This makes every
 *  eyebrow on the site that one thing.
 *
 *  Red on both sides, fading out at the far ends, so it reads as a rule the
 *  word sits inside rather than as two dashes. */
export default function Label({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`db-label ${tone === "dark" ? "db-label--on-dark text-white/70" : "text-ink-3"} ${className}`}
    >
      <i className="db-label__rule" aria-hidden="true" />
      {children}
      <i className="db-label__rule" aria-hidden="true" />
    </span>
  );
}
