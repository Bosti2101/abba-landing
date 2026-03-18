"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/motion/variants";

export interface BenefitCardProps {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  delay?: number;
}

export function BenefitCard({
  titleKey,
  descKey,
  icon,
  delay,
}: BenefitCardProps) {
  return (
    <motion.div variants={scaleIn} className="flex flex-col gap-3 p-5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200">
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
