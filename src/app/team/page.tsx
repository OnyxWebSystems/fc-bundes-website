import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Team } from "@/components/Team";
import { club } from "@/data/club";

export const metadata: Metadata = {
  title: "Team",
  description: "The FC Bundes first-team roster. The Federals, Dagoretti, Nairobi.",
};

export default function TeamPage() {
  return (
    <div className="page">
      <PageHero
        index="02"
        kicker="First team"
        title="The squad"
        line={`${club.nickname}, ${club.area}, ${club.city}.`}
        image="/media/pic-12.webp"
        imageAlt="Player wearing the FC Bundes black and orange home kit"
      />
      <Team />
    </div>
  );
}
