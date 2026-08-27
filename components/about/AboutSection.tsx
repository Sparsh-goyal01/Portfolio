"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/ui/Container";
import { GlassCard } from "@/ui/GlassCard";
import { Terminal, Database, Code2, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

export function AboutSection() {
  const currentFocus = [
    "Backend Engineering",
    "APIs & Databases",
    "Data Analytics",
    "DSA & Problem Solving",
  ];

  const interestedIn = [
    "Scalable Systems",
    "Clean Architecture",
    "Problem Solving",
    "Modern Web Development",
  ];

  return (
    <section
      id="about"
      aria-label="About Sparsh Goyal"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container size="wide">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle" />
          <span className="text-xs font-mono tracking-widest text-accent-primary uppercase font-semibold">
            ABOUT
          </span>
        </div>

        {/* Editorial Main Statement & Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Big Philosophy Statement & Technical Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.12]">
              I build systems,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-highlight to-accent-primary">
                not just screens.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed pt-2">
              <p>
                I am a backend-focused software developer dedicated to building scalable web applications, robust APIs, and data-driven systems that solve real-world problems.
              </p>
              <p className="text-sm sm:text-base text-text-muted">
                My approach centers on understanding how software works beneath the surface — optimizing relational database queries, architecting clean service layers, and applying data structures and algorithms to build reliable, high-performance digital products.
              </p>
            </div>

            {/* Core Philosophy Highlights */}
            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-border-subtle">
                <Terminal className="w-3.5 h-3.5 text-accent-primary" />
                <span>Clean API Contracts</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-border-subtle">
                <Database className="w-3.5 h-3.5 text-accent-highlight" />
                <span>Structured Data Flow</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-border-subtle">
                <Cpu className="w-3.5 h-3.5 text-accent-primary" />
                <span>Algorithmic Thinking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary Technical Profile Panels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Panel 1: Current Focus */}
            <GlassCard variant="elevated" className="p-6 border border-border-strong">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                <span className="font-mono text-xs tracking-wider text-accent-primary uppercase font-semibold">
                  CURRENT FOCUS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                {currentFocus.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-text-primary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Panel 2: Interested In */}
            <GlassCard variant="interactive" className="p-6 border border-border-subtle">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                <span className="font-mono text-xs tracking-wider text-accent-highlight uppercase font-semibold">
                  INTERESTED IN
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-highlight" />
              </div>

              <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                {interestedIn.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
