"use server";

import { sendJoinConfirmation } from "@/lib/join-email";

export type JoinState = {
  status: "idle" | "ok" | "error";
  message?: string;
  fields?: Record<string, string>;
};

const LIMITS: Record<string, number> = {
  name: 80,
  email: 120,
  phone: 30,
  handicap: 10,
  location: 80,
  heard: 60,
  message: 1000,
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function joinSociety(
  _prev: JoinState,
  formData: FormData,
): Promise<JoinState> {
  // Honeypot: real people never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "ok" };
  }

  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    fields[key] = String(formData.get(key) ?? "")
      .trim()
      .slice(0, max);
  }

  if (!fields.name || !fields.email) {
    return {
      status: "error",
      message: "We need at least your name and email.",
      fields,
    };
  }
  if (!/^[^\s@,;<>\x00-\x1f\x7f]+@[^\s@,;<>\x00-\x1f\x7f]+\.[^\s@,;<>\x00-\x1f\x7f]+$/.test(fields.email)) {
    return {
      status: "error",
      message: "That email doesn't look quite right.",
      fields,
    };
  }

  const lines = [
    "⛳️ <b>New PGS membership request</b>",
    "",
    `<b>Name:</b> ${escapeHtml(fields.name)}`,
    `<b>Email:</b> ${escapeHtml(fields.email)}`,
    fields.phone && `<b>Phone / WhatsApp:</b> ${escapeHtml(fields.phone)}`,
    fields.handicap && `<b>Handicap:</b> ${escapeHtml(fields.handicap)}`,
    fields.location && `<b>Based in:</b> ${escapeHtml(fields.location)}`,
    fields.heard && `<b>Heard about us:</b> ${escapeHtml(fields.heard)}`,
    fields.message && `\n<b>Message:</b>\n${escapeHtml(fields.message)}`,
  ].filter(Boolean);
  const saved = await saveRequest(fields);
  if (saved) lines.push("", `Review in Flagstick: ${REQUESTS_ADMIN_URL}`);
  const notified = await notifyTelegram(lines.join("\n"));

  if (saved === null && notified === null) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[join] Nothing configured, would record:\n" + lines.join("\n"));
      return { status: "ok" };
    }
    console.error("[join] Neither Supabase nor Telegram is configured");
    return {
      status: "error",
      message: "Sign-ups are briefly offline. Please try again shortly.",
      fields,
    };
  }

  // Either one landing is enough: the database is the record, Telegram the
  // nudge. Only when both fail has the request actually been lost.
  if (!saved && !notified) {
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
      fields,
    };
  }

  // An email failure must not invite a duplicate submission or undo the
  // request that was just received.
  await sendJoinConfirmation(fields.name, fields.email);

  return { status: "ok" };
}

const REQUESTS_ADMIN_URL = "https://flagstick.live/admin/members/requests";

// Stores the request in Flagstick's database (where admins invite or decline
// it). Uses the public anon key: the only thing it can do is call this one
// function, which can add a request but read nothing back.
// true = saved, false = failed, null = not configured.
async function saveRequest(fields: Record<string, string>): Promise<boolean | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/rpc/submit_membership_request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        p_society_slug: process.env.SOCIETY_SLUG || "pgs",
        p_full_name: fields.name,
        p_email: fields.email,
        p_phone: fields.phone,
        p_handicap: fields.handicap,
        p_location: fields.location,
        p_heard_from: fields.heard,
        p_message: fields.message,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[join] Supabase error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[join] Supabase error", error);
    return false;
  }
}

// true = sent, false = failed, null = not configured.
async function notifyTelegram(text: string): Promise<boolean | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[join] Telegram error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[join] Telegram error", error);
    return false;
  }
}
