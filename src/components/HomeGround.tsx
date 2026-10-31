import Image from "next/image";
import { club } from "@/data/club";

export function HomeGround() {
  return (
    <section className="chapter ground-chapter" id="ground">
      <div className="atmosphere" aria-hidden="true">
        <Image
          src="/atmosphere/pitch.jpg"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>
      <div className="wrap ground-inner">
        <header className="chapter-head">
          <div>
            <p className="kicker">
              <span>05</span>
              Home
            </p>
            <h2 className="chapter-title">The ground</h2>
          </div>
          <p className="chapter-aside">{club.homeLine}</p>
        </header>
        <figure className="ground-shot">
          <Image
            src="/media/squad.webp"
            alt="FC Bundes squad lined up at the ground"
            width={640}
            height={427}
            quality={90}
          />
          <figcaption>{club.ground}</figcaption>
        </figure>
      </div>
    </section>
  );
}
