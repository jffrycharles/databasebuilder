import Reveal from "@/components/animations/Reveal";
import Label from "@/components/ui/Label";
import HeroField from "@/components/ui/HeroField";

type Props = {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** optional right-hand column — keeps inner pages asymmetric, like the homepage */
  aside?: React.ReactNode;
  /** the aside is content, not decoration, so it can take the wider half */
  asideWide?: boolean;
};

/**
 * The dark opener for every inner page: the homepage hero's gradient recipe,
 * the same coloured-bar label and the same display face, at roughly two
 * thirds of a screen rather than all of it — a full-height opener on a page
 * whose job is to hand you to the content just leaves a dark empty room.
 */
export default function PageHero({ label, title, lede, aside, asideWide = false }: Props) {
  return (
    <section id="top" className="db-page-band db-page-hero">
      <HeroField />
      <div
        className={`db-shell relative z-[2] grid flex-1 grid-cols-1 content-center items-center gap-[var(--db-gap-lg)] pt-[clamp(36px,4vw,64px)] pb-[clamp(44px,5vw,84px)] ${
          aside ? (asideWide ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1.15fr_0.85fr]") : ""
        }`}
      >
        <div>
          <Reveal>
            <Label tone="dark" className="mb-5">
              {label}
            </Label>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="db-h1 max-w-[17ch] text-white">{title}</h1>
          </Reveal>
          {lede && (
            <Reveal delay={130}>
              <p className="db-lede mt-5 max-w-[52ch] text-white/70">{lede}</p>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={160}>{aside}</Reveal>}
      </div>
    </section>
  );
}
