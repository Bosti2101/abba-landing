"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { staggerContainer, scaleIn } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import { serviceItems } from "@/content/site-data";
import { cn } from "@/lib/utils/cn";

const ArrowIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section className="section-y-sm bg-[#faf9f7]" aria-label="Services">
      <Container>
        <Reveal>
          <SectionHeading
            label={t("label")}
            title={t("title")}
            description={t("description")}
            align="center"
            className="mb-14 max-w-2xl mx-auto"
          />
        </Reveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
        >
          {serviceItems.map((item) => (
            <motion.div key={item.id} variants={scaleIn}>
              <Link
                href={item.href}
                className="group flex flex-col h-full bg-white rounded-xl border border-[#e8e4df] overflow-hidden shadow-sm hover:shadow-md"
                style={{ transition: "box-shadow 0.3s ease" }}
                aria-label={t(item.title as "item1Title" | "item2Title" | "item3Title" | "item4Title")}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(item.title as "item1Title" | "item2Title" | "item3Title" | "item4Title")}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <h3 className="font-semibold text-[#1a1a1a] text-sm leading-snug">
                    {t(item.title as "item1Title" | "item2Title" | "item3Title" | "item4Title")}
                  </h3>
                  <p className="text-xs text-[#7a7a7a] leading-relaxed flex-1">
                    {t(item.description as "item1Desc" | "item2Desc" | "item3Desc" | "item4Desc")}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c0392b] mt-2 group-hover:gap-3"
                    style={{ transition: "gap 0.2s ease" }}>
                    {t("learnMore")} <ArrowIcon />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
