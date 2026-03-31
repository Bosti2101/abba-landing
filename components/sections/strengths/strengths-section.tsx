"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import { RulerIcon, FactoryIcon, TruckIcon } from "./strength-icons";

const icons = [<RulerIcon key="ruler" />, <FactoryIcon key="factory" />, <TruckIcon key="truck" />];

export function StrengthsSection() {
  const t = useTranslations("strengths");
  const lightbox = useLightbox();

  const items = [
    { title: t("item1Title"), desc: t("item1Desc") },
    { title: t("item2Title"), desc: t("item2Desc") },
    { title: t("item3Title"), desc: t("item3Desc") },
  ];

  const images = [
    { src: "/images/pic4.webp", alt: "Pergola installed over stone terrace" },
    { src: "/images/pic5.webp", alt: "Close-up of retractable louvered roof detail" },
    { src: "/images/pic6.webp", alt: "Technical aluminum profile engineering render" },
  ];

  return (
    <section className="section-y bg-white" aria-label="Our strengths">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal variants={fadeInLeft}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              <button
                onClick={() => lightbox.openAt(0)}
                className="relative aspect-[3/4] sm:aspect-square rounded-lg overflow-hidden col-span-1 row-span-2 lg:mt-16 cursor-zoom-in"
                aria-label={`View ${images[0].alt}`}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </button>
              <button
                onClick={() => lightbox.openAt(1)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-zoom-in"
                aria-label={`View ${images[1].alt}`}
              >
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </button>
              <button
                onClick={() => lightbox.openAt(2)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-mid cursor-zoom-in"
                aria-label={`View ${images[2].alt}`}
              >
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </button>
            </div>

            <Lightbox
              images={images}
              initialIndex={lightbox.index}
              open={lightbox.open}
              onClose={lightbox.close}
            />
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal variants={fadeInRight}>
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
              />
            </Reveal>

            <motion.ul
              className="flex flex-col gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
            >
              {items.map(({ title, desc }, i) => (
                <motion.li
                  key={title}
                  variants={fadeInUp}
                  className="flex gap-5"
                >
                  <div className="shrink-0 w-10 h-10 bg-brand-light rounded-md flex items-center justify-center text-brand mt-0.5">
                    {icons[i]}
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm mb-1.5">
                      {title}
                    </p>
                    <p className="text-ink-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
