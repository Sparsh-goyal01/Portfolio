"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { profileData } from "@/data/profile";
import { Terminal, Database, Code2, X, Sparkles } from "lucide-react";

interface DeveloperAvatarProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function DeveloperAvatar({ mouseX, mouseY }: DeveloperAvatarProps) {
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { heroCard } = profileData;

  // Eye tracking offsets (clamped strictly to a natural, subtle range [-4.5px, 4.5px])
  const eyeX = useTransform(mouseX, [-1, 1], [-4.5, 4.5]);
  const eyeY = useTransform(mouseY, [-1, 1], [-4.5, 4.5]);

  // Head/face tracking (subtle tilt [-3.5deg, 3.5deg] and translation [-2.5px, 2.5px])
  const headRotate = useTransform(mouseX, [-1, 1], [-3.5, 3.5]);
  const headX = useTransform(mouseX, [-1, 1], [-2.5, 2.5]);
  const headY = useTransform(mouseY, [-1, 1], [-2.5, 2.5]);

  // Body / Card subtle parallax
  const cardX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const cardY = useTransform(mouseY, [-1, 1], [-6, 6]);

  // Dismiss on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEasterEggOpen(false);
    };

    const handleClickOutside = () => {
      if (easterEggOpen) setEasterEggOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [easterEggOpen]);

  const toggleEasterEgg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEasterEggOpen((prev) => !prev);
  };

  return (
    <motion.div
      style={{ x: cardX, y: cardY }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={toggleEasterEgg}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setEasterEggOpen((prev) => !prev);
        } else if (e.key === "Escape") {
          setEasterEggOpen(false);
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={easterEggOpen}
      aria-label="Interactive Developer Avatar. Click to greet."
      data-cursor="hey"
      className="relative z-20 w-[270px] sm:w-[310px] rounded-2xl glass-panel-elevated p-5 border border-border-strong hover:border-accent-primary/60 transition-all duration-300 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary select-none"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle text-[11px] font-mono text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-text-secondary">DEV::ACTIVE</span>
        </div>

        <div className="flex items-center gap-1.5">
          {isHovered && !easterEggOpen && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-accent-highlight font-bold"
            >
              HEY 👋
            </motion.span>
          )}
          <span className="text-accent-primary font-mono text-[10px]">
            BACKEND
          </span>
        </div>
      </div>

      {/* Interactive Face / Eye Tracking Graphic Area */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-background-surface border border-border-subtle mb-4 flex items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 ambient-grid opacity-35" />

        {/* The Animated Developer Face / Head */}
        <motion.div
          style={{
            x: headX,
            y: headY,
            rotate: headRotate,
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center p-3"
        >
          {/* Avatar Head Silhouette */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#1c1c1c] to-[#121212] border border-accent-primary/30 p-2.5 shadow-[0_0_25px_rgba(255,106,0,0.15)] flex flex-col items-center justify-center">
            {/* Developer Glasses / Visor */}
            <div className="relative w-14 h-7 rounded-lg bg-black/80 border border-accent-primary/50 flex items-center justify-around px-1.5 overflow-hidden shadow-inner">
              {/* Left Eye & Pupil */}
              <div className="relative w-4 h-4 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <motion.div
                  style={{ x: eyeX, y: eyeY }}
                  className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_6px_rgba(255,106,0,0.9)]"
                />
              </div>

              {/* Bridge */}
              <div className="w-1.5 h-[1.5px] bg-accent-primary/60" />

              {/* Right Eye & Pupil */}
              <div className="relative w-4 h-4 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <motion.div
                  style={{ x: eyeX, y: eyeY }}
                  className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_6px_rgba(255,106,0,0.9)]"
                />
              </div>
            </div>

            {/* Subtle Terminal indicator badge */}
            <div className="mt-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-accent-primary animate-ping" />
              <span className="font-mono text-[8px] text-text-muted">LIVE</span>
            </div>
          </div>

          <span className="font-mono text-xs font-bold text-text-primary tracking-wider mt-2 group-hover:text-accent-highlight transition-colors">
            {heroCard.cardName}
          </span>
          <span className="font-mono text-[10px] text-text-secondary mt-0.5">
            {heroCard.cardSubtitle}
          </span>
        </motion.div>

        {/* Easter Egg Message Modal / Overlay */}
        {easterEggOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-background-primary/95 backdrop-blur-md p-4 flex flex-col justify-between z-30 text-center"
          >
            <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
              <span className="font-mono text-[10px] text-accent-primary font-bold">
                MESSAGE::INCOMING
              </span>
              <button
                type="button"
                onClick={() => setEasterEggOpen(false)}
                className="text-text-muted hover:text-text-primary p-0.5"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="my-auto py-1">
              <span className="text-2xl mb-1 block animate-bounce">👋</span>
              <p className="font-mono text-xs font-bold text-text-primary mb-1">
                &ldquo;Hey! I&apos;m Sparsh.&rdquo;
              </p>
              <p className="font-mono text-[11px] text-text-secondary leading-snug">
                Nice to meet you. Thanks for exploring my developer portfolio!
              </p>
            </div>

            <span className="text-[9px] font-mono text-text-muted">
              Press [Esc] or click outside to close
            </span>
          </motion.div>
        )}
      </div>

      {/* Profile Card Footnotes */}
      <div className="space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-border-subtle">
          <span className="text-text-muted flex items-center gap-1.5 text-[11px]">
            <Database className="w-3 h-3 text-accent-primary" />
            Focus:
          </span>
          <span className="text-text-primary font-medium text-[11px]">
            {heroCard.focus}
          </span>
        </div>
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-border-subtle">
          <span className="text-text-muted flex items-center gap-1.5 text-[11px]">
            <Code2 className="w-3 h-3 text-accent-highlight" />
            Current:
          </span>
          <span className="text-text-primary font-medium text-[11px]">
            {heroCard.current}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
