"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Container } from "@/ui/Container";
import { ArrowUp, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border-subtle bg-background-primary py-12 text-xs font-mono text-text-muted">
      <Container size="wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Dynamic Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold tracking-wider text-text-primary">
              SPARSH GOYAL
            </span>
            <span className="hidden sm:inline text-border-strong">•</span>
            <span>
              Copyright &copy; {currentYear} Sparsh Goyal. All rights reserved.
            </span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/sparsh-goyal01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded-md hover:text-text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sparshgoyal06"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded-md hover:text-text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/Sparshgoyal01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-1.5 rounded-md hover:text-text-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/Sparsh_goyal01"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-1.5 rounded-md hover:text-text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:sparshgoyaldev@gmail.com"
                aria-label="Email Sparsh"
                className="p-1.5 rounded-md hover:text-text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-subtle bg-white/5 text-text-primary hover:border-accent-primary/40 hover:text-accent-highlight transition-all"
              aria-label="Scroll to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
