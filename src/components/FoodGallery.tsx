"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FOOD_GALLERY_IMAGES, MENU_URL } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FoodGallery() {
  const root = useRef<HTMLElement>(null);

  // Triple images for seamless marquee loop
  const stream = [...FOOD_GALLERY_IMAGES, ...FOOD_GALLERY_IMAGES, ...FOOD_GALLERY_IMAGES];

  useGSAP(
    () => {
      gsap.from(".food-head > *", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".food-head", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative py-24 lg:py-28 bg-[color:var(--color-ivory)] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="food-head flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow-brass left mb-4">Our Menu</p>
            <h2 className="display-hero !text-[clamp(2rem,5vw,4rem)] text-[color:var(--color-espresso)]">
              Crafted food
              <span className="font-script text-[color:var(--color-brass-deep)] italic"> & </span>
              drinks.
            </h2>
          </div>
          <div className="md:max-w-sm md:text-right">
            <p className="font-sans text-[15px] text-[color:var(--color-walnut)]/80 leading-relaxed">
              Every plate and every cup on our menu is a small ceremony — made
              slow, with local ingredients and a lot of heart.
            </p>
            <a
              href={MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-brass inline-flex items-center gap-2 mt-4 font-sans text-sm uppercase tracking-[0.2em] font-medium"
            >
              View Full Menu
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee image rail */}
      <div className="overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {stream.map((src, i) => (
            <div
              key={i}
              className="shrink-0 mx-3 w-80 md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden relative bg-[color:var(--color-parchment)] group"
            >
              <Image
                src={src}
                alt={`Dish ${(i % FOOD_GALLERY_IMAGES.length) + 1}`}
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[color:var(--color-ivory)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[color:var(--color-ivory)] to-transparent z-10" />
    </section>
  );
}
