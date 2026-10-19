import type { Metadata } from "next";
import { Team } from "@/components/Team";

export const metadata: Metadata = {
  title: "Team",
  description: "The FC Bundes first-team roster. The Federals, Dagoretti, Nairobi.",
};

export default function TeamPage() {
  return (
    <div className="page">
      <Team level="h1" />
    </div>
  );
}
