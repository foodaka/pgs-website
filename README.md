# Portugal Golf Society - landing page

Landing page + "join the society" form for portugalgolfstudy.com.
Next.js (App Router) + Tailwind v4, deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Join form → Flagstick + Telegram

Submissions go through a server action (`src/app/actions.ts`). It first saves
the request to Flagstick's Supabase database by calling the
`submit_membership_request` function with the public anon key
(`SUPABASE_URL`, `SUPABASE_ANON_KEY`); admins then invite or decline it at
flagstick.live → Admin → Members → Join requests. It then posts a Telegram
message (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) as a notification, with a
link to that page when the save worked.

Either one succeeding counts as received; the form only errors when both fail.
Set the variables (see `.env.example`) in Vercel → Project → Settings →
Environment Variables. With neither configured, dev logs the submission to the
console and production shows a "briefly offline" error.

Once a submission is received, Postmark sends the applicant a branded
"You're on the list" confirmation (HTML and plain text). Set
`POSTMARK_SERVER_TOKEN` and `POSTMARK_FROM_EMAIL` in the deployment environment;
the latter must be a verified sender address without a display name. The email
uses Postmark's `outbound` transactional stream and the public website's crest.
See the [Postmark Email API](https://postmarkapp.com/developer/api/email-api).
Missing configuration or email delivery errors are logged server-side without
failing the already-received signup. In development with nothing configured,
the form only logs the submission and does not send email.

## Brand

From the 2026 identity brief (Jordan Howey Beattie):

- Logo: crest "A" (PGS monogram with crossed tees, EST 26) - `public/brand/crest.png`,
  `monogram.png`, exported from the designer's 8334px masters (LOGO 1 / LOGO 2 WHITE).
  White art used as CSS masks so they can take any colour. Favicon/icon is the
  designer's green "SOCIAL LOGO 2".
- Colours: black `#242624`, green `#003E33`, cream `#EFEAE4`, coral `#DC5B48`,
  aloe `#CAD3C0`, peach `#C99379`.
- Type: Salo (display) is replaced by Oswald (closest open condensed face);
  Helvetica Neue for body.
- Texture: green swirl, `public/brand/swirl.webp` (mirrored to tile seamlessly).
