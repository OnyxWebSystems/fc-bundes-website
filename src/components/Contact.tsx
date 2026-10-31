import Image from "next/image";
import { Button, ButtonArrow } from "@/components/Button";
import { club, contacts } from "@/data/club";

export function Contact() {
  return (
    <section className="chapter contact-section">
      <div className="wrap">
        <header className="chapter-head">
          <div>
            <p className="kicker">Club office</p>
            <h2 className="chapter-title">Speak to the club</h2>
          </div>
          <Button href={club.instagram.url} external variant="ghost">
            Follow the Federals
          </Button>
        </header>
        <ul className="contact-grid" data-stagger>
          {contacts.map((person) => (
            <li className="contact-card" key={person.tel}>
              <article className="portrait-card">
                {person.image ? (
                  <span className="portrait-media">
                    <Image
                      src={person.image}
                      alt={person.imageAlt ?? person.name}
                      fill
                      quality={90}
                      sizes="(max-width: 800px) 100vw, 30vw"
                      style={{ objectFit: "cover", objectPosition: "center center" }}
                    />
                  </span>
                ) : null}
                <span className="portrait-meta">
                  <strong>{person.name}</strong>
                  <span className="portrait-role">{person.role}</span>
                </span>
              </article>
              <a className="btn" href={person.tel}>
                <span>{person.phone}</span>
                <ButtonArrow />
              </a>
            </li>
          ))}
        </ul>
        <p className="contact-ground">
          {club.ground}, {club.area}.
        </p>
      </div>
    </section>
  );
}
