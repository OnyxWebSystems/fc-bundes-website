import type { Metadata } from "next";
import { Matchday } from "@/components/Matchday";

export const metadata: Metadata = {
  title: "Matches",
  description: "FC Bundes matchday. Fixtures will be published here.",
};

export default function MatchesPage() {
  return (
    <div className="page">
      <Matchday level="h1" />
    </div>
  );
}
