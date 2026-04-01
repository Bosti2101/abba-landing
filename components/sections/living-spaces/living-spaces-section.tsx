"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { fadeInLeft, fadeInRight } from "@/lib/motion/variants";

const slides = [
  { src: "/projects/PERGOLA RETRACTABILA/pergola-retractabila-3.webp", alt: "Pergolă Retractabilă — ABA Pergola Systems" },
  { src: "/projects/GRADINA DE IARNA/gradina-de-iarna-2.webp", alt: "Grădină de Iarnă — ABA Pergola Systems" },
  { src: "/projects/SISTEM BIOCLIMATIC/bioclimatic-5.webp", alt: "Sistem Bioclimatic — ABA Pergola Systems" },
  { src: "/projects/SISTEM GHILOTINA/sistem-ghilotina-3.webp", alt: "Sistem Ghilotină — ABA Pergola Systems" },
  { src: "/projects/SISTEM GLISANT/sistem-glisant-1.webp", alt: "Sistem Glisant — ABA Pergola Systems" },
];

export function LivingSpacesSection() {
  const t = useTranslations("livingSpaces");
  const lightbox = useLightbox();
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const features = [t("feature1"), t("feature2"), t("feature3")];

  return (
    <section className="section-y bg-white" aria-label="Living spaces">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variants={fadeInLeft}>
            <button
              onClick={() => lightbox.openAt(current)}
              className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px] w-full rounded-lg overflow-hidden cursor-zoom-in block"
              aria-label={`View ${slides[current].alt}`}
            >
              {slides.map((slide, i) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  className="object-cover transition-opacity duration-500"
                  style={{ opacity: i === current && visible ? 1 : 0 }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-20 left-6 flex gap-1.5 z-10">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{ background: i === current ? "white" : "rgba(255,255,255,0.4)" }}
                  />
                ))}
              </div>

              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-sm rounded-md p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-light rounded-md flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 rounded-sm bg-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink leading-tight text-left">
                      {t("accentTitle")}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5 text-left">
                      {t("accentDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>

          <Reveal variants={fadeInRight}>
            <div className="flex flex-col gap-8">
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
              />

              <ul className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    <span className="text-sm text-ink-secondary font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/services" className="self-start">
                <Button size="lg" variant="primary">
                  {t("cta")}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      <Lightbox
        images={slides}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </section>
  );
}
