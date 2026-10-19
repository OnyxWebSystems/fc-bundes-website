import Link from "next/link";
import { news } from "@/data/news";

export function NewsList({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="news-section">
      <div className="wrap" data-reveal>
        <p className="kicker">News</p>
        <Title className="section-title">From the club</Title>
        {news.length === 0 ? (
          <div className="empty-note">
            <strong>No announcements are published yet.</strong>
            <p>Matchday notes, player news, and community updates will be posted here.</p>
          </div>
        ) : (
          <ul className="news-list">
            {news.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link href={item.href}>
                    <time dateTime={item.date}>{item.date}</time>
                    <strong>{item.title}</strong>
                  </Link>
                ) : (
                  <article>
                    <time dateTime={item.date}>{item.date}</time>
                    <strong>{item.title}</strong>
                  </article>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
