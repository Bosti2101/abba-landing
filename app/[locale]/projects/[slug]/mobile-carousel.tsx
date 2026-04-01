"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import type { GalleryImage } from "./types";

const SPEED = 0.5;
const CARD_WIDTH = 280;
const GAP = 12;
const ITEM_WIDTH = CARD_WIDTH + GAP;

interface MobileCarouselProps {
  images: GalleryImage[];
  onOpen: (index: number) => void;
}

export function MobileCarousel({ images, onOpen }: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);

  const doubled = [...images, ...images];
  const totalWidth = images.length * ITEM_WIDTH;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalWidth) posRef.current -= totalWidth;
        if (posRef.current < 0) posRef.current += totalWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [totalWidth]);

  const onDragStart = (clientX: number) => {
    isPausedRef.current = true;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    dragStartXRef.current = clientX;
    dragStartPosRef.current = posRef.current;
  };

  const onDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - clientX;
    dragDistanceRef.current = Math.abs(delta);
    let newPos = dragStartPosRef.current + delta;
    if (newPos >= totalWidth) newPos -= totalWidth;
    if (newPos < 0) newPos += totalWidth;
    posRef.current = newPos;
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${newPos}px)`;
  };

  const onDragEnd = () => {
    isDraggingRef.current = false;
    isPausedRef.current = false;
  };

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
    >
      <div
        ref={trackRef}
        className="flex gap-3 will-change-transform"
        style={{ width: `${doubled.length * ITEM_WIDTH}px` }}
      >
        {doubled.map((img, i) => (
          <div key={`${img.src}-${i}`} className="shrink-0" style={{ width: CARD_WIDTH }}>
            <button
              onClick={() => { if (dragDistanceRef.current < 8) onOpen(i % images.length); }}
              className="relative w-full h-[320px] overflow-hidden rounded-xl cursor-zoom-in"
              aria-label={img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover pointer-events-none"
                sizes="280px"
                priority={i < 4}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
