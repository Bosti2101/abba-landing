"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export function Lightbox({
  images,
  initialIndex = 0,
  open,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation + scroll lock
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    overlayRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, goNext, goPrev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(touchDeltaX.current) > 10) isSwiping.current = true;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50 && images.length > 1) {
      touchDeltaX.current > 0 ? goPrev() : goNext();
    }
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  if (!open || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Image lightbox: ${images[index].alt}`}
        tabIndex={-1}
        className="fixed inset-0 z-[9999] outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Backdrop — clicking it closes the lightbox */}
        <div
          className="absolute inset-0 bg-black/88"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Top bar: counter + close */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 pointer-events-none">
          {images.length > 1 ? (
            <span className="text-white/80 text-sm font-medium select-none">
              {index + 1} / {images.length}
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/25 active:bg-white/30 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Prev button */}
        {images.length > 1 && (
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative w-[calc(100vw-6rem)] h-[calc(100vh-8rem)] sm:w-[calc(100vw-8rem)] sm:h-[calc(100vh-6rem)] max-w-6xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain select-none"
                draggable={false}
                sizes="(max-width: 640px) calc(100vw - 6rem), calc(100vw - 8rem)"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        {images[index].alt && (
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 sm:px-6 sm:py-4 pointer-events-none">
            <p className="text-center text-white/50 text-sm truncate select-none">
              {images[index].alt}
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function useLightbox() {
  const [state, setState] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openAt = useCallback((index: number) => {
    setState({ open: true, index });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  return { ...state, openAt, close };
}
