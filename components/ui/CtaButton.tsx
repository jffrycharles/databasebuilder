import { SITE } from "@/lib/data";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

export default function CtaButton({ children = "Start Free Trial", className = "", href = SITE.register }: Props) {
  return (
    <a
      href={href}
      className={`db-cta-btn font-ui inline-block rounded-[9px] px-[1.15em] py-[.46em] font-semibold tracking-[.03em] text-white uppercase ${className}`}
    >
      {children}
    </a>
  );
}
