"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import { profileData } from "@/data/profile";
import { Database, Code2, X, Sparkles } from "lucide-react";

interface HeroProfileCardProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function HeroProfileCard({ mouseX, mouseY }: HeroProfileCardProps) {
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { heroCard } = profileData;

  // Gentle subtle parallax for the real photo profile card
  const cardX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const cardY = useTransform(mouseY, [-1, 1], [-6, 6]);

  // Global dismiss on Escape or outside click
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
      onHoverStart={() => setIsCardHovered(true)}
      onHoverEnd={() => setIsCardHovered(false)}
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
      aria-label="Sparsh Goyal Developer Profile Card. Click to interact."
      data-cursor="hey"
      className="relative z-20 w-[280px] sm:w-[320px] rounded-2xl glass-panel-elevated p-5 border border-border-strong hover:border-accent-primary/60 transition-all duration-300 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary select-none"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle text-[11px] font-mono text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-text-secondary font-medium tracking-wide">
            ● DEV::ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {isCardHovered && !easterEggOpen && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-accent-highlight font-bold"
            >
              HEY 👋
            </motion.span>
          )}
          <span className="text-accent-primary font-mono text-[10px] font-semibold tracking-wider">
            BACKEND
          </span>
        </div>
      </div>

      {/* Real Personal Photograph Portrait Frame */}
      <div className="relative w-full aspect-[4/4.2] rounded-xl overflow-hidden bg-background-surface border border-border-subtle mb-4 group-hover:border-accent-primary/40 transition-colors shadow-inner">
        {/* Subtle warm backlight glow behind portrait */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(255, 106, 0, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Real Photograph Image */}
        <Image
          src={heroCard.portraitAsset}
          alt={heroCard.portraitAlt}
          fill
          priority
          sizes="(max-width: 768px) 280px, 320px"
          className="object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-[1.03] transition-transform duration-500 ease-out z-0"
        />

        {/* Subtle bottom vignette gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-surface/90 via-transparent to-transparent opacity-60 z-10" />

        {/* Floating Greeting Modal / Easter Egg */}
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
                DEV::GREETING
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

      {/* Name and Tagline */}
      <div className="mb-3 text-center sm:text-left">
        <h3 className="font-mono text-sm font-bold text-text-primary tracking-wider group-hover:text-accent-highlight transition-colors">
          {heroCard.cardName}
        </h3>
        <p className="font-mono text-[10px] text-text-secondary mt-0.5 tracking-wide">
          {heroCard.cardSubtitle}
        </p>
      </div>

      {/* Lower Technical HUD Rows */}
      <div className="space-y-1.5 font-mono text-xs">
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
