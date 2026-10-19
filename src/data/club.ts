import type { Contact, Milestone } from "@/types";

export const club = {
  name: "FC Bundes",
  nameUpper: "FC BUNDES",
  nickname: "The Federals",
  nicknameUpper: "THE FEDERALS",
  founded: 2017,
  founders: [
    {
      name: "Bill Okumu",
      image: "/people/bill-okumu.webp",
      imageAlt: "Bill Okumu, founder of FC Bundes",
      width: 853,
      height: 1280,
    },
    {
      name: "Hilary Odhiambo",
      image: "/people/hilary-odhiambo.webp",
      imageAlt: "Hilary Odhiambo, founder of FC Bundes",
      width: 853,
      height: 1280,
    },
  ],
  statement: "Built in Dagoretti. Driven by the Federals.",
  locationLabel: "Dagoretti · Nairobi · Kenya",
  area: "Dagoretti",
  city: "Nairobi",
  country: "Kenya",
  ground: "Nairobi City Council Field",
  groundShort: "NCC",
  homeLine: "This is where the Federals live.",
  instagram: {
    handle: "@fc.bundes",
    display: "@FC.BUNDES",
    url: "https://www.instagram.com/fc.bundes/",
  },
};

export const contacts: Contact[] = [
  {
    name: "Bill Okumu",
    role: "Founder",
    phone: "+1 773 787 8026",
    tel: "tel:+17737878026",
  },
  {
    name: "Hilary Odhiambo",
    role: "Founder",
    phone: "+1 (314) 459-0578",
    tel: "tel:+13144590578",
  },
  {
    name: "Stephen Wandera",
    role: "CEO",
    phone: "+254 791 804 180",
    tel: "tel:+254791804180",
    image: "/people/stephen-wandera.webp",
    imageAlt: "Stephen Wandera, CEO of FC Bundes",
    width: 960,
    height: 1280,
  },
];

export const milestones: Milestone[] = [
  {
    year: "2017",
    title: "The Beginning",
    body: "Founded by Bill Okumu and Hilary Odhiambo.",
  },
];

export const foundingLine =
  "FC Bundes was founded in 2017 by Bill Okumu and Hilary Odhiambo.";
