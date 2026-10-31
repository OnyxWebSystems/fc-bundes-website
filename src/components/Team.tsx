import Image from "next/image";
import Link from "next/link";
import { players } from "@/data/players";

export function Team() {
  return (
    <section className="chapter squad">
      <div className="wrap">
        <header className="chapter-head">
          <div>
            <p className="kicker">Roster</p>
            <h2 className="chapter-title">Players</h2>
          </div>
          <p className="chapter-aside">
            {players.length} {players.length === 1 ? "player" : "players"}
          </p>
        </header>
        {players.length === 0 ? (
          <p className="muted">The roster will be published here.</p>
        ) : (
          <ul className="squad-grid" data-stagger>
            {players.map((player) => (
              <li key={player.id}>
                <Link className={`portrait-card${player.image ? "" : " is-empty"}`} href={`/team/${player.id}`}>
                  {player.image ? (
                    <span className="portrait-media">
                      <Image
                        src={player.image}
                        alt={player.imageAlt ?? player.name}
                        fill
                        quality={90}
                        sizes="(max-width: 800px) 100vw, 25vw"
                        style={{ objectFit: "cover", objectPosition: "center center" }}
                      />
                    </span>
                  ) : (
                    <span className="monogram">{initials(player.name)}</span>
                  )}
                  <span className="portrait-meta">
                    <strong>{player.name}</strong>
                    {player.position ? <span className="portrait-role">{player.position}</span> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
