"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function FaqItem({ question, answer, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <div
      className={cn(
        "border-b border-border last:border-b-0",
        "transition-colors duration-150"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full flex items-start justify-between gap-4 py-6 text-left",
          "cursor-pointer focus-visible:outline-none focus-visible:text-brand"
        )}
      >
        <div className="flex items-start gap-4">
          <span className="text-xs font-bold text-brand mt-0.5 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-base font-semibold",
              isOpen ? "text-brand" : "text-ink"
            )}
            style={{ transition: "color 0.2s ease" }}
          >
            {question}
          </span>
        </div>
        <span
          className={cn(
            "shrink-0 w-6 h-6 flex items-center justify-center text-ink-muted",
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
          <p className="pl-10 pb-6 text-sm text-ink-secondary leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
