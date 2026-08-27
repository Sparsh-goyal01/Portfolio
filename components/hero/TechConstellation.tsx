"use client";

import React, { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";
import { techConstellationData } from "@/data/techStack";
import { TechnologyLogo } from "./TechnologyLogo";

interface TechConstellationProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function TechConstellation({ mouseX, mouseY }: TechConstellationProps) {
  const [selectedLogoId, setSelectedLogoId] = useState<string | null>(null);

  // Global listener to dismiss active microcopy bubble on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLogoId(null);
      }
    };

    const handleClickOutside = () => {
      setSelectedLogoId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      aria-label="12 Technology Constellation"
      className="absolute inset-0 pointer-events-none select-none overflow-visible z-10"
    >
      {techConstellationData.map((item) => (
        <TechnologyLogo
          key={item.id}
          item={item}
          mouseX={mouseX}
          mouseY={mouseY}
          isSelected={selectedLogoId === item.id}
          onSelect={(id) => setSelectedLogoId(id)}
          onDeselect={() => setSelectedLogoId(null)}
        />
      ))}
    </div>
  );
}
