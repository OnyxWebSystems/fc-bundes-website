import Image from "next/image";
import { staff } from "@/data/staff";

export function Staff() {
  return (
    <section className="chapter staff">
      <div className="wrap">
        <header className="chapter-head">
          <div>
            <p className="kicker">The club</p>
            <h2 className="chapter-title">Staff</h2>
          </div>
        </header>
        <ul className="staff-grid" data-stagger>
          {staff.map((member) => (
            <li key={member.id}>
              <article className={`portrait-card${member.image ? "" : " is-empty"}`}>
                {member.image ? (
                  <span className="portrait-media">
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      quality={90}
                      sizes="(max-width: 800px) 100vw, 25vw"
                      style={{ objectFit: "cover", objectPosition: "center center" }}
                    />
                  </span>
                ) : (
                  <span className="monogram">{initials(member.name)}</span>
                )}
                <span className="portrait-meta">
                  <span className="plate-line" data-line />
                  <strong>{member.name}</strong>
                  <span className="portrait-role">
                    {member.role}
                    {member.nickname ? ` · ${member.nickname}` : ""}
                  </span>
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
