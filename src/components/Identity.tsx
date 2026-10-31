"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PhotoFrame } from "@/data/photos";
import { registerGsap } from "@/lib/gsap";

export function Identity({ frames }: { frames: PhotoFrame[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || frames.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -Math.max(0, track.scrollWidth - section.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 28%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [frames.length]);

  if (frames.length === 0) return null;

  return (
    <section className="chapter kit-chapter" id="kit" ref={sectionRef}>
      <div className="wrap">
        <header className="chapter-head">
          <div>
            <p className="kicker">
              <span>03</span>
              Kit
            </p>
            <h2 className="chapter-title">The kit</h2>
          </div>
        </header>
      </div>
      <div className="kit-window">
        <div className="kit-track" ref={trackRef}>
          {frames.map((frame) => (
            <figure className="kit-card" key={frame.src}>
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                quality={90}
                sizes="300px"
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
