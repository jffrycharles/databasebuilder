/** The eyebrow above a heading.
 *
 *  It used to be three separate dashes — brand blue, brand red, then a short
 *  grey stub — which read as leftover marks rather than one designed thing,
 *  the grey one especially. It is a single rule now, carrying the same
 *  blue-to-red the section rules and the scrollbar already use, so the eyebrow
 *  and the rule under a heading speak the same language. */
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
      <span className="db-label__bar" aria-hidden="true" />
      {children}
    </span>
  );
}
