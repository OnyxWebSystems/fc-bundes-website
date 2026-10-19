import type { Metadata } from "next";
import { NewsList } from "@/components/NewsList";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements from FC Bundes, The Federals.",
};

export default function NewsPage() {
  return (
    <div className="page">
      <NewsList level="h1" />
    </div>
  );
}
