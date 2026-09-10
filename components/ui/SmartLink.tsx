import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Internal routes go through the Next router; anything external, or a
    mailto/tel, stays a plain anchor. Same-page hashes are picked up by the
    Lenis click handler in SmoothScroll. */
export default function SmartLink({ href, children, ...rest }: Props) {
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}
