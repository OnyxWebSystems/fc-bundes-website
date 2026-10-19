export type StaffMember = {
  id: string;
  name: string;
  role: string;
  nickname?: string;
  image?: string | null;
};

export type Trophy = {
  id: string;
  competition: string;
  place: string;
};

export type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: string;
};

export type MediaLayout = "standard" | "wide" | "portrait";

export type MediaItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  area: MediaLayout;
  video?: string;
};

export type MatchStatus = "upcoming" | "live" | "full-time";

export type Match = {
  id: string;
  status: MatchStatus;
  opponent?: string;
  competition?: string;
  date?: string;
  venue?: string;
  score?: { bundes: number; opponent: number };
};

export type Player = {
  id: string;
  name: string;
  image?: string | null;
  imageAlt?: string;
  imagePosition?: string;
  number?: number;
  position?: string;
  nationality?: string;
  foot?: string;
  bio?: string;
  appearances?: number;
  goals?: number;
  assists?: number;
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  href?: string;
  image?: string;
};

export type Highlight = {
  id: string;
  title: string;
  videoUrl: string;
  poster?: string;
};

export type InstagramPost = {
  id: string;
  image: string;
  href: string;
  alt: string;
  width: number;
  height: number;
};

export type Contact = {
  name: string;
  role: string;
  phone: string;
  tel: string;
  image?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
};
