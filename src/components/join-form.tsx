"use client";

import { useActionState, useEffect, useRef } from "react";
import { joinSociety, type JoinState } from "@/app/actions";

const initial: JoinState = { status: "idle" };

export function JoinForm() {
  const [state, action, pending] = useActionState(joinSociety, initial);
  const f = state.fields ?? {};
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "ok") {
      doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.status]);

  if (state.status === "ok") {
    return (
      <div
        ref={doneRef}
        role="status"
        className="rise flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-cream/15 bg-cream/[0.04] p-10 text-center"
      >
        <span className="logo logo-monogram h-28 w-28 text-coral" aria-hidden />
        <h3 className="display mt-8 text-5xl text-cream sm:text-6xl">
          You&rsquo;re on the list.
        </h3>
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-cream/70">
          We&rsquo;ve received your request to join. Someone from the society will be in touch
          shortly with the next round and how to get involved.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <Field label="Full name" className="sm:col-span-2">
        <input
          name="name"
          required
          autoComplete="name"
          defaultValue={f.name}
          placeholder="Your name"
          className="field"
        />
      </Field>
      <Field label="Email">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={f.email}
          placeholder="you@example.com"
          className="field"
        />
      </Field>
      <Field label="Phone / WhatsApp" hint="optional">
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={f.phone}
          placeholder="+351 …"
          className="field"
        />
      </Field>
      <Field label="Handicap" hint="roughly is fine">
        <input
          name="handicap"
          inputMode="decimal"
          defaultValue={f.handicap}
          placeholder="e.g. 18.4 or none yet"
          className="field"
        />
      </Field>
      <Field label="Where are you based?">
        <input
          name="location"
          autoComplete="address-level2"
          defaultValue={f.location}
          placeholder="Lisbon, Cascais, Comporta…"
          className="field"
        />
      </Field>
      <Field label="How did you hear about us?" className="sm:col-span-2">
        <select name="heard" defaultValue={f.heard ?? ""} className="field">
          <option value="">Choose one</option>
          <option>Instagram</option>
          <option>A friend / member</option>
          <option>On the course</option>
          <option>Google</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Anything else?" hint="optional" className="sm:col-span-2">
        <textarea
          name="message"
          rows={3}
          defaultValue={f.message}
          placeholder="Home club, how often you play, the worst shot you've ever hit…"
          className="field resize-none"
        />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-coral sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="mt-2 flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-base font-bold tracking-wide text-cream uppercase shadow-[0_12px_40px_-12px_rgb(220_91_72/0.7)] transition hover:-translate-y-0.5 hover:bg-coral-deep disabled:opacity-60"
        >
          {pending ? "Sending…" : "Request to join"}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="text-xs leading-relaxed text-cream/45">
          We&rsquo;ll only use your details to get you on a
          tee sheet.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="eyebrow text-cream/70">
        {label}
        {hint && (
          <span className="ml-2 font-normal tracking-normal normal-case text-cream/35">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
