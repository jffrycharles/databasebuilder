"use client";

import { useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { gsap, prefersReducedMotion, useGsap } from "@/lib/gsap";
import { ASSURANCES, CONTACT, SUBJECTS } from "@/lib/contact";

/* ---------------------------------------------------------------------------
   There is no backend on this project, and inventing one would mean silently
   dropping people's messages. So the form validates in the browser and then
   hands off to the visitor's mail client with everything filled in, and shows
   a confirmation panel with the same details.

   To post to a real endpoint later, replace `handoff()` with a fetch to your
   API route and keep the same `sent` state for the confirmation panel.
   --------------------------------------------------------------------------- */

type Field = {
  name: keyof FormValues;
  label: string;
  type: "text" | "email" | "tel";
  icon: IconName;
  placeholder: string;
  required?: boolean;
  half?: boolean;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

const FIELDS: Field[] = [
  { name: "name", label: "Your name", type: "text", icon: "user", placeholder: "Alex Johnson", required: true, half: true },
  { name: "company", label: "Company", type: "text", icon: "api", placeholder: "Acme Co.", half: true },
  { name: "email", label: "Email", type: "email", icon: "mail", placeholder: "you@company.com", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", icon: "phone", placeholder: "+1 773 000 0000", half: true },
];

const EMPTY: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: SUBJECTS[0],
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState<FormValues | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useGsap(() => {
    gsap.from("[data-row]", {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
    });
  }, root);

  const set = (key: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = "Tell us who you are.";
    if (!values.email.trim()) next.email = "We need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "That address looks incomplete.";
    if (values.message.trim().length < 10) next.message = "A sentence or two is plenty.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handoff = () => {
    const body = [
      `Name: ${values.name}`,
      values.company && `Company: ${values.company}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      `Subject: ${values.subject}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `${values.subject} — ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const first = root.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setSent(values);
    handoff();
    if (!prefersReducedMotion() && panel.current) {
      gsap.fromTo(panel.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
  };

  return (
    <section className="db-section bg-page">
      <div className="db-shell">
        <div ref={root} className="db-record overflow-hidden">
          {/* record header */}
          <div className="border-line flex flex-wrap items-center gap-3 border-b px-[clamp(20px,2.4vw,36px)] py-4">
            <span className="db-chip bg-brand/10 text-brand">
              <i />
              New enquiry
            </span>
            <h2 className="font-body text-ink m-0 text-[clamp(16px,1.2vw,20px)] font-bold">
              Get in touch
            </h2>
            <span className="text-ink-3 ml-auto hidden text-[13px] sm:block">
              Usually answered within one business day
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
            {/* ---- the form ---- */}
            <div className="p-[clamp(20px,2.4vw,36px)]">
              {sent ? (
                <div ref={panel}>
                  <div className="bg-green/10 text-green mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[14px] font-semibold">
                    <Icon name="check" className="h-4 w-4" />
                    Draft ready in your email app
                  </div>
                  <h3 className="font-body text-ink m-0 text-[clamp(19px,1.5vw,25px)] font-bold tracking-[-.01em]">
                    Thanks, {sent.name.split(" ")[0]}.
                  </h3>
                  <p className="text-ink-2 mt-2.5 max-w-[52ch] text-[15px] leading-[1.6]">
                    Your message has been handed to your email client, addressed to{" "}
                    <a className="text-brand font-semibold" href={`mailto:${CONTACT.email}`}>
                      {CONTACT.email}
                    </a>
                    . Send it from there and a person will pick it up. If nothing opened, copy the
                    details below into an email.
                  </p>

                  <dl className="border-line mt-6 grid gap-0 rounded-[12px] border">
                    {[
                      ["Name", sent.name],
                      ["Company", sent.company || "—"],
                      ["Email", sent.email],
                      ["Phone", sent.phone || "—"],
                      ["Subject", sent.subject],
                      ["Message", sent.message],
                    ].map(([k, v], i) => (
                      <div
                        key={k}
                        className={`grid grid-cols-[minmax(80px,26%)_minmax(0,1fr)] gap-3 px-4 py-3 ${
                          i === 0 ? "" : "border-line border-t"
                        }`}
                      >
                        <dt className="font-ui text-ink-3 text-[11.5px] tracking-[.14em] uppercase">
                          {k}
                        </dt>
                        <dd className="text-ink m-0 text-[14.5px] leading-snug break-words">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={handoff} className="db-cta-btn font-ui rounded-[9px] px-5 py-3 text-[15px] font-semibold tracking-[.03em] text-white uppercase">
                      Open email again
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(null);
                        setValues(EMPTY);
                      }}
                      className="border-line text-ink-2 hover:text-brand rounded-[9px] border bg-white px-5 py-3 text-[15px] font-semibold transition-colors"
                    >
                      Write another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <div key={f.name} data-row className={f.half ? "" : "sm:col-span-2"}>
                        <label
                          htmlFor={`f-${f.name}`}
                          className="text-ink mb-1.5 block text-[13.5px] font-semibold"
                        >
                          {f.label}
                          {!f.required && <span className="text-ink-3 font-normal"> (optional)</span>}
                        </label>
                        <div className="db-field-wrap relative">
                          <Icon name={f.icon} className="db-field-icon" />
                          <input
                            id={`f-${f.name}`}
                            type={f.type}
                            className="db-field"
                            placeholder={f.placeholder}
                            value={values[f.name]}
                            onChange={(e) => set(f.name, e.target.value)}
                            aria-invalid={errors[f.name] ? "true" : undefined}
                            aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
                          />
                        </div>
                        {errors[f.name] && (
                          <p id={`e-${f.name}`} className="text-db-red mt-1.5 text-[12.5px] font-semibold">
                            {errors[f.name]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div data-row className="sm:col-span-2">
                      <label htmlFor="f-subject" className="text-ink mb-1.5 block text-[13.5px] font-semibold">
                        What is it about?
                      </label>
                      <select
                        id="f-subject"
                        className="db-field db-field--plain"
                        value={values.subject}
                        onChange={(e) => set("subject", e.target.value)}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div data-row className="sm:col-span-2">
                      <label htmlFor="f-message" className="text-ink mb-1.5 block text-[13.5px] font-semibold">
                        Message
                      </label>
                      <textarea
                        id="f-message"
                        rows={5}
                        className="db-field db-field--plain resize-y"
                        placeholder="Tell us what you are trying to do and we will point you at the right part of the product."
                        value={values.message}
                        onChange={(e) => set("message", e.target.value)}
                        aria-invalid={errors.message ? "true" : undefined}
                        aria-describedby={errors.message ? "e-message" : undefined}
                      />
                      {errors.message && (
                        <p id="e-message" className="text-db-red mt-1.5 text-[12.5px] font-semibold">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div data-row className="mt-6 flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      className="db-cta-btn font-ui rounded-[9px] px-6 py-3.5 text-[clamp(15px,1.05vw,17px)] font-semibold tracking-[.03em] text-white uppercase"
                    >
                      Send message
                    </button>
                    <p className="text-ink-3 m-0 max-w-[34ch] text-[12.5px] leading-snug">
                      Opens a prefilled email to {CONTACT.email} — nothing is stored on this site.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* ---- side rail ---- */}
            <aside className="border-line bg-page border-t p-[clamp(20px,2.4vw,32px)] lg:border-t-0 lg:border-l">
              <p className="db-kicker text-ink-3 mb-4">Why it is worth writing</p>
              <ul className="m-0 grid list-none gap-5 p-0">
                {ASSURANCES.map((a) => (
                  <li key={a.title} className="flex items-start gap-3">
                    <span className="bg-brand/10 text-brand mt-px grid h-8 w-8 shrink-0 place-items-center rounded-[9px]">
                      <Icon name={a.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="text-ink block text-[14.5px] font-bold">{a.title}</span>
                      <span className="text-ink-2 mt-1 block text-[13.5px] leading-snug">{a.body}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-line mt-7 border-t pt-6">
                <p className="db-kicker text-ink-3 mb-3">Rather talk now?</p>
                <a
                  href={CONTACT.phone.href}
                  className="font-body text-ink hover:text-brand block text-[clamp(19px,1.5vw,24px)] font-bold tracking-[-.01em] transition-colors"
                >
                  {CONTACT.phone.label}
                </a>
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-2 hover:text-brand mt-3 block text-[14px] leading-snug transition-colors"
                >
                  {CONTACT.address.line1}
                  <br />
                  {CONTACT.address.line2}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
