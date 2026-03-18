"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import { CheckIcon } from "./check-icon";

export function EngineeringSection() {
  const t = useTranslations("engineering");

  const points = [t("point1"), t("point2"), t("point3"), t("point4")];

  return (
    <section className="section-y-sm bg-surface-warm" aria-label="Engineering and design">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <Reveal variants={fadeInLeft}>
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
              />
            </Reveal>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
            >
              {points.map((point) => (
                <motion.li
                  key={point}
                  variants={fadeInUp}
                  className="flex items-start gap-3 p-4 bg-white rounded-md border border-border shadow-sm"
                >
                  <span className="mt-0.5 text-brand">
                    <CheckIcon />
                  </span>
                  <span className="text-sm text-ink-secondary font-medium leading-snug">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Reveal variants={fadeInRight}>
            <div className="flex flex-col gap-5">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/images/pic7.webp"
                  alt="Modern pergola over outdoor pool with elegant dark structure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/images/pic8.webp"
                  alt="White pergola attached to building with staircase"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
