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
    const first = Object.keys(next)[0];
    if (first) root.current?.querySelector<HTMLElement>(`#f-${first}`)?.focus();
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
      return;
    }
    setSent(values);
    handoff();
    if (!prefersReducedMotion() && panel.current) {
      gsap.fromTo(panel.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
  };

  return (
    <section data-surface="page" className="db-section bg-page">
      <div className="db-shell">
        <div ref={root} className="db-record overflow-hidden">
          {/* record header */}
          <div className="border-line flex flex-wrap items-center gap-3 border-b px-[clamp(20px,2.4vw,36px)] py-4">
            <span className="db-chip bg-brand/10 text-brand">
              <i />
              New enquiry
            </span>
            <h2 className="db-h3 text-ink">
              Get in touch
            </h2>
            <span className="db-sm text-ink-3 ml-auto hidden sm:block">
              Usually answered within one business day
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
            {/* ---- the form ---- */}
            <div className="p-[clamp(20px,2.4vw,36px)]">
              {sent ? (
                <div ref={panel}>
                  <div className="bg-green/10 text-green db-sm mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-semibold">
                    <Icon name="check" className="h-4 w-4" />
                    Draft ready in your email app
                  </div>
                  <h3 className="db-h2 text-ink">
                    Thanks, {sent.name.split(" ")[0]}.
                  </h3>
                  <p className="db-body text-ink-2 mt-3 max-w-[52ch]">
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
                        <dt className="db-kicker text-ink-3">
                          {k}
                        </dt>
                        <dd className="db-sm text-ink m-0 break-words">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={handoff} className="db-btn db-btn--primary">
                      Open email again
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(null);
                        setValues(EMPTY);
                      }}
                      className="db-btn db-btn--quiet"
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
                          className="db-sm text-ink mb-1.5 block font-semibold"
                        >
                          {f.label}
                          {!f.required && <span className="text-ink-3 font-normal"> (optional)</span>}
                        </label>
                        <div className="db-field-wrap relative">
                          <Icon name={f.icon} className="db-field-icon" />
                          <input
                            id={`f-${f.name}`}
                            type={f.type}
                            name={f.name}
                            required={f.required}
                            autoComplete={f.name === "company" ? "organization" : f.type === "tel" ? "tel" : f.name}
                            className="db-input"
                            placeholder={f.placeholder}
                            value={values[f.name]}
                            onChange={(e) => set(f.name, e.target.value)}
                            aria-invalid={errors[f.name] ? "true" : undefined}
                            aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
                          />
                        </div>
                        {errors[f.name] && (
                          <p id={`e-${f.name}`} className="db-xs text-db-red mt-1.5 font-semibold">
                            {errors[f.name]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div data-row className="sm:col-span-2">
                      <label htmlFor="f-subject" className="db-sm text-ink mb-1.5 block font-semibold">
                        What is it about?
                      </label>
                      <select
                        id="f-subject"
                        className="db-input db-input--plain"
                        value={values.subject}
                        onChange={(e) => set("subject", e.target.value)}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div data-row className="sm:col-span-2">
                      <label htmlFor="f-message" className="db-sm text-ink mb-1.5 block font-semibold">
                        Message
                      </label>
                      <textarea
                        id="f-message"
                        name="message"
                        required
                        rows={5}
                        className="db-input db-input--plain resize-y"
                        placeholder="Tell us what you are trying to do and we will point you at the right part of the product."
                        value={values.message}
                        onChange={(e) => set("message", e.target.value)}
                        aria-invalid={errors.message ? "true" : undefined}
                        aria-describedby={errors.message ? "e-message" : undefined}
                      />
                      {errors.message && (
                        <p id="e-message" className="db-xs text-db-red mt-1.5 font-semibold">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div data-row className="mt-6 flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      className="db-btn db-btn--primary"
                    >
                      Send message
                    </button>
                    <p className="db-xs text-ink-3 m-0 max-w-[34ch]">
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
                      <span className="db-h4 text-ink block">{a.title}</span>
                      <span className="db-sm text-ink-2 mt-1 block">{a.body}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-line mt-7 border-t pt-6">
                <p className="db-kicker text-ink-3 mb-3">Rather talk now?</p>
                <a
                  href={CONTACT.phone.href}
                  className="font-body text-ink hover:text-brand block text-[clamp(20px,1.6vw,26px)] leading-none font-bold tracking-[-.01em] transition-colors"
                >
                  {CONTACT.phone.label}
                </a>
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="db-sm text-ink-2 hover:text-brand mt-3 block transition-colors"
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
