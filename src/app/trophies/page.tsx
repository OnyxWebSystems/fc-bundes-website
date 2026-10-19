import type { Metadata } from "next";
import { Trophies } from "@/components/Trophies";

export const metadata: Metadata = {
  title: "Trophies",
  description: "Honours won by FC Bundes, The Federals.",
};

export default function TrophiesPage() {
  return (
    <div className="page">
      <Trophies level="h1" />
    </div>
  );
}
