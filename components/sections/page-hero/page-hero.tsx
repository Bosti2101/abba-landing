"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface-dark">
      {/* Background pattern / texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient mesh */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/[0.07] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/[0.04] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        {/* Diagonal decorative line */}
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      </div>

      <Container>
        <div className="relative pt-36 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-28">
          {/* Breadcrumb-like label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="block w-10 h-px bg-brand" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">
              {label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] tracking-tight max-w-4xl"
            style={{ color: "#ffffff" }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {description}
            </motion.p>
          )}

          {/* Bottom decorative separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-12 sm:mt-16 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent origin-left max-w-xl"
          />
        </div>
      </Container>
    </section>
  );
}
