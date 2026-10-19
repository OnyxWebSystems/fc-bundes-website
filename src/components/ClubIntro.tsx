import Image from "next/image";
import { club, foundingLine } from "@/data/club";

export function ClubIntro({ as = "h2" }: { as?: "h1" | "h2" }) {
  const Title = as;

  return (
    <section className="intro" data-reveal>
      <div className="wrap intro-layout">
        <p className="intro-year" aria-hidden="true">
          {club.founded}
        </p>
        <div>
          <p className="kicker">The club</p>
          <Title className="intro-title">
            A club from Dagoretti.
            <span>Built by the Federals.</span>
          </Title>
          <div className="intro-foot">
            <p>{foundingLine} The club still calls Nairobi City Council Field home.</p>
            <ul>
              {club.founders.map((founder) => (
                <li key={founder.name} className={founder.image ? "has-portrait" : undefined}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
