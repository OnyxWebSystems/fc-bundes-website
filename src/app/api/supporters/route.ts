import { NextResponse } from "next/server";

// FANS_WEBHOOK_URL: optional HTTPS endpoint that receives JSON { name, email }.
// Leave it unset until a list service is connected. Submissions then fail honestly.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The submission could not be read." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "The submission could not be read." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const website = typeof record.website === "string" ? record.website.trim() : "";
  if (website) {
    return NextResponse.json({ error: "The submission could not be accepted." }, { status: 400 });
  }

  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";

  if (name.length < 2 || name.length > 80 || email.length > 120 || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Check the name and email, then try again." }, { status: 400 });
  }

  const webhook = process.env.FANS_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "The supporter list is not open yet." }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "The supporter list could not take this submission." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "The supporter list could not be reached." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
