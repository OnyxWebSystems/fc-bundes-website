"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { registerGsap } from "@/lib/gsap";

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void };
    try {
      const { gsap, ScrollTrigger } = registerGsap();
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const hero = el.dataset.parallax === "hero";
          const trigger = el.closest("section, header, figure") ?? el;
          gsap.to(el, {
            yPercent: hero ? 8 : 6,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: hero ? "top top" : "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          const kids = Array.from(el.children);
          if (kids.length === 0) return;
          gsap.to(kids, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el, index) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: (index % 4) * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const timer = window.setTimeout(refresh, 350);

      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(timer);
        ctx.revert();
      };
    } catch {
      document.documentElement.classList.add("motion-off");
      return undefined;
    }
  }, [pathname]);

  return null;
}
