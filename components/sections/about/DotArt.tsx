/* Dot-matrix marks for the origin panels.
 *
 * Neon uses a dot grid as its card mark; the reason it is safe to borrow the
 * idea here is that the DatabaseBuilder logo is already a sphere built out of
 * dots, so the vocabulary is the brand's own rather than the reference's. Each
 * mark is generated from a formula so the four read as one family.
 *
 * No randomness: the values are computed from the index, so server and client
 * render identical markup. */
const R = 2.05;
const STEP = 9;
const N = 7;

type Shape = "sphere" | "rise" | "grid" | "ring";

function dots(shape: Shape) {
  const out: { x: number; y: number; o: number }[] = [];
  const mid = (N - 1) / 2;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const dx = c - mid;
      const dy = r - mid;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let o = 0;
      if (shape === "sphere") o = dist <= mid + 0.35 ? 1 - dist / (mid + 1.6) : 0;
      if (shape === "rise") o = c <= r + 0.5 ? 0.3 + (c / (N - 1)) * 0.7 : 0;
      if (shape === "grid") o = (r + c) % 2 === 0 ? 0.85 : 0.22;
      if (shape === "ring") o = Math.abs(dist - mid * 0.78) < 0.85 ? 1 : dist < mid * 0.4 ? 0.28 : 0;
      if (o > 0.02) out.push({ x: c * STEP, y: r * STEP, o: Math.min(1, o) });
    }
  }
  return out;
}

export default function DotArt({ shape, className = "" }: { shape: Shape; className?: string }) {
  const size = (N - 1) * STEP + R * 2;
  return (
    <svg
      viewBox={`${-R} ${-R} ${size} ${size}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {dots(shape).map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={R} fill="currentColor" opacity={d.o} />
      ))}
    </svg>
  );
}
