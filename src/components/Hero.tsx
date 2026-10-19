import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PhotoCycle } from "@/components/PhotoCycle";
import { club } from "@/data/club";
import { studioPortraits } from "@/data/photos";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-media">
        <PhotoCycle frames={studioPortraits} sizes="100vw" priority interval={5600} />
      </div>
      <div className="hero-shade" />
      <div className="hero-copy wrap">
        <Image className="hero-crest" src="/brand/crest.webp" alt="" width={72} height={82} priority />
        <h1 className="hero-title">The Federals</h1>
        <p className="hero-loc">
          {club.area}, {club.city}
        </p>
        <p className="hero-statement">
          Founded in {club.founded}. {club.ground}.
        </p>
        <div className="btn-row">
          <Button href="/team" arrow>
            The squad
          </Button>
          <Link href="/matches" className="text-link">
            Match centre
          </Link>
        </div>
      </div>
    </section>
  );
}
