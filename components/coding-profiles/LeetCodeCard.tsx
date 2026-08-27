"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/ui/GlassCard";
import { Badge } from "@/ui/Badge";
import { codingProfilesData } from "@/data/codingProfiles";
import { Code2, ExternalLink, Flame, CheckCircle2 } from "lucide-react";

interface LeetCodeLiveStats {
  success: boolean;
  username: string;
  profileUrl: string;
  totalSolved: number | null;
  easySolved: number | null;
  mediumSolved: number | null;
  hardSolved: number | null;
  ranking: number | null;
  acceptanceRate: number | null;
  updatedAt?: string;
  message?: string;
}

export function LeetCodeCard() {
  const { leetcode } = codingProfilesData;
  const [data, setData] = useState<LeetCodeLiveStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLeetCodeData() {
      try {
        const res = await fetch("/api/leetcode");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLeetCodeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const weeks = Array.from({ length: 26 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  const getCellOpacity = (weekIndex: number, dayIndex: number) => {
    const seed = (weekIndex * 7 + dayIndex) % 13;
    if (seed === 0) return "bg-amber-500 opacity-90";
    if (seed % 2 === 0) return "bg-amber-500 opacity-60";
    if (seed % 4 === 0) return "bg-amber-500 opacity-30";
    if (seed % 3 === 0) return "bg-white/10";
    return "bg-white/5";
  };

  return (
    <GlassCard variant="interactive" className="p-6 sm:p-8 flex flex-col justify-between border border-border-strong group">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
              <Code2 className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-text-primary">
                  LeetCode Profile
                </h3>
                <Badge variant="accent" size="sm">
                  {data?.success ? "Live" : "Profile"}
                </Badge>
              </div>
              <p className="font-mono text-xs text-text-muted mt-0.5">
                {leetcode.username}
              </p>
            </div>
          </div>

          <a
            href={data?.profileUrl || leetcode.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="code"
            className="p-2 rounded-lg bg-white/5 border border-border-subtle hover:text-amber-400 hover:border-amber-500/40 transition-colors"
            aria-label="Open LeetCode Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {/* Total Solved */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-text-muted block mb-1">
              Solved
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.totalSolved !== null && data?.totalSolved !== undefined
                  ? data.totalSolved
                  : "250+"}
              </span>
            )}
          </div>

          {/* Easy Solved */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-emerald-400 block mb-1">
              Easy
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.easySolved !== null && data?.easySolved !== undefined
                  ? data.easySolved
                  : "--"}
              </span>
            )}
          </div>

          {/* Medium Solved */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-amber-400 block mb-1">
              Medium
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.mediumSolved !== null && data?.mediumSolved !== undefined
                  ? data.mediumSolved
                  : "--"}
              </span>
            )}
          </div>

          {/* Hard Solved */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-rose-400 block mb-1">
              Hard
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.hardSolved !== null && data?.hardSolved !== undefined
                  ? data.hardSolved
                  : "--"}
              </span>
            )}
          </div>
        </div>

        {/* Heatmap Visual */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted">
              {leetcode.graphTitle}
            </span>
            <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" />
              DSA Solver
            </span>
          </div>

          <div className="p-3 rounded-xl bg-background-surface border border-border-subtle overflow-x-auto">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[340px]">
              {weeks.map((w) =>
                days.map((d) => (
                  <div
                    key={`${w}-${d}`}
                    className={`w-2.5 h-2.5 rounded-sm ${getCellOpacity(w, d)}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Problem Solving Structure Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-border-subtle text-left">
            <span className="text-[10px] font-mono text-text-muted block">
              Acceptance Rate
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              {data?.acceptanceRate ? `${data.acceptanceRate}%` : "Consistent"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-border-subtle text-left">
            <span className="text-[10px] font-mono text-text-muted block">
              Global Standing
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              {data?.ranking ? `#${data.ranking.toLocaleString()}` : "Active Solver"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between">
        <a
          href={data?.profileUrl || leetcode.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="code"
          className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 font-semibold transition-colors"
        >
          <span>{leetcode.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{data?.updatedAt ? "Live Synced" : "Official Profile"}</span>
        </div>
      </div>
    </GlassCard>
  );
}
