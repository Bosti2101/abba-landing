'use client';

import { useRef } from 'react';
import Image from 'next/image';

export function SlideZoom({
  slide,
  index,
  isActive,
  isShown,
}: {
  slide: { src: string; alt: string };
  index: number;
  isActive: boolean;
  isShown: boolean;
}) {
  const mountKey = useRef(0);
  const prevActive = useRef(false);

  if (isActive && !prevActive.current) {
    mountKey.current += 1;
  }
  prevActive.current = isActive;

  return (
    <div
      key={`zoom-${index}-${mountKey.current}`}
      className={`hero-zoom relative${isShown ? ' hero-zoom--running' : ''}`}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority
        className='object-cover'
        sizes='100vw'
      />
    </div>
  );
}
