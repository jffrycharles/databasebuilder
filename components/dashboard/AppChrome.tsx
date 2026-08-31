import Globe from "@/components/ui/Globe";
import { Icon } from "@/components/ui/Icon";
import { APP_SIDEBAR } from "@/lib/data";

/** The dark product sidebar. Everything is sized in `em` so the whole mock
    scales from one container-query font-size — it stays readable from 375px
    up to a full-width expanded panel. */
export function AppSidebar({ active }: { active: string }) {
  return (
    <div className="hidden bg-[#0e1c36] py-[1.273em] text-white/70 md:block">
      <div className="flex items-center gap-[0.727em] px-[1.273em] pb-[1.455em]">
        <Globe className="h-[2em] w-[2em] shrink-0" rings={9} density={13} spin={30} />
        <span className="font-display text-[1.045em] text-white italic">
          Database<em className="text-db-red italic">Builder</em>
        </span>
      </div>
      <ul className="m-0 list-none p-0">
        {APP_SIDEBAR.map((item) => {
          const on = item.label === active;
          return (
            <li
              key={item.label}
              className={
                on
                  ? "bg-brand mx-[0.727em] flex items-center gap-[0.909em] rounded-md px-[0.909em] py-[0.545em] font-medium text-white"
                  : "flex items-center gap-[0.909em] px-[1.273em] py-[0.545em] font-medium"
              }
            >
              <Icon name={item.icon} className={`h-[1.273em] w-[1.273em] ${on ? "" : "opacity-75"}`} />
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AppFrame({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="db-app grid md:grid-cols-[minmax(150px,20%)_minmax(0,1fr)]" role="img" aria-label={label}>
      {children}
    </div>
  );
}
