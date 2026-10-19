import Image from "next/image";
import { club } from "@/data/club";
import { instagramPosts } from "@/data/instagram";

export function Instagram() {
  return (
    <section className="instagram">
      <div className="wrap" data-reveal>
        <h2 className="section-title">Follow the Federals</h2>
        <p className="instagram-handle">
          <a href={club.instagram.url} target="_blank" rel="noopener noreferrer">
            {club.instagram.display}
          </a>
        </p>
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
