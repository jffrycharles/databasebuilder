import Reveal from "@/components/animations/Reveal";
import Label from "@/components/ui/Label";

type Props = {
  label?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** renders an <h3> where the section already owns the page's <h2> */
  as?: "h2" | "h3";
  className?: string;
};

/** Every section heading on the site: bar label, one H2 step, one lede step. */
export default function SectionHeading({
  label,
  title,
  lede,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto max-w-[660px] text-center" : "max-w-[54ch]"} ${className}`}>
      {label && (
        <Label tone={tone} className="mb-4">
          {label}
        </Label>
      )}
      <Tag className={`db-h2 ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</Tag>
      {lede && (
        <p className={`db-lede mt-4 ${tone === "dark" ? "text-white/70" : "text-ink-2"}`}>{lede}</p>
      )}
    </Reveal>
  );
}
