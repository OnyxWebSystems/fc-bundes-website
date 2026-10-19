import Image from "next/image";
import { staff } from "@/data/staff";

export function Staff({ level = "h2" }: { level?: "h1" | "h2" }) {
  const Title = level;

  return (
    <section className="staff">
      <div className="wrap">
        <Title className="staff-heading">Staff</Title>
        <ul className="staff-list">
          {staff.map((member) => (
            <li className="staff-row" key={member.id}>
              {member.image ? (
                <Image className="staff-photo" src={member.image} alt="" width={240} height={300} />
              ) : (
                <span className="staff-mark" aria-hidden="true" />
              )}
              <p className="staff-name">{member.name}</p>
              <p className="staff-role">
                {member.role}
                {member.nickname ? ` · ${member.nickname}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
