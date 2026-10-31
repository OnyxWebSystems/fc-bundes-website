import type { Metadata } from "next";
import { ClubIntro } from "@/components/ClubIntro";
import { Hero } from "@/components/Hero";
import { HomeGround } from "@/components/HomeGround";
import { Identity } from "@/components/Identity";
import { Instagram } from "@/components/Instagram";
import { Matchday } from "@/components/Matchday";
import { Trophies } from "@/components/Trophies";
import { studioPortraits } from "@/data/photos";

export const metadata: Metadata = {
  description: "FC Bundes, The Federals. Established 2017 in Dagoretti, Nairobi, Kenya.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClubIntro index="02" />
      <Identity frames={studioPortraits} />
      <Trophies />
      <HomeGround />
      <Matchday />
      <Instagram index="07" />
    </>
  );
}
