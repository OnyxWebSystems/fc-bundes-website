import { Button } from "@/components/Button";
import { PhotoCycle } from "@/components/PhotoCycle";
import { club } from "@/data/club";
import type { PhotoFrame } from "@/data/photos";

const frames: PhotoFrame[] = [
  {
    src: "/media/pic-12.webp",
    alt: "Player wearing the FC Bundes black and orange home kit",
  },
  {
    src: "/media/pic-06.webp",
    alt: "Player in the FC Bundes home kit with a hand raised",
  },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-stage">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="hero-line">
              <span>The</span>
            </span>
            <span className="hero-line">
              <span>Federals</span>
            </span>
          </h1>
          <p className="hero-statement">
            Founded in {club.founded}. {club.area}.
          </p>
          <div className="btn-row">
            <Button href="/team">The squad</Button>
            <Button href="/matches" variant="ghost">
              Match centre
            </Button>
          </div>
        </div>
        <div className="hero-panel">
          <PhotoCycle frames={frames} sizes="(max-width: 900px) 90vw, 46vw" priority interval={6400} />
        </div>
      </div>
    </section>
  );
}
