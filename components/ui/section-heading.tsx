import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleAs?: "h1" | "h2" | "h3";
  className?: string;
  inverted?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  titleAs: Title = "h2",
  className,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "text-xs font-semibold tracking-widest uppercase mb-4",
            inverted ? "text-brand" : "text-brand"
          )}
        >
          {label}
        </span>
      )}
      <Title
        className={cn(
          "font-semibold leading-tight tracking-tight",
          "text-3xl sm:text-4xl lg:text-5xl",
          inverted ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Title>
      {description && (
        <p
          className={cn(
            "mt-5 leading-relaxed max-w-2xl",
            "text-base sm:text-lg",
            inverted ? "text-white/70" : "text-ink-secondary"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
