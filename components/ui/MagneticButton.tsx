"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  strength?: number; // 0 to 1 scale of pull (default restrained 0.25)
  dataCursor?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  strength = 0.28,
  dataCursor,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.3 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Limit maximum magnetic displacement to max 12px for subtle elegance
    const maxDisplacement = 12;
    const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
    const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClasses = {
    primary:
      "bg-accent-primary text-black font-bold hover:bg-accent-highlight shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)]",
    secondary:
      "bg-white/5 text-text-primary border border-border-subtle hover:border-border-strong hover:bg-white/10",
    outline:
      "border border-border-subtle bg-transparent text-text-primary hover:border-accent-primary/50 hover:bg-accent-primary/5",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary select-none cursor-pointer",
        variantClasses[variant],
        className
      )}
      data-cursor={dataCursor}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className="inline-block focus-visible:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block focus-visible:outline-none"
    >
      {content}
    </button>
  );
}
