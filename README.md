# Portugal Golf Society - landing page

Landing page + "join the society" form for portugalgolfstudy.com.
Next.js (App Router) + Tailwind v4, deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Join form → Telegram

Submissions go through a server action (`src/app/actions.ts`) to the
Telegram Bot API. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (see
`.env.example`) in Vercel → Project → Settings → Environment Variables.
Without them, dev logs the message to the console and production shows a
"briefly offline" error.

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
