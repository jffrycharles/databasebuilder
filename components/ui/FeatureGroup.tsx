import { Icon } from "@/components/ui/Icon";
import type { FeatureGroup as Group } from "@/lib/features";

/** One capability, as a row rather than a card: name and context on the left,
    the features it contains on the right. Five of these read as a table of
    what you get; five cards read as five things to compare. */
export default function FeatureGroup({ group }: { group: Group }) {
  return (
    <div className="grid gap-x-[clamp(24px,3vw,64px)] gap-y-4 py-[clamp(22px,2.4vw,34px)] md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <div className="flex items-center gap-3">
          <span className="bg-brand/10 text-brand grid h-9 w-9 shrink-0 place-items-center rounded-[8px]">
            <Icon name={group.icon} className="h-[17px] w-[17px]" />
          </span>
          <h3 className="db-h3 text-ink">{group.title}</h3>
        </div>
        <p className="db-sm text-ink-2 mt-2.5 max-w-[32ch]">{group.blurb}</p>
      </div>
      <ul className="m-0 grid list-none gap-x-8 gap-y-2.5 p-0 sm:grid-cols-2">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Icon name="check" className="text-green mt-0.5 h-[17px] w-[17px] shrink-0" />
            <span className="db-sm text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
