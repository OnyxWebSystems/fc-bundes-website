"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { media } from "@/data/media";
import type { MediaItem } from "@/types";

const shotSize: Record<string, [number, number]> = {
  squad: [640, 427],
  action: [640, 640],
  matchday: [360, 640],
  lineup: [640, 457],
  "home-kit": [2000, 2999],
  "crest-close": [2000, 1333],
  "away-kit": [2000, 2999],
  "the-kit": [2000, 1333],
};

function shotFor(item: MediaItem) {
  return shotSize[item.id] ?? [960, 720];
}

export function MediaGallery({ preview = false }: { preview?: boolean }) {
  const items = preview ? media.slice(0, 4) : media;
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
    <section className="chapter media-section">
      <div className="wrap">
        <header className="chapter-head">
          <div>
            <p className="kicker">{preview ? "Gallery" : "Collection"}</p>
            <h2 className="chapter-title">{preview ? "Photographs" : "The gallery"}</h2>
          </div>
          {preview ? (
            <Button href="/media" variant="ghost">
              The gallery
            </Button>
          ) : null}
        </header>
        <div className="caption-grid">
          {items.map((item) =>
            preview ? (
              <Link key={item.id} href="/media" className="tile" style={{ ["--shot" as string]: `${Math.min(shotFor(item)[0], 520)}px` }}>
                <Tile item={item} />
              </Link>
            ) : (
              <button
                key={item.id}
                type="button"
                className="tile"
                style={{ ["--shot" as string]: `${Math.min(shotFor(item)[0], 520)}px` }}
                onClick={() => setActive(item)}
              >
                <Tile item={item} />
              </button>
            ),
          )}
        </div>
      </div>
      {preview ? null : (
        <dialog
          ref={dialogRef}
          className="lightbox"
          aria-label={active ? active.title : "Media"}
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
              {active.video ? (
                <video src={active.video} poster={active.src} controls playsInline />
              ) : (
                <div className="lightbox-photo">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    width={shotFor(active)[0]}
                    height={shotFor(active)[1]}
                    quality={90}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: `min(100%, ${shotFor(active)[0]}px)`,
                      maxHeight: "min(72vh, 820px)",
                    }}
                  />
                </div>
              )}
              <div className="lightbox-bar">
                <div>
                  <p className="kicker">{active.category}</p>
                  <strong>{active.title}</strong>
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
      )}
    </section>
  );
}

function Tile({ item }: { item: MediaItem }) {
  const [width, height] = shotFor(item);
  return (
    <>
      <span className="tile-frame">
        <Image src={item.src} alt={item.alt} width={width} height={height} quality={90} />
      </span>
      <span className="tile-meta">
        <span className="kicker">{item.category}</span>
        <strong>{item.title}</strong>
      </span>
    </>
  );
}
