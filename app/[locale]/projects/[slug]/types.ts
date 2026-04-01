export interface GalleryImage {
  src: string;
  alt: string;
}

export type RowLayout = "1" | "1-2" | "2-1" | "3";

export interface GalleryRow {
  images: GalleryImage[];
  layout: RowLayout;
}
