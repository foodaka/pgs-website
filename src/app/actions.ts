"use server";

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
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
  const text = lines.join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[join] Telegram not configured, would send:\n" + text);
      return { status: "ok" };
    }
    console.error("[join] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing");
    return {
      status: "error",
      message: "Sign-ups are briefly offline. Please try again shortly.",
      fields,
    };
  }

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
      throw new Error("telegram");
    }
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
      fields,
    };
  }

  return { status: "ok" };
}
