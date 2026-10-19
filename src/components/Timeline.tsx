"use client";

import { useEffect, useRef } from "react";
import { milestones } from "@/data/club";
import { registerGsap } from "@/lib/gsap";

export function Timeline() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      const line = section.querySelector(".timeline-line-progress");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".milestone").forEach((item) => {
        const yearEl = item.querySelector<HTMLElement>(".milestone-year");
        const year = Number(yearEl?.dataset.year);
        if (yearEl && Number.isFinite(year)) {
          const counter = { value: year - 7 };
          gsap.to(counter, {
            value: year,
            duration: 1.05,
            ease: "power2.out",
            snap: { value: 1 },
            scrollTrigger: { trigger: item, start: "top 80%", once: true },
            onUpdate: () => {
              yearEl.textContent = String(Math.round(counter.value));
            },
          });
        }
        ScrollTrigger.create({
          trigger: item,
          start: "top 68%",
          once: true,
          onEnter: () => item.classList.add("is-active"),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="timeline" ref={root}>
      <div className="wrap timeline-track">
        <div className="timeline-line" aria-hidden="true">
          <div className="timeline-line-progress" />
        </div>
        {milestones.map((item) => (
          <article className="milestone" key={`${item.year}-${item.title}`}>
            <p className="milestone-year" data-year={item.year}>
              {item.year}
            </p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
