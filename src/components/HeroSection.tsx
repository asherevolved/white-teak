"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MAPS_URL, MENU_URL } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 })
        .from(
          ".hero-title-line",
          { opacity: 0, y: 60, stagger: 0.12, duration: 1.1 },
          "-=0.4"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 30, duration: 0.9 },
          "-=0.6"
        )
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 20, stagger: 0.08, duration: 0.7 },
          "-=0.5"
        )
        .from(
          ".hero-meta",
          { opacity: 0, y: 20, duration: 0.9 },
          "-=0.6"
        )
        .from(
          ".hero-media",
          { opacity: 0, scale: 0.94, duration: 1.3, ease: "expo.out" },
          0.3
        )
        .from(
          ".hero-stamp",
          { opacity: 0, scale: 0.5, rotate: -60, duration: 1.2 },
          0.9
        )
        .from(
          ".hero-bean",
          { opacity: 0, y: 30, rotate: (i: number) => i * 40 - 40, stagger: 0.1, duration: 0.8 },
          0.5
        );
    },
    { scope: root }
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 80% 20%, #EDE3D1 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, #E6D9C1 0%, transparent 60%), #F3ECDF",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="blob"
        style={{
          top: "-10%",
          right: "-5%",
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, #B8935A 0%, transparent 70%)",
        }}
      />
      <div
        className="blob"
        style={{
          bottom: "-15%",
          left: "-8%",
          width: "380px",
          height: "380px",
          background: "radial-gradient(circle, #5B6B3E 0%, transparent 70%)",
          opacity: 0.25,
        }}
      />

      {/* Floating bean decorations */}
      <svg
        className="hero-bean absolute top-[22%] left-[6%] w-10 h-10 text-[color:var(--color-brass-deep)]/30 animate-float-idle"
        style={{ ["--r" as string]: "15deg" } as React.CSSProperties}
        viewBox="0 0 40 40" fill="currentColor"
        aria-hidden="true"
      >
        <ellipse cx="20" cy="20" rx="10" ry="16" />
        <path d="M20 5 C 20 12, 20 28, 20 35" stroke="#F3ECDF" strokeWidth="1.5" fill="none" />
      </svg>
      <svg
        className="hero-bean absolute bottom-[18%] right-[48%] w-8 h-8 text-[color:var(--color-walnut)]/25 animate-float-idle"
        style={{ ["--r" as string]: "-25deg", animationDelay: "2s" } as React.CSSProperties}
        viewBox="0 0 40 40" fill="currentColor"
        aria-hidden="true"
      >
        <ellipse cx="20" cy="20" rx="10" ry="16" />
        <path d="M20 5 C 20 12, 20 28, 20 35" stroke="#F3ECDF" strokeWidth="1.5" fill="none" />
      </svg>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left — Editorial Text */}
          <div>


            <h1 className="display-hero text-[color:var(--color-espresso)]">
              <span className="hero-title-line block overflow-hidden">
                <span className="block">Where coffee</span>
              </span>
              <span className="hero-title-line block overflow-hidden">
                <span className="block">
                  and cuisine{" "}
                  <span className="font-script italic text-[color:var(--color-brass-deep)] font-normal">
                    harmonize
                  </span>
                </span>
              </span>
              <span className="hero-title-line block overflow-hidden">
                <span className="block">with nature.</span>
              </span>
            </h1>

            <p className="hero-sub mt-8 font-sans text-[15px] md:text-base text-[color:var(--color-walnut)]/85 leading-[1.7] max-w-lg">
              A haven in the heart of Gokulam where the art of specialty coffee
              meets the craft of soulful food — weaving a tapestry of unhurried,
              all-day cafe moments.
            </p>

            <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                href={MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-filled"
              >
                Explore the Menu
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h12M8 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-outline"
              >
                Visit the Cafe
              </a>
            </div>


          </div>

          {/* Right — Media */}
          <div className="hero-media relative">
            {/* Main video frame */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(27,16,10,0.45)] frame-inner aspect-[4/5] lg:aspect-[4/4.4]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/assets/hero/video-thumb.jpg"
              >
                <source src="/assets/hero/hero-video.mp4" type="video/mp4" />
              </video>
              {/* Bottom caption overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div></div>
                <div className="relative">
                  {/* Steam */}
                  <span className="absolute left-2 top-0 w-1 h-6 bg-[color:var(--color-ivory)]/50 rounded-full animate-steam" />
                  <span className="absolute left-5 top-0 w-1 h-6 bg-[color:var(--color-ivory)]/50 rounded-full animate-steam-delayed" />
                  <span className="block w-9 h-9 rounded-full bg-[color:var(--color-ivory)]/90 mt-6 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B100A" strokeWidth="1.5">
                      <path d="M3 10h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-6zM17 12h2a3 3 0 0 1 0 6h-2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>


          </div>
        </div>


      </div>
    </section>
  );
}
