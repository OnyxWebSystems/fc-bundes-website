"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setPhase("cover");
    const revealTimer = window.setTimeout(() => setPhase("reveal"), 300);
    const idleTimer = window.setTimeout(() => setPhase("idle"), 660);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(idleTimer);
    };
  }, [pathname]);

  return (
    <div className={`overlay${phase === "idle" ? "" : ` is-${phase}`}`} aria-hidden="true" />
  );
}
