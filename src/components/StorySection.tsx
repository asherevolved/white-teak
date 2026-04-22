"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StoryBlock = {
  title: string;
  paragraphs: string[];
  icon: string;
};

const storyBlocks: StoryBlock[] = [
  {
    title: "The Coffee",
    icon: "\u2615",
    paragraphs: [
      "Along with being our founding-planter, we have chosen to work in direct trade relationships at origin with coffee estates and smallholder farmers, harvesting and processing coffees that we aim to curate into only SCA 85+ point scoring coffees.",
      'We take pride in the intentional introduction of White Teak "Cascara" coffee cherry tea, the dried skin of coffee cherries that can be brewed much like any other specialty tea.',
    ],
  },
  {
    title: "The Teas",
    icon: "\uD83C\uDF3F",
    paragraphs: [
      "We source teas direct from farmers and craft them into unique blends in small batches. Freshness matters to us, so the menu stays focused and deliberate instead of overextended.",
      "We never choose flavor over health. Every blend is built with 100% natural ingredients and made to feel as clean as it tastes.",
    ],
  },
  {
    title: "The Bakes",
    icon: "\uD83C\uDF5E",
    paragraphs: [
      "Our bakes come from a craft kitchen that treats comfort food with the same care we give coffee. Each recipe is developed in-house, from signature staples to seasonal additions.",
      "The result is food that feels familiar, but still specific to White Teak in texture, warmth, and detail.",
    ],
  },
  {
    title: "Home Brewing",
    icon: "\u2696\uFE0F",
    paragraphs: [
      "We curate brewing equipment for people who want to take the White Teak ritual home, whether they are just starting out or refining a daily practice.",
      "The aim is not to overwhelm, but to make better brewing feel accessible, calm, and repeatable.",
    ],
  },
  {
    title: "Events",
    icon: "\uD83C\uDFB6",
    paragraphs: [
      "We bring together communities across walks of life through specially curated events that celebrate coffee, craft, design, and conversation.",
      "This part of the story turns the cafe into a shared space for artists, makers, musicians, and social changemakers.",
    ],
  },
];

