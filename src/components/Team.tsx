import Image from "next/image";
import Link from "next/link";
import { players } from "@/data/players";

export function Team({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="squad">
      <div className="wrap">
        <p className="kicker">First team</p>
        <Title className="section-title">The squad</Title>
        <p className="squad-lead">
          The opening roster is the players already photographed for FC Bundes. Further names can be added to the squad list without rebuilding this page.
        </p>
        <figure className="squad-banner">
          <Image
            src="/media/squad.webp"
            alt="FC Bundes squad lined up at the ground"
            width={1600}
            height={900}
            sizes="(max-width: 800px) 100vw, 1440px"
            priority={level === "h1"}
          />
        </figure>
        {players.length === 0 ? (
          <div className="empty-note">
            <strong>The roster is not published yet.</strong>
            <p>Player portraits will appear here when the club adds them.</p>
          </div>
        ) : (
          <ul className="squad-grid">
            {players.map((player, index) => (
              <li key={player.id} className={index === 0 ? "is-lead" : undefined} data-reveal>
                <Link className="squad-card" href={`/team/${player.id}`}>
                  <span className="squad-photo">
                    {player.image ? (
                      <Image
                        src={player.image}
                        alt={player.imageAlt ?? player.name}
                        fill
                        sizes={index === 0 ? "(max-width: 800px) 100vw, 46vw" : "(max-width: 800px) 100vw, 24vw"}
                        style={{ objectFit: "cover", objectPosition: player.imagePosition ?? "center 20%" }}
                      />
                    ) : (
                      <span className="squad-placeholder">{player.name}</span>
                    )}
                  </span>
                  <span className="squad-name">{player.name}</span>
                  {player.position ? <span className="squad-role">{player.position}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
