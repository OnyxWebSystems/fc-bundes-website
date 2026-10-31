import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ImageFrame } from "@/components/ImageFrame";
import { getPlayer, players } from "@/data/players";

type ProfileProps = {
  params: Promise<{ slug: string }>;
};

const secondFrame: Record<string, string> = {
  "elvis-presley": "/players/elvis-presley/whatsapp-image-2026-10-06-at-16-26-51-edited.webp",
  "wycliffe-ochieng": "/players/wycliffe-ochieng/pic.webp",
  "paul-ochuoga": "/players/paul-ochuoga/pic.webp",
  "daniel-odhiambo": "/players/daniel-odhiambo/pic-2.webp",
  "dwang-jackson": "/players/dwang-jackson/pic-2.webp",
  "evra-barongo": "/players/evra-barongo/pic-2.webp",
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

  const index = players.findIndex((item) => item.id === player.id);
  const prev = index > 0 ? players[index - 1] : null;
  const next = index < players.length - 1 ? players[index + 1] : null;
  const extra = secondFrame[player.id];

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
          <div className="profile-photos">
            {player.image ? (
              <ImageFrame
                src={player.image}
                alt={player.imageAlt ?? player.name}
                title={player.name}
                position="center center"
                priority
                sizes="(max-width: 800px) 100vw, 46vw"
              />
            ) : null}
            {extra ? (
              <ImageFrame
                src={extra}
                alt={`${player.name} of FC Bundes`}
                title={player.name}
                position="center center"
                sizes="(max-width: 800px) 100vw, 46vw"
              />
            ) : null}
          </div>
          <div>
            <p className="kicker">
              <span>{String(index + 1).padStart(2, "0")}</span>
              First team
            </p>
            <h1 className="hero-line">
              <span>{player.name}</span>
            </h1>
            <span className="page-hero-rule" />
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
              <p className="muted profile-bio">Squad details will be published with the roster.</p>
            )}
            <p className="profile-actions">
              <Button href="/team" variant="ghost">
                Back to the squad
              </Button>
            </p>
          </div>
        </div>
        <div className="wrap">
          <nav className="profile-switch" aria-label="Players">
            {prev ? (
              <Link href={`/team/${prev.id}`}>
                Previous
                <span>{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/team/${next.id}`}>
                Next
                <span>{next.name}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </article>
    </div>
  );
}
