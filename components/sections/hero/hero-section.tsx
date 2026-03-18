"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const heroSlides = [
  { src: "/images/hero.webp", alt: "Premium pergola over outdoor pool at dusk", origin: "center center" },
  { src: "/images/hero2.webp", alt: "Modern pergola system with elegant design", origin: "left center" },
  { src: "/images/hero4.webp", alt: "Bioclimatic pergola with glass walls", origin: "right center" },
];

const SLIDE_DURATION = 7000;
const WIPE_DURATION = 1.4;

// Uniform Ken Burns zoom for all slides
const kenBurnsVariant = { from: { scale: 1, x: 0, y: 0 }, to: { scale: 1.18, x: 0, y: 0 } };

export function HeroSection() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      setPrevious(current);
      setCurrent(index);
    },
    [current]
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        setPrevious(prev);
        return (prev + 1) % heroSlides.length;
      });
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background carousel — all slides always mounted */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {heroSlides.map((slide, i) => (
          <HeroSlide
            key={i}
            index={i}
            slide={slide}
            isCurrent={i === current}
            isPrevious={i === previous}
          />
        ))}

        {/* Overlays — always on top */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(192,57,43,0.12) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            background:
              "radial-gradient(ellipse 80% 100% at 0% 50%, rgba(0,0,0,0.55) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            zIndex: 2,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container-site flex-1 flex flex-col justify-center pt-32 pb-24 relative"
        style={{ zIndex: 3 }}
      >
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 mb-6">
              <span className="block w-8 h-px bg-brand" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/60">
                ABA Pergola Systems
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight"
            style={{ color: "#ffffff" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          >
            {t("title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <Link href="/services">
              <Button size="lg" variant="primary">
                {t("cta")}
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
              >
                {t("ctaProjects")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-44 md:bottom-24 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">
            {t("scrollHint")}
          </span>
          <div className="flex flex-col items-center gap-0">
            {[0, 1, 2].map((i) => (
              <motion.svg
                key={i}
                width="16"
                height="10"
                viewBox="0 0 20 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="-my-0.5"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              >
                <path d="M2 2l8 8 8-8" />
              </motion.svg>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <HeroStatsBar />
    </section>
  );
}

interface HeroSlideProps {
  index: number;
  slide: { src: string; alt: string; origin: string };
  isCurrent: boolean;
  isPrevious: boolean;
}

function HeroSlide({ index, slide, isCurrent, isPrevious }: HeroSlideProps) {
  const kbControls = useAnimation();
  const wipeControls = useAnimation();
  const prevIsCurrent = useRef(isCurrent);
  const isFirstMount = useRef(true);

  // Start wipe + Ken Burns animation whenever this slide becomes current
  // Reset clip-path when slide is no longer visible to prevent flash on re-entry
  useEffect(() => {
    if (isCurrent) {
      const kb = kenBurnsVariant;

      // Wipe in from left (skip only for slide 0 on initial page load)
      const skipWipe = isFirstMount.current && index === 0;
      if (!skipWipe) {
        wipeControls.set({ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
        wipeControls.start({
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          transition: {
            duration: WIPE_DURATION,
            ease: [0.65, 0, 0.35, 1],
          },
        });
      }

      // Ken Burns zoom/pan
      kbControls.set({
        scale: kb.from.scale,
        x: kb.from.x,
        y: kb.from.y,
      });
      kbControls.start({
        scale: kb.to.scale,
        x: kb.to.x,
        y: kb.to.y,
        transition: {
          duration: SLIDE_DURATION / 1000 + WIPE_DURATION,
          ease: "linear",
        },
      });
    } else if (!isPrevious) {
      // Slide is neither current nor previous — reset clip-path to hidden
      // so it doesn't flash the old zoomed-in frame when it becomes current again
      wipeControls.set({ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
      kbControls.set({ scale: 1, x: 0, y: 0 });
    }
    prevIsCurrent.current = isCurrent;
    isFirstMount.current = false;
  }, [isCurrent, isPrevious, kbControls, wipeControls, index]);

  // Determine visibility and z-index
  // Current slide wipes in on top (z:1), previous stays visible underneath (z:0), others hidden
  const isVisible = isCurrent || isPrevious;

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: isCurrent ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {/* Clip-path wipe — stable, animated imperatively */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        animate={wipeControls}
      >
        {/* Ken Burns zoom/pan — stable, never remounts */}
        <motion.div
          className="absolute inset-0"
          animate={kbControls}
          style={{ transformOrigin: slide.origin }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function HeroStatsBar() {
  const t = useTranslations("about");

  const stats = [
    { value: "1500+", label: t("stat1Label") },
    { value: "258+", label: t("stat2Label") },
    { value: "9", label: t("stat3Label") },
    { value: "200+", label: t("stat4Label") },
  ];

  return (
    <motion.div
      className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={cn(
              "px-6 py-4 flex flex-col items-center text-center gap-0.5",
              i % 2 === 0 && "border-r border-white/10",
              i < 2 && "border-b border-white/10",
              "md:border-r-0 md:border-b-0",
              i > 0 && "md:border-l md:border-white/10"
            )}
          >
            <span className="text-2xl font-bold text-white tracking-tight">
              {value}
            </span>
            <span className="text-xs text-white/50 font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
