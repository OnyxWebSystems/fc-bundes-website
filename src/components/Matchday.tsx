import Image from "next/image";
import { EmptyState } from "@/components/EmptyState";
import { matches } from "@/data/matches";
import type { MatchStatus } from "@/types";

const statusLabel: Record<MatchStatus, string> = {
  upcoming: "Upcoming",
  live: "Live",
  "full-time": "Full time",
};

export function Matchday({ showHeader = true }: { showHeader?: boolean }) {
  const upcoming = matches.filter((match) => match.status === "upcoming");
  const rest = matches.filter((match) => match.status !== "upcoming");
  const ordered = [...upcoming, ...rest];

  return (
    <section className="chapter matchday-chapter" id={showHeader ? "matchday" : undefined}>
      <div className="atmosphere" aria-hidden="true">
        <Image
          src="/atmosphere/stadium.jpg"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>
      <div className="wrap matchday-inner">
        {showHeader && ordered.length > 0 ? (
          <header className="chapter-head">
            <div>
              <p className="kicker">
                <span>06</span>
                Fixtures
              </p>
              <h2 className="chapter-title">Matchday</h2>
            </div>
          </header>
        ) : null}
        {ordered.length === 0 ? (
          <EmptyState
            kicker={
              showHeader ? (
                <>
                  <span>06</span>
                  Matchday
                </>
              ) : undefined
            }
            title="Fixtures to be announced"
            body="Confirmed kickoffs will be published in the match centre."
            href="/fans"
            action="Join the list"
          />
        ) : (
          <div className="fixture-list" data-stagger>
            {ordered.map((match) => (
              <article className={`fixture is-${match.status}`} key={match.id}>
                <p className="kicker">{statusLabel[match.status]}</p>
                <div className="fixture-main">
                  <span>FC Bundes</span>
                  <strong>{match.score ? `${match.score.bundes} — ${match.score.opponent}` : "VS"}</strong>
                  <span>{match.opponent ?? "Opponent to be confirmed"}</span>
                </div>
                <p className="fixture-meta">
                  {[match.competition, match.date, match.venue].filter(Boolean).join(" · ") || "Details to follow"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
