import { Icon } from "@/components/ui/Icon";
import type { FaqItem } from "@/lib/faq";

/** Native <details> so it works without JavaScript, is keyboard accessible by
    default and cannot desync from React state. Questions are hairline-divided
    rows — inside one card where the accordion needs its own definition, and
    bare on the page where the column already is the accordion. Either way the
    open row is marked by a blue-to-red rule down its edge, not another border. */
export default function Accordion({
  items,
  openFirst = false,
  bare = false,
}: {
  items: FaqItem[];
  openFirst?: boolean;
  bare?: boolean;
}) {
  const pad = bare ? "pl-[clamp(14px,1.3vw,22px)]" : "px-[clamp(16px,1.7vw,30px)]";
  return (
    <div className={bare ? "border-line border-y" : "db-card overflow-hidden"}>
      {items.map((item, i) => (
        <details key={item.id} id={item.id} className={`db-faq ${pad}`} open={openFirst && i === 0}>
          <summary className="db-h4 text-ink flex cursor-pointer list-none items-start gap-4 py-[clamp(16px,1.5vw,22px)]">
            <span className="min-w-0 flex-1">{item.question}</span>
            <span className="db-faq__icon mt-px">
              <Icon name="plus" className="h-3.5 w-3.5" />
            </span>
          </summary>
          <div className="db-faq__body">
            <div>
              <div className="db-prose text-ink-2 max-w-[66ch] pb-[clamp(16px,1.5vw,22px)]">
                {item.answer.map((p) => (
                  <p key={p} className="db-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
