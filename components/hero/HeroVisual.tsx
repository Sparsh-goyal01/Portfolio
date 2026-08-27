"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { TechConstellation } from "./TechConstellation";
import { HeroProfileCard } from "./HeroProfileCard";

interface HeroVisualProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function HeroVisual({ mouseX, mouseY }: HeroVisualProps) {
  return (
    <div className="relative w-full max-w-[620px] xl:max-w-[680px] mx-auto aspect-square min-h-[480px] sm:min-h-[560px] flex items-center justify-center select-none overflow-visible">
      {/* Subtle Atmospheric Orbital / Connection Lines */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-35 z-0 overflow-visible"
        viewBox="0 0 640 640"
        fill="none"
      >
        {/* Inner subtle ellipse */}
        <ellipse
          cx="320"
          cy="320"
          rx="225"
          ry="190"
          stroke="#FF6A00"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="opacity-40"
        />
        {/* Outer subtle atmospheric orbit */}
        <ellipse
          cx="320"
          cy="320"
          rx="290"
          ry="245"
          stroke="#FF8A3D"
          strokeWidth="0.75"
          strokeDasharray="3 8"
          className="opacity-25"
        />
        {/* Fine crosshair accents */}
        <line x1="320" y1="25" x2="320" y2="50" stroke="#FF6A00" strokeWidth="1" opacity="0.3" />
        <line x1="320" y1="590" x2="320" y2="615" stroke="#FF6A00" strokeWidth="1" opacity="0.3" />
        <line x1="25" y1="320" x2="50" y2="320" stroke="#FF6A00" strokeWidth="1" opacity="0.3" />
        <line x1="590" y1="320" x2="615" y2="320" stroke="#FF6A00" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* 12-Technology Constellation Orbit System (Expanded Orbit) */}
      <TechConstellation mouseX={mouseX} mouseY={mouseY} />

      {/* Atmospheric Soft Orange Diffuse Light Behind Profile */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.28, 0.38, 0.28],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut" as const,
        }}
        className="absolute inset-0 rounded-full pointer-events-none blur-3xl z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 106, 0, 0.24) 0%, rgba(255, 138, 61, 0.06) 50%, transparent 75%)",
        }}
      />

      {/* Real Photograph Technical Profile Card */}
      <HeroProfileCard mouseX={mouseX} mouseY={mouseY} />
    </div>
  );
}
