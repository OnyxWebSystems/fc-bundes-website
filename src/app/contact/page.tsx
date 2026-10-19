import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bill Okumu, Hilary Odhiambo, and Stephen Wandera of FC Bundes.",
};

export default function ContactPage() {
  return (
    <div className="page">
      <Contact />
    </div>
  );
}
