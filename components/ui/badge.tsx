import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "muted" | "brand";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        variant === "default" && "bg-surface-mid text-ink-secondary",
        variant === "muted" && "bg-white/10 text-white/80",
        variant === "brand" && "bg-brand-light text-brand",
        className
      )}
    >
      {children}
    </span>
  );
}
