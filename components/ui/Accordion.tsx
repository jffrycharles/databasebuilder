import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/lib/faq";

/** Native <details> so it works without JavaScript, is keyboard accessible by
    default and cannot desync from React state. The open/close is a CSS grid
    transition, so there is no layout jump. */
export default function Accordion({
  items,
  openFirst = false,
  /** Start every row open. Used on the homepage, where the answers have to be
      readable without interaction so a crawler — or an AI summarising the page
      — sees them. They still collapse if someone clicks. */
  openAll = false,
  variant = "card",
}: {
  items: FaqItem[];
  openFirst?: boolean;
  openAll?: boolean;
  variant?: "card" | "plain";
}) {
  return (
    <div className={variant === "plain" ? "db-faq-list" : "db-card-flat overflow-hidden"}>
      {items.map((item, i) => (
        <details
          key={item.id}
          id={item.id}
          className={`db-faq group ${variant === "plain" ? "db-faq--plain" : "border-line px-[clamp(18px,2vw,34px)] [&:not(:first-child)]:border-t"}`}
          open={openAll || (openFirst && i === 0)}
        >
          <summary className="db-faq__q text-ink flex cursor-pointer list-none items-start gap-5 py-[clamp(19px,1.85vw,30px)]">
            <h3 className="m-0 text-[length:inherit] leading-[inherit] font-[inherit]">
              {item.question}
            </h3>
            <span aria-hidden="true" className={variant === "plain" ? "db-faq__toggle" : "border-line text-brand ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-open:rotate-45"}>
              <Icon name="plus" className="h-3.5 w-3.5" />
            </span>
          </summary>
          <div className="db-faq__body">
            <div>
              {item.answer.map((p) => (
                <p
                  key={p}
                  className="text-ink-2 m-0 max-w-[68ch] pb-[clamp(18px,1.9vw,28px)] text-[clamp(14.5px,0.92vw,17px)] leading-[1.72] [&:first-child]:pt-1"
                >
                  {variant === "plain" ? linkedAnswer(p) : p}
                </p>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

/** Keep restored contact links useful without injecting the old site's HTML. */
function linkedAnswer(text: string) {
  return text.split(/([\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}|773-273-7310)/g).map((part, index) => {
    if (part.includes("@")) return <a key={index} href={`mailto:${part}`}>{part}</a>;
    if (part === "773-273-7310") return <a key={index} href="tel:+17732737310">{part}</a>;
    return part;
  });
}
