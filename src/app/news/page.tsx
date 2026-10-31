import type { Metadata } from "next";
import { NewsList } from "@/components/NewsList";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements from FC Bundes, The Federals.",
};

export default function NewsPage() {
  return (
    <div className="page">
      <PageHero index="05" kicker="Club news" title="News" line="Announcements from FC Bundes, The Federals." />
      <NewsList />
    </div>
  );
}
