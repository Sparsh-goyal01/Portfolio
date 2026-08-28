"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationItems } from "@/data/navigation";
import { profileData } from "@/data/profile";
import { MobileMenu } from "./MobileMenu";
import { FileText, Menu } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background-primary/85 backdrop-blur-md border-b border-border-subtle py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand with User's Real Photograph */}
          <Link
            href="#"
            data-cursor="hey"
            className="group flex items-center gap-3 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-md"
            aria-label="Sparsh Goyal Homepage - Scroll to top"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border-subtle bg-white/5 group-hover:border-accent-primary/60 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(255,106,0,0.35)] transition-all duration-300">
              <Image
                src="/images/sparsh.png"
                alt="Sparsh Goyal avatar"
                fill
                sizes="32px"
                className="object-cover object-top filter brightness-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-base sm:text-lg font-bold tracking-wider text-text-primary group-hover:text-accent-highlight transition-colors">
                SPARSH GOYAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full glass-panel"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="#resume"
              data-cursor="pdf"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg border border-border-subtle bg-white/5 text-text-primary hover:border-accent-primary/40 hover:bg-accent-primary/10 hover:text-accent-highlight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              <FileText className="w-3.5 h-3.5 text-accent-primary" />
              <span>Resume</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-border-subtle bg-white/5 text-text-primary hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </header>
  );
}
