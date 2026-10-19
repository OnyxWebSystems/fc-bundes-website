import Image from "next/image";
import Link from "next/link";
import { club } from "@/data/club";
import { nav } from "@/data/nav";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand">
          <Image className="footer-logo" src="/brand/crest.webp" alt="FC Bundes crest" width={220} height={248} />
          <div>
            <p className="footer-name">The Federals</p>
            <p className="footer-loc">Dagoretti · Nairobi · Kenya</p>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} data-cursor="open">
              {item.label}
            </Link>
          ))}
          <a href={club.instagram.url} target="_blank" rel="noopener noreferrer" data-cursor="open">
            Instagram
          </a>
        </nav>
        <p className="footer-copy">© 2026 FC BUNDES. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
