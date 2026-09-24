"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import SmartLink from "@/components/ui/SmartLink";
import { gsap, prefersReducedMotion, useGsap } from "@/lib/gsap";
import { CHANNELS, SUBJECTS } from "@/lib/contact";

/* Delivery stays on /api/contact. Failed requests retain the draft for retry. */

type Field = {
  name: keyof FormValues;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  /** the token browsers and password managers match on to offer autofill */
  autoComplete: string;
  /** which keyboard a phone should offer */
  inputMode?: "email" | "tel";
  /** the API trims to these lengths, so the field stops there too rather
      than letting someone write past the cap and lose the tail in silence */
  max: number;
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
  { name: "name", label: "Your name", type: "text", placeholder: "Your full name", autoComplete: "name", max: 120, required: true, half: true },
  { name: "company", label: "Company", type: "text", placeholder: "Your company", autoComplete: "organization", max: 160, half: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email", inputMode: "email", max: 160, required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "Your phone number", autoComplete: "tel", inputMode: "tel", max: 60, half: true },
];

const MESSAGE_MAX = 5000;
/** the last stretch, where a count starts being worth showing */
const COUNT_FROM = MESSAGE_MAX - 500;

const EMPTY: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: SUBJECTS[0],
  message: "",
};

export default function ContactForm({ scheduleCallUrl }: { scheduleCallUrl?: string }) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState<FormValues | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  /* Bots fill every field they can find; this one is hidden from people. */
  const [website, setWebsite] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const sentOnce = useRef(false);
  const focusInvalid = useRef(false);
  const submitting = useRef(false);
  const errorPanel = useRef<HTMLParagraphElement>(null);

  useGsap(() => {
    gsap.from("[data-row]", {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: "power3.out",
      stagger: 0.035,
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
    if (!sentOnce.current) return;
    if (!sent) {
      root.current?.querySelector<HTMLInputElement>("#f-name")?.focus();
      return;
    }
    const el = panel.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    if (!prefersReducedMotion()) {
      const animation = gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      return () => { animation.revert(); };
    }
  }, [sent]);

  useEffect(() => {
    if (submitError) errorPanel.current?.focus({ preventScroll: true });
  }, [submitError]);

  /* maxLength stops typing and pasting, but not an autofill or a password
     manager, and the API trims silently — so the cap is applied here too. */
  const CAPS: Record<keyof FormValues, number> = {
    name: 120, email: 160, phone: 60, company: 160, subject: 120, message: MESSAGE_MAX,
  };

  const set = (key: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value.slice(0, CAPS[key]) }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const problem = (key: keyof FormValues, v: FormValues): string | undefined => {
    if (key === "name" && !v.name.trim()) return "Tell us who you are.";
    if (key === "email") {
      if (!v.email.trim()) return "We need an address to reply to.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) return "That address looks incomplete.";
    }
    if (key === "message" && v.message.trim().length < 10) return "A sentence or two is plenty.";
    return undefined;
  };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    for (const key of ["name", "email", "message"] as const) {
      const said = problem(key, values);
      if (said) next[key] = said;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* Checked when you leave a field, so a mistyped address is caught while you
     are still looking at it. An empty field says nothing yet — tabbing through
     a form you have not filled in should not set it shouting. */
  const leave = (key: keyof FormValues) => {
    if (!values[key].trim()) return;
    const said = problem(key, values);
    if (said) setErrors((e) => ({ ...e, [key]: said }));
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    setSubmitError("");
    if (!validate()) {
      /* Deferred to an effect on purpose: setErrors has not rendered yet, so
         nothing carries aria-invalid at this point and the query would come
         back empty — leaving the caret on the submit button. */
      focusInvalid.current = true;
      return;
    }

    submitting.current = true;
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website }),
        signal: AbortSignal.timeout(15_000),
      });
      const result = await res.json();
      if (!res.ok || result?.delivered !== true) {
        throw new Error(typeof result?.error === "string"
          ? result.error
          : "We could not send your message. Please try again in a moment.");
      }
      sentOnce.current = true;
      setSent(values);
    } catch (error) {
      setSubmitError(error instanceof Error && error.name === "Error"
        ? error.message
        : "We could not send your message. Check your connection and try again. Your message is still here.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  return (
    <section id="contact-form" className="db-contact-start" aria-labelledby="contact-heading">
      <div className="db-contact-shell">
        <div className="db-contact-layout">
          <div className="db-contact-intro">
            <h1 id="contact-heading" className="db-contact-title">
              Contact <span>Us</span>
            </h1>
            <p className="db-contact-lede">
              We are happy to help with any issue or question about the CRM.
            </p>
          </div>
          {/* ---- the form ---- */}
          <div ref={root} className="db-record db-contact-panel">
            {sent ? (
              <div ref={panel} role="status" aria-live="polite" tabIndex={-1}>
                <div className="text-db-red border-line mb-5 inline-flex items-center gap-2.5 rounded-full border bg-white px-4 py-2 text-[14px] font-semibold">
                  <Icon name="check" className="h-4 w-4" />
                  Message sent
                </div>
                <h2 className="font-display m-0 text-[clamp(19px,1.55vw,25px)] text-ink leading-none tracking-[.01em]">
                  Thanks, {sent.name.split(" ")[0]}.
                </h2>
                <p className="text-ink-2 mt-3 max-w-[52ch] text-[15px] leading-[1.6]">
                  We have it — nothing else to do. A person will reply to{" "}
                  <span className="text-ink font-semibold">{sent.email}</span>.
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
                  <button
                    type="button"
                    onClick={copy}
                    className="font-ui inline-flex items-center gap-2 border-line hover:text-brand rounded-[9px] border bg-white px-5 py-3 text-[14px] font-medium tracking-[.06em] text-ink-2 uppercase transition-colors"
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
                    className="font-ui border-line hover:text-brand rounded-[9px] border bg-white px-5 py-3 text-[14px] font-medium tracking-[.06em] text-ink-2 uppercase transition-colors"
                  >
                    Write another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-busy={busy} aria-label="Send us a message">
                <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0">
                  <legend className="sr-only">Your contact details and message</legend>
                {/* Not display:none — some bots skip those. Off-screen and out of
                    the tab order, so nobody real ever meets it. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="f-website">Leave this field empty</label>
                  {/* The opt-outs 1Password, LastPass and Dashlane honour: a
                      manager filling this would otherwise get a real person
                      treated as a bot. */}
                  <input
                    id="f-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    data-form-type="other"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="db-contact-fields">
                  {FIELDS.map((f) => (
                    <div key={f.name} data-row className={f.half ? "" : "sm:col-span-2"}>
                      <label htmlFor={`f-${f.name}`} className="db-contact-label">
                        {f.label}
                        {!f.required && <span className="text-ink-3"> (optional)</span>}
                      </label>
                      <input
                        id={`f-${f.name}`}
                        name={f.name}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        inputMode={f.inputMode}
                        maxLength={f.max}
                        autoCapitalize={f.type === "email" ? "off" : undefined}
                        spellCheck={f.type === "email" ? false : undefined}
                        className="db-field db-field--plain"
                        placeholder={f.placeholder}
                        value={values[f.name]}
                        onChange={(e) => set(f.name, e.target.value)}
                        onBlur={() => leave(f.name)}
                        aria-required={f.required || undefined}
                        aria-invalid={errors[f.name] ? "true" : undefined}
                        aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
                      />
                      {errors[f.name] && (
                        <p id={`e-${f.name}`} role="alert" className="text-db-red mt-1.5 text-[12.5px] font-semibold">
                          {errors[f.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div data-row className="sm:col-span-2">
                    <label htmlFor="f-subject" className="db-contact-label">
                      What is it about?
                    </label>
                    <select
                      id="f-subject"
                      name="subject"
                      className="db-field db-field--select db-field--plain"
                      value={values.subject}
                      onChange={(e) => set("subject", e.target.value)}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div data-row className="sm:col-span-2">
                    <label htmlFor="f-message" className="db-contact-label">
                      Message
                    </label>
                    {/* Guidance that stays put: as a placeholder it vanished the
                        moment anyone started typing, which is when it matters. */}
                    <p id="h-message" className="db-contact-hint">
                      Tell us what you’re trying to do and we’ll point you the right way.
                    </p>
                    <textarea
                      id="f-message"
                      name="message"
                      rows={6}
                      aria-required
                      maxLength={MESSAGE_MAX}
                      className="db-field db-field--plain resize-y"
                      value={values.message}
                      onChange={(e) => set("message", e.target.value)}
                      onBlur={() => leave("message")}
                      onKeyDown={(e) => {
                        // the shortcut people who live in forms already try
                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") e.currentTarget.form?.requestSubmit();
                      }}
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "e-message h-message" : "h-message"}
                    />
                    <div className="db-contact-undermessage">
                      {errors.message ? (
                        <p id="e-message" role="alert" className="text-db-red m-0 text-[12.5px] font-semibold">
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      {values.message.length >= COUNT_FROM && (
                        <span className="db-contact-count" aria-hidden="true">
                          {values.message.length.toLocaleString("en-US")} / {MESSAGE_MAX.toLocaleString("en-US")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div data-row className="db-contact-actions">
                  <button
                    type="submit"
                    disabled={busy}
                    aria-busy={busy}
                    className="db-cta-btn db-contact-send font-ui rounded-[9px] px-6 py-3.5 text-[15px] font-medium tracking-[.06em] text-white uppercase disabled:cursor-wait disabled:opacity-70"
                  >
                    {busy ? "Sending…" : "Send message"}
                    <Icon name="send" className="h-4 w-4" />
                  </button>
                  <p className="text-ink-3 m-0 max-w-[36ch] text-[13px] leading-relaxed" role="status">
                    {busy
                      ? "Sending your message. Please wait."
                      : "We’ll reply to the email address you provide, usually within one business day."}
                  </p>
                </div>
                </fieldset>
                {submitError && (
                  <p ref={errorPanel} tabIndex={-1} role="alert" className="db-contact-error mt-5 rounded-[9px] border p-4 text-[14px] leading-relaxed">
                    {submitError}
                  </p>
                )}
              </form>
            )}
            {scheduleCallUrl && (
              <div className="db-contact-booking">
                <p>Prefer to talk?</p>
                <a href={scheduleCallUrl} target="_blank" rel="noopener noreferrer" className="db-contact-schedule">
                  <Icon name="cal" className="h-4 w-4" />
                  Schedule a Call
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            )}
          </div>
          {/* Secondary contact details follow the form in reading order. */}
          <aside className="db-contact-details" aria-label="Other ways to contact us">
            <ul className="db-contact-channels">
              {CHANNELS.map((c) => (
                <li key={c.title}>
                  <a
                    href={c.href}
                    target={c.icon === "pin" ? "_blank" : undefined}
                    rel={c.icon === "pin" ? "noopener noreferrer" : undefined}
                    className="db-contact-channel"
                  >
                    <span className="db-contact-channel__label">
                      <Icon name={c.icon} className="h-4 w-4" />
                        {c.title}
                    </span>
                    <span className="db-contact-channel__value">
                        {c.lines[0]}
                    </span>
                    {c.icon === "pin" && <span className="db-contact-channel__value">{c.lines[1]}</span>}
                  </a>
                </li>
              ))}
            </ul>

            {/* Keep a direct route to common questions below the contact details. */}
            <div className="db-contact-quick">
              <SmartLink href="/faq" className="db-contact-quick__link">
                Read the FAQ
                <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </SmartLink>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
