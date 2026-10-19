"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/media";
import type { MediaItem } from "@/types";

export function MediaGallery({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;
  const [active, setActive] = useState<MediaItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const index = active ? media.findIndex((item) => item.id === active.id) : -1;

  const go = (delta: number) => {
    if (media.length === 0) return;
    const current = index < 0 ? 0 : index;
    const next = (current + delta + media.length) % media.length;
    setActive(media[next]);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
    if (active) closeRef.current?.focus();
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const current = media.findIndex((item) => item.id === active.id);
      const delta = event.key === "ArrowRight" ? 1 : -1;
      setActive(media[(current + delta + media.length) % media.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="media-section">
      <div className="wrap">
        <p className="kicker">Media</p>
        <Title className="section-title">From the ground</Title>
        <p className="media-support">Matchday, the kit, and the squad. Captions stay with the photograph.</p>
        <div className="gallery">
          {media.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`tile area-${item.area}`}
              onClick={() => setActive(item)}
            >
              <span className="tile-frame">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 40vw" />
              </span>
              <span className="tile-meta">
                <span className="kicker">{item.category}</span>
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={active ? active.title : "Media"}
        onClose={() => setActive(null)}
        onCancel={() => setActive(null)}
      >
        {active ? (
          <div
            className="lightbox-frame"
            onPointerDown={(event) => {
              startX.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (startX.current == null) return;
              const delta = event.clientX - startX.current;
              if (delta > 48) go(-1);
              if (delta < -48) go(1);
              startX.current = null;
            }}
          >
            {active.video ? (
              <video src={active.video} poster={active.src} controls playsInline />
            ) : (
              <Image src={active.src} alt={active.alt} width={1600} height={2000} style={{ width: "100%", height: "auto" }} />
            )}
            <div className="lightbox-bar">
              <div>
                <p className="kicker">{active.category}</p>
                <strong>{active.title}</strong>
                <p className="lightbox-caption">{active.alt}</p>
              </div>
              <div className="lightbox-controls">
                <button type="button" onClick={() => go(-1)} disabled={media.length < 2}>
                  Previous
                </button>
                <button type="button" onClick={() => go(1)} disabled={media.length < 2}>
                  Next
                </button>
                <button ref={closeRef} type="button" className="lightbox-close" onClick={() => dialogRef.current?.close()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
