import React from "react";
import { Container } from "@/ui/Container";
import { SectionHeader } from "@/ui/SectionHeader";
import { GitHubCard } from "./GitHubCard";
import { LeetCodeCard } from "./LeetCodeCard";
import { Terminal, Check, Activity } from "lucide-react";

export function CodingProfilesSection() {
  return (
    <section
      id="coding-profiles"
      aria-label="Live Coding Profiles & DSA"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container>
        <SectionHeader
          eyebrow="Coding Profiles"
          heading="Building, Solving and Continuously Learning."
          description="Real-world development activity, problem solving progress, and open-source contributions tracked across developer platforms."
        />

        {/* Terminal Boot/Status Foundation Banner */}
        <div className="mb-10 p-4 rounded-xl bg-background-surface border border-border-subtle flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-text-secondary">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-accent-primary" />
            <span className="text-text-primary font-semibold">
              DEV_ENVIRONMENT:
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> All systems operational
            </span>
          </div>

          <div className="flex items-center gap-4 text-text-muted">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-accent-primary" />
              DSA Solver Active
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Cache Enabled</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GitHubCard />
          <LeetCodeCard />
        </div>
      </Container>
    </section>
  );
}
