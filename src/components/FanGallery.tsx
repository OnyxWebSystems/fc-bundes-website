"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fans, type FanPhoto } from "@/data/fans";

export function FanGallery() {
  const [active, setActive] = useState<FanPhoto | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const index = active ? fans.findIndex((item) => item.id === active.id) : -1;

  const go = (delta: number) => {
    if (fans.length === 0) return;
    const current = index < 0 ? 0 : index;
    const next = (current + delta + fans.length) % fans.length;
    setActive(fans[next]);
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
      const current = fans.findIndex((item) => item.id === active.id);
      const delta = event.key === "ArrowRight" ? 1 : -1;
      setActive(fans[(current + delta + fans.length) % fans.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="chapter media-section">
      <div className="wrap">
        <header className="chapter-head" data-reveal>
          <div>
            <p className="kicker">Matchday</p>
            <h2 className="chapter-title">The crowd</h2>
          </div>
        </header>
        <div className="fan-mosaic" data-stagger>
          {fans.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`fan-tile is-${item.span}`}
              onClick={() => setActive(item)}
            >
              <Tile item={item} />
            </button>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox fan-lightbox"
        aria-label={active ? active.title : "Fan photographs"}
        onClose={() => setActive(null)}
        onCancel={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
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
            <div className="lightbox-photo">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                quality={90}
                sizes="(min-width: 1100px) 1000px, 100vw"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "min(72vh, 820px)",
                }}
              />
            </div>
            <div className="lightbox-bar">
              <div>
                <p className="kicker">{active.category}</p>
                <strong>{active.title}</strong>
                <p className="lightbox-caption">{active.alt}</p>
              </div>
              <div className="lightbox-controls">
                <button type="button" onClick={() => go(-1)} disabled={fans.length < 2}>
                  Previous
                </button>
                <button type="button" onClick={() => go(1)} disabled={fans.length < 2}>
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

function Tile({ item }: { item: FanPhoto }) {
  return (
    <>
      <span className="fan-frame">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          quality={75}
          sizes={
            item.span === "full" || item.span === "wide"
              ? "(min-width: 1100px) 66vw, 100vw"
              : "(min-width: 1100px) 32vw, (min-width: 720px) 50vw, 100vw"
          }
        />
      </span>
      <span className="tile-meta">
        <span className="kicker">{item.category}</span>
        <strong>{item.title}</strong>
      </span>
    </>
  );
}
