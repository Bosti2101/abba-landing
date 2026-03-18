'use client';

import { useRef } from 'react';
import Image from 'next/image';

/**
 * SlideZoom — manages the Ken Burns zoom div.
 * Uses an internal counter that increments only when this slide becomes active.
 * The counter is used as a React key to remount and restart the CSS animation.
 * Crucially, the key does NOT change when going from active → previous,
 * so the zoom continues smoothly while the new slide wipes over it.
 */
export function SlideZoom({
  slide,
  index,
  isActive,
}: {
  slide: { src: string; alt: string };
  index: number;
  isActive: boolean;
}) {
  const mountKey = useRef(0);
  const prevActive = useRef(false);

  // Increment key ONLY on the transition false → true (freshly becomes active).
  // This remounts the div and restarts the CSS animation.
  // When going active → previous, key stays the same — zoom continues.
  if (isActive && !prevActive.current) {
    mountKey.current += 1;
  }
  prevActive.current = isActive;

  return (
    <div
      key={`zoom-${index}-${mountKey.current}`}
      className='hero-zoom hero-zoom--running'
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority={index === 0}
        className='object-cover'
        sizes='100vw'
      />
    </div>
  );
}
