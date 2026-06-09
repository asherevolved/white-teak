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

      <div className="relative mx-auto max-w-[1400px] px-4 lg:px-8">
        {/* Title art */}
        <Image
          src="/summer-affair-title.png"
          alt="The Summer Affair"
          width={520}
          height={300}
          className="sa-title -mb-8 w-[420px] sm:-mb-10 sm:w-[720px] lg:-mb-20 lg:w-[1100px]"
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-10">
          {/* Dish list */}
          <ul className="space-y-2 lg:-mt-64">
            {DISHES.map((dish) => (
              <li
                key={dish}
                className="dish-item font-display text-[1.25rem] font-semibold leading-snug text-[#5A2E12] sm:text-[1.5rem] lg:text-[1.7rem]"
              >
                {dish}
              </li>
            ))}
            <li className="dish-item pl-6 font-display text-[1.1rem] text-[#7A3B1E] sm:text-[1.35rem] lg:text-[1.5rem]">
              — with ice cream
            </li>
          </ul>

          {/* Polaroid dishes photo */}
          <div className="dishes-photo mx-auto w-full max-w-[720px] lg:mx-0 lg:-mt-32 lg:max-w-none lg:justify-self-end lg:scale-[1.12] lg:origin-right">
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
