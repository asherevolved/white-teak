"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DISHES = [
  "Fresh Mango Cake",
  "Fresh Mango Cheesecake",
  "Mango Matcha Latte",
  "Mango White Chocolate French Toast",
  "Mango White Chocolate Pancake",
  "Mango White Chocolate Waffle",
  "Mango Yogurt Granola Bowl",
  "Mango Sticky Oats",
  "Mango Coconut Oats Bowl",
  "Raw Mango & Papaya Salad",
  "Mango Brownie Crumble",
];

export default function ArrivalsSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      tl.from(".mango-branch", { y: -60, opacity: 0, duration: 1.1, ease: "power2.out" })
        .from(".sa-title", { x: -50, opacity: 0, duration: 1 }, "-=0.7")
        .from(".sa-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, "-=0.6")
        .from(".dish-item", { x: -24, opacity: 0, stagger: 0.07, duration: 0.5 }, "-=0.4")
        .from(".dishes-photo", { scale: 0.9, opacity: 0, duration: 1.1, ease: "expo.out" }, "-=0.9");

      gsap.to(".mango-branch", {
        rotate: 2,
        transformOrigin: "top right",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden pt-4 pb-24 lg:pb-32"
      style={{ background: "transparent" }}
    >
      {/* Mango branch — top-right corner art */}
      <Image
        src="/mango-branch.png"
        alt=""
        aria-hidden
        width={800}
        height={500}
        className="mango-branch pointer-events-none absolute right-0 top-0 w-[65%] max-w-[900px] select-none lg:w-[58%]"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Title art */}
        <p
          className="sa-eyebrow mb-2 font-sans text-[13px] font-bold uppercase tracking-[0.32em] text-[#FFE9A8]"
          style={{
            WebkitTextStroke: "0.6px #2B1206",
            textShadow:
              "0 1px 0 #2B1206, 0 2px 6px rgba(43,18,6,0.45)",
          }}
        >
          New Arrivals
        </p>
        <Image
          src="/summer-affair-title.png"
          alt="The Summer Affair"
          width={520}
          height={300}
          className="sa-title -mb-4 w-[340px] sm:w-[560px] lg:-mb-10 lg:w-[820px]"
        />

        <div className="relative z-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
          {/* Dish list */}
          <ul className="space-y-2.5 lg:-mt-52">
            {DISHES.map((dish) => (
              <li
                key={dish}
                className="dish-item font-display text-[1.35rem] font-semibold leading-snug text-[#5A2E12]"
              >
                {dish}
              </li>
            ))}
            <li className="dish-item pl-6 font-display text-[1.2rem] text-[#7A3B1E]">
              — with ice cream
            </li>
          </ul>

          {/* Polaroid dishes photo */}
          <div className="dishes-photo lg:-mt-52">
            <Image
              src="/mango-dishes.png"
              alt="Mango dish collection — cakes, cheesecake, pancakes, waffles, bowls and salad"
              width={1200}
              height={680}
              className="h-auto w-full drop-shadow-[0_24px_48px_rgba(120,70,10,0.28)]"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
