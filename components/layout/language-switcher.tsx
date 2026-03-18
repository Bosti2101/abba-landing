"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { useTransition } from "react";

const localeLabels: Record<Locale, string> = {
  ro: "RO",
  en: "EN",
  bg: "BG",
};

interface LanguageSwitcherProps {
  inverted?: boolean;
}

export function LanguageSwitcher({ inverted = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  }

  return (
    <div className="flex items-center gap-1" aria-label="Language switcher">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span
              className={cn(
                "mx-1 text-xs",
                inverted ? "text-white/30" : "text-[#ccc7c0]"
              )}
              aria-hidden
            >
              /
            </span>
          )}
          <button
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending || loc === locale}
            aria-label={`Switch to ${loc}`}
            className={cn(
              "text-xs font-semibold tracking-widest transition-colors duration-150 uppercase",
              "px-1 py-0.5 rounded-sm",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              loc === locale
                ? inverted
                  ? "text-white"
                  : "text-[#c0392b]"
                : inverted
                ? "text-white/50 hover:text-white"
                : "text-[#7a7a7a] hover:text-[#1a1a1a]",
              "disabled:cursor-default"
            )}
          >
            {localeLabels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
