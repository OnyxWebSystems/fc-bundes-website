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
    <figure className="identity-band">
      {cycle ? (
        <PhotoCycle frames={cycle} sizes="100vw" interval={6400} />
      ) : (
        <Image src={image} alt={alt} width={1600} height={1067} sizes="100vw" />
      )}
    </figure>
  );
}
