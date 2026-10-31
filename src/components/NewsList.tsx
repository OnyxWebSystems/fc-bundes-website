import Link from "next/link";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { news } from "@/data/news";

export function NewsList({ preview = false }: { preview?: boolean }) {
  if (news.length === 0) {
    if (preview) {
      return (
        <section className="chapter">
          <div className="wrap preview-row">
            <div>
              <p className="kicker">News</p>
              <h2 className="chapter-title">Announcements</h2>
              <p className="muted">Announcements will be published here.</p>
            </div>
            <Button href="/news" variant="ghost">
              Club news
            </Button>
          </div>
        </section>
      );
    }

    return (
      <section className="chapter">
        <div className="wrap">
          <EmptyState title="Announcements will be published here" href="/fans" action="Fan zone" />
        </div>
      </section>
    );
  }

  const items = preview ? news.slice(0, 3) : news;

  return (
    <section className="chapter">
      <div className="wrap">
        {preview ? (
          <header className="chapter-head">
            <h2 className="chapter-title">News</h2>
            <Button href="/news" variant="ghost">
              Club news
            </Button>
          </header>
        ) : null}
        <ul className="news-list" data-stagger>
          {items.map((item) => {
            const body = (
              <>
                <time dateTime={item.date}>{item.date}</time>
                <strong>{item.title}</strong>
              </>
            );
            return (
              <li key={item.id}>
                {item.href ? (
                  item.href.startsWith("/") ? (
                    <Link href={item.href}>
                      {body}
                    </Link>
                  ) : (
                    <a href={item.href}>
                      {body}
                    </a>
                  )
                ) : (
                  <article>{body}</article>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
