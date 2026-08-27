import React from "react";
import { Container } from "@/ui/Container";
import { SectionHeader } from "@/ui/SectionHeader";
import { GlassCard } from "@/ui/GlassCard";
import { Badge } from "@/ui/Badge";
import { TechnologyStream } from "./TechnologyStream";
import { skillsData } from "@/data/skills";
import {
  Code2,
  Layers,
  BarChart3,
  Database,
  GitBranch,
  Cpu,
} from "lucide-react";

export function SkillsSection() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "code-2":
        return <Code2 className="w-5 h-5 text-accent-primary" />;
      case "layers":
        return <Layers className="w-5 h-5 text-accent-highlight" />;
      case "bar-chart-3":
        return <BarChart3 className="w-5 h-5 text-accent-primary" />;
      case "database":
        return <Database className="w-5 h-5 text-accent-highlight" />;
      case "git-branch":
        return <GitBranch className="w-5 h-5 text-accent-primary" />;
      case "cpu":
        return <Cpu className="w-5 h-5 text-accent-highlight" />;
      default:
        return <Code2 className="w-5 h-5 text-accent-primary" />;
    }
  };

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container size="wide">
        <SectionHeader
          eyebrow="Skills"
          heading="Tools and technologies I use to ship."
          description="A continuous ecosystem of modern web technologies, backend frameworks, data analytics tools, and core computer science competencies."
        />

        {/* 1. Animated Technology Logo Stream Showcase */}
        <TechnologyStream />

        {/* 2. Structured Stack Breakdown Subheading */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent-primary" />
          <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase font-semibold">
            The Stack / Technology Breakdown
          </h3>
          <div className="h-[1px] flex-1 bg-border-subtle" />
        </div>

        {/* 3. Six Structured Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((group, index) => (
            <GlassCard
              key={group.title}
              variant="interactive"
              className="p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-border-subtle flex items-center justify-center group-hover:border-accent-primary/40 group-hover:bg-accent-primary/10 transition-colors">
                      {getCategoryIcon(group.iconName)}
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-text-primary group-hover:text-accent-highlight transition-colors">
                      {group.title}
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-text-muted">
                    0{index + 1}
                  </span>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="surface"
                      size="md"
                      className="group-hover:border-border-strong group-hover:text-text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Card Footer Indicator */}
              <div className="mt-6 pt-3 border-t border-border-subtle/40 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>{group.skills.length} competencies</span>
                <span className="text-accent-primary font-semibold">Ready</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
