import Link from "next/link";
import { news } from "@/data/news";

export function NewsList({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="news-section">
      <div className="wrap">
        {news.length === 0 ? (
          <Title className="news-todo">TODO: no announcements.</Title>
        ) : (
          <>
            <Title className="news-todo">News</Title>
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
          </>
        )}
      </div>
    </section>
  );
}
