import type { Player } from "@/types";

export const players: Player[] = [
  {
    id: "elvis-presley",
    name: "Elvis Presley",
    image: "/players/elvis-presley/whatsapp-image-2026-10-06-at-16-26-51-1-edited.webp",
    imageAlt: "Elvis Presley of FC Bundes on the pitch",
    imagePosition: "58% 30%",
  },
  {
    id: "wycliffe-ochieng",
    name: "Wycliffe Ochieng",
    image: "/players/wycliffe-ochieng/pic-2.webp",
    imageAlt: "Wycliffe Ochieng in the FC Bundes kit",
    imagePosition: "70% 24%",
  },
  {
    id: "paul-ochuoga",
    name: "Paul Ochuoga",
    image: "/players/paul-ochuoga/pic-3.webp",
    imageAlt: "Paul Ochuoga in the FC Bundes kit",
    imagePosition: "24% 18%",
  },
  {
    id: "daniel-odhiambo",
    name: "Daniel Odhiambo",
    image: "/players/daniel-odhiambo/pic.webp",
    imageAlt: "Daniel Odhiambo in the FC Bundes kit",
    imagePosition: "center 16%",
  },
  {
    id: "dwang-jackson",
    name: "Dwang Jackson",
    image: "/players/dwang-jackson/pic-1.webp",
    imageAlt: "Dwang Jackson in the FC Bundes kit",
    imagePosition: "center 14%",
  },
  {
    id: "evra-barongo",
    name: "Evra Barongo",
    image: "/players/evra-barongo/pic.webp",
    imageAlt: "Evra Barongo in the FC Bundes kit",
    imagePosition: "center 18%",
  },
];

export function getPlayer(id: string) {
  return players.find((player) => player.id === id);
}
