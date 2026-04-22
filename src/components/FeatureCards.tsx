"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FEATURE_CARDS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FeatureCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".feat-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".feat-grid", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="py-20 bg-[color:var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="feat-card group rounded-2xl overflow-hidden bg-[color:var(--color-parchment)] hover:shadow-xl transition-shadow duration-500"
            >
              {/* Image */}
              <div className="aspect-[16/9] relative overflow-hidden bg-wt-brown/10">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-lg text-wt-coffee/40">
                      {card.title}
                    </span>
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="p-5">
                <p className="font-sans text-xs text-wt-brown-dark/60 mb-1.5">
                  {card.subtitle}
                </p>
                <h3 className="font-display text-lg text-wt-coffee leading-tight">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
