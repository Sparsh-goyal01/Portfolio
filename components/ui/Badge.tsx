import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "surface" | "glow";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-white/5 text-text-primary border-border-subtle",
    accent: "bg-accent-primary/10 text-accent-highlight border-accent-primary/30",
    outline: "bg-transparent text-text-secondary border-border-subtle hover:border-border-strong",
    surface: "bg-background-surface text-text-secondary border-border-subtle",
    glow: "bg-accent-primary/15 text-accent-highlight border-accent-primary/40 shadow-[0_0_12px_rgba(255,106,0,0.2)]",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 tracking-wider font-mono",
    md: "text-xs sm:text-sm px-3 py-1 font-mono tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
