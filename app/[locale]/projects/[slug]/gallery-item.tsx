"use client";

import Image from "next/image";
import { useState, memo } from "react";
import type { GalleryImage } from "./types";

interface GalleryItemProps {
  img: GalleryImage;
  index: number;
  onClick: () => void;
  className?: string;
}

export const GalleryItem = memo(function GalleryItem({ img, index, onClick, className }: GalleryItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl group cursor-zoom-in bg-neutral-100 ${className ?? ""}`}
      aria-label={img.alt}
    >
      {/* Shimmer skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]" />
      )}

      <Image
        src={img.src}
        alt={img.alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
        priority={index < 4}
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
});
