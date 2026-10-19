import Image from "next/image";
import { PhotoCycle } from "@/components/PhotoCycle";
import { club } from "@/data/club";
import type { PhotoFrame } from "@/data/photos";

type HomeGroundProps = {
  level?: "h1" | "h2";
  image?: string | null;
  imageAlt?: string;
  frames?: PhotoFrame[];
};

export function HomeGround({ level = "h2", image = null, imageAlt = "", frames }: HomeGroundProps) {
  const Title = level;

  return (
    <section className="ground">
      <div className="wrap ground-layout" data-reveal>
        <div>
          <p className="kicker">Home</p>
          <Title className="ground-title">Dagoretti</Title>
          <div className="ground-meta">
            <p className="ground-place">{club.ground}</p>
            <p className="ground-ncc">
              <span className="pin" aria-hidden="true">
                <span className="pin-ring" />
                <span className="pin-dot" />
              </span>
              {club.groundShort}
            </p>
          </div>
          <p className="ground-line">This is where the Federals live.</p>
        </div>
        {frames && frames.length > 1 ? (
          <figure className="ground-photo is-cycle">
            <PhotoCycle frames={frames} sizes="(max-width: 800px) 100vw, 52vw" interval={7000} />
          </figure>
        ) : image ? (
          <figure className="ground-photo">
            <Image src={image} alt={imageAlt} width={960} height={640} sizes="(max-width: 800px) 100vw, 52vw" />
          </figure>
        ) : null}
      </div>
    </section>
  );
}
