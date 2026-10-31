import Link from "next/link";
import { Button } from "@/components/Button";
import { trophies } from "@/data/trophies";

function placeParts(place: string) {
  const [mark, ...rest] = place.split(" ");
  return { mark, rest: rest.join(" ") };
}

export function Trophies({ page = false }: { page?: boolean }) {
  return (
    <section className={`chapter honours${page ? " is-feature" : ""}`} id={page ? undefined : "honours"}>
      <div className="wrap">
        {page ? null : (
          <header className="chapter-head">
            <div>
              <p className="kicker">
                <span>04</span>
                Record
              </p>
              <h2 className="chapter-title">Honours</h2>
            </div>
            <Button href="/trophies" variant="ghost">
              All honours
            </Button>
          </header>
        )}
        <ul className="honour-list" data-stagger>
          {trophies.map((trophy) => {
            const place = placeParts(trophy.place);
            const body = (
              <>
                <span className="plate-line" data-line />
                <span className="honour-place">{place.mark}</span>
                <span>
                  {place.rest ? <span className="honour-rest">{place.rest}</span> : null}
                  <span className="honour-name">{trophy.competition}</span>
                </span>
              </>
            );

            return (
              <li key={trophy.id}>
                {page ? (
                  <article className="honour-plate">{body}</article>
                ) : (
                  <Link className="honour-plate" href="/trophies">
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        {page ? (
          <p className="honours-link">
            <Button href="/club" variant="ghost">
              The club story
            </Button>
          </p>
        ) : null}
      </div>
    </section>
  );
}
