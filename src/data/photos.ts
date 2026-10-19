export type PhotoFrame = {
  src: string;
  alt: string;
  position?: string;
};

/** Studio portraits in the black and orange home kit. */
export const studioPortraits: PhotoFrame[] = [
  {
    src: "/media/pic-12.webp",
    alt: "Player wearing the FC Bundes black and orange home kit",
    position: "62% 16%",
  },
  {
    src: "/media/pic-05.webp",
    alt: "Player in the FC Bundes home kit against a brown studio backdrop",
    position: "58% 18%",
  },
  {
    src: "/media/pic-08.webp",
    alt: "Profile of a player in the FC Bundes home kit",
    position: "center 42%",
  },
  {
    src: "/media/pic-04.webp",
    alt: "Seated player wearing the FC Bundes home kit",
    position: "center 22%",
  },
  {
    src: "/media/pic-06.webp",
    alt: "Player in the FC Bundes home kit with a hand raised",
    position: "center 14%",
  },
];

/** Close views of the crest on the home kit. */
export const kitCloseups: PhotoFrame[] = [
  {
    src: "/media/pic-13.webp",
    alt: "Close view of the FC Bundes crest on the home kit",
    position: "62% 45%",
  },
  {
    src: "/media/pic-09.webp",
    alt: "Close view of the crest and checkerboard sleeve",
    position: "58% 40%",
  },
];

/** Team photographs lined up at the ground. */
export const teamLineups: PhotoFrame[] = [
  {
    src: "/media/squad.webp",
    alt: "FC Bundes squad lined up at the ground",
    position: "center center",
  },
  {
    src: "/media/lineup.webp",
    alt: "FC Bundes team photographed together on the pitch",
    position: "center center",
  },
];
