import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Trophies } from "@/components/Trophies";

export const metadata: Metadata = {
  title: "Trophies",
  description: "Honours won by FC Bundes, The Federals.",
};

export default function TrophiesPage() {
  return (
    <div className="page">
      <PageHero index="08" kicker="The club" title="Honours" line="Recorded finishes for The Federals." />
      <Trophies page />
    </div>
  );
}
