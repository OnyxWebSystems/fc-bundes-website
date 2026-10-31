import type { Metadata } from "next";
import { MediaGallery } from "@/components/MediaGallery";
import { NewsList } from "@/components/NewsList";
import { PageHero } from "@/components/PageHero";
import { SupporterForm } from "@/components/SupporterForm";

export const metadata: Metadata = {
  title: "Fan Zone",
  description: "The Federals fan zone. Club news, matchday, photographs, and the official FC Bundes Instagram.",
};

export default function FansPage() {
  return (
    <div className="page">
      <PageHero index="04" kicker="Supporters" title="Fan zone" line="Join the list for club updates." />
      <SupporterForm />
      <NewsList preview />
      <MediaGallery preview />
    </div>
  );
}
