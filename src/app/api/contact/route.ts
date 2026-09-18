import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const TO = "juan@osmoticventures.com";
const MAX = { name: 120, email: 200, company: 160, message: 1000 };

type Payload = { name: string; email: string; company: string; message: string };

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function fallback(p: Payload) {
  const subject = encodeURIComponent(`Call request from ${p.name}${p.company ? `, ${p.company}` : ""}`);
  const body = encodeURIComponent(`${p.message}\n\n${p.name}\n${p.email}${p.company ? `\n${p.company}` : ""}`);
  return `mailto:${TO}?subject=${subject}&body=${body}`;
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const p: Payload = {
    name: clean(raw.name, MAX.name),
    email: clean(raw.email, MAX.email),
    company: clean(raw.company, MAX.company),
    message: clean(raw.message, MAX.message),
  };
  if (!p.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) || !p.company || !p.message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }
  const startedAt = Number(raw.t);
  if (clean(raw.website, 50) || (Number.isFinite(startedAt) && Date.now() - startedAt < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  if (!user || !pass) {
    console.error("contact: SMTP credentials not configured");
    return NextResponse.json({ ok: false, error: "not_configured", mailto: fallback(p) }, { status: 503 });
  }

  try {
    const transport = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
      port: Number(process.env.ZOHO_SMTP_PORT || 465),
      secure: true,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `"osmoticventures.com" <${user}>`,
      to: TO,
      replyTo: `"${p.name.replace(/"/g, "")}" <${p.email}>`,
      subject: `Call request from ${p.name}${p.company ? `, ${p.company}` : ""}`,
      text: `${p.message}\n\n${p.name}\n${p.email}\n${p.company}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return NextResponse.json({ ok: false, error: "send_failed", mailto: fallback(p) }, { status: 502 });
  }
}
