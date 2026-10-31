import type { Metadata } from "next";
import { ClubIntro } from "@/components/ClubIntro";
import { PageHero } from "@/components/PageHero";
import { Staff } from "@/components/Staff";
import { Timeline } from "@/components/Timeline";
import { club } from "@/data/club";

export const metadata: Metadata = {
  title: "Club",
  description: "FC Bundes was founded in 2017 by Bill Okumu and Hilary Odhiambo in Dagoretti, Nairobi.",
};

export default function ClubPage() {
  return (
    <div className="page">
      <PageHero index="01" kicker="The club" title="The Federals" line={club.locationLabel} />
      <ClubIntro />
      <Staff />
      <Timeline />
    </div>
  );
}
