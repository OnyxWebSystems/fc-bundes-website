import Image from "next/image";
import { Button } from "@/components/Button";
import { club } from "@/data/club";
import { instagramPosts } from "@/data/instagram";

export function Instagram({ index }: { index?: string }) {
  return (
    <section className="chapter instagram" id="instagram">
      <div className="wrap">
        <header className="chapter-head">
          <div>
            <p className="kicker">{index ? <span>{index}</span> : null}Instagram</p>
            <h2 className="chapter-title">Follow the Federals</h2>
          </div>
          <Button href={club.instagram.url} external variant="ghost">
            {club.instagram.display}
          </Button>
        </header>
        {instagramPosts.length > 0 ? (
          <div className="ig-grid" data-stagger>
            {instagramPosts.map((post) => (
              <a key={post.id} className="ig-card" href={post.href} target="_blank" rel="noopener noreferrer">
                <Image src={post.image} alt={post.alt} width={post.width} height={post.height} quality={90} />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
