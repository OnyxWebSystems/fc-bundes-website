import Link from "next/link";

const paths = [
  { href: "/team", label: "First team", note: "The roster" },
  { href: "/matches", label: "Matches", note: "Fixtures and results" },
  { href: "/club", label: "Club", note: "History and staff" },
  { href: "/fans", label: "Fan Zone", note: "The Federals community" },
  { href: "/media", label: "Media", note: "Photographs from the ground" },
  { href: "/news", label: "News", note: "Club announcements" },
  { href: "/contact", label: "Contact", note: "Founders and the CEO" },
];

export function SiteIndex() {
  return (
    <section className="pathways">
      <div className="wrap" data-reveal>
        <p className="kicker">Inside the club</p>
        <h2 className="section-title">Find your way in</h2>
        <ul className="path-list">
          {paths.map((path, index) => (
            <li key={path.href}>
              <Link href={path.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{path.label}</strong>
                <em>{path.note}</em>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
