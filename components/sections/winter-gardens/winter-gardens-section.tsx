"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { fadeInLeft, fadeInRight, staggerContainer, scaleIn } from "@/lib/motion/variants";
import { motion } from "framer-motion";

function BenefitCard({
  titleKey,
  descKey,
  icon,
  delay,
}: {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div variants={scaleIn} className="flex flex-col gap-3 p-5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10"
      style={{ transition: "background-color 0.2s ease" }}>
      <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{titleKey}</p>
        <p className="text-white/50 text-xs mt-1">{descKey}</p>
      </div>
    </motion.div>
  );
}

const SunIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
  </svg>
);

const ThermometerIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
      {/* Decorative diagonal accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-bl from-brand/30 to-transparent" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <Reveal variants={fadeInLeft}>
            <div className="flex flex-col gap-8">
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
                inverted
              />

              {/* Benefits grid */}
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

          {/* Image side */}
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

              {/* Floating label */}
              <div className="absolute top-6 right-6 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded-sm tracking-wide uppercase">
                Winter Garden
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
