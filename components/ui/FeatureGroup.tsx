import { Icon } from "@/components/ui/Icon";
import type { FeatureGroup as Group } from "@/lib/features";

/** One capability group: icon, name, a line of context, then its features. */
export default function FeatureGroup({ group }: { group: Group }) {
  return (
    <div className="db-card-flat h-full p-[clamp(18px,1.8vw,28px)]">
      <div className="mb-3.5 flex items-center gap-3">
        <span className="bg-brand/10 text-brand grid h-10 w-10 shrink-0 place-items-center rounded-[10px]">
          <Icon name={group.icon} className="h-[18px] w-[18px]" />
        </span>
        <h3 className="font-display text-ink m-0 text-[clamp(17px,1.35vw,23px)] leading-none tracking-[.01em]">
          {group.title}
        </h3>
      </div>
      <p className="text-ink-2 m-0 text-[clamp(14px,0.88vw,15.5px)] leading-[1.6]">{group.blurb}</p>
      <ul className="border-line mt-4 grid list-none gap-2.5 border-t p-0 pt-4">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Icon name="check" className="text-green mt-0.5 h-[17px] w-[17px] shrink-0" />
            <span className="text-ink text-[clamp(13.8px,0.86vw,15.5px)] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
