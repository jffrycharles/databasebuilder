"use client";

import { useRef } from "react";
import { AppFrame, AppSidebar } from "./AppChrome";
import { Icon } from "@/components/ui/Icon";
import { gsap, ScrollTrigger, useGsap } from "@/lib/gsap";
import { CONVERSATIONS, INBOX_TABS, THREAD } from "@/lib/data";

export default function InboxApp() {
  const root = useRef<HTMLDivElement>(null);

  useGsap(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
    });

    tl.from("[data-conv]", { opacity: 0, x: -12, duration: 0.42, stagger: 0.06 })
      .from("[data-bubble]", { opacity: 0, y: 14, scale: 0.96, duration: 0.4, stagger: 0.16 }, "-=0.15")
      .from("[data-composer]", { opacity: 0, y: 10, duration: 0.4 }, "-=0.2")
      .fromTo("[data-unread]", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.4)" }, "-=0.5");

    ScrollTrigger.refresh();
  }, root);

  return (
    <div ref={root}>
      <AppFrame id="dbInbox" label="DatabaseBuilder inbox showing calls, SMS and email in one thread list.">
        <AppSidebar active="Messages" />

        <div className="min-w-0 bg-white">
          <div className="border-line flex items-center gap-[0.909em] border-b px-[1.273em] py-[1.091em]">
            <h3 className="font-body text-ink m-0 text-[1.273em] font-bold">Inbox</h3>
            <span
              data-unread
              className="bg-db-red hidden rounded-full px-[0.6em] py-[0.2em] text-[0.75em] font-bold text-white sm:inline-block"
            >
              3 new
            </span>
            <span className="border-line text-ink-3 ml-auto hidden items-center gap-[0.545em] rounded-full border bg-[#f3f5f9] px-[0.909em] py-[0.364em] text-[0.909em] sm:flex">
              <Icon name="search" className="h-[1.091em] w-[1.091em]" />
              Search conversations…
            </span>
            <span className="bg-brand rounded-full px-[0.909em] py-[0.364em] text-[0.909em] font-semibold text-white">
              New Message
            </span>
          </div>

          <div className="border-line text-ink-3 flex gap-[1.455em] border-b px-[1.273em] py-[0.909em] text-[0.955em] font-medium">
            {INBOX_TABS.map((tab, i) => (
              <span
                key={tab}
                className={
                  i === 0
                    ? "text-brand after:bg-brand relative font-bold after:absolute after:-bottom-2.5 after:left-0 after:right-0 after:h-0.5"
                    : undefined
                }
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-[minmax(130px,32%)_minmax(0,1fr)]">
            <div className="border-line hidden border-r p-[0.727em] sm:block">
              {CONVERSATIONS.map((c) => (
                <div
                  key={c.name}
                  data-conv
                  className={`flex min-w-0 items-center gap-[0.727em] rounded-md p-[0.545em] transition-colors ${
                    c.active ? "bg-[#e8f1fe]" : "hover:bg-[#f4f7fc]"
                  }`}
                >
                  <span
                    className="grid h-[2em] w-[2em] shrink-0 place-items-center rounded-full text-[0.727em] font-bold text-white"
                    style={{ background: c.tint }}
                  >
                    {c.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="text-ink block truncate text-[0.955em] leading-tight font-semibold">
                      {c.name}
                    </span>
                    <span className="text-ink-3 block truncate text-[0.818em]">{c.meta}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex min-h-[22.727em] flex-col">
              <div className="border-line flex items-center gap-[0.727em] border-b px-[1.091em] py-[0.909em]">
                <span>
                  <span className="text-ink text-[1em] font-bold">{THREAD.name}</span>{" "}
                  <span className="text-ink-3 text-[0.864em]">{THREAD.phone}</span>
                </span>
                <span className="text-ink-2 ml-auto flex gap-[0.909em]">
                  <Icon name="phone" className="h-[1.273em] w-[1.273em]" />
                  <Icon name="mail" className="h-[1.273em] w-[1.273em]" />
                  <Icon name="dots" className="h-[1.273em] w-[1.273em]" />
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-[1.091em] p-[1.091em]">
                {THREAD.messages.map((m, i) => (
                  <span
                    key={i}
                    data-bubble
                    className={
                      m.from === "them"
                        ? "text-ink max-w-[76%] self-start rounded-xl bg-[#eef1f6] px-[0.909em] py-[0.727em] text-[0.955em] leading-snug"
                        : "bg-brand max-w-[76%] self-end rounded-xl px-[0.909em] py-[0.727em] text-[0.955em] leading-snug text-white"
                    }
                  >
                    {m.text}
                    <span className="mt-[0.364em] block text-[0.773em] opacity-60">{m.time}</span>
                  </span>
                ))}
              </div>

              <div
                data-composer
                className="border-line text-ink-3 mx-[1.091em] mb-[1.091em] flex items-center gap-[0.909em] rounded-full border px-[1.091em] py-[0.727em] text-[0.909em]"
              >
                Type a message…
                <span className="ml-auto flex items-center gap-[0.909em]">
                  <Icon name="clip" className="h-[1.273em] w-[1.273em]" />
                  <Icon name="plus" className="h-[1.273em] w-[1.273em]" />
                  <Icon name="send" className="text-brand h-[1.273em] w-[1.273em]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}
