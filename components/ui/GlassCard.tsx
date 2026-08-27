import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive";
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  glow = false,
  ...props
}: GlassCardProps) {
  const variantStyles = {
    default: "glass-panel rounded-2xl",
    elevated: "glass-panel-elevated rounded-2xl shadow-glass",
    interactive: "glass-panel-interactive rounded-2xl cursor-pointer",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        variantStyles[variant],
        glow && "hover:border-accent-primary/50 hover:shadow-accent-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
