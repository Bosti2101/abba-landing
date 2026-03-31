"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const partners = [
  { name: "Somfy", logo: "/partners/somfy-logo.svg", href: "https://www.somfy.com" },
  { name: "Sioen", logo: "/partners/sioen-logo.svg", href: "https://www.sioen.com" },
  { name: "Samsung", logo: "/partners/samsung-logo.png", href: "https://www.samsung.com" },
  { name: "Delta Aluminium", logo: "/partners/delta-logo.png", href: "https://www.deltaaluminium.eu/" },
];

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-border" aria-label="Partners">
      <Container>
        <motion.div
          className="flex flex-col items-center gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-brand">
              {t("label")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {t("title")}
            </h2>
            <div className="w-10 h-px bg-brand mt-1" />
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden shadow-sm">
            {partners.map((partner, i) => (
              <motion.a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="group flex items-center justify-center bg-white px-8 py-10 transition-colors duration-300 hover:bg-surface-warm cursor-pointer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="relative h-10 w-32 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
