"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-done")) {
      setGone(true);
      return;
    }
    document.body.classList.add("lock-intro");
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("fcb-intro", "1");
      document.body.classList.remove("lock-intro");
      setOut(true);
    }, 1200);
    const hide = window.setTimeout(() => setGone(true), 1650);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hide);
      document.body.classList.remove("lock-intro");
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`loader${out ? " is-out" : ""}`} role="status" aria-live="polite" aria-label="FC Bundes">
      <div className="loader-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="loader-crest" src="/brand/crest.webp" alt="" />
        <p className="loader-name">The Federals</p>
        <p className="loader-est">Est. 2017</p>
        <span className="loader-line" />
      </div>
    </div>
  );
}
