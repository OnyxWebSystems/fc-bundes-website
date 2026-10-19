import Image from "next/image";
import { club } from "@/data/club";

type HomeGroundProps = {
  image?: string;
  imageAlt?: string;
};

export function HomeGround({
  image = "/media/squad.webp",
  imageAlt = "FC Bundes squad lined up at the ground",
}: HomeGroundProps) {
  return (
    <figure className="ground-band">
      <Image src={image} alt={imageAlt} width={1600} height={1067} sizes="100vw" />
      <figcaption>
        {club.ground}, {club.area}.
      </figcaption>
    </figure>
  );
}
