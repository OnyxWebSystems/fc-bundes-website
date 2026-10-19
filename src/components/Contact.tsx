import Image from "next/image";
import { Button } from "@/components/Button";
import { club, contacts } from "@/data/club";

export function Contact({ level = "h1" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="contact-section">
      <div className="wrap" data-reveal>
        <Title className="section-title">Connect with FC Bundes</Title>
        <div className="contacts">
          {contacts.map((person) => (
            <article className="contact" key={person.tel}>
              {person.image ? (
                <Image
                  src={person.image}
                  alt={person.imageAlt ?? person.name}
                  width={person.width ?? 960}
                  height={person.height ?? 1280}
                  className="contact-photo"
                />
              ) : null}
              <p className="kicker">{person.role}</p>
              <h2>{person.name}</h2>
              <a href={person.tel} data-cursor="open">
                {person.phone}
              </a>
            </article>
          ))}
        </div>
        <div className="contact-follow">
          <Button href={club.instagram.url} external>
            Follow the Federals
          </Button>
        </div>
      </div>
    </section>
  );
}
