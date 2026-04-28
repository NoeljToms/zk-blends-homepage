/**
 * Media catalog. All assets live in /public/{hero,gallery,reels,about}/.
 * Edit dimensions/alt text here when files change.
 */

export type MediaImage = {
  src: string;
  alt: string;
  /** Aspect ratio hint for layout. */
  aspect?: "square" | "portrait" | "landscape" | "tall";
  width?: number;
  height?: number;
};

export type MediaReel = {
  src: string;
  poster: string;
  alt: string;
};

// Hero composition — three layered stills. /hero/01.jpg is the primary anchor.
export const heroMedia: MediaImage[] = [
  {
    src: "/hero/01.jpg",
    alt: "Sharp tapered crop, mid-finish",
    aspect: "portrait",
    width: 720,
    height: 1280,
  },
  {
    src: "/hero/02.jpg",
    alt: "Detail pass on the line-up",
    aspect: "portrait",
    width: 720,
    height: 1280,
  },
  {
    src: "/hero/03.jpg",
    alt: "Studio chair, low light",
    aspect: "portrait",
    width: 360,
    height: 480,
  },
];

export const galleryImages: MediaImage[] = [
  { src: "/gallery/01.jpg", alt: "Skin fade, side profile",      aspect: "portrait" },
  { src: "/gallery/02.jpg", alt: "Sharp line-up, close detail",  aspect: "portrait" },
  { src: "/gallery/03.jpg", alt: "Textured crop finish",         aspect: "portrait" },
  { src: "/gallery/04.jpg", alt: "Beard sculpt, in progress",    aspect: "portrait" },
  { src: "/gallery/05.jpg", alt: "Scissor work, mid-cut",        aspect: "portrait" },
  { src: "/gallery/06.jpg", alt: "Detail clipper pass",          aspect: "portrait" },
  { src: "/gallery/07.jpg", alt: "Hot towel finish",             aspect: "portrait" },
  { src: "/gallery/08.jpg", alt: "Final pass, mirror angle",     aspect: "portrait" },
];

// Reels — 9:12 portrait clips. Posters render instantly; click to play.
export const reels: MediaReel[] = [
  { src: "/reels/01.mp4", poster: "/reels/01.jpg", alt: "Reel 01 — fade detail" },
  { src: "/reels/02.mp4", poster: "/reels/02.jpg", alt: "Reel 02 — clipper pass" },
  { src: "/reels/03.mp4", poster: "/reels/03.jpg", alt: "Reel 03 — line-up" },
  { src: "/reels/04.mp4", poster: "/reels/04.jpg", alt: "Reel 04 — texture finish" },
  { src: "/reels/05.mp4", poster: "/reels/05.jpg", alt: "Reel 05 — beard sculpt" },
  { src: "/reels/06.mp4", poster: "/reels/06.jpg", alt: "Reel 06 — scissor work" },
  { src: "/reels/07.mp4", poster: "/reels/07.jpg", alt: "Reel 07 — fade blend" },
  { src: "/reels/08.mp4", poster: "/reels/08.jpg", alt: "Reel 08 — finish pass" },
  { src: "/reels/09.mp4", poster: "/reels/09.jpg", alt: "Reel 09 — final reveal" },
];

export const aboutImages: MediaImage[] = [
  {
    src: "/about/01.jpg",
    alt: "Inside the studio",
    aspect: "portrait",
    width: 360,
    height: 480,
  },
  {
    src: "/about/studio-reel-poster.jpg",
    alt: "ZK at the chair",
    aspect: "portrait",
    width: 720,
    height: 1280,
  },
];

/** Optional: longer studio mash-up — used as a featured click-to-play piece. */
export const studioReel: MediaReel = {
  src: "/about/studio-reel.mp4",
  poster: "/about/studio-reel-poster.jpg",
  alt: "Studio reel — full session",
};
