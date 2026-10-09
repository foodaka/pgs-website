import Image from "next/image";
import { JoinForm } from "@/components/join-form";
import { Reveal } from "@/components/reveal";
import { SiteNav } from "@/components/site-nav";
import { InstagramIcon } from "@/components/instagram-icon";
import { FAQS, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const LOOP = [
  { word: "Play", line: "Events, competitions, rounds and society days." },
  { word: "Share", line: "Photos, scores, great shots and the bad ones too." },
  { word: "Connect", line: "Meet members and build real friendships." },
  { word: "Celebrate", line: "Winners, birthdays, milestones and society moments." },
  { word: "Return", line: "Look forward to the next one. Then go again." },
];

const CELEBRATE = [
  { label: "Competition", bg: "bg-coral", fg: "text-cream" },
  { label: "Performance", bg: "bg-green", fg: "text-cream" },
  { label: "Friendship", bg: "bg-aloe", fg: "text-green" },
  { label: "Bad shots", bg: "bg-peach", fg: "text-ink" },
  { label: "Socialising", bg: "bg-ink", fg: "text-cream" },
  { label: "Life in Portugal", bg: "bg-cream", fg: "text-green", ring: true },
];

const WORLD = [
  { tag: "Now", title: "What's happening this week", tone: "bg-coral text-cream" },
  { tag: "Play", title: "Events & competitions", tone: "bg-green text-cream" },
  { tag: "People", title: "Members & community", tone: "bg-aloe text-green" },
  { tag: "Score", title: "Results & rankings", tone: "bg-ink text-cream" },
  { tag: "Clubhouse", title: "Social & entertainment", tone: "bg-peach text-ink" },
  { tag: "Stories", title: "Photography & recaps", tone: "bg-cream text-green ring-1 ring-green/15" },
];

const TICKER = ["Play", "Share", "Connect", "Celebrate", "Return"];

export default function Home() {
  return (
    <>
      <Reveal />

      {/* ───────── Nav ───────── */}
      <SiteNav />

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-green text-cream">
          <div className="swirl bg-green-deep" aria-hidden />
          <div
            aria-hidden
            className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_70%_45%,rgb(0_62_51/0)_0%,rgb(0_42_34/0.55)_70%)]"
          />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
            <div>
              <p className="eyebrow rise text-aloe" style={{ animationDelay: "0.1s" }}>
                Portugal Golf Society · Lisbon · Est. 2026
              </p>
              <h1
                className="display rise mt-6 text-[clamp(2.9rem,6.4vw,6.75rem)] font-semibold"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="sr-only">Portugal Golf Society, the Lisbon golf society: </span>
                <span className="block whitespace-nowrap">A society</span>
                <span className="block whitespace-nowrap">you play in.</span>
                <span className="block whitespace-nowrap text-coral">A community</span>
                <span className="block whitespace-nowrap">you belong to.</span>
              </h1>
              <p
                className="rise mt-8 max-w-md text-lg leading-relaxed text-cream/75 sm:text-xl"
                style={{ animationDelay: "0.35s" }}
              >
                Golf brings us together. The society keeps us connected.
                Weekly rounds, proper competition and the people you meet
                along the way.
              </p>
              <div
                className="rise mt-10 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "0.5s" }}
              >
                <a
                  href="#join"
                  className="group inline-flex items-center gap-3 rounded-full bg-coral px-8 py-4 text-base font-bold tracking-wide text-cream uppercase shadow-[0_18px_50px_-14px_rgb(220_91_72/0.8)] transition hover:-translate-y-0.5 hover:bg-coral-deep"
                >
                  Become a member
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#about"
                  className="rounded-full border border-cream/30 px-7 py-4 text-base font-bold tracking-wide uppercase transition hover:border-cream hover:bg-cream/10"
                >
                  The society
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[440px]">
              <span
                role="img"
                aria-label="Portugal Golf Society crest, PGS monogram with crossed tees, Est. 26"
                className="logo logo-crest crest-in relative aspect-[1074/1400] w-full text-cream"
              />
            </div>
          </div>

          <a
            href="#about"
            aria-label="Scroll down"
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 lg:flex"
          >
            <span className="eyebrow">Scroll</span>
            <span className="h-10 w-px animate-pulse bg-cream/40" />
          </a>
        </section>

        {/* ───────── Ticker ───────── */}
        <div className="overflow-hidden bg-coral py-5 text-cream" aria-hidden>
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {[...TICKER, ...TICKER].map((w, i) => (
                  <span key={i} className="flex items-center">
                    <span className="display px-8 text-4xl font-semibold sm:text-5xl">{w}</span>
                    <span className="logo logo-monogram h-9 w-9 text-green" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ───────── Manifesto ───────── */}
        <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div data-reveal>
              <p className="eyebrow text-coral">The big idea</p>
              <h2 className="display mt-5 text-[clamp(2.3rem,4.6vw,4.6rem)] font-semibold text-green">
                <span className="block whitespace-nowrap">Serious about golf.</span>
                <span className="block whitespace-nowrap text-ink">Not too serious</span>
                <span className="block whitespace-nowrap text-ink">about ourselves.</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/75">
                The Portugal Golf Society is a Lisbon-based golf society for
                golfers living in Portugal. A society isn&rsquo;t just the golf. It&rsquo;s the people you
                meet, the stories you tell, the shots you wish you could forget,
                and the moments you look forward to.
              </p>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/75">
                Whether you&rsquo;ve just moved to Portugal or you&rsquo;ve
                played here for years, there&rsquo;s a spot on the tee sheet
                and a seat at the clubhouse table for you. We play and
                socialise in English and Portuguese.
              </p>
            </div>

            <div data-reveal style={{ ["--delay" as string]: "120ms" }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-30px_rgb(0_62_51/0.55)]">
                <Image
                  src="/photos/crewneck.webp"
                  alt="Two Portugal Golf Society members on the green, one in a cream PGS crest t-shirt lining up a putt"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-4 rotate-[-8deg] rounded-full bg-coral px-6 py-3 shadow-xl sm:-left-8">
                <span className="display text-2xl font-semibold text-cream">Est. 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Content world ───────── */}
        <section className="bg-cream pb-24 sm:pb-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div data-reveal className="flex flex-col justify-between gap-6 border-t border-green/15 pt-16 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-coral">The society</p>
                <h2 className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold text-ink">
                  What membership
                  <br />
                  looks like
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-ink/65">
                A clubhouse you can drop into without needing a reason:
                on the course, in the group chat and{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-green underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                >
                  on the gram
                </a>
                .
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WORLD.map((w, i) => (
                <article
                  key={w.tag}
                  data-reveal
                  style={{ ["--delay" as string]: `${(i % 3) * 90}ms` }}
                  className={`group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[28px] p-8 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(0_62_51/0.6)] ${w.tone}`}
                >
                  <p className="eyebrow opacity-70">PGS /</p>
                  <span
                    aria-hidden
                    className="logo logo-monogram absolute -right-10 -bottom-10 h-56 w-56 opacity-[0.09] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-6deg]"
                  />
                  <div className="relative">
                    <h3 className="display text-6xl font-semibold sm:text-7xl">{w.tag}</h3>
                    <p className="mt-3 text-lg opacity-80">{w.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Photo band ───────── */}
        <section className="relative isolate h-[78svh] min-h-[460px] overflow-hidden bg-green text-cream sm:h-[88svh]">
          <Image
            src="/photos/high-kick.webp"
            alt="A society member celebrates a holed putt with a high kick on a pine-lined fairway"
            fill
            sizes="100vw"
            className="object-cover object-[72%_50%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-8 sm:pb-20">
            <p data-reveal className="eyebrow text-aloe">Entertaining, by design</p>
            <p
              data-reveal
              style={{ ["--delay" as string]: "100ms" }}
              className="display mt-5 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)] font-semibold"
            >
              Golf can be competitive.
              <br />
              <span className="text-coral">The community should be fun.</span>
            </p>
          </div>
        </section>

        {/* ───────── The loop ───────── */}
        <section className="relative isolate overflow-hidden bg-ink py-24 text-cream sm:py-36">
          <div className="swirl bg-[#2c2f2c]" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
            <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow text-aloe">The community loop</p>
                <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)] font-semibold">
                  Then the cycle
                  <br />
                  starts <span className="text-coral">again.</span>
                </h2>
              </div>
              <p className="max-w-sm text-lg leading-relaxed text-cream/65">
                More than finding out when the next competition is. Somewhere
                to see what&rsquo;s happening, celebrate members and relive the
                moments.
              </p>
            </div>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-cream/10 sm:grid-cols-2 lg:grid-cols-5">
              {LOOP.map((s, i) => (
                <li
                  key={s.word}
                  data-reveal
                  style={{ ["--delay" as string]: `${i * 90}ms` }}
                  className="group relative flex min-h-[260px] flex-col justify-between bg-ink p-7 transition-colors duration-500 hover:bg-green"
                >
                  <span className="display text-6xl font-light text-cream/20 transition-colors group-hover:text-coral">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="display text-4xl font-semibold">{s.word}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/60">{s.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── What we celebrate ───────── */}
        <section className="bg-cream py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div data-reveal className="text-center">
              <p className="eyebrow text-coral">The society celebrates</p>
              <h2 className="display mx-auto mt-5 max-w-4xl text-[clamp(2.8rem,7vw,6rem)] font-semibold text-green">
                Every birdie. Every blob. Every beer after.
              </h2>
            </div>
            <ul className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
              {CELEBRATE.map((c, i) => (
                <li
                  key={c.label}
                  data-reveal
                  style={{ ["--delay" as string]: `${i * 70}ms` }}
                  className={`display rounded-full px-7 py-4 text-2xl font-semibold transition hover:-translate-y-1 hover:rotate-[-2deg] sm:px-9 sm:py-5 sm:text-4xl ${c.bg} ${c.fg} ${c.ring ? "ring-2 ring-green" : ""}`}
                >
                  {c.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Merch ───────── */}
        <section className="relative overflow-hidden bg-aloe py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div data-reveal>
              <p className="eyebrow text-green/70">Wear the society</p>
              <h2 className="display mt-5 text-[clamp(3rem,7vw,6.25rem)] font-semibold text-green">
                Fresh merch
                <br />
                <span className="text-coral">dropping soon.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-green/80">
                Something members are proud to be seen in, on the course and
                off it. The crest on the back, the monogram on the chest.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-green px-7 py-4 text-base font-bold tracking-wide text-cream uppercase transition hover:-translate-y-0.5 hover:bg-ink"
              >
                <InstagramIcon className="h-5 w-5" />
                Follow for the drop
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div
                data-reveal
                style={{ ["--delay" as string]: "80ms" }}
                className="relative col-span-2 aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgb(0_62_51/0.6)] sm:col-span-1 sm:row-span-2 sm:aspect-auto"
              >
                <Image
                  src="/photos/back-print.webp"
                  alt="Golfer walking the fairway in a black t-shirt with the Portugal Golf Society crest printed on the back"
                  fill
                  sizes="(min-width: 1024px) 380px, 50vw"
                  className="object-cover"
                />
              </div>
              {[
                { src: "/photos/tee-front.webp", alt: "Charcoal PGS t-shirt, front, with the monogram on the chest", label: "Front", bg: "bg-cream" },
                { src: "/photos/tee-back.webp", alt: "Charcoal PGS t-shirt, back, with the full Portugal Golf Society crest", label: "Back", bg: "bg-peach" },
              ].map((t, i) => (
                <div
                  key={t.src}
                  data-reveal
                  style={{ ["--delay" as string]: `${160 + i * 80}ms` }}
                  className={`group relative aspect-square overflow-hidden rounded-[28px] ${t.bg}`}
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 45vw"
                    className="object-contain p-4 pb-9 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[-2deg] sm:p-7 sm:pb-10"
                  />
                  <span className="eyebrow absolute bottom-4 left-5 text-ink/60">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section id="faq" className="bg-cream py-24 sm:py-36">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-reveal>
              <p className="eyebrow text-coral">Questions</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold text-green">
                Joining a golf society in Portugal
              </h2>
            </div>
            <div data-reveal style={{ ["--delay" as string]: "100ms" }} className="divide-y divide-green/15 border-y border-green/15">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-xl font-bold text-ink sm:text-2xl">{f.q}</h3>
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green text-xl text-cream transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Join ───────── */}
        <section id="join" className="relative isolate overflow-hidden bg-green py-24 text-cream sm:py-36">
          <div className="swirl bg-green-deep" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow text-aloe">Recruiting now</p>
              <h2 className="display mt-5 text-[clamp(3rem,6.5vw,6.25rem)] font-semibold">
                Your next
                <br />
                round is
                <br />
                <span className="text-coral">already waiting.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/70">
                New in town or a seasoned local, any handicap, any swing. Tell
                us a little about yourself and we&rsquo;ll get you on the next
                tee sheet.
              </p>
              <ul className="mt-10 space-y-4 text-cream/80">
                {[
                  "Weekly rounds across Portugal's best courses",
                  "Season-long competitions and a proper Order of Merit",
                  "Clubhouse beers, society days and new friends",
                  "A bilingual society: English and Portuguese",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-coral" />
                    <span className="text-lg">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              style={{ ["--delay" as string]: "120ms" }}
              className="rounded-[32px] border border-cream/10 bg-green-deep/70 p-6 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.7)] backdrop-blur-sm sm:p-10"
            >
              <JoinForm />
            </div>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="relative overflow-hidden bg-ink py-20 text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-8">
          <span className="logo logo-crest h-44 w-44 text-cream" aria-hidden />
          <p className="display mt-10 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold">
            <span className="block">Golf brings us together.</span>
            <span className="mt-3 block text-coral sm:mt-4">The society keeps us connected.</span>
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-cream/25 px-7 py-4 text-base font-bold tracking-wide transition hover:border-coral hover:bg-coral"
          >
            <InstagramIcon className="h-5 w-5" />
            Follow {INSTAGRAM_HANDLE}
          </a>
          <div className="mt-14 flex w-full flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50 sm:flex-row">
            <p>© Portugal Golf Society · Est. 2026</p>
            <p>
              <span className="font-bold text-cream/80">Based in</span> Lisbon, Portugal
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
