import React from "react";
import { Container } from "@/ui/Container";
import { SectionHeader } from "@/ui/SectionHeader";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { projectsData } from "@/data/projects";
import { Sparkles, Code2, Layers } from "lucide-react";

export function ProjectsSection() {
  // Only display featured projects (Stock Master and Likhlo) as specified in Prompt 03
  const activeProjects = projectsData.filter((p) => p.priority === "featured");

  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container>
        <SectionHeader
          eyebrow="Projects"
          heading="Selected work with modern stacks."
          description="A focused showcase of flagship full-stack, backend architecture, and problem-solving software projects."
        />

        {/* Featured Case Studies */}
        <div className="space-y-12 mb-16">
          {activeProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              reverseLayout={index % 2 === 1}
            />
          ))}
        </div>

        {/* Subtle 'More in the Works' Indicator */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-border-subtle/70 max-w-2xl mx-auto text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-accent-highlight uppercase font-bold">
              MORE IN THE WORKS
            </span>
          </div>
          <p className="text-xs font-mono text-text-muted">
            Currently architecting and building new scalable backend systems &amp; web applications.
          </p>
        </div>
      </Container>
    </section>
  );
}
