"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ question, answer, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <div
      className={cn(
        "border-b border-[#e8e4df] last:border-b-0",
        "transition-colors duration-150"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full flex items-start justify-between gap-4 py-6 text-left",
          "cursor-pointer focus-visible:outline-none focus-visible:text-[#c0392b]"
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-xs font-bold text-[#c0392b] mt-0.5 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-base font-semibold",
              isOpen ? "text-[#c0392b]" : "text-[#1a1a1a]"
            )}
            style={{ transition: "color 0.2s ease" }}
          >
            {question}
          </span>
        </div>
        <span
          className={cn(
            "shrink-0 w-6 h-6 flex items-center justify-center text-[#7a7a7a]",
            isOpen ? "rotate-45" : ""
          )}
          style={{ transition: "transform 0.2s ease" }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        className="grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p className="pl-10 pb-6 text-sm text-[#4a4a4a] leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="section-y bg-white" aria-label="FAQ">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20">
          {/* Heading */}
          <Reveal once>
            <SectionHeading
              label={t("label")}
              title={t("title")}
            />
          </Reveal>

          {/* Accordion */}
          <Reveal once>
            <div
              role="list"
              className="divide-y divide-[#e8e4df] border-t border-[#e8e4df]"
            >
              {items.map(({ q, a }, i) => (
                <FaqItem
                  key={i}
                  question={q}
                  answer={a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  index={i}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
