/** The homepage's coloured-bar marker, as a static label. */
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
      <span className="db-label__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {children}
    </span>
  );
}
