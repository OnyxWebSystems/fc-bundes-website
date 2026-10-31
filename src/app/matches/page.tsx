import type { Metadata } from "next";
import { Matchday } from "@/components/Matchday";
import { PageHero } from "@/components/PageHero";
import { club } from "@/data/club";

export const metadata: Metadata = {
  title: "Matches",
  description: "FC Bundes matchday. Fixtures will be published here.",
};

export default function MatchesPage() {
  return (
    <div className="page">
      <PageHero index="03" kicker="Fixtures" title="Matchday" line={club.ground} />
      <Matchday showHeader={false} />
    </div>
  );
}
