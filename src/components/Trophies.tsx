import Link from "next/link";
import { Button } from "@/components/Button";
import { trophies } from "@/data/trophies";

export function Trophies({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="honours-section">
      <div className="wrap" data-reveal>
        <div className="honours-head">
          <p className="kicker">Honours</p>
          <Title>What the Federals have won</Title>
        </div>
        <ol>
          {trophies.map((trophy, index) => (
            <li className="honour" key={trophy.id}>
              <span className="honour-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{trophy.competition}</h3>
              <p className="honour-place">{trophy.place}</p>
            </li>
          ))}
        </ol>
        {level === "h2" ? (
          <div className="btn-row honours-link">
            <Button href="/trophies">Honours</Button>
          </div>
        ) : (
          <p className="empty-note">
            <Link href="/club">The club story</Link>
          </p>
        )}
      </div>
    </section>
  );
}
