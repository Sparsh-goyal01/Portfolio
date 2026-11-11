"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Music, Pause, Play, Volume2 } from "lucide-react";
import { portfolioMusicTrack, type MusicTrackConfig } from "@/data/music";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  track?: Partial<MusicTrackConfig>;
  className?: string;
}

const EQUALIZER_BARS = [
  { keyframes: [0.32, 0.95, 0.45, 0.8, 0.32], duration: 0.9, delay: 0, staticScale: 0.65 },
  { keyframes: [0.55, 0.35, 1, 0.45, 0.55], duration: 0.78, delay: 0.14, staticScale: 0.95 },
  { keyframes: [0.38, 0.85, 0.32, 0.92, 0.38], duration: 1.02, delay: 0.28, staticScale: 0.5 },
  { keyframes: [0.65, 0.4, 0.88, 0.35, 0.65], duration: 0.86, delay: 0.1, staticScale: 0.8 },
];

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MusicPlayer({ track, className }: MusicPlayerProps) {
  const resolvedTrack: MusicTrackConfig = {
    title: track?.title ?? portfolioMusicTrack.title,
    src: track?.src ?? portfolioMusicTrack.src,
    volume: track?.volume ?? portfolioMusicTrack.volume,
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef(false);
  const explicitPlayAttemptRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showUnavailableHint, setShowUnavailableHint] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!showUnavailableHint) return;
    const timer = window.setTimeout(() => {
      setShowUnavailableHint(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [showUnavailableHint]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;
    let removeUnlockListeners: (() => void) | null = null;

    const cleanupUnlock = () => {
      if (removeUnlockListeners) {
        removeUnlockListeners();
        removeUnlockListeners = null;
      }
    };

    const attachUnlockListeners = () => {
      if (removeUnlockListeners || cancelled || userInteractedRef.current) return;

      const handleFirstGesture = async (event: Event) => {
        if (
          event.target instanceof Node &&
          containerRef.current?.contains(event.target)
        ) {
          cleanupUnlock();
          return;
        }

        if (cancelled || userInteractedRef.current || !audio.paused) {
          cleanupUnlock();
          return;
        }

        audio.volume = Math.min(1, Math.max(0, resolvedTrack.volume));
        try {
          await audio.play();
          cleanupUnlock();
        } catch (err) {
          if (err instanceof DOMException && err.name === "NotAllowedError") {
            return;
          }
          cleanupUnlock();
        }
      };

      const opts: AddEventListenerOptions = { capture: true, passive: true };
      window.addEventListener("click", handleFirstGesture, opts);
      window.addEventListener("touchend", handleFirstGesture, opts);
      window.addEventListener("keydown", handleFirstGesture, opts);

      removeUnlockListeners = () => {
        window.removeEventListener("click", handleFirstGesture, opts);
        window.removeEventListener("touchend", handleFirstGesture, opts);
        window.removeEventListener("keydown", handleFirstGesture, opts);
      };
    };

    const attemptAutoplay = async () => {
      audio.volume = Math.min(1, Math.max(0, resolvedTrack.volume));
      try {
        await audio.play();
      } catch (err) {
        if (cancelled) return;

        if (err instanceof DOMException && err.name === "NotAllowedError") {
          attachUnlockListeners();
          return;
        }

        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        if (!audio.paused) {
          audio.pause();
        }
        setHasError(true);
      }
    };

    attemptAutoplay();

    return () => {
      cancelled = true;
      cleanupUnlock();
      audio.pause();
    };
  }, [resolvedTrack.src, resolvedTrack.volume]);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    userInteractedRef.current = true;

    if (isPlaying) {
      explicitPlayAttemptRef.current = false;
      audio.pause();
      return;
    }

    explicitPlayAttemptRef.current = true;

    if (hasError) {
      setHasError(false);
      setShowUnavailableHint(false);
      audio.load();
    }

    audio.volume = Math.min(1, Math.max(0, resolvedTrack.volume));

    try {
      await audio.play();
    } catch (err) {
      setIsPlaying(false);

      if (
        err instanceof DOMException &&
        (err.name === "AbortError" || err.name === "NotAllowedError")
      ) {
        return;
      }

      if (!audio.paused) {
        audio.pause();
      }
      setHasError(true);
      setShowUnavailableHint(true);
    }
  };

  const handleAudioError = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    setIsPlaying(false);
    setHasError(true);
    if (explicitPlayAttemptRef.current) {
      setShowUnavailableHint(true);
    }
  };

  const actionLabel = hasError
    ? `Background music unavailable (${resolvedTrack.title}) - click to retry`
    : isPlaying
    ? `Pause background music: ${resolvedTrack.title}`
    : `Play background music: ${resolvedTrack.title}`;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Portfolio background music player"
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none",
        className
      )}
    >
      <audio
        ref={audioRef}
        src={resolvedTrack.src}
        loop
        autoPlay
        preload="auto"
        onPlaying={() => {
          explicitPlayAttemptRef.current = false;
          setHasError(false);
          setShowUnavailableHint(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
      />

      {/* Subtle status feedback only if user attempts playback when audio asset is missing */}
      <AnimatePresence>
        {showUnavailableHint && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: PREMIUM_EASE }}
            className="absolute bottom-full right-0 mb-2 pointer-events-none px-2.5 py-1 rounded-lg bg-background-surface/95 backdrop-blur-md border border-border-subtle shadow-glass whitespace-nowrap font-mono text-[10px] text-text-secondary"
          >
            Audio unavailable ({resolvedTrack.src})
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleTogglePlay}
        aria-label={actionLabel}
        aria-pressed={isPlaying}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.018 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.982 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: PREMIUM_EASE }}
        className={cn(
          "group relative flex items-center rounded-full backdrop-blur-xl transition-all duration-300",
          "h-10 sm:h-[42px] px-1.5 sm:px-2 gap-2 sm:gap-2.5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary",
          isPlaying
            ? "bg-[rgba(13,13,13,0.88)] border border-[rgba(255,106,0,0.45)] shadow-[0_10px_32px_rgba(0,0,0,0.65),0_0_22px_rgba(255,106,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "bg-[rgba(10,10,10,0.82)] border border-border-subtle shadow-[0_8px_28px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[rgba(16,16,16,0.88)] hover:border-border-accent hover:shadow-[0_10px_30px_rgba(0,0,0,0.62),0_0_18px_rgba(255,106,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
        )}
      >
        {/* Left Music Icon Badge */}
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full border shrink-0 transition-all duration-300",
            isPlaying
              ? "bg-[rgba(255,106,0,0.20)] border-[rgba(255,106,0,0.45)] text-accent-highlight shadow-[0_0_12px_rgba(255,106,0,0.22)]"
              : "bg-accent-subtle border-[rgba(255,106,0,0.25)] text-accent-primary group-hover:bg-[rgba(255,106,0,0.16)] group-hover:border-border-accent"
          )}
          aria-hidden="true"
        >
          <Music className="w-3.5 h-3.5" />
        </span>

        {/* Status Eyebrow + Track Name */}
        <span className="flex flex-col items-start justify-center text-left leading-none min-w-0 pr-0.5">
          <span
            className={cn(
              "font-mono text-[8.5px] uppercase tracking-[0.14em] font-semibold transition-colors duration-200 mb-0.5",
              isPlaying ? "text-accent-highlight" : "text-text-muted"
            )}
          >
            {isPlaying ? "NOW PLAYING" : "SOUNDTRACK"}
          </span>
          <span
            className={cn(
              "font-mono text-[11px] font-medium tracking-wide truncate max-w-[94px] sm:max-w-[130px] transition-colors duration-200",
              isPlaying
                ? "text-text-primary"
                : "text-text-secondary group-hover:text-text-primary"
            )}
          >
            {resolvedTrack.title}
          </span>
        </span>

        {/* Equalizer Activity Indicator (animated when playing, resting when paused) */}
        <span
          className="flex items-end gap-[2.5px] h-3.5 px-1 shrink-0"
          aria-hidden="true"
        >
          {EQUALIZER_BARS.map((bar, index) =>
            isPlaying ? (
              shouldReduceMotion ? (
                <span
                  key={index}
                  style={{ height: `${Math.round(bar.staticScale * 100)}%` }}
                  className="w-[2.5px] rounded-full bg-accent-primary"
                />
              ) : (
                <motion.span
                  key={index}
                  className="w-[2.5px] h-full rounded-full bg-gradient-to-t from-accent-primary to-accent-highlight origin-bottom"
                  animate={{ scaleY: bar.keyframes }}
                  transition={{
                    duration: bar.duration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: bar.delay,
                  }}
                />
              )
            ) : (
              <span
                key={index}
                style={{ height: `${Math.round(bar.staticScale * 38)}%` }}
                className="w-[2.5px] rounded-full bg-white/20 group-hover:bg-[rgba(255,106,0,0.45)] transition-colors duration-200"
              />
            )
          )}
        </span>

        {/* Subtle Divider + Audio Glyph (desktop capsule) */}
        <span
          className="hidden sm:flex items-center gap-2 pl-0.5 shrink-0"
          aria-hidden="true"
        >
          <span className="w-px h-3.5 bg-white/10" />
          <Volume2
            className={cn(
              "w-3.5 h-3.5 transition-colors duration-200",
              isPlaying
                ? "text-[rgba(255,106,0,0.85)]"
                : "text-text-muted group-hover:text-text-secondary"
            )}
          />
        </span>

        {/* Play / Pause Action Pill */}
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full border shrink-0 transition-all duration-200",
            isPlaying
              ? "bg-accent-primary border-accent-highlight text-black shadow-[0_0_12px_rgba(255,106,0,0.35)] group-hover:bg-accent-highlight group-hover:scale-105"
              : "bg-white/[0.06] border-border-strong text-text-primary group-hover:bg-[rgba(255,106,0,0.15)] group-hover:border-[rgba(255,106,0,0.45)] group-hover:text-accent-highlight group-hover:scale-105"
          )}
          aria-hidden="true"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3 h-3 fill-current ml-[1px]" />
          )}
        </span>
      </motion.button>
    </div>
  );
}
