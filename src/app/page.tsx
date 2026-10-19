import type { Metadata } from "next";
import { ClubIntro } from "@/components/ClubIntro";
import { Hero } from "@/components/Hero";
import { HomeGround } from "@/components/HomeGround";
import { Identity } from "@/components/Identity";
import { Instagram } from "@/components/Instagram";
import { Matchday } from "@/components/Matchday";
import { SiteIndex } from "@/components/SiteIndex";
import { Trophies } from "@/components/Trophies";
import { kitCloseups } from "@/data/photos";

export const metadata: Metadata = {
  description: "FC Bundes, The Federals. Established 2017 in Dagoretti, Nairobi, Kenya.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClubIntro />
      <Identity
        image="/media/pic-13.webp"
        alt="Close view of the FC Bundes crest on the home kit"
        frames={kitCloseups}
      />
      <Trophies />
      <HomeGround
        image="/media/squad.webp"
        imageAlt="FC Bundes squad lined up at the ground"
      />
      <Matchday />
      <SiteIndex />
      <Instagram />
    </>
  );
}
