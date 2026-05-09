"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function SafeLoginForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/signups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: formData.get("identifier"),
        password: formData.get("password"),
        displayName: formData.get("displayName"),
      }),
    });

    const result = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setState("error");
      setMessage(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    event.currentTarget.reset();
    setState("success");
    setMessage("Your request was saved securely for moderation.");
  }

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="brand-mark" aria-hidden="true">
        <span />
      </div>
      <h1>Social Access</h1>
      <p className="intro">Continue with your email, phone number, or username.</p>

      <label>
        Email, phone, or username
        <input name="identifier" autoComplete="username" required minLength={3} placeholder="you@example.com" />
      </label>

      <label>
        Password
        <input name="password" type="password" autoComplete="new-password" required minLength={12} placeholder="At least 12 characters" />
      </label>

      <label>
        Display name <span>(optional)</span>
        <input name="displayName" autoComplete="name" placeholder="How moderators should identify you" />
      </label>

      <button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Saving..." : "Continue"}
      </button>

      {message ? <p className={`form-message ${state}`}>{message}</p> : null}

      <p className="safety-note">
        Passwords are hashed before storage. Moderators can review account metadata, but cannot view the password.
      </p>
    </form>
  );
}
