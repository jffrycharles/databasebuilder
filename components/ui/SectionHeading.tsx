import Reveal from "@/components/animations/Reveal";
import Label from "@/components/ui/Label";

type Props = {
  label?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** the story pages set their headings in the display face, like the heroes */
  display?: boolean;
  className?: string;
};

/** Section headings, sized to the homepage's own H2 — not oversized. */
export default function SectionHeading({
  label,
  title,
  lede,
  align = "left",
  tone = "light",
  display = false,
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${
        centered
          ? `mx-auto text-center ${display ? "max-w-[880px]" : "max-w-[640px]"}`
          : "max-w-[52ch]"
      } ${className}`}
    >
      {label && (
        <Label tone={tone} className="mb-4">
          {label}
        </Label>
      )}
      <h2
        className={`m-0 ${
          display
            ? "font-display text-[clamp(25px,2.45vw,40px)] leading-[1.04] font-normal tracking-[.005em] text-balance uppercase"
            : "font-body text-[clamp(26px,2.4vw,40px)] leading-[1.1] font-bold tracking-[-.02em]"
        } ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-3.5 text-[clamp(15px,0.92vw,17.5px)] leading-[1.62] ${
            tone === "dark" ? "text-white/70" : "text-ink-2"
          } ${centered ? "mx-auto" : ""}`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
