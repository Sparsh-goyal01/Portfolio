import React from "react";

export function BackgroundAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Top subtle orange aura */}
      <div className="radial-glow-top" />

      {/* Atmospheric secondary amber glow lower right */}
      <div
        className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 106, 0, 0.15) 0%, rgba(255, 138, 61, 0.05) 50%, transparent 80%)",
        }}
      />

      {/* Subtle mid-page teal ambient depth glow */}
      <div
        className="absolute top-[45%] left-[-15%] w-[600px] h-[600px] rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(6, 78, 59, 0.04) 50%, transparent 80%)",
        }}
      />

      {/* Subtle fine technical grid */}
      <div className="absolute inset-0 ambient-grid opacity-60" />
    </div>
  );
}
