import Image from "next/image";
import { club, contacts } from "@/data/club";

export function Contact({ level = "h1" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="contact-section">
      <div className="wrap">
        <Title className="visually-hidden">Contact</Title>
        <ul className="contact-list">
          {contacts.map((person) => (
            <li key={person.tel}>
              {person.image ? (
                <Image
                  src={person.image}
                  alt={person.imageAlt ?? person.name}
                  width={person.width ?? 960}
                  height={person.height ?? 1280}
                  className="contact-photo"
                />
              ) : (
                <span className="staff-mark" aria-hidden="true" />
              )}
              <p className="staff-name">{person.name}</p>
              <p className="staff-role">{person.role}</p>
              <a href={person.tel}>{person.phone}</a>
            </li>
          ))}
        </ul>
        <p className="contact-follow">
          <a className="text-link" href={club.instagram.url} target="_blank" rel="noopener noreferrer">
            Follow the Federals
          </a>
        </p>
      </div>
    </section>
  );
}
