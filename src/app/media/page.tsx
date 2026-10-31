import type { Metadata } from "next";
import { Instagram } from "@/components/Instagram";
import { MediaGallery } from "@/components/MediaGallery";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Media",
  description: "Photography of FC Bundes, The Federals.",
};

export default function MediaPage() {
  return (
    <div className="page">
      <PageHero index="06" kicker="Gallery" title="Media" line="Photography of FC Bundes, The Federals." />
      <MediaGallery />
      <Instagram />
    </div>
  );
}
