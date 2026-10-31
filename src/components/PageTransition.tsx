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
    const revealTimer = window.setTimeout(() => setPhase("reveal"), 320);
    const idleTimer = window.setTimeout(() => setPhase("idle"), 760);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(idleTimer);
    };
  }, [pathname]);

  return (
    <div className={`overlay${phase === "idle" ? "" : ` is-${phase}`}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/crest.webp" alt="" />
    </div>
  );
}
