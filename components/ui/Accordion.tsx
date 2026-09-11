import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/lib/faq";

/** Native <details> so it works without JavaScript, is keyboard accessible by
    default and cannot desync from React state. The open/close is a CSS grid
    transition, so there is no layout jump. */
export default function Accordion({ items, openFirst = false }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="db-card-flat overflow-hidden">
      {items.map((item, i) => (
        <details
          key={item.id}
          id={item.id}
          className="db-faq group border-line px-[clamp(16px,1.6vw,26px)] [&:not(:first-child)]:border-t"
          open={openFirst && i === 0}
        >
          <summary className="text-ink flex cursor-pointer list-none items-start gap-4 py-[clamp(15px,1.4vw,20px)] text-[clamp(15px,1vw,17.5px)] leading-snug font-bold">
            {item.question}
            <span className="border-line text-brand ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-open:rotate-45">
              <Icon name="plus" className="h-3.5 w-3.5" />
            </span>
          </summary>
          <div className="db-faq__body">
            <div>
              {item.answer.map((p) => (
                <p
                  key={p}
                  className="text-ink-2 m-0 max-w-[68ch] pb-[clamp(14px,1.3vw,18px)] text-[clamp(14px,0.9vw,16.5px)] leading-[1.65]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
