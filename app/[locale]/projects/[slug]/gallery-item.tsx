"use client";

import Image from "next/image";
import type { GalleryImage } from "./types";

interface GalleryItemProps {
  img: GalleryImage;
  index: number;
  onClick: () => void;
  className?: string;
}

export function GalleryItem({ img, index, onClick, className }: GalleryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl group cursor-zoom-in ${className ?? ""}`}
      aria-label={img.alt}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
        priority={index < 4}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
