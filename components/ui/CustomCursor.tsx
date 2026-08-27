"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Mouse position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, snappy spring physics for cursor tracking
  const springConfig = { damping: 30, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch devices, coarse pointers, or prefers-reduced-motion
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        setIsHovered(true);
        switch (type) {
          case "project":
            setCursorText("VIEW");
            break;
          case "hey":
            setCursorText("HEY 👋");
            break;
          case "code":
            setCursorText("CODE");
            break;
          case "mail":
            setCursorText("MAIL");
            break;
          case "pdf":
            setCursorText("PDF");
            break;
          case "tech":
            setCursorText("TECH");
            break;
          default:
            setCursorText(type || "");
            break;
        }
        return;
      }

      // Check standard interactive elements
      if (target.closest("a, button, [role='button'], input, textarea")) {
        const interactive = target.closest("a, button, [role='button']") as HTMLElement;
        const href = interactive?.getAttribute("href");

        setIsHovered(true);
        if (href?.includes("github.com")) {
          setCursorText("CODE");
        } else if (href?.startsWith("mailto:")) {
          setCursorText("MAIL");
        } else if (href?.includes(".pdf")) {
          setCursorText("PDF");
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-fit h-fit flex items-center justify-center select-none"
    >
      {/* Central Cursor Point */}
      <div
        className={`rounded-full border transition-all duration-200 ${
          isHovered
            ? "w-4 h-4 bg-accent-primary/20 border-accent-primary/60 shadow-[0_0_12px_rgba(255,106,0,0.4)]"
            : "w-2.5 h-2.5 bg-accent-primary border-accent-highlight shadow-[0_0_8px_rgba(255,106,0,0.6)]"
        }`}
      />

      {/* Floating Contextual Badge (Rendered strictly above the cursor as an intrinsic compact pill) */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: -22 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.15 }}
          className="absolute left-1/2 -translate-x-1/2 w-max max-w-fit px-2.5 py-0.5 rounded-full bg-background-surface/95 border border-accent-primary/50 shadow-glass backdrop-blur-md whitespace-nowrap"
        >
          <span className="font-mono text-[9px] font-bold text-accent-highlight tracking-wider uppercase">
            {cursorText}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
