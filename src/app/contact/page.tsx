import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { club } from "@/data/club";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bill Okumu, Hilary Odhiambo, and Stephen Wandera of FC Bundes.",
};

export default function ContactPage() {
  return (
    <div className="page">
      <PageHero index="07" kicker="The club" title="Contact" line={club.locationLabel} />
      <Contact />
    </div>
  );
}
