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
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      ctx = gsap.context(() => {
      items.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const timer = window.setTimeout(refresh, 200);

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
