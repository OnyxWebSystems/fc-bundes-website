import Image from "next/image";
import { Button } from "@/components/Button";
import { club } from "@/data/club";
import { instagramPosts } from "@/data/instagram";

export function Instagram({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="instagram">
      <div className="wrap" data-reveal>
        <Title className="section-title">Follow the Federals</Title>
        <p className="instagram-handle">{club.instagram.display}</p>
        <Button href={club.instagram.url} external>
          View Instagram
        </Button>
        {instagramPosts.length > 0 ? (
          <div className="ig-grid">
            {instagramPosts.map((post) => (
              <a key={post.id} href={post.href} target="_blank" rel="noopener noreferrer" data-cursor="view">
                <Image src={post.image} alt={post.alt} width={post.width} height={post.height} sizes="(max-width: 800px) 100vw, 30vw" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
