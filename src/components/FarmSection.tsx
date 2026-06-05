"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const arrivals = [
  { tag: "Single Origin", name: "Ethiopia Yirgacheffe", note: "Floral · Citrus · Honey" },
  { tag: "Limited Roast", name: "Colombia Geisha", note: "Jasmine · Bergamot · Stone Fruit" },
  { tag: "Cold Brew", name: "Kenya AA Reserve", note: "Blackcurrant · Cocoa · Bright" },
];

export default function FarmSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".arrivals-head > *", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".arrivals-head", start: "top 85%" },
      });

      gsap.from(".arrival-card", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: ".arrivals-grid", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="arrivals"
      ref={root}
      className="py-20 lg:py-28"
      style={{ background: "transparent" }}
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="arrivals-head text-center mb-10">
          <p
            className="font-sans text-[13px] font-semibold uppercase tracking-[0.24em] mb-3"
            style={{ color: "rgba(243,236,223,0.7)" }}
          >
            Just In
          </p>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "#F3ECDF" }}
          >
            New Arrivals
          </h2>
          <p
            className="font-sans text-sm mt-3 max-w-xl mx-auto"
            style={{ color: "rgba(243,236,223,0.65)" }}
          >
            Freshly landed beans, blends, and small-batch curiosities from our roastery.
          </p>
        </div>

        <div className="arrivals-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {arrivals.map((item, i) => (
            <div
              key={i}
              className="arrival-card group relative overflow-hidden rounded-xl border p-4 transition-transform duration-500 hover:-translate-y-1"
              style={{
                borderColor: "rgba(243,236,223,0.12)",
                background:
                  "linear-gradient(180deg, rgba(243,236,223,0.04), rgba(243,236,223,0.015))",
              }}
            >
              {/* Placeholder visual */}
              <div
                className="aspect-[4/3] w-full rounded-lg mb-3 flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,147,90,0.18), rgba(184,147,90,0.04))",
                  border: "1px solid rgba(184,147,90,0.18)",
                }}
              >
                <span
                  className="font-display text-5xl opacity-30"
                  style={{ color: "var(--color-brass)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.18em] font-sans"
                  style={{
                    background: "rgba(20,15,10,0.55)",
                    color: "#F3ECDF",
                    border: "1px solid rgba(243,236,223,0.18)",
                  }}
                >
                  {item.tag}
                </div>
              </div>

              <h3
                className="font-display text-base md:text-lg leading-tight"
                style={{ color: "#F3ECDF" }}
              >
                {item.name}
              </h3>
              <p
                className="font-sans text-xs mt-1"
                style={{ color: "rgba(243,236,223,0.6)" }}
              >
                {item.note}
              </p>

              <div
                className="mt-3 h-px w-full"
                style={{ background: "rgba(243,236,223,0.1)" }}
              />

              <div className="mt-2.5 flex items-center justify-between">
                <span
                  className="font-sans text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: "var(--color-brass-deep)" }}
                >
                  Coming Soon
                </span>
                <span
                  className="font-sans text-sm transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--color-brass)" }}
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
