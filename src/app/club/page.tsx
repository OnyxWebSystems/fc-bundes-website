import type { Metadata } from "next";
import { ClubIntro } from "@/components/ClubIntro";
import { Staff } from "@/components/Staff";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Club",
  description: "FC Bundes was founded in 2017 by Bill Okumu and Hilary Odhiambo in Dagoretti, Nairobi.",
};

export default function ClubPage() {
  return (
    <div className="page">
      <Staff level="h1" />
      <Timeline />
      <ClubIntro />
    </div>
  );
}
