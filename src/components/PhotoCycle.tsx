"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PhotoFrame } from "@/data/photos";

type PhotoCycleProps = {
  frames: PhotoFrame[];
  sizes: string;
  priority?: boolean;
  interval?: number;
};

export function PhotoCycle({ frames, sizes, priority = false, interval = 5600 }: PhotoCycleProps) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    const advance = () => {
      const current = indexRef.current;
      const next = (current + 1) % frames.length;
      indexRef.current = next;
      setPrevious(current);
      setIndex(next);
    };

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, interval);
    };

    const onVisibility = () => {
      if (document.hidden) window.clearInterval(timer);
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [frames.length, interval]);

  return (
    <div className="photo-cycle">
      {frames.map((frame, i) => {
        const current = i === index;
        const shown = current || i === previous;
        return (
          <span
            key={frame.src}
            className={[
              "photo-frame",
              shown ? "is-shown" : "",
              current ? "is-current" : "",
              current && previous !== null ? "is-enter" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Image
              src={frame.src}
              alt={current ? frame.alt : ""}
              fill
              priority={priority && i === 0}
              sizes={sizes}
              style={{ objectPosition: frame.position ?? "center center" }}
              aria-hidden={current ? undefined : true}
            />
          </span>
        );
      })}
    </div>
  );
}
