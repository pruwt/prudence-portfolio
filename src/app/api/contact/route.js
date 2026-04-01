import { Resend } from "resend";
import { NextResponse } from "next/server";

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes
const rateMap = new Map();
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  rateMap.set(ip, { count: entry.count + 1, start: entry.start });
  return false;
}

export async function POST(req) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, honeypot } = body;

    // Honeypot — bots fill this, humans don't
    if (honeypot) {
      return NextResponse.json({ ok: true }); // silent success for bots
    }

    // Validate
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message is too short." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "hello@prudencetheuri.com",
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
