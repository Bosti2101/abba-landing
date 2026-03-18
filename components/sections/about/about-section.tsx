"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { fadeInLeft, fadeInRight } from "@/lib/motion/variants";

interface StatCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  active: boolean;
}

function StatCounter({ target, suffix = "", duration = 1600, active }: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return (
    <span>
      ~{count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const t = useTranslations("about");
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
      className="section-y bg-[#faf9f7]"
      aria-label="About section"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text + Stats */}
          <Reveal variants={fadeInLeft}>
            <div className="flex flex-col gap-10">
              <SectionHeading
                label={t("label")}
                title={t("title")}
                description={t("description")}
              />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map(({ labelKey, target, suffix }) => (
                  <div
                    key={labelKey}
                    className="flex flex-col gap-1 p-5 bg-white rounded-lg border border-[#e8e4df] shadow-sm"
                  >
                    <span className="text-3xl font-bold text-[#c0392b] tracking-tight">
                      <StatCounter
                        target={target}
                        suffix={suffix}
                        active={isInView}
                      />
                      {target >= 200 && "+"}
                    </span>
                    <span className="text-sm text-[#7a7a7a] font-medium">
                      {labelKey}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal variants={fadeInRight}>
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[580px] rounded-lg overflow-hidden">
              <Image
                src="/images/pic3.jpeg"
                alt="Enclosed terrace with glass walls and bioclimatic louvered roof"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#c0392b] rounded-lg -z-10" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
