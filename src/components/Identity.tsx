import Image from "next/image";
import { PhotoCycle } from "@/components/PhotoCycle";
import type { PhotoFrame } from "@/data/photos";

type IdentityProps = {
  image: string;
  alt: string;
  frames?: PhotoFrame[];
};

export function Identity({ image, alt, frames }: IdentityProps) {
  const cycle = frames && frames.length > 1 ? frames : null;

  return (
    <section className="identity" data-reveal>
      <div className="identity-copy">
        <h2 className="identity-title">The Federals</h2>
        <p className="identity-loc">Dagoretti. Nairobi. Kenya.</p>
      </div>
      <div className="identity-media">
        {cycle ? (
          <PhotoCycle frames={cycle} sizes="(max-width: 800px) 100vw, 48vw" interval={6400} />
        ) : (
          <Image src={image} alt={alt} fill sizes="(max-width: 800px) 100vw, 48vw" />
        )}
      </div>
    </section>
  );
}
