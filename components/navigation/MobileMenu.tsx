"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { NavigationItem } from "@/lib/types/portfolio";
import { X, FileText, ArrowRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

export function MobileMenu({
  isOpen,
  onClose,
  navigationItems,
}: MobileMenuProps) {
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 bg-background-primary/95 backdrop-blur-xl md:hidden flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
        <span className="font-mono text-sm font-semibold tracking-wider text-text-primary">
          NAVIGATION
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-transparent hover:border-border-subtle hover:bg-white/5 text-lg font-medium text-text-primary transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent-primary">
                  0{index + 1}
                </span>
                <span>{item.label}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted" />
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-border-subtle mt-6 flex flex-col gap-3">
          <Link
            href="#resume"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 text-text-primary font-mono text-sm border border-border-subtle hover:bg-white/15"
          >
            <FileText className="w-4 h-4 text-accent-primary" />
            <span>Download Resume PDF</span>
          </Link>
          <Link
            href="#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent-primary text-black font-semibold text-sm shadow-[0_0_20px_rgba(255,106,0,0.3)]"
          >
            <span>Let&apos;s Talk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
