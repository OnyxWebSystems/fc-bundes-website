import { ImageFrame } from "@/components/ImageFrame";
import { club, foundingLine } from "@/data/club";

export function ClubIntro({ index }: { index?: string }) {
  return (
    <section className="chapter" id="founding">
      <div className="wrap founding">
        <div className="founding-copy" data-reveal>
          <p className="kicker">{index ? <span>{index}</span> : null}Founding</p>
          <h2 className="founding-year">{club.founded}</h2>
          <p className="founding-line">{foundingLine}</p>
        </div>
        <ul className="founder-grid" data-stagger>
          {club.founders.map((founder) => (
            <li key={founder.name}>
              {founder.image ? (
                <ImageFrame
                  src={founder.image}
                  alt={founder.imageAlt ?? founder.name}
                  title={founder.name}
                  position="center center"
                  sizes="(max-width: 800px) 86vw, 32vw"
                  clip={false}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
