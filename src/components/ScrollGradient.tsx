"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * GSAP scroll-animated gradient.
 *
 * A single GSAP timeline tweens 9 colour channels (top/mid/bottom × R/G/B)
 * through a series of keyframes. The timeline is scrubbed to full-page
 * scroll via ScrollTrigger, so the gradient actively animates as the
 * user scrolls. Each section's portion of the timeline is proportional
 * to the section's height on the page.
 */

/* ─── Hex → RGB helper ─── */
function hex(h: string): [number, number, number] {
  const c = h.replace("#", "");
  return [
    parseInt(c.substring(0, 2), 16),
    parseInt(c.substring(2, 4), 16),
    parseInt(c.substring(4, 6), 16),
  ];
}

/* ─── Gradient keyframes: one per section ─── */
interface ColorState {
  tR: number; tG: number; tB: number; // top
  mR: number; mG: number; mB: number; // mid
  bR: number; bG: number; bB: number; // bottom
}

function makeState(top: string, mid: string, bot: string): ColorState {
  const [tR, tG, tB] = hex(top);
  const [mR, mG, mB] = hex(mid);
  const [bR, bG, bB] = hex(bot);
  return { tR, tG, tB, mR, mG, mB, bR, bG, bB };
}

/**
 * Section definitions: selector + gradient colours.
 * The order must match the DOM order on the page.
 */
const SECTIONS = [
  { sel: "#hero",                        ...makeState("#4a5e17", "#3d6f2c", "#218048") },
  { sel: "main > section:nth-child(2)",  ...makeState("#7d1713", "#923318", "#a63a1c") },
  { sel: "#nature",                      ...makeState("#b8aa84", "#c4b896", "#d6c7a3") },
  { sel: "#story",                       ...makeState("#815638", "#6b4535", "#55372a") },
  { sel: "main > section:nth-child(5)",  ...makeState("#55372a", "#4d3324", "#3a2218") },
  { sel: "main > section:nth-child(6)",  ...makeState("#2b1a14", "#231410", "#1a0f0b") },
  { sel: "#testimonials",                ...makeState("#1a0f0b", "#130a07", "#0d0604") },
  { sel: "#footer",                      ...makeState("#0d0604", "#050302", "#000000") },
];

export default function ScrollGradient() {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = layerRef.current;
    if (!el) return;

    // Proxy object that GSAP tweens — holds the current RGB channels
    const proxy: ColorState = { ...SECTIONS[0] };

    // Render the gradient from current proxy values
    const render = () => {
      el.style.background = `linear-gradient(180deg, rgb(${Math.round(proxy.tR)},${Math.round(proxy.tG)},${Math.round(proxy.tB)}) 0%, rgb(${Math.round(proxy.mR)},${Math.round(proxy.mG)},${Math.round(proxy.mB)}) 50%, rgb(${Math.round(proxy.bR)},${Math.round(proxy.bG)},${Math.round(proxy.bB)}) 100%)`;
    };

    // Set initial gradient
    render();

    // Measure each section's height to proportion the timeline
    const pageHeight = document.documentElement.scrollHeight;
    const weights: number[] = [];

    for (const sec of SECTIONS) {
      const target = document.querySelector(sec.sel) as HTMLElement;
      if (target) {
        weights.push(target.offsetHeight / pageHeight);
      } else {
        weights.push(1 / SECTIONS.length); // fallback
      }
    }

    // Build the timeline — each .to() transitions to the next section's colors
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // 1-second smoothing for buttery feel
        onUpdate: render,
      },
    });

    // Add tweens for each section transition
    let elapsed = 0;
    for (let i = 1; i < SECTIONS.length; i++) {
      const sec = SECTIONS[i];
      const duration = weights[i - 1]; // duration of the PREVIOUS section

      tl.to(
        proxy,
        {
          tR: sec.tR, tG: sec.tG, tB: sec.tB,
          mR: sec.mR, mG: sec.mG, mB: sec.mB,
          bR: sec.bR, bG: sec.bG, bB: sec.bB,
          duration,
          ease: "none",
        },
        elapsed
      );

      elapsed += duration;
    }

    // Hold the final colour for the last section's duration
    tl.to(proxy, { duration: weights[weights.length - 1] }, elapsed);
  });

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        willChange: "background",
      }}
    />
  );
}
