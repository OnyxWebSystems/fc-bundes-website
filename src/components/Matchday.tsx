import { matches } from "@/data/matches";
import type { MatchStatus } from "@/types";

const statusLabel: Record<MatchStatus, string> = {
  upcoming: "Upcoming",
  live: "Live",
  "full-time": "Full time",
};

export function Matchday({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;
  const upcoming = matches.filter((match) => match.status === "upcoming");
  const rest = matches.filter((match) => match.status !== "upcoming");
  const ordered = [...upcoming, ...rest];

  if (ordered.length === 0) {
    return (
      <section className="scoreboard">
        <Title className="scoreboard-todo">TODO: no confirmed fixtures.</Title>
      </section>
    );
  }

  return (
    <section className="matchday">
      <div className="wrap matchday-inner">
        <Title className="matchday-title">Matchday</Title>
        <div className="fixture-list">
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
      </div>
    </section>
  );
}
