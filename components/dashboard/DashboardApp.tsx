"use client";

import { useRef } from "react";
import { AppFrame, AppSidebar } from "./AppChrome";
import { Icon } from "@/components/ui/Icon";
import CountUp from "@/components/animations/CountUp";
import { gsap, useGsap } from "@/lib/gsap";
import { ACTIVITY, KPIS, PIPELINE } from "@/lib/data";

export default function DashboardApp() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
    });

    tl.from("[data-kpi]", { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 })
      .fromTo(
        "[data-bar]",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, stagger: 0.08, transformOrigin: "0% 50%" },
        "-=0.2",
      )
      .from("[data-activity]", { opacity: 0, x: -10, duration: 0.42, stagger: 0.07 }, "-=0.45");
  }, root);

  return (
    <div ref={root}>
      <AppFrame
        id="dbDash"
        label="DatabaseBuilder dashboard showing monthly KPIs, a pipeline funnel and recent activity."
      >
        <AppSidebar active="Dashboard" />

        <div className="min-w-0 bg-white">
          <div className="border-line flex items-center gap-[0.909em] border-b px-[1.273em] py-[1.091em]">
            <h3 className="font-body text-ink m-0 text-[1.273em] font-bold">Dashboard</h3>
            <span className="border-line text-ink-3 ml-auto rounded-full border bg-[#f3f5f9] px-[0.909em] py-[0.364em] text-[0.909em]">
              This Month ▾
            </span>
            <span className="bg-brand rounded-full px-[0.909em] py-[0.364em] text-[0.909em] font-semibold text-white">
              + Add
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[0.909em] p-[1.091em] sm:grid-cols-4">
            {KPIS.map((k) => (
              <div
                key={k.label}
                data-kpi
                className="border-line hover:border-brand/40 rounded-[0.818em] border p-[0.909em] transition-colors"
              >
                <div className="text-ink-3 text-[0.864em] font-medium">{k.label}</div>
                <div className="font-body text-ink text-[2em] leading-tight font-bold">
                  <CountUp value={k.value} />
                </div>
                <div className="text-green text-[0.864em] font-semibold">{k.delta}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-[0.909em] px-[1.091em] pb-[1.091em] sm:grid-cols-2">
            <div className="border-line rounded-[0.818em] border p-[1.091em]">
              <h4 className="text-ink m-0 mb-[0.909em] text-[0.955em] font-bold">Pipeline Overview</h4>
              <div className="flex items-center gap-[1.091em]">
                <div className="flex shrink-0 flex-col items-center gap-[0.273em]" aria-hidden="true">
                  {PIPELINE.map((s) => (
                    <i
                      key={s.label}
                      data-bar
                      className="block h-[1.364em] rounded-sm"
                      style={{ width: s.width, background: s.tint }}
                    />
                  ))}
                </div>
                <div className="text-ink-2 flex min-w-0 flex-col gap-[0.545em] text-[0.864em]">
                  {PIPELINE.map((s) => (
                    <div key={s.label} className="flex items-center gap-[0.545em]">
                      <s
                        className="h-[0.727em] w-[0.727em] shrink-0 rounded-sm no-underline"
                        style={{ background: s.tint }}
                      />
                      {s.label}
                      <b className="text-ink ml-auto font-bold">{s.value}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-line rounded-[0.818em] border p-[1.091em]">
              <h4 className="text-ink m-0 mb-[0.909em] text-[0.955em] font-bold">Recent Activity</h4>
              <div className="flex flex-col gap-[0.909em]">
                {ACTIVITY.map((a) => (
                  <div key={a.title} data-activity className="flex items-start gap-[0.727em] text-[0.864em]">
                    <Icon name={a.icon} className="text-brand mt-px h-[1.091em] w-[1.091em] shrink-0" />
                    <span>
                      <span className="text-ink block font-semibold">{a.title}</span>
                      <span className="text-ink-3">{a.time}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}
