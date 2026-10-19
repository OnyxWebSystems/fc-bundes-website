import type { Metadata } from "next";
import { Instagram } from "@/components/Instagram";
import { MediaGallery } from "@/components/MediaGallery";

export const metadata: Metadata = {
  title: "Media",
  description: "Photography of FC Bundes, The Federals.",
};

export default function MediaPage() {
  return (
    <div className="page">
      <MediaGallery level="h1" />
      <Instagram />
    </div>
  );
}
