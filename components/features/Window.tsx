import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** the address shown in the bar; omit for a plain app window */
  url?: string;
  /** "dark" sits on the black bands */
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** crop the capture to this aspect ratio (top-anchored), e.g. "2 / 1" —
      for screens that have to share one frame size */
  ratio?: string;
};

/**
 * A product screenshot in a window: three dots and an address bar over the
 * real capture, nothing drawn on top of it.
 *
 * Served as-is (unoptimized): Next's optimiser re-encodes UI captures and
 * softens the 10–12px type in them, which is the part that has to stay
 * legible. The files in public/features/ are already the right size.
 */
export default function Window({
  src,
  alt,
  width,
  height,
  url,
  tone = "light",
  sizes,
  priority,
  className = "",
  ratio,
}: Props) {
  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized
      className="db-win__img"
    />
  );
  return (
    <figure className={`db-win db-win--${tone} ${className}`}>
      <div className="db-win__bar" aria-hidden="true">
        <span className="db-win__dots">
          <i />
          <i />
          <i />
        </span>
        {url && <span className="db-win__url">{url}</span>}
      </div>
      {ratio ? (
        <div className="db-win__crop" style={{ aspectRatio: ratio }}>
          {img}
        </div>
      ) : (
        img
      )}
    </figure>
  );
}

/** A native-size crop of the same screenshot, floated over it so the detail
    reads at full size while the whole screen gives the context. */
export function Detail({
  src,
  alt,
  width,
  height,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`db-detail ${className}`} data-fx="detail">
      <figcaption className="db-detail__label">{label}</figcaption>
      <Image src={src} alt={alt} width={width} height={height} unoptimized className="db-detail__img" />
    </figure>
  );
}
