"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NATURE_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CAPTIONS = [
  "Garden Courtyard",
  "Canopy Dining",
  "Golden Hour",
];

export default function NatureSection() {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % NATURE_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useGSAP(
    () => {
      gsap.from(".nature-head > *", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".nature-head", start: "top 85%" },
      });
      gsap.from(".nature-stage", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".nature-stage", start: "top 80%" },
      });
      gsap.from(".nature-thumb", {
        opacity: 0,
        x: 40,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".nature-stage", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="nature"
      ref={root}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Decorative */}
      <div
        className="blob"
        style={{
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #d4c9a0 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="nature-head text-center mb-16 max-w-2xl mx-auto">
          <p className="eyebrow-brass mb-4" style={{ color: "#3D2817" }}>
            Escape · Breathe · Savor
          </p>
          <h2 className="display-hero !text-[clamp(2.2rem,5.5vw,4.5rem)]" style={{ color: "#1B100A" }}>
            Nature&apos;s{" "}
            <span className="font-script" style={{ color: "#5a3a18" }}>embrace</span>.
          </h2>
          <p className="font-sans text-[15px] mt-5 leading-relaxed" style={{ color: "rgba(27,16,10,0.7)" }}>
            A dining experience enveloped in warmth — open sky above, warm wood
            beneath, and the soft hum of the garden at your elbow.
          </p>
        </div>

        {/* Stage + thumbnails */}
        <div className="nature-stage grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 items-stretch">
          <div className="relative aspect-[16/9] lg:aspect-[16/10] rounded-[2rem] overflow-hidden frame-inner">
            {NATURE_IMAGES.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={CAPTIONS[i] ?? `Nature ${i + 1}`}
                fill
                className={`object-cover transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.05]"
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="eyebrow !text-[color:var(--color-brass-soft)]">
                  0{activeIndex + 1} · {CAPTIONS[activeIndex]}
                </p>
                <p className="font-display text-2xl md:text-3xl mt-2">
                  Where time slows down.
                </p>
              </div>
              <div className="flex gap-2">
                {NATURE_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex
                        ? "w-10 bg-[color:var(--color-brass)]"
                        : "w-4 bg-[color:var(--color-ivory)]/40 hover:bg-[color:var(--color-ivory)]/70"
                      }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scroll-smooth-x">
            {NATURE_IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`nature-thumb relative shrink-0 w-40 lg:w-full aspect-[16/9] lg:aspect-auto lg:flex-1 rounded-xl overflow-hidden group transition-all duration-500 ${i === activeIndex
                    ? "ring-2 ring-[color:var(--color-brass)] opacity-100"
                    : "opacity-60 hover:opacity-90"
                  }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute inset-0 bg-[color:var(--color-espresso)]/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute top-2 left-2 text-[10px] font-sans tracking-[0.18em] text-[color:var(--color-ivory)]">
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
