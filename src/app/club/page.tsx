import type { Metadata } from "next";
import { ClubIntro } from "@/components/ClubIntro";
import { HomeGround } from "@/components/HomeGround";
import { Identity } from "@/components/Identity";
import { Staff } from "@/components/Staff";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Club",
  description: "FC Bundes was founded in 2017 by Bill Okumu and Hilary Odhiambo in Dagoretti, Nairobi.",
};

export default function ClubPage() {
  return (
    <div className="page">
      <ClubIntro as="h1" />
      <Timeline />
      <Staff />
      <Identity
        image="/media/pic-10.webp"
        alt="FC Bundes home kit held up, showing the crest and checkerboard sleeve"
      />
      <HomeGround
        image="/media/squad.webp"
        imageAlt="FC Bundes squad lined up at the ground"
      />
    </div>
  );
}
