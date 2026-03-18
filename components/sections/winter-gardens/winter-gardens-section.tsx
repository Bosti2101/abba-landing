"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import { BenefitCard } from "@/components/sections/winter-gardens/benefit-card";
import { SunIcon, ThermometerIcon, ExpandIcon } from "@/components/sections/winter-gardens/winter-garden-icons";

export function WinterGardensSection() {
  const t = useTranslations("winterGardens");

  const benefits = [
    { title: t("benefit1Title"), desc: t("benefit1Desc"), icon: <SunIcon /> },
    { title: t("benefit2Title"), desc: t("benefit2Desc"), icon: <ThermometerIcon /> },
    { title: t("benefit3Title"), desc: t("benefit3Desc"), icon: <ExpandIcon /> },
  ];

  return (
    <section
      className="section-y bg-ink relative overflow-hidden"
      aria-label="Winter gardens"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-bl from-brand/30 to-transparent" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variants={fadeInLeft}>
            <div className="flex flex-col gap-8">
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
                inverted
              />

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-60px" }}
              >
                {benefits.map(({ title, desc, icon }) => (
                  <BenefitCard key={title} titleKey={title} descKey={desc} icon={icon} />
                ))}
              </motion.div>

              <Link href="/services#winter-garden" className="self-start">
                <Button size="lg" variant="primary">
                  {t("cta")}
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal variants={fadeInRight}>
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/images/pic2.webp"
                alt="Modern white house with elegant winter garden glass extension"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="absolute top-6 right-6 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded-sm tracking-wide uppercase">
                {t("badge")}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
