"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { portfolioCategories } from "@/content/site-data";

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const lightbox = useLightbox();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: true })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const allImages = portfolioCategories.flatMap((cat) => cat.images);

  return (
    <section className="section-y-sm bg-white overflow-hidden" aria-label="Portfolio">
      <Container>
        <Reveal>
          <SectionHeading
            label={t("label")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
      </Container>

      <div className="relative mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {allImages.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="shrink-0 min-w-0 pl-4"
                style={{ flex: "0 0 auto" }}
              >
                <button
                  onClick={() => lightbox.openAt(i)}
                  className="relative w-[300px] sm:w-[360px] lg:w-[420px] aspect-[3/4] rounded-lg overflow-hidden group cursor-zoom-in block"
                  aria-label={`View ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {img.alt}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <Container>
          <div className="flex gap-3 mt-8">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-sm border border-border flex items-center justify-center text-ink-secondary hover:border-brand hover:text-brand cursor-pointer transition-all duration-200"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next"
              className="w-11 h-11 rounded-sm border border-border flex items-center justify-center text-ink-secondary hover:border-brand hover:text-brand cursor-pointer transition-all duration-200"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </Container>
      </div>
      <Lightbox
        images={allImages.map((img) => ({ src: img.src, alt: img.alt }))}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </section>
  );
}
