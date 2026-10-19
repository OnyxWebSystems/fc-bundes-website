import Image from "next/image";
import { staff } from "@/data/staff";

export function Staff() {
  return (
    <section className="staff">
      <div className="wrap" data-reveal>
        <p className="kicker">Leadership</p>
        <h2 className="section-title">The people running the club</h2>
        <ul className="staff-list">
          {staff.map((member) => (
            <li className="staff-row" key={member.id}>
              {member.image ? (
                <Image
                  className="staff-photo"
                  src={member.image}
                  alt=""
                  width={240}
                  height={300}
                />
              ) : (
                <span className="staff-mark" aria-hidden="true" />
              )}
              <div>
                <p className="kicker">
                  {member.role}
                  {member.nickname ? ` · ${member.nickname}` : ""}
                </p>
                <p className="staff-name">{member.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
