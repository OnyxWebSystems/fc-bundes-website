"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { club } from "@/data/club";
import { nav } from "@/data/nav";
import { registerGsap } from "@/lib/gsap";

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [sliding, setSliding] = useState(false);
  const firstPath = useRef(true);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const measure = () => {
      const bar = navRef.current;
      const current = bar?.querySelector<HTMLElement>(".nav-link.is-active");
      if (!bar || !current || bar.offsetParent === null) {
        setIndicator((value) => (value.width === 0 && !value.ready ? value : { ...value, width: 0, ready: false }));
        return;
      }
      const parent = bar.getBoundingClientRect();
      const box = current.getBoundingClientRect();
      const left = box.left - parent.left;
      const width = box.width;
      setIndicator((value) =>
        value.ready && Math.abs(value.left - left) < 0.5 && Math.abs(value.width - width) < 0.5
          ? value
          : { left, width, ready: true },
      );
    };

    let frame = 0;
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    if (navRef.current) observer.observe(navRef.current);
    if (shellRef.current) observer.observe(shellRef.current);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    const fonts = document.fonts?.ready.then(schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      void fonts;
    };
  }, [pathname, open]);

  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    setSliding(true);
    const timer = window.setTimeout(() => setSliding(false), 480);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1280px)");
    let ctx: { revert: () => void } | undefined;
    let resizeTimer = 0;

    const paintFallback = () => {
      shell.classList.toggle("is-capsule", window.scrollY > 24);
    };

    const setup = () => {
      ctx?.revert();
      ctx = undefined;
      const { gsap } = registerGsap();
      gsap.set(shell, { clearProps: "width,borderRadius,backgroundColor,borderColor,boxShadow,backdropFilter" });
      shell.classList.remove("is-capsule");

      if (reduce.matches || !desktop.matches) {
        paintFallback();
        return;
      }

      const parent = shell.parentElement;
      const parentStyle = parent ? getComputedStyle(parent) : null;
      const pad = parentStyle ? parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight) : 0;
      const full = Math.max((parent?.clientWidth ?? window.innerWidth) - pad, 320);
      const compact = Math.min(1180, Math.max(full - 48, 320));
      ctx = gsap.context(() => {
        gsap.fromTo(
          shell,
          {
            width: full,
            borderRadius: 18,
            backgroundColor: "rgba(12,12,14,0)",
            borderColor: "rgba(244,241,234,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          {
            width: compact,
            borderRadius: 999,
            backgroundColor: "rgba(12,12,14,0.78)",
            borderColor: "rgba(244,241,234,0.14)",
            boxShadow: "0 18px 48px rgba(0,0,0,0.42)",
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: 150,
              scrub: 0.4,
              onUpdate: (self) => {
                shell.style.backdropFilter = `blur(${Math.round(self.progress * 18)}px)`;
              },
            },
          },
        );
      });
    };

    setup();
    const onScroll = () => {
      if (reduce.matches || !desktop.matches) paintFallback();
    };
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    desktop.addEventListener("change", setup);
    reduce.addEventListener("change", setup);
    return () => {
      ctx?.revert();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktop.removeEventListener("change", setup);
      reduce.removeEventListener("change", setup);
    };
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

  return (
    <>
      <header className={`header${open ? " is-open" : ""}`}>
        <div className="header-shell" ref={shellRef}>
          <div className="header-bar">
            <Link href="/" className="logo" aria-label="FC Bundes home">
              <Image className="logo-img" src="/brand/crest.webp" alt="" width={120} height={136} priority />
              <span className="logo-name">FC Bundes</span>
            </Link>
            <nav className="nav-links" aria-label="Primary" ref={navRef}>
              <span
                className={`nav-pill${indicator.ready ? " is-ready" : ""}${sliding ? " is-sliding" : ""}`}
                style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
              />
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link${active(item.href) ? " is-active" : ""}`}
                  aria-current={active(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button className="nav-cta" href={club.instagram.url} external arrow={false}>
              Follow
            </Button>
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
        </div>
      </header>
      <div id="site-menu" className={`menu${open ? " is-open" : ""}`} inert={!open ? true : undefined} aria-hidden={!open}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="menu-crest" src="/brand/crest.webp" alt="" />
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
        <Button href={club.instagram.url} external arrow={false}>
          Follow
        </Button>
      </div>
    </>
  );
}
