"use client";

import { FormEvent, useState } from "react";
import { ButtonArrow } from "@/components/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function SupporterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "");
    const nextErrors: { name?: string; email?: string } = {};

    if (name.length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email) {
      setStatus("idle");
      setMessage("");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/supporters", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, website }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setStatus("error");
        setMessage(payload?.error || "The supporter list could not take this submission.");
        return;
      }
      setStatus("success");
      setMessage("You are on the list. The club will use this address for supporter updates.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The supporter list could not be reached.");
    }
  }

  return (
    <section className="chapter join" id="supporters">
      <div className="wrap">
        <div className="join-grid">
          <div>
            <p className="kicker">The list</p>
            <h2 className="panel-title">Supporters</h2>
            <p className="join-lead">Leave a name and email for club updates.</p>
          </div>
          <form className="join-form" onSubmit={onSubmit} noValidate>
            <label>
              Name
              <input name="name" type="text" autoComplete="name" maxLength={80} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name ? (
                <span id="name-error" className="field-error">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" maxLength={120} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email ? (
                <span id="email-error" className="field-error">
                  {errors.email}
                </span>
              ) : null}
            </label>
            <label className="hp" aria-hidden="true">
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="btn" type="submit" disabled={status === "submitting"}>
              <span>{status === "submitting" ? "Sending" : "Join the list"}</span>
              <ButtonArrow />
            </button>
            <p className={`form-status is-${status}`} role="status" aria-live="polite">
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
