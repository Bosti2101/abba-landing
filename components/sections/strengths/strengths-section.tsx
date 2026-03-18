"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from "@/lib/motion/variants";
import { motion } from "framer-motion";

const RulerIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7l4-4 14 14-4 4L3 7z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 11l2-2M11 15l2-2" strokeLinecap="round" />
  </svg>
);

const FactoryIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 20h20M6 20V8l6 4V8l6 4V4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TruckIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const icons = [<RulerIcon key="ruler" />, <FactoryIcon key="factory" />, <TruckIcon key="truck" />];

export function StrengthsSection() {
  const t = useTranslations("strengths");

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
          {/* Images composition */}
          <Reveal variants={fadeInLeft}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              <div className="relative aspect-[3/4] sm:aspect-square rounded-lg overflow-hidden col-span-1 row-span-2 lg:mt-16">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-mid">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            </div>
          </Reveal>

          {/* Text side */}
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
