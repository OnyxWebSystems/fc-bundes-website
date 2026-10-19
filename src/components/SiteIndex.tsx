import Link from "next/link";
import { nav } from "@/data/nav";

export function SiteIndex() {
  const routes = nav.filter((item) => item.href !== "/");

  return (
    <nav className="route-row" aria-label="Sections">
      {routes.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
