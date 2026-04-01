"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const icons = [
  // Sun / climate
  <svg key="1" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/></svg>,
  // Shield / resistance
  <svg key="2" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Lightbulb / LED
  <svg key="3" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Smartphone / automation
  <svg key="4" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01" strokeLinecap="round"/></svg>,
];

export function BioclimaticContent() {
  const t = useTranslations("projects.sistem-bioclimatic");

  const features = [
    { title: t("f1Title"), desc: t("f1Desc"), icon: icons[0] },
    { title: t("f2Title"), desc: t("f2Desc"), icon: icons[1] },
    { title: t("f3Title"), desc: t("f3Desc"), icon: icons[2] },
    { title: t("f4Title"), desc: t("f4Desc"), icon: icons[3] },
  ];

  return (
    <section className="section-y-sm bg-surface-warm">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col gap-12">

          {/* Description */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-brand">
              {t("label")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {t("title")}
            </h2>
            <div className="w-10 h-px bg-brand" />
            <p className="text-ink-secondary leading-relaxed text-base sm:text-lg">
              {t("desc")}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-ink">
              {t("whyTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-border shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="shrink-0 w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center text-brand mt-0.5">
                    {f.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-ink text-sm">{f.title}</span>
                    <span className="text-ink-secondary text-sm leading-relaxed">{f.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
