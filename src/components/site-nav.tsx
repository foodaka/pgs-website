"use client";

import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/instagram-icon";
import { INSTAGRAM_URL } from "@/lib/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-green/90 shadow-[0_10px_30px_-15px_rgb(0_0_0/0.5)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-2.5" : "py-5"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-3 text-cream"
          aria-label="Portugal Golf Society home"
        >
          <span className="logo logo-monogram h-12 w-12" aria-hidden />
          <span className="display hidden text-lg tracking-wide sm:block">
            Portugal Golf Society
          </span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portugal Golf Society on Instagram"
          className="flex h-11 w-11 items-center justify-center rounded-full text-cream transition hover:bg-cream/15"
        >
          <InstagramIcon className="h-6 w-6" />
        </a>
        <a
          href="#join"
          className="rounded-full bg-cream px-5 py-2.5 text-sm font-bold tracking-wide text-green uppercase transition hover:bg-coral hover:text-cream"
        >
          Join the society
        </a>
        </div>
      </nav>
    </header>
  );
}
