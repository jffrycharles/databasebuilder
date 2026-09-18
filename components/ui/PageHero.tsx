import Reveal from "@/components/animations/Reveal";
import Label from "@/components/ui/Label";
import { WaveDivider } from "@/components/sections/HeroArt";
import HeroAtmosphere from "@/components/ui/HeroAtmosphere";

type Props = {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** optional right-hand column — keeps inner pages asymmetric, like the homepage */
  aside?: React.ReactNode;
  /** The wave hands the dark band off into a LIGHT page — its fill is the page
      colour. Set false when the next section is dark, or it draws a white band
      across the seam. */
  wave?: boolean;
};

/**
 * The dark opener for every inner page. Same gradient recipe, same column
 * lines and the same wave hand-off into the light page as the homepage hero —
 * just shorter, and with the homepage's heading scale rather than a display
 * headline, so no inner page shouts louder than the hero. The chrome is fixed
 * and transparent, so the band reserves its height rather than sitting under
 * it.
 *
 * The backdrop is the same drifting, breathing atmosphere the story opener
 * uses. The sweeping light lines it replaced ran straight through the lede on
 * every one of these pages.
 */
export default function PageHero({ label, title, lede, aside, wave = true }: Props) {
  return (
    <section id="top" tabIndex={-1} className="db-page-band db-page-band--full db-under-header flex flex-col">
      <HeroAtmosphere scrim={!!aside} />
      <div
        className={`db-shell relative z-[2] grid flex-1 content-center items-center gap-[clamp(28px,3.4vw,56px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,6vw,96px)] ${
          aside ? "lg:grid-cols-[1.12fr_0.88fr]" : "justify-items-center text-center"
        }`}
      >
        <div className={aside ? "" : "flex flex-col items-center"}>
          <Reveal>
            {aside ? (
              <Label tone="dark" className="mb-5">
                {label}
              </Label>
            ) : (
              /* the ruled eyebrow from the story hero, so every opener matches */
              <p className="db-eyebrow-rule mb-5">
                <span aria-hidden="true" />
                {label}
                <span aria-hidden="true" />
              </p>
            )}
          </Reveal>
          <Reveal delay={70}>
            <h1 className="font-display m-0 max-w-[18ch] text-[clamp(38px,5.2vw,84px)] leading-[1.0] tracking-[.02em] text-white">
              {title}
            </h1>
          </Reveal>
          {lede && (
            <Reveal delay={130}>
              <p className="mt-4 max-w-[56ch] text-[clamp(15px,1vw,18px)] leading-[1.62] text-white/70">
                {lede}
              </p>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={160}>{aside}</Reveal>}
      </div>
      {wave && <WaveDivider />}
    </section>
  );
}
