"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const icons = [
  <svg key="1" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M2 12h2M20 12h2M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" strokeLinecap="round"/></svg>,
  <svg key="2" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="3" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9" strokeLinecap="round"/></svg>,
  <svg key="4" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round"/></svg>,
];

export function GradinaDeIarnaContent() {
  const t = useTranslations("projects.gradina-de-iarna");

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
