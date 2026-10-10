import { INSTAGRAM_URL, SITE_NAME, SITE_URL } from "./site";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function joinEmail(name: string) {
  return {
    Subject: "You're on the list | Portugal Golf Society",
    TextBody: `Hi ${name},\n\nYou're on the list.\n\nThanks for your interest in Portugal Golf Society. We've received your request to join, and someone from the society will be in touch shortly with the next round and how to get involved.\n\nIn the meantime, follow us on Instagram: ${INSTAGRAM_URL}\n\nGood golf. Better company.\nThe PGS crew\n\n${SITE_URL}`,
    HtmlBody: `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>You're on the list</title></head>
<body style="margin:0;padding:0;background-color:#efeae4;color:#242624;font-family:Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;">We've received your request to join Portugal Golf Society. We'll be in touch shortly.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#efeae4;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="560" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;">
<tr><td align="center" style="padding:36px 24px;background-color:#003e33;">
<img src="${SITE_URL}/brand/crest.png" width="112" alt="${SITE_NAME}" style="display:block;width:112px;height:auto;border:0;">
<p style="margin:24px 0 0;color:#efeae4;font-size:12px;font-weight:bold;letter-spacing:3px;">PORTUGAL GOLF SOCIETY</p>
</td></tr>
<tr><td style="padding:36px 28px;background-color:#ffffff;border-top:6px solid #dc5b48;">
<p style="margin:0 0 20px;font-size:16px;line-height:1.6;">Hi ${escapeHtml(name)},</p>
<h1 style="margin:0 0 24px;color:#003e33;font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:42px;line-height:1.1;text-transform:uppercase;">You're on the list.</h1>
<p style="margin:0 0 20px;font-size:17px;line-height:1.7;">Thanks for your interest in Portugal Golf Society. We've received your request to join.</p>
<p style="margin:0 0 28px;font-size:17px;line-height:1.7;">Someone from the society will be in touch shortly with the next round and how to get involved.</p>
<p style="margin:0 0 28px;font-size:17px;line-height:1.7;">In the meantime, <a href="${INSTAGRAM_URL}" style="color:#003e33;font-weight:bold;">follow us on Instagram</a>.</p>
<p style="margin:0;color:#003e33;font-size:16px;line-height:1.7;font-weight:bold;">Good golf. Better company.<br>The PGS crew</p>
</td></tr>
<tr><td align="center" style="padding:24px;font-size:12px;line-height:1.8;color:#242624;">
<a href="${SITE_URL}" style="color:#003e33;">Portugal Golf Society</a> &nbsp;·&nbsp; <a href="${INSTAGRAM_URL}" style="color:#003e33;">Follow along on Instagram</a>
<p style="margin:12px 0 0;">You're receiving this because you requested to join the society.</p>
</td></tr></table>
</td></tr></table></body></html>`,
  };
}

export async function sendJoinConfirmation(name: string, email: string) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const from = process.env.POSTMARK_FROM_EMAIL;
  if (!token || !from) {
    console.error("[join] Confirmation email skipped: Postmark configuration missing");
    return false;
  }

  try {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": token,
      },
      body: JSON.stringify({
        From: `${SITE_NAME} <${from}>`,
        To: email,
        ...joinEmail(name),
        MessageStream: "outbound",
        Tag: "join-confirmation",
        TrackOpens: false,
        TrackLinks: "None",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json();
    if (!response.ok || result.ErrorCode !== 0) {
      // Do not log provider bodies: they can include recipient details.
      console.error("[join] Postmark error", response.status, result.ErrorCode);
      return false;
    }
    return true;
  } catch {
    console.error("[join] Confirmation email could not be sent");
    return false;
  }
}
