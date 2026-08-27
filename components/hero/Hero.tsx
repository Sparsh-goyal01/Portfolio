"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
} from "framer-motion";
import { profileData } from "@/data/profile";
import { HeroVisual } from "./HeroVisual";
import { Container } from "@/ui/Container";
import { Badge } from "@/ui/Badge";
import { MagneticButton } from "@/ui/MagneticButton";
import {
  ArrowRight,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { headline, lead, positioning, highlightTags, socialLinks } =
    profileData;

  // Normalized mouse coordinates (-1 to 1) for parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  // Scroll transition as user moves away from Hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.85], [0, 40]);

  // Track mouse over hero
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    rawMouseX.set(normalizedX);
    rawMouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Smooth scroll handler for CTAs
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Staggered cinematic entrance variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const visualVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.2,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Sparsh Goyal Portfolio Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      <Container size="wide">
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroTranslateY,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Editorial Typography, Positioning & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Availability / Status Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-border-subtle mb-6 backdrop-blur-sm shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-text-secondary uppercase">
                Available for Software Engineering Roles
              </span>
            </motion.div>

            {/* Large Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary leading-[1.08] mb-4"
            >
              HELLO, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary to-accent-highlight">
                I&apos;M SPARSH
              </span>{" "}
              <br />
              <span className="text-accent-primary">GOYAL.</span>
            </motion.h1>

            {/* Sub-Headline / Positioning */}
            <motion.div
              variants={itemVariants}
              className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-accent-highlight uppercase mb-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              <span>BACKEND-FOCUSED SOFTWARE DEVELOPER</span>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed mb-8"
            >
              {lead}
            </motion.p>

            {/* Highlight Tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-8"
            >
              {highlightTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  size="sm"
                  className="hover:border-accent-primary/40 hover:text-text-primary transition-colors cursor-default"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>

            {/* Magnetic Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <MagneticButton
                onClick={() => handleScrollTo("projects")}
                variant="primary"
                dataCursor="project"
                ariaLabel="View Projects Section"
                className="group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                onClick={() => handleScrollTo("contact")}
                variant="secondary"
                dataCursor="mail"
                ariaLabel="Navigate to Contact Section"
                className="group"
              >
                <span>Let&apos;s Talk</span>
                <Send className="w-4 h-4 text-text-muted group-hover:text-accent-highlight group-hover:translate-x-0.5 transition-all" />
              </MagneticButton>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-mono text-text-muted mr-1 uppercase">
                Connect:
              </span>
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-cursor={
                    social.platform.toLowerCase() === "github"
                      ? "Code"
                      : social.platform.toLowerCase() === "email"
                      ? "Mail"
                      : social.platform.toLowerCase() === "linkedin"
                      ? "LinekedIn"
                      : social.platform.toLowerCase() === "twitter"
                      ? "Twitter"
                      : "Instagram"
                  }
                  className="p-2 rounded-lg bg-white/5 border border-border-subtle text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 hover:bg-accent-primary/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Container & Tech Constellation */}
          <motion.div
            variants={visualVariants}
            className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0"
          >
            <HeroVisual mouseX={mouseX} mouseY={mouseY} />
          </motion.div>
        </motion.div>
      </Container>

      {/* Subtle Scroll Indicator Indicator Arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity pointer-events-auto cursor-pointer" onClick={() => handleScrollTo("about")}>
        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
          SCROLL
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-accent-primary animate-bounce" />
      </div>
    </section>
  );
}