export default function StorySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── intro header ── */
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-intro",
          start: "top 84%",
        },
      });

      introTl
        .from(".story-eyebrow", {
          opacity: 0,
          y: 14,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          ".story-headline > *",
          {
            opacity: 0,
            y: 28,
            stagger: 0.08,
            duration: 0.7,
            ease: "expo.out",
          },
          "-=0.2"
        )
        .from(
          ".story-divider",
          {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        );

      /* ── master scrub timeline for the whole vertical line + items ── */
      const timelineTrack = root.current?.querySelector(
        ".timeline-track"
      ) as HTMLElement;
      const timelineFill = root.current?.querySelector(
        ".timeline-fill"
      ) as HTMLElement;
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

      if (!timelineTrack || !timelineFill || !items.length) return;

      // main scrub timeline — the line grows and items reveal progressively
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineTrack,
          start: "top 65%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      // each item gets an equal slice of the timeline
      const sliceDuration = 1 / items.length;

      items.forEach((item, i) => {
        const dot = item.querySelector(".timeline-dot") as HTMLElement;
        const ring = item.querySelector(".timeline-ring") as HTMLElement;
        const content = item.querySelector(".timeline-content") as HTMLElement;
        const isLeft = i % 2 === 0;

        const pos = i * sliceDuration;

        // line fills to this item's position
        masterTl.to(
          timelineFill,
          {
            scaleY: (i + 1) / items.length,
            duration: sliceDuration * 0.6,
            ease: "none",
          },
          pos
        );

        // dot pops in
        masterTl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: sliceDuration * 0.25,
            ease: "back.out(2)",
          },
          pos + sliceDuration * 0.5
        );

        // ring expands
        masterTl.fromTo(
          ring,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: sliceDuration * 0.3,
            ease: "power2.out",
          },
          pos + sliceDuration * 0.45
        );

        // content slides in from the correct side
        masterTl.fromTo(
          content,
          { opacity: 0, x: isLeft ? -50 : 50, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: sliceDuration * 0.45,
            ease: "expo.out",
          },
          pos + sliceDuration * 0.5
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      id="story"
      ref={root}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 18% 10%, rgba(27,16,10,0.03) 0%, transparent 60%), radial-gradient(ellipse 70% 45% at 85% 100%, rgba(27,16,10,0.025) 0%, transparent 60%), var(--color-linen)",
      }}
    >
      {/* top hairline */}
      <div className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--color-line)] to-transparent" />

      <div className="relative mx-auto max-w-[1140px] px-6 lg:px-12">
        {/* ── intro ── */}
        <div className="story-intro max-w-[1040px]">
          <p className="story-eyebrow mb-4 font-sans text-[13px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-espresso)] md:text-[15px]">
            Our Story
          </p>

          <div className="story-headline max-w-[1040px] space-y-2 text-[color:var(--color-espresso)]">
            <p className="font-display text-[clamp(1.35rem,2.4vw,2.1rem)] leading-[1.35] tracking-[-0.01em] max-w-[980px]">
              <span className="italic">&quot;Filtered with Love&quot;</span>:
              being the foundation for our all-day cafe born out of a mutual
              love for specialty coffee and craft food.
            </p>
          </div>

          <div className="story-divider mt-10 h-px w-full max-w-[980px] bg-[color:var(--color-line)]/80" />
        </div>

        {/* ── vertical timeline ── */}
        <div className="relative mt-20 lg:mt-28">
          {/* track (faint) + fill (brass, grows with scroll) — bolder 3px line */}
          <div className="timeline-track absolute left-6 top-0 h-full w-[3px] rounded-full md:left-1/2 md:-translate-x-1/2">
            <div className="h-full w-full rounded-full bg-[color:var(--color-line-soft)]/50" />
            <div
              className="timeline-fill absolute inset-0 origin-top rounded-full"
              style={{
                transform: "scaleY(0)",
                background:
                  "linear-gradient(to bottom, var(--color-brass), var(--color-brass-deep))",
                boxShadow: "0 0 10px rgba(184,147,90,0.25)",
              }}
            />
          </div>

          {/* timeline items */}
          <div className="space-y-20 md:space-y-28">
            {storyBlocks.map((block, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={block.title}
                  className="timeline-item relative pl-16 md:pl-0"
                >
                  {/* ── dot + ring on the line ── */}
                  <div
                    className={`
                      absolute top-2
                      left-6 -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2
                      z-10 flex items-center justify-center
                    `}
                  >
                    {/* outer ring */}
                    <div className="timeline-ring absolute h-11 w-11 rounded-full border-[1.5px] border-[color:var(--color-brass)]/30" />
                    {/* inner dot with icon */}
                    <div className="timeline-dot flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-brass)] text-xs shadow-[0_0_16px_rgba(184,147,90,0.4)]">
                      <span className="text-[12px] leading-none">
                        {block.icon}
                      </span>
                    </div>
                  </div>

                  {/* ── content card ── */}
                  <div
                    className={`
                      timeline-content
                      md:w-[calc(50%-44px)]
                      ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
                      ${isLeft ? "md:text-right" : "md:text-left"}
                    `}
                  >
                    {/* number + title */}
                    <div
                      className={`flex items-center gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}
                    >
                      <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-brass-deep)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-tight text-[color:var(--color-espresso)]">
                        {block.title}
                      </h3>
                    </div>

                    {/* thin brass accent line */}
                    <div
                      className={`my-4 h-[1.5px] w-12 bg-[color:var(--color-brass)]/40 ${isLeft ? "md:ml-auto" : ""}`}
                    />

                    {/* paragraphs */}
                    <div className="space-y-4">
                      {block.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className={`font-sans text-[15px] leading-[1.8] text-[color:var(--color-walnut)] ${isLeft ? "md:ml-auto" : ""} max-w-[52ch]`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* bottom cap of the line */}
          <div className="absolute bottom-0 left-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
            <div className="h-3.5 w-3.5 rounded-full bg-[color:var(--color-brass-deep)] shadow-[0_0_10px_rgba(184,147,90,0.35)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
