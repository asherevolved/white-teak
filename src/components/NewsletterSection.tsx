"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function NewsletterSection() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  useGSAP(
    () => {
      // Staggered reveal of inner elements
      gsap.from(".nl-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".newsletter-inner", start: "top 85%" },
      });

      // Headline word-by-word reveal
      gsap.from(".nl-word", {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".newsletter-inner", start: "top 85%" },
        delay: 0.15,
      });

      // Top glow drift
      gsap.to(".nl-glow", {
        x: 40,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Steam wisps loop
      gsap.utils.toArray<HTMLElement>(".nl-steam").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 0, opacity: 0, scaleX: 1 },
          {
            y: -36,
            opacity: 0.5,
            scaleX: 1.4,
            duration: 2.4,
            ease: "power1.out",
            repeat: -1,
            delay: i * 0.5,
            keyframes: {
              opacity: [0, 0.5, 0],
              y: [0, -36],
              scaleX: [1, 1.4],
            },
          }
        );
      });

      // Corner ornaments slow rotate
      gsap.to(".nl-corner", {
        rotate: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    gsap.from(".nl-success", {
      y: 12,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="newsletter"
      ref={root}
      className="pt-4 pb-4 lg:pt-6 lg:pb-6"
      style={{ background: "transparent" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div
          className="newsletter-inner relative overflow-hidden px-6 pt-4 pb-4 md:px-12 md:pt-6 md:pb-6 text-center"
          style={{ background: "transparent" }}
        >


          {/* Eyebrow with flanking lines */}
          <div className="nl-reveal relative mb-6 flex items-center justify-center gap-4">
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-brass))",
              }}
            />
            <span
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--color-brass)" }}
            >
              Newsletter
            </span>
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--color-brass))",
              }}
            />
          </div>

          {/* Headline — split, mixed serif + italic accent */}
          <h2
            className="relative font-display leading-[1.05] tracking-[-0.015em]"
            style={{
              color: "#F3ECDF",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            }}
          >
            <span className="nl-word inline-block">Letters</span>{" "}
            <span className="nl-word inline-block">from</span>{" "}
            <span className="nl-word inline-block">the</span>{" "}
            <span
              className="nl-word inline-block italic"
              style={{ color: "var(--color-brass)" }}
            >
              Roastery
            </span>
          </h2>

          {/* Subline */}
          <p
            className="nl-reveal relative mt-5 font-sans text-[15px] md:text-base max-w-[46ch] mx-auto leading-[1.7]"
            style={{ color: "rgba(243,236,223,0.65)" }}
          >
            New arrivals, brewing notes, and quiet invites — delivered slowly,
            never spammy.
          </p>

          {/* Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="nl-reveal relative mt-10 mx-auto max-w-md"
            >
              <div
                className="relative flex items-center rounded-full transition-all duration-500"
                style={{
                  background: "rgba(20,15,10,0.5)",
                  border: focused
                    ? "1px solid var(--color-brass)"
                    : "1px solid rgba(243,236,223,0.18)",
                  boxShadow: focused
                    ? "0 0 0 4px rgba(184,147,90,0.12), 0 8px 30px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <span
                  className="pl-5 pr-1 transition-opacity duration-300"
                  style={{ color: "var(--color-brass)", opacity: focused || email ? 1 : 0.5 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-3 py-3.5 font-sans text-sm outline-none placeholder:opacity-40"
                  style={{ color: "#F3ECDF" }}
                />
                <button
                  type="submit"
                  className="group relative m-1 px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brass), var(--color-brass-deep))",
                    color: "#1a120b",
                    boxShadow: "0 4px 20px rgba(184,147,90,0.35)",
                  }}
                >
                  <span className="relative inline-flex items-center gap-2">
                    Subscribe
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className="nl-success relative mt-10 flex flex-col items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: "rgba(184,147,90,0.15)",
                  border: "1px solid rgba(184,147,90,0.5)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-brass)" }}>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p
                className="font-display italic text-lg"
                style={{ color: "var(--color-brass)" }}
              >
                You&apos;re on the list.
              </p>
              <p
                className="font-sans text-xs"
                style={{ color: "rgba(243,236,223,0.5)" }}
              >
                Something beautiful will arrive in your inbox soon.
              </p>
            </div>
          )}

          {/* Footer trust line */}
          <p
            className="nl-reveal relative mt-8 font-sans text-[10px] uppercase tracking-[0.32em]"
            style={{ color: "rgba(243,236,223,0.35)" }}
          >
            No spam · Unsubscribe anytime · Brewed with care
          </p>
        </div>
      </div>
    </section>
  );
}
