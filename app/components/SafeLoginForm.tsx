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
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans">
      <form
        className="bg-white border border-gray-300 rounded-[1px] p-10 w-[350px] max-w-full flex flex-col items-center box-border"
        onSubmit={onSubmit}
      >
        {/* Using inline style for the specific cursive font to avoid needing a global CSS file just for the logo */}
        <h1
          className="text-5xl mb-4 text-zinc-900 font-normal"
          style={{ fontFamily: "'Grand Hotel', cursive" }}
        >
          Social Access
        </h1>
        
        <p className="text-gray-400 text-base font-semibold leading-5 text-center mb-5">
          Sign up to see photos and videos from your friends.
        </p>

        <div className="w-full mb-1.5">
          <label htmlFor="identifier" className="sr-only">
            Email, phone, or username
          </label>
          <input
            id="identifier"
            name="identifier"
            autoComplete="username"
            required
            minLength={3}
            placeholder="Mobile Number or Email"
            className="bg-zinc-50 border border-gray-300 rounded-[3px] px-2 py-[9px] w-full text-xs text-zinc-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
          />
        </div>

        <div className="w-full mb-1.5">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            placeholder="Password"
            className="bg-zinc-50 border border-gray-300 rounded-[3px] px-2 py-[9px] w-full text-xs text-zinc-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
          />
        </div>

        <div className="w-full mb-1.5">
          <label htmlFor="displayName" className="sr-only">
            Display name (optional)
          </label>
          <input
            id="displayName"
            name="displayName"
            autoComplete="name"
            placeholder="Display name (optional)"
            className="bg-zinc-50 border border-gray-300 rounded-[3px] px-2 py-[9px] w-full text-xs text-zinc-900 outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={state === "submitting"}
          className="bg-[#0095f6] hover:bg-[#1877f2] disabled:bg-[#4cb5f9] text-white font-semibold rounded-lg px-4 py-[7px] w-full mt-4 text-sm transition-colors cursor-pointer disabled:cursor-default"
        >
          {state === "submitting" ? "Saving..." : "Sign up"}
        </button>

        {message && (
          <p
            className={`text-sm text-center mt-4 ${
              state === "error" ? "text-[#ed4956]" : "text-[#0095f6]"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-gray-400 text-xs leading-4 text-center mt-6">
          Passwords are hashed before storage. Moderators can review account
          metadata, but cannot view the password.
        </p>
      </form>
    </div>
  );
}
