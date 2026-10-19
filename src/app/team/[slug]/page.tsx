import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlayer, players } from "@/data/players";

type ProfileProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return players.map((player) => ({ slug: player.id }));
}

export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayer(slug);
  if (!player) return { title: "Player" };
  return {
    title: player.name,
    description: `${player.name}, first team, FC Bundes.`,
  };
}

export default async function PlayerPage({ params }: ProfileProps) {
  const { slug } = await params;
  const player = getPlayer(slug);
  if (!player) notFound();

  const details = [
    player.position ? ["Position", player.position] : null,
    player.number != null ? ["Squad number", String(player.number)] : null,
    player.nationality ? ["Nationality", player.nationality] : null,
    player.foot ? ["Preferred foot", player.foot] : null,
    player.appearances != null ? ["Appearances", String(player.appearances)] : null,
    player.goals != null ? ["Goals", String(player.goals)] : null,
    player.assists != null ? ["Assists", String(player.assists)] : null,
  ].filter((item): item is [string, string] => item !== null);

  return (
    <div className="page">
      <article className="profile">
        <div className="wrap profile-layout">
          <figure className="profile-photo">
            {player.image ? (
              <Image
                src={player.image}
                alt={player.imageAlt ?? player.name}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 46vw"
                style={{ objectFit: "cover", objectPosition: player.imagePosition ?? "center 20%" }}
              />
            ) : (
              <span className="squad-placeholder">{player.name}</span>
            )}
          </figure>
          <div>
            <p className="kicker">First team</p>
            <h1 className="section-title">{player.name}</h1>
            {player.bio ? <p className="profile-bio">{player.bio}</p> : null}
            {details.length > 0 ? (
              <dl className="profile-facts">
                {details.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="empty-note">
                <strong>Portrait only, for now.</strong>
                <p>Position, number, and match figures will be added when the club confirms them.</p>
              </p>
            )}
            <p className="profile-back">
              <Link href="/team">Back to the squad</Link>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
