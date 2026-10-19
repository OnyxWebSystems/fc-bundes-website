"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "button" | "view" | "open";

export function Cursor() {
  const node = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const nodeEl = node.current;
    if (!fine || !nodeEl) return;

    document.body.classList.add("has-cursor");
    let x = 0;
    let y = 0;
    let frame = 0;

    const paint = () => {
      nodeEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = 0;
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(paint);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = (target?.dataset.cursor as CursorMode | undefined) ?? "default";
      setMode((current) => (current === next ? current : next));
    };

    const onLeave = () => {
      nodeEl.style.opacity = "0";
    };
    const onEnter = () => {
      nodeEl.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const label = mode === "view" ? "View" : mode === "open" ? "Open" : "";

  return (
    <div ref={node} className={`cursor cursor-${mode}`} aria-hidden="true">
      {label}
    </div>
  );
}
