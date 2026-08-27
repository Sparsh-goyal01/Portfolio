"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function PointerLight({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
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
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      x.set(relativeX);
      y.set(relativeY);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [containerRef, x, y]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255, 106, 0, 0.22) 0%, rgba(255, 138, 61, 0.06) 45%, transparent 70%)",
        }}
        className="w-[550px] h-[550px] rounded-full opacity-35 blur-[100px] pointer-events-none"
      />
    </div>
  );
}
