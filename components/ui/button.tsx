"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "outline" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-hover active:bg-[#922b21] shadow-sm",
  outline:
    "border border-brand text-brand hover:bg-brand hover:text-white",
  ghost: "text-brand hover:bg-brand-light",
  dark: "bg-ink text-white hover:bg-[#2d2d2d] active:bg-[#3d3d3d]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-wide",
          "rounded-sm",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "cursor-pointer select-none",
          "transition-all duration-200 ease-out",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        style={props.style}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
