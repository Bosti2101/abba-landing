"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { fadeInLeft, fadeInRight } from "@/lib/motion/variants";
import { StatCounter } from "@/components/sections/about/stat-counter";

const aboutImage = { src: "/images/pic3.webp", alt: "Enclosed terrace with glass walls and bioclimatic louvered roof" };

export function AboutSection() {
  const t = useTranslations("about");
  const lightbox = useLightbox();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const stats = [
    { valueKey: t("stat1Value"), labelKey: t("stat1Label"), target: 1500, suffix: "m²" },
    { valueKey: t("stat2Value"), labelKey: t("stat2Label"), target: 258, suffix: "" },
    { valueKey: t("stat3Value"), labelKey: t("stat3Label"), target: 9, suffix: "" },
    { valueKey: t("stat4Value"), labelKey: t("stat4Label"), target: 200, suffix: "" },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-y bg-surface-warm"
      aria-label="About section"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variants={fadeInLeft}>
            <div className="flex flex-col gap-10">
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
              />

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {stats.map(({ labelKey, target, suffix }) => (
                  <div
                    key={labelKey}
                    className="flex flex-col gap-1 p-3 sm:p-5 bg-white rounded-lg border border-border shadow-sm min-w-0"
                  >
                    <span className="text-xl sm:text-3xl font-bold text-brand tracking-tight break-words">
                      <StatCounter
                        target={target}
                        suffix={suffix}
                        active={isInView}
                      />
                      {target >= 200 && "+"}
                    </span>
                    <span className="text-xs sm:text-sm text-ink-muted font-medium">
                      {labelKey}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal variants={fadeInRight}>
            <div className="relative overflow-hidden rounded-lg">
              <button
                onClick={() => lightbox.openAt(0)}
                className="relative aspect-[3/4] lg:aspect-auto lg:h-[580px] w-full rounded-lg overflow-hidden cursor-zoom-in block"
                aria-label={`View ${aboutImage.alt}`}
              >
                <Image
                  src={aboutImage.src}
                  alt={aboutImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </button>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand rounded-lg -z-10" />
            </div>
          </Reveal>
        </div>
      </Container>

      <Lightbox
        images={[aboutImage]}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </section>
  );
}
