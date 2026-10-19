import type { Metadata } from "next";
import { Matchday } from "@/components/Matchday";
import { MediaGallery } from "@/components/MediaGallery";
import { NewsList } from "@/components/NewsList";
import { SupporterForm } from "@/components/SupporterForm";

export const metadata: Metadata = {
  title: "Fan Zone",
  description: "The Federals fan zone. Club news, matchday, photographs, and the official FC Bundes Instagram.",
};

export default function FansPage() {
  return (
    <div className="page">
      <Matchday level="h1" />
      <NewsList />
      <MediaGallery />
      <SupporterForm />
    </div>
  );
}
