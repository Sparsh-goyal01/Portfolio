import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle" />
        <span className="text-xs font-mono tracking-widest text-accent-primary uppercase font-semibold">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
        {heading}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
