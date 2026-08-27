"use client";

import React, { useState } from "react";
import { motion, MotionValue, useTransform, type TargetAndTransition } from "framer-motion";
import { TechConstellationItem } from "@/lib/types/portfolio";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// SVG Icon renderer for the 12 technologies
function TechIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  switch (iconKey) {
    case "react":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="currentColor">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M4 10h8m-4 0v9m5-9h6m-3 0v9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#339933">
          <path d="M12 2L3 7.2v10.6L12 23l9-5.2V7.2L12 2zm0 2.2l6.8 3.9v8L12 20.1l-6.8-4V8.1L12 4.2z" />
          <path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" fill="#fff" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#4169E1" strokeWidth="2">
          <path d="M12 3C7 3 3 6.5 3 11c0 3.2 2.1 6 5.2 7.2L7 21h4l1-2.5c4.7.4 9-2.7 9-7.5 0-4.5-4-8-9-8z" />
          <circle cx="9" cy="9" r="1" fill="#4169E1" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M8 12v5c0 1.5-1 2-2.5 2M15 12h3c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5h-1.5v4" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "cpp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#00599C" />
          <text x="4.5" y="17" fill="#fff" fontSize="13" fontFamily="sans-serif" fontWeight="bold">C++</text>
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#4479A1">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7.5h2V9.5z" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <text x="4" y="16.5" fill="currentColor" fontSize="11.5" fontFamily="sans-serif" fontWeight="bold">ex</text>
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FFCA28">
          <path d="M4.5 17.5L7.2 4.8c.1-.4.6-.5.8-.2l3.4 6.3L4.5 17.5zm15 0L17.3 8.2c-.2-.4-.7-.4-.9 0L4.5 17.5l7 4c.3.2.7.2 1 0l7-4z" />
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#FF8A3D" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F05032">
          <path d="M21.6 10.6L13.4 2.4c-.6-.6-1.5-.6-2.1 0L9.2 4.5l3.2 3.2c.4-.1.9 0 1.2.3.6.6.6 1.5 0 2.1-.4.4-.9.5-1.4.4l-2 2v3.7c.3.2.5.5.5.9 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.6.4-1.2.9-1.4v-4.1l-2.6-2.6-4 4c-.6.6-.6 1.5 0 2.1l8.2 8.2c.6.6 1.5.6 2.1 0l7.5-7.5c.6-.6.6-1.5 0-2.1z" />
        </svg>
      );
    default:
      return null;
  }
}

interface TechnologyLogoProps {
  item: TechConstellationItem;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeselect: () => void;
}

export function TechnologyLogo({
  item,
  mouseX,
  mouseY,
  isSelected,
  onSelect,
  onDeselect,
}: TechnologyLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Parallax calculations based on layer depth
  const parallaxX = useTransform(
    mouseX,
    [-1, 1],
    [-item.floatParams.parallaxStrength, item.floatParams.parallaxStrength]
  );
  const parallaxY = useTransform(
    mouseY,
    [-1, 1],
    [-item.floatParams.parallaxStrength, item.floatParams.parallaxStrength]
  );

  const layerStyles = {
    CORE: {
      container: "z-20 border-white/20 bg-background-surface/90 shadow-md",
      opacity: 0.95,
      scale: 1,
    },
    MID: {
      container: "z-10 border-white/10 bg-background-surface/75",
      opacity: 0.75,
      scale: 0.9,
    },
    BACKGROUND: {
      container: "z-0 border-white/5 bg-background-surface/50",
      opacity: 0.52,
      scale: 0.78,
    },
  };

  const sizeStyles = {
    lg: "w-11 h-11 p-2",
    md: "w-9 h-9 p-1.5",
    sm: "w-8 h-8 p-1.5",
  };

  const currentLayer = layerStyles[item.layer];

  // Floating keyframe oscillation
  const floatAnimation: TargetAndTransition = {
    x: [0, item.floatParams.amplitudeX, 0, -item.floatParams.amplitudeX, 0],
    y: [0, -item.floatParams.amplitudeY, 0, item.floatParams.amplitudeY, 0],
    rotate: [0, item.floatParams.rotation, 0, -item.floatParams.rotation, 0],
    transition: {
      duration: item.floatParams.duration,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: item.floatParams.delay,
    },
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      onDeselect();
    } else {
      onSelect(item.id);
    }
  };

  return (
    <motion.div
      style={{
        x: parallaxX,
        y: parallaxY,
        left: `calc(50% + ${item.position.x * 5.4}px)`,
        top: `calc(50% + ${item.position.y * 4.6}px)`,
      }}
      className="absolute pointer-events-auto"
    >
      <motion.div
        animate={floatAnimation}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        {/* The interactive logo node */}
        <button
          type="button"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(e as unknown as React.MouseEvent);
            } else if (e.key === "Escape") {
              onDeselect();
            }
          }}
          tabIndex={0}
          aria-label={`${item.name} (${item.category}). Click to view info.`}
          data-cursor="tech"
          className={cn(
            "flex items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer select-none",
            currentLayer.container,
            sizeStyles[item.size],
            (isHovered || isSelected) &&
              "scale-115 !opacity-100 border-accent-primary/60 shadow-[0_0_20px_rgba(255,106,0,0.35)]"
          )}
          style={{
            opacity: isHovered || isSelected ? 1 : currentLayer.opacity,
          }}
        >
          <TechIcon
            iconKey={item.svgIconKey}
            className="w-full h-full object-contain"
          />
        </button>

        {/* Hover HUD Pill Overlay */}
        {isHovered && !isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-background-surface/95 backdrop-blur-md border border-border-strong rounded-lg text-[10px] font-mono text-text-primary whitespace-nowrap shadow-glass z-40 pointer-events-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-accent-highlight">
                {item.name}
              </span>
              <span className="text-border-strong">•</span>
              <span className="text-text-muted">{item.hudCategory}</span>
            </div>
          </motion.div>
        )}

        {/* Click Speech / Microcopy Bubble */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-3 bg-background-primary/95 backdrop-blur-xl border border-accent-primary/50 rounded-xl shadow-glass z-50 text-left"
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-border-subtle text-[10px] font-mono">
              <span className="text-accent-primary font-bold">{item.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeselect();
                }}
                className="text-text-muted hover:text-text-primary p-0.5"
                aria-label="Close message"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs font-mono text-text-secondary leading-snug">
              &ldquo;{item.microcopy}&rdquo;
            </p>
            <div className="mt-2 text-[9px] font-mono text-text-muted flex items-center justify-between">
              <span>{item.category}</span>
              <span className="text-accent-highlight">{item.layer}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
