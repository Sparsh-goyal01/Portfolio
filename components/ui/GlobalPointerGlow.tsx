"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function GlobalPointerGlow() {
  const [isEnabled, setIsEnabled] = useState(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  // Smooth spring physics for fluid movement across the entire page
  const springConfig = { damping: 32, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    // Check if device is touch or prefers-reduced-motion
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch) return;
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255, 106, 0, 0.18) 0%, rgba(255, 138, 61, 0.05) 45%, transparent 70%)",
        }}
        className="w-[650px] h-[650px] rounded-full opacity-40 blur-[100px] pointer-events-none"
      />
    </div>
  );
}
