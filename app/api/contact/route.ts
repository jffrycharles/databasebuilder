import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";

/* ---------------------------------------------------------------------------
   Where a contact message actually goes.

   The form used to hand off to the visitor's mail client and nothing else,
   which quietly loses every enquiry from someone on webmail with no mail
   client registered — they get a dead link and we never hear from them.

   This posts the message to whatever endpoint CONTACT_WEBHOOK_URL names. That
   is deliberately generic: Formspree, Zapier, Make, n8n, a Slack incoming
   webhook or your own handler all accept a JSON POST, so nothing here has to
   change when you pick one. Set it in .env.local:

     CONTACT_WEBHOOK_URL="https://…"

   With it unset the route answers 501. The browser retains the draft and
   shows a delivery error; it never reports an unsent message as delivered.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 160, phone: 60, company: 160, subject: 120, message: 5000 };

type Payload = Record<string, unknown>;

const str = (v: unknown, cap: number) => (typeof v === "string" ? v.trim().slice(0, cap) : "");

export async function POST(req: Request) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  let body: Payload;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
    }
    body = parsed as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  /* A bot fills every field it can find — and so, now and then, does a
     password manager or a browser's autofill. Dropping the message silently
     behind a "Message sent" screen would lose a real enquiry with no second
     path to us, so this answers the way any other undelivered message does:
     a failure the visitor can act on. */
  if (str(body.website, 200)) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        reason: "rejected",
        error: `We could not send your message. Please email ${CONTACT.email} and we will pick it up from there.`,
      },
      { status: 422 },
    );
  }

  const message = {
    name: str(body.name, MAX.name),
    email: str(body.email, MAX.email),
    phone: str(body.phone, MAX.phone),
    company: str(body.company, MAX.company),
    subject: str(body.subject, MAX.subject),
    message: str(body.message, MAX.message),
  };

  if (!message.name || !message.email || message.message.length < 10) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(message.email)) {
    return NextResponse.json({ ok: false, error: "That address looks incomplete." }, { status: 422 });
  }

  // Nothing configured yet — retain the draft on the client, without handoff.
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, delivered: false, reason: "no-endpoint", error: "Message delivery is temporarily unavailable. Your message has not been sent. Please try again later." },
      { status: 501 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        ...message,
        to: CONTACT.email,
        submittedFrom: req.headers.get("referer") ?? "/contact",
      }),
      // never let a slow third party hold the request open
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { ok: false, delivered: false, reason: "upstream", error: "We could not send your message. Please try again in a moment." },
      { status: 502 },
    );
  }
}
