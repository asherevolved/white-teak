"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * GSAP scroll-animated gradient — near-solid variant.
 *
 * Each section is rendered as an almost-solid colour with a very subtle
 * radial vignette for depth. GSAP tweens the colour channels with
 * power1.inOut easing for silky-smooth transitions between sections.
 * scrub: 1.5 adds extra smoothing so the colour shift feels organic.
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
 * Section definitions: selector + near-solid colours.
 * top/mid/bottom are very close for a solid feel with subtle depth.
 * The order must match the DOM order on the page.
 */
const SECTIONS = [
  // Hero — olive green (solid feel)
  { sel: "#hero",                        ...makeState("#465a18", "#4a5e17", "#425615") },
  // Menu — deep crimson (solid feel)
  { sel: "main > section:nth-child(2)",  ...makeState("#7a1a16", "#7d1713", "#711512") },
  // Nature Embrace — warm sand (solid feel)
  { sel: "#nature",                      ...makeState("#bdb08a", "#b8aa84", "#b0a37e") },
  // Story — roasted brown (solid feel)
  { sel: "#story",                       ...makeState("#86593b", "#815638", "#7a5135") },
  // Farm — deeper earthy brown (solid feel)
  { sel: "main > section:nth-child(5)",  ...makeState("#503627", "#4d3324", "#483022") },
  // Feature Cards — dark brown (solid feel)
  { sel: "main > section:nth-child(6)",  ...makeState("#2e1d16", "#2b1a14", "#281812") },
  // Reviews — near-black coffee (solid feel)
  { sel: "#testimonials",                ...makeState("#1d120d", "#1a0f0b", "#170d09") },
  // Footer — black (solid)
  { sel: "#footer",                      ...makeState("#080503", "#050302", "#000000") },
];

export default function ScrollGradient() {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = layerRef.current;
    if (!el) return;

    // Proxy object that GSAP tweens — holds the current RGB channels
    const proxy: ColorState = { ...SECTIONS[0] };

    // Render a fully solid bg using the mid colour to avoid any visible banding
    const render = () => {
      const m = `rgb(${Math.round(proxy.mR)},${Math.round(proxy.mG)},${Math.round(proxy.mB)})`;
      el.style.background = m;
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
        scrub: 1.5, // extra smoothing for buttery transitions
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
          ease: "power1.inOut",
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
