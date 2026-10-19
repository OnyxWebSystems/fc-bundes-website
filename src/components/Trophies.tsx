import Link from "next/link";
import { trophies } from "@/data/trophies";

export function Trophies({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="honours-section">
      <div className="wrap">
        <Title className="honours-label">Honours</Title>
        <ul className="honour-list">
          {trophies.map((trophy) => (
            <li key={trophy.id}>
              <span>{trophy.competition}</span>
              <span className="honour-place">{trophy.place}</span>
            </li>
          ))}
        </ul>
        {level === "h2" ? (
          <p className="honours-more">
            <Link href="/trophies">Honours</Link>
          </p>
        ) : (
          <p className="honours-more">
            <Link href="/club">The club story</Link>
          </p>
        )}
      </div>
    </section>
  );
}
