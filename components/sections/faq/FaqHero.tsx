import Image from "next/image";

export default function FaqHero() {
  return (
    <section id="top" tabIndex={-1} className="db-faq-hero">
      <Image
        src="/faq/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="db-faq-hero__image"
      />
      <div className="db-faq-shell db-faq-hero__content">
        <h1>FAQ</h1>
        <p>
          How can we assist you today? Please look below for answers on related
          questions regarding our product &amp; features, data, sales, &amp; policy.
        </p>
      </div>
    </section>
  );
}
