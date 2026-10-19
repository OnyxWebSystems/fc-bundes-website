import Image from "next/image";
import { club, foundingLine } from "@/data/club";

export function ClubIntro({ as = "h2" }: { as?: "h1" | "h2" }) {
  const Title = as;

  return (
    <section className="intro">
      <div className="wrap intro-story">
        <Title className="intro-year">{club.founded}</Title>
        <ul className="founder-row">
          {club.founders.map((founder) => (
            <li key={founder.name}>
              {founder.image ? (
                <Image
                  src={founder.image}
                  alt={founder.imageAlt ?? ""}
                  width={founder.width}
                  height={founder.height}
                  className="founder-photo"
                />
              ) : null}
              <span>{founder.name}</span>
              <small>Founder</small>
            </li>
          ))}
        </ul>
        <p className="intro-line">{foundingLine}</p>
      </div>
    </section>
  );
}
