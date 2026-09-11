import Reveal from "@/components/animations/Reveal";
import Label from "@/components/ui/Label";
import { WaveDivider } from "@/components/sections/HeroArt";
import GlowLines from "@/components/ui/GlowLines";

type Props = {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** optional right-hand column — keeps inner pages asymmetric, like the homepage */
  aside?: React.ReactNode;
};

/**
 * The dark opener for every inner page. Same gradient recipe, same column
 * lines and the same wave hand-off into the light page as the homepage hero —
 * just shorter, and with the homepage's heading scale rather than a display
 * headline, so no inner page shouts louder than the hero. The chrome is fixed
 * and transparent, so the band reserves its height rather than sitting under
 * it.
 */
export default function PageHero({ label, title, lede, aside }: Props) {
  return (
    <section id="top" className="db-page-band db-under-header flex min-h-[max(560px,100svh)] flex-col">
      <GlowLines />
      <div
        className={`db-shell relative z-[2] flex-1 grid content-center items-center gap-[clamp(28px,3.4vw,56px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,6vw,96px)] ${
          aside ? "lg:grid-cols-[1.12fr_0.88fr]" : ""
        }`}
      >
        <div>
          <Reveal>
            <Label tone="dark" className="mb-5">
              {label}
            </Label>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="font-display m-0 max-w-[18ch] text-[clamp(30px,3.6vw,56px)] leading-[1.02] tracking-[.005em] text-white uppercase">
              {title}
            </h1>
          </Reveal>
          {lede && (
            <Reveal delay={130}>
              <p className="mt-4 max-w-[54ch] text-[clamp(15px,1vw,18px)] leading-[1.62] text-white/70">
                {lede}
              </p>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={160}>{aside}</Reveal>}
      </div>
      <WaveDivider />
    </section>
  );
}
