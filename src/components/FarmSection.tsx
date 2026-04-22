"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FARM_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FarmSection() {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.from(".farm-head > *", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".farm-head", start: "top 85%" },
      });
      gsap.from(".farm-gallery", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".farm-gallery", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="py-20 bg-[color:var(--color-ivory)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="farm-head text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-wt-coffee">
            From Heart to Hands, Farm to Cup
          </h2>
          <p className="font-sans text-sm text-wt-brown-dark/70 mt-3 max-w-xl mx-auto">
            Our Coffee Farms Nestled in Nature&apos;s Embrace
          </p>
        </div>

        {/* Image carousel */}
        <div className="farm-gallery relative">
          <div className="aspect-[16/9] md:aspect-[2.5/1] rounded-2xl overflow-hidden relative">
            {FARM_IMAGES.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Coffee farm ${i + 1}`}
                fill
                className={`object-cover transition-opacity duration-700 ${
                  i === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Carousel dots */}
          <div className="flex justify-center gap-3 mt-6">
            {FARM_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeIndex
                    ? "bg-wt-coffee scale-110"
                    : "bg-wt-brown-dark/30 hover:bg-wt-brown-dark/50"
                }`}
                aria-label={`View farm image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
