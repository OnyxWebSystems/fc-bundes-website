import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { club } from "@/data/club";
import { nav } from "@/data/nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Image className="footer-logo" src="/brand/crest.webp" alt="FC Bundes crest" width={144} height={164} />
          <div>
            <p className="footer-name">The Federals</p>
            <p className="footer-loc">{club.locationLabel}</p>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-aside">
          <Button href={club.instagram.url} external variant="ghost">
            {club.instagram.display}
          </Button>
          <p className="footer-copy">© 2026 FC Bundes. All rights reserved.</p>
          <p className="footer-credit">Pitch and stadium photographs from Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
