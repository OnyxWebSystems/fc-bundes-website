import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Matchday } from "@/components/Matchday";
import { MediaGallery } from "@/components/MediaGallery";
import { NewsList } from "@/components/NewsList";
import { SupporterForm } from "@/components/SupporterForm";
import { club } from "@/data/club";

export const metadata: Metadata = {
  title: "Fan Zone",
  description: "The Federals fan zone. Club news, matchday, photographs, and the official FC Bundes Instagram.",
};

export default function FansPage() {
  return (
    <div className="page">
      <section className="fan-hero">
        <div className="fan-hero-copy">
          <p className="kicker">Fan Zone</p>
          <h1 className="section-title">Welcome to the Federals.</h1>
          <p className="fan-lead">
            This is the club&apos;s noticeboard for supporters: confirmed fixtures, photographs from the ground, and news when the club publishes it.
          </p>
          <div className="btn-row">
            <Button href="/news">Club news</Button>
            <Button href="/matches" variant="ghost">
              Match centre
            </Button>
            <Button href="/media" variant="ghost">
              Media
            </Button>
            <Button href={club.instagram.url} external variant="ghost">
              {club.instagram.handle}
            </Button>
          </div>
        </div>
        <figure className="fan-hero-photo">
          <Image
            src="/media/lineup.webp"
            alt="FC Bundes team photographed together on the pitch"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 48vw"
          />
        </figure>
      </section>
      <NewsList />
      <Matchday />
      <MediaGallery />
      <SupporterForm />
    </div>
  );
}
