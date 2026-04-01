"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { fadeInLeft, fadeInRight } from "@/lib/motion/variants";

const livingSpacesImage = { src: "/projects/PERGOLA RETRACTABILA/pergola-retractabila-3.webp", alt: "ABA Pergola Systems" };

export function LivingSpacesSection() {
  const t = useTranslations("livingSpaces");
  const lightbox = useLightbox();

  const features = [t("feature1"), t("feature2"), t("feature3")];

  return (
    <section className="section-y bg-white" aria-label="Living spaces">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variants={fadeInLeft}>
            <button
              onClick={() => lightbox.openAt(0)}
              className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px] w-full rounded-lg overflow-hidden cursor-zoom-in block"
              aria-label={`View ${livingSpacesImage.alt}`}
            >
              <Image
                src={livingSpacesImage.src}
                alt={livingSpacesImage.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
        images={[livingSpacesImage]}
        initialIndex={lightbox.index}
        open={lightbox.open}
        onClose={lightbox.close}
      />
    </section>
  );
}
