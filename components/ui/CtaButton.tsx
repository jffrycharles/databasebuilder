import { SITE } from "@/lib/data";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  /** `lg` is the hero / closing-band size; `sm` is the header */
  size?: "sm" | "md" | "lg";
  /** the only two fills on the site */
  variant?: "primary" | "ghost" | "quiet";
  block?: boolean;
};

/**
 * The one button on the site. Every call to action — header, hero, pricing
 * card, FAQ rail, contact form, closing band — is this component or the same
 * `.db-btn` classes, so there is never a second red with a different radius.
 */
export default function CtaButton({
  children = "Start Free Trial",
  className = "",
  href = SITE.register,
  size = "md",
  variant = "primary",
  block = false,
}: Props) {
  const cls = [
    "db-btn",
    `db-btn--${variant}`,
    size === "sm" ? "db-btn--sm" : size === "lg" ? "db-btn--lg" : "",
    block ? "db-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
