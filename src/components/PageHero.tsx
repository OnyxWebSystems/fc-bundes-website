import Image from "next/image";

type PageHeroProps = {
  index: string;
  kicker: string;
  title: string;
  line: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({ index, kicker, title, line, image, imageAlt = "" }: PageHeroProps) {
  return (
    <header className={`page-hero${image ? " has-frame" : ""}`}>
      <div className="wrap page-hero-grid">
        <div className="page-hero-copy">
          <p className="kicker">
            <span>{index}</span>
            {kicker}
          </p>
          <h1 className="hero-line">
            <span>{title}</span>
          </h1>
          <p className="page-hero-line">{line}</p>
          <span className="page-hero-rule" />
        </div>
        {image ? (
          <figure className="page-hero-frame">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              quality={90}
              sizes="(max-width: 900px) 88vw, 38vw"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </figure>
        ) : null}
      </div>
    </header>
  );
}
