"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { club } from "@/data/club";
import { nav } from "@/data/nav";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("lock-menu", open);
    return () => document.body.classList.remove("lock-menu");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.requestAnimationFrame(() => {
      document.getElementById("menu-home")?.focus();
    });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(focusTimer);
    };
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="header-bar">
          <Link href="/" className="logo" aria-label="FC Bundes home" data-cursor="button">
            <Image className="logo-img" src="/brand/crest.webp" alt="" width={120} height={136} priority />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active(item.href) ? " is-active" : ""}`}
                data-cursor="button"
                aria-current={active(item.href) ? "page" : undefined}
              >
                <i aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="nav-follow" href={club.instagram.url} target="_blank" rel="noopener noreferrer" data-cursor="open">
            Follow the Federals
          </a>
          <button
            type="button"
            className={`burger${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="site-menu" className={`menu${open ? " is-open" : ""}`} inert={!open ? true : undefined} aria-hidden={!open}>
        <p className="menu-brand">FC Bundes</p>
        {nav.map((item) => (
          <Link
            key={item.href}
            id={item.href === "/" ? "menu-home" : undefined}
            href={item.href}
            className={active(item.href) ? "is-active" : undefined}
            aria-current={active(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <a className="menu-follow" href={club.instagram.url} target="_blank" rel="noopener noreferrer">
          Follow the Federals
        </a>
      </div>
    </>
  );
}
