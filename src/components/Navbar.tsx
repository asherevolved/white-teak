"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS, MENU_URL } from "@/lib/constants";

const EXTENDED_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Menu", href: MENU_URL, external: true },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reference NAV_LINKS for compat
  void NAV_LINKS;

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />



      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[color:var(--color-ivory)]/85 backdrop-blur-xl border-b border-[color:var(--color-line)]/50 shadow-[0_8px_30px_-12px_rgba(27,16,10,0.12)]"
            : "bg-[color:var(--color-ivory)]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Brand */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-[color:var(--color-brass)]/40 group-hover:border-[color:var(--color-brass)] transition-colors animate-spin-slow" />
                <Image
                  src="/assets/logo.png"
                  alt="White Teak Logo"
                  width={36}
                  height={40}
                  className="object-contain relative z-10"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display text-[15px] tracking-[0.12em] text-[color:var(--color-espresso)] font-medium">
                  WHITE TEAK
                </span>
                <span className="font-sans text-[9px] tracking-[0.32em] text-[color:var(--color-clay)] mt-1 uppercase">
                  Coffee Roasters · est.
                </span>
              </div>
            </a>

            {/* Nav links — desktop */}
            <div className="hidden md:flex items-center gap-10">
              {EXTENDED_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group relative text-[13px] font-sans text-[color:var(--color-espresso)]/75 hover:text-[color:var(--color-espresso)] transition-colors tracking-[0.15em] uppercase font-medium"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-[color:var(--color-brass)] origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href={MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-pill btn-pill-filled text-[11px] py-3 px-6"
            >
              Order Now
            </a>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden p-2.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-[1.5px] bg-[color:var(--color-espresso)] transition-transform duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-[color:var(--color-espresso)] transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-[color:var(--color-espresso)] transition-transform duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[color:var(--color-ivory)]/95 backdrop-blur-xl border-t border-[color:var(--color-line)]/60">
            <div className="px-6 py-6 flex flex-col gap-1">
              {EXTENDED_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-left text-sm font-sans text-[color:var(--color-walnut)] uppercase tracking-[0.22em] hover:text-[color:var(--color-espresso)] transition-all border-b border-[color:var(--color-line)]/40"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-filled mt-6"
              >
                Order Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
