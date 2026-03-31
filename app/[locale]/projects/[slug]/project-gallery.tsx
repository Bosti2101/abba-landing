"use client";

import Image from "next/image";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProjectGalleryProps {
  mainImage: GalleryImage;
  sideImages: GalleryImage[];
}

export function ProjectGallery({ mainImage, sideImages }: ProjectGalleryProps) {
  const lightbox = useLightbox();
  const allImages = [mainImage, ...sideImages];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <button
          onClick={() => lightbox.openAt(0)}
          className="relative aspect-[3/4] lg:aspect-auto lg:col-span-3 rounded-xl overflow-hidden group cursor-zoom-in"
          aria-label={`View ${mainImage.alt}`}
        >
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {sideImages.slice(0, 2).map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              onClick={() => lightbox.openAt(i + 1)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-zoom-in"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        images={allImages}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </>
  );
}
