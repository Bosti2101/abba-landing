"use client";

import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { MobileCarousel } from "./mobile-carousel";
import { DesktopGrid } from "./desktop-grid";
import type { GalleryImage } from "./types";

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const lightbox = useLightbox();

  if (images.length === 0) return null;

  return (
    <>
      <div className="sm:hidden">
        <MobileCarousel images={images} onOpen={(i) => lightbox.openAt(i)} />
      </div>

      <div className="hidden sm:block">
        <DesktopGrid images={images} onOpen={(i) => lightbox.openAt(i)} />
      </div>

      <Lightbox
        images={images}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </>
  );
}
