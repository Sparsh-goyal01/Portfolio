"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/ui/GlassCard";
import { Badge } from "@/ui/Badge";
import { codingProfilesData } from "@/data/codingProfiles";
import { Github, ExternalLink } from "lucide-react";

interface GitHubLiveStats {
  success: boolean;
  username: string;
  name?: string;
  profileUrl: string;
  publicRepos: number;
  contributions: number;
  commits: number;
  updatedAt?: string;
  message?: string;
}

export function GitHubCard() {
  const { github } = codingProfilesData;
  const [data, setData] = useState<GitHubLiveStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const weeks = Array.from({ length: 26 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  const getCellOpacity = (weekIndex: number, dayIndex: number) => {
    const seed = (weekIndex * 7 + dayIndex) % 17;
    if (seed === 0) return "bg-accent-primary opacity-90";
    if (seed % 2 === 0) return "bg-accent-primary opacity-60";
    if (seed % 3 === 0) return "bg-accent-primary opacity-30";
    if (seed % 5 === 0) return "bg-white/10";
    return "bg-white/5";
  };

  return (
    <GlassCard variant="interactive" className="p-6 sm:p-8 flex flex-col justify-between border border-border-strong group">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center group-hover:border-accent-primary/50 group-hover:bg-accent-primary/10 transition-colors">
              <Github className="w-6 h-6 text-text-primary group-hover:text-accent-primary transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-text-primary">
                  GitHub Profile
                </h3>
                <Badge variant="accent" size="sm">
                  {data?.success ? "Live" : "Profile"}
                </Badge>
              </div>
              <p className="font-mono text-xs text-text-muted mt-0.5">
                {github.username}
              </p>
            </div>
          </div>

          <a
            href={data?.profileUrl || github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="code"
            className="p-2 rounded-lg bg-white/5 border border-border-subtle hover:text-accent-primary hover:border-accent-primary/40 transition-colors"
            aria-label="Open GitHub Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Live Metrics Grid: Repositories | Contributions | Commits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Repositories */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-text-muted block mb-1">
              Repositories
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.publicRepos ?? 17}
              </span>
            )}
          </div>

          {/* Contributions */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-text-muted block mb-1">
              Contributions
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.contributions ?? 35}
              </span>
            )}
          </div>

          {/* Commits */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-border-subtle/70">
            <span className="text-[11px] font-mono text-text-muted block mb-1">
              Commits
            </span>
            {loading ? (
              <div className="w-10 h-6 bg-white/10 animate-pulse rounded" />
            ) : (
              <span className="text-xl font-bold font-mono text-text-primary">
                {data?.commits ?? 105}
              </span>
            )}
          </div>
        </div>

        {/* Heatmap Activity Visual */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-text-muted">
              {github.graphTitle}
            </span>
            <span className="text-[10px] font-mono text-accent-primary">
              Public Activity
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

        {/* Top Languages Distribution */}
        {github.topLanguages && (
          <div>
            <span className="text-xs font-mono text-text-muted block mb-2">
              Primary Language Distribution
            </span>
            <div className="h-2 rounded-full overflow-hidden flex bg-white/5 border border-border-subtle mb-3">
              <div style={{ width: "35%" }} className="bg-amber-400" title="JavaScript: 35%" />
              <div style={{ width: "30%" }} className="bg-blue-500" title="TypeScript: 30%" />
              <div style={{ width: "20%" }} className="bg-emerald-400" title="Python: 20%" />
              <div style={{ width: "10%" }} className="bg-cyan-500" title="C++: 10%" />
              <div style={{ width: "5%" }} className="bg-purple-400" title="Others: 5%" />
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> JS 35%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> TS 30%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Python 20%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500" /> C++ 10%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between">
        <a
          href={data?.profileUrl || github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="code"
          className="inline-flex items-center gap-2 text-xs font-mono text-accent-primary hover:text-accent-highlight font-semibold transition-colors"
        >
          <span>{github.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{data?.updatedAt ? "Live Synced" : "Official API"}</span>
        </div>
      </div>
    </GlassCard>
  );
}
