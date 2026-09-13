"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { gsap, prefersReducedMotion, useGsap } from "@/lib/gsap";
import { ASSURANCES, CONTACT, SUBJECTS } from "@/lib/contact";

/* ---------------------------------------------------------------------------
   Submitting posts to /api/contact, which forwards to whatever
   CONTACT_WEBHOOK_URL names. If that is not configured yet — or the upstream
   is down — the route says so and we fall back to the old behaviour of
   handing the message to the visitor's mail client.

   The confirmation tells the truth about which of those happened, because
   "thanks, we'll be in touch" over a mailto draft the visitor never sent is a
   lie, and it loses enquiries. Either way the details are on screen with a
   copy button, so nobody is left with nowhere to go.
   --------------------------------------------------------------------------- */

type Field = {
  name: keyof FormValues;
  label: string;
  type: "text" | "email" | "tel";
  icon: IconName;
  placeholder: string;
  /** the token browsers and password managers match on to offer autofill */
  autoComplete: string;
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

/** what actually happened to the message */
type Outcome = "delivered" | "handoff";

const FIELDS: Field[] = [
  { name: "name", label: "Your name", type: "text", icon: "user", placeholder: "Alex Johnson", autoComplete: "name", required: true, half: true },
  { name: "company", label: "Company", type: "text", icon: "api", placeholder: "Acme Co.", autoComplete: "organization", half: true },
  { name: "email", label: "Email", type: "email", icon: "mail", placeholder: "you@company.com", autoComplete: "email", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", icon: "phone", placeholder: "+1 773 000 0000", autoComplete: "tel", half: true },
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
  const [outcome, setOutcome] = useState<Outcome>("handoff");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  /* Bots fill every field they can find; this one is hidden from people. */
  const [website, setWebsite] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const sentOnce = useRef(false);
  const focusInvalid = useRef(false);

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

  /* Once the errors have painted, send the caret to the first field that
     needs attention. */
  useEffect(() => {
    if (!focusInvalid.current) return;
    focusInvalid.current = false;
    root.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  /* Submitting swaps the form out for the confirmation. Without this the
     caret is left on a button that no longer exists — it falls back to the top
     of the document and a screen reader announces nothing at all. */
  useEffect(() => {
    if (!sent || !sentOnce.current) return;
    const el = panel.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    if (!prefersReducedMotion()) {
      gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
  }, [sent]);

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

  const plain = (v: FormValues) =>
    [
      `Name: ${v.name}`,
      v.company && `Company: ${v.company}`,
      `Email: ${v.email}`,
      v.phone && `Phone: ${v.phone}`,
      `Subject: ${v.subject}`,
      "",
      v.message,
    ]
      .filter(Boolean)
      .join("\n");

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(plain(sent));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked — the details are on screen to select by hand */
    }
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      /* Deferred to an effect on purpose: setErrors has not rendered yet, so
         nothing carries aria-invalid at this point and the query would come
         back empty — leaving the caret on the submit button. */
      focusInvalid.current = true;
      return;
    }

    setBusy(true);
    let delivered = false;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      delivered = res.ok;
    } catch {
      delivered = false; // offline, blocked, or the route is unreachable
    }

    setBusy(false);
    setOutcome(delivered ? "delivered" : "handoff");
    setSent(values);
    sentOnce.current = true;
    // only bother the mail client when we could not deliver it ourselves
    if (!delivered) handoff();
  };

  return (
    <section className="db-section db-section--airy bg-page">
      <div className="db-shell">
        <div ref={root} className="db-record overflow-hidden">
          {/* record header */}
          <div className="border-line flex flex-wrap items-center gap-3.5 border-b px-[clamp(22px,2.8vw,46px)] py-[clamp(16px,1.5vw,22px)]">
            <span className="db-chip bg-brand/10 text-brand">
              <i />
              New enquiry
            </span>
            <h2 className="font-display text-ink m-0 text-[clamp(18px,1.5vw,26px)] leading-none tracking-[.01em] uppercase">
              Get in touch
            </h2>
            <span className="text-ink-3 ml-auto hidden text-[13px] sm:block">
              Usually answered within one business day
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
            {/* ---- the form ---- */}
            <div className="relative p-[clamp(22px,2.8vw,46px)]">
              {sent ? (
                <div ref={panel} role="status" aria-live="polite" tabIndex={-1}>
                  <div className="bg-green/10 text-green mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[14px] font-semibold">
                    <Icon name="check" className="h-4 w-4" />
                    {outcome === "delivered" ? "Message sent" : "Draft ready in your email app"}
                  </div>
                  <h3 className="font-display text-ink m-0 text-[clamp(19px,1.55vw,25px)] leading-none tracking-[.01em] uppercase">
                    Thanks, {sent.name.split(" ")[0]}.
                  </h3>
                  <p className="text-ink-2 mt-2.5 max-w-[52ch] text-[15px] leading-[1.6]">
                    {outcome === "delivered" ? (
                      <>
                        We have it — nothing else to do. A person will reply to{" "}
                        <span className="text-ink font-semibold">{sent.email}</span>, usually within
                        one business day.
                      </>
                    ) : (
                      <>
                        Your message has been handed to your email client, addressed to{" "}
                        <a className="text-brand font-semibold" href={`mailto:${CONTACT.email}`}>
                          {CONTACT.email}
                        </a>
                        .{" "}
                        <span className="text-ink font-semibold">
                          It is not sent until you send it from there.
                        </span>{" "}
                        If nothing opened, copy the details below and email them to us.
                      </>
                    )}
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

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {outcome === "handoff" && (
                      <button type="button" onClick={handoff} className="db-cta-btn font-ui rounded-[9px] px-5 py-3 text-[15px] font-semibold tracking-[.03em] text-white uppercase">
                        Open email again
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={copy}
                      className="border-line text-ink-2 hover:text-brand inline-flex items-center gap-2 rounded-[9px] border bg-white px-5 py-3 text-[15px] font-semibold transition-colors"
                    >
                      <Icon name={copied ? "check" : "clip"} className="h-4 w-4" />
                      {copied ? "Copied" : "Copy message"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(null);
                        setValues(EMPTY);
                        setWebsite("");
                        setCopied(false);
                      }}
                      className="border-line text-ink-2 hover:text-brand rounded-[9px] border bg-white px-5 py-3 text-[15px] font-semibold transition-colors"
                    >
                      Write another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  {/* Not display:none — some bots skip those. Off-screen and
                      out of the tab order, so nobody real ever meets it. */}
                  <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="f-website">Leave this field empty</label>
                    <input
                      id="f-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-[clamp(18px,1.7vw,26px)] sm:grid-cols-2">
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
                            name={f.name}
                            type={f.type}
                            autoComplete={f.autoComplete}
                            className="db-field"
                            placeholder={f.placeholder}
                            value={values[f.name]}
                            onChange={(e) => set(f.name, e.target.value)}
                            aria-required={f.required || undefined}
                            aria-invalid={errors[f.name] ? "true" : undefined}
                            aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
                          />
                        </div>
                        {errors[f.name] && (
                          <p
                            id={`e-${f.name}`}
                            role="alert"
                            className="text-db-red mt-1.5 text-[12.5px] font-semibold"
                          >
                            {errors[f.name]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div data-row className="sm:col-span-2">
                      <label htmlFor="f-subject" className="text-ink mb-1.5 block text-[13.5px] font-semibold">
                        What is it about?
                      </label>
                      <div className="db-field-wrap relative">
                        <Icon name="tag" className="db-field-icon" />
                        <select
                          id="f-subject"
                          name="subject"
                          className="db-field db-field--select"
                          value={values.subject}
                          onChange={(e) => set("subject", e.target.value)}
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div data-row className="sm:col-span-2">
                      <label htmlFor="f-message" className="text-ink mb-1.5 block text-[13.5px] font-semibold">
                        Message
                      </label>
                      <textarea
                        id="f-message"
                        name="message"
                        rows={5}
                        aria-required
                        className="db-field db-field--plain resize-y"
                        placeholder="Tell us what you are trying to do and we will point you at the right part of the product."
                        value={values.message}
                        onChange={(e) => set("message", e.target.value)}
                        aria-invalid={errors.message ? "true" : undefined}
                        aria-describedby={errors.message ? "e-message" : undefined}
                      />
                      {errors.message && (
                        <p id="e-message" role="alert" className="text-db-red mt-1.5 text-[12.5px] font-semibold">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div data-row className="mt-[clamp(26px,2.6vw,40px)] flex flex-wrap items-center gap-x-6 gap-y-4">
                    <button
                      type="submit"
                      disabled={busy}
                      aria-busy={busy}
                      className="db-cta-btn font-ui rounded-[9px] px-6 py-3.5 text-[clamp(15px,1.05vw,17px)] font-semibold tracking-[.03em] text-white uppercase disabled:cursor-wait disabled:opacity-70"
                    >
                      {busy ? "Sending…" : "Send message"}
                    </button>
                    <p className="text-ink-3 m-0 max-w-[46ch] text-[13px] leading-relaxed">
                      Goes straight to {CONTACT.email}. If we cannot deliver it, your email app
                      opens with the message ready instead.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* ---- side rail ---- */}
            <aside className="border-line bg-page border-t p-[clamp(22px,2.6vw,40px)] lg:border-t-0 lg:border-l">
              <p className="db-kicker text-ink-3 mb-4">Why it is worth writing</p>
              <ul className="m-0 grid list-none gap-[clamp(20px,2vw,28px)] p-0">
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
