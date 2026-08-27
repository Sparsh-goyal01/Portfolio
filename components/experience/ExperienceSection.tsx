import React from "react";
import { Container } from "@/ui/Container";
import { SectionHeader } from "@/ui/SectionHeader";
import { GlassCard } from "@/ui/GlassCard";
import { Badge } from "@/ui/Badge";
import { achievementsData } from "@/data/experience";
import { Trophy, Award, Calendar, ShieldCheck } from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Achievements & Milestones"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container>
        <SectionHeader
          eyebrow="Achievements"
          heading="Milestones that shaped my journey."
          description="Competitive hackathons, recognition, and milestones in building high-impact engineering solutions."
        />

        <div className="relative pl-6 sm:pl-8 border-l border-border-subtle space-y-8">
          {achievementsData.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background-primary border-2 border-accent-primary flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
              </div>

              <GlassCard
                variant="interactive"
                className="p-6 sm:p-8 max-w-3xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="glow" size="sm">
                          {item.result}
                        </Badge>
                        <span className="font-mono text-xs text-text-muted flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary text-sm sm:text-base leading-relaxed pl-0 sm:pl-13">
                  {item.description}
                </p>

                <div className="mt-5 pt-4 border-t border-border-subtle/60 flex items-center gap-2 text-xs font-mono text-text-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>36-Hour Innovation Sprint • Verified Winner</span>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
