import Image from "next/image";
import Link from "next/link";
import { players } from "@/data/players";

export function Team({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="squad">
      <figure className="squad-bleed">
        <Image
          src="/media/squad.webp"
          alt="FC Bundes squad lined up at the ground"
          width={1600}
          height={1067}
          sizes="100vw"
          priority={level === "h1"}
        />
        <Title className="squad-bleed-title">The squad</Title>
      </figure>
      {players.length === 0 ? (
        <div className="wrap">
          <p className="empty-note">TODO: the roster is not published.</p>
        </div>
      ) : (
        <ul className="squad-grid wrap">
          {players.map((player, index) => (
            <li key={player.id} className={index === 0 ? "is-lead" : undefined}>
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
    </section>
  );
}
