import Image from "next/image";
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
        <p className="kicker hero-line">
          <span>FC Bundes · Est. {club.founded}</span>
        </p>
        <h1 className="hero-title hero-line">
          <span>
            The <em>Federals</em>
          </span>
        </h1>
        <p className="hero-loc hero-line">
          <span>{club.locationLabel}</span>
        </p>
        <span className="hero-rule" />
        <p className="hero-statement hero-line">
          <span>Founded in Dagoretti. Still playing at Nairobi City Council Field.</span>
        </p>
        <div className="btn-row">
          <Button href="/team" arrow>
            The squad
          </Button>
          <Button href="/matches" variant="ghost">
            Match centre
          </Button>
        </div>
      </div>
    </section>
  );
}
