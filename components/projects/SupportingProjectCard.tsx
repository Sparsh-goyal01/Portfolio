import React from "react";
import Image from "next/image";
import { Project } from "@/lib/types/portfolio";
import { GlassCard } from "@/ui/GlassCard";
import { Badge } from "@/ui/Badge";
import { Github, ArrowUpRight, FolderGit2 } from "lucide-react";

interface SupportingProjectCardProps {
  project: Project;
}

export function SupportingProjectCard({ project }: SupportingProjectCardProps) {
  return (
    <GlassCard
      variant="interactive"
      className="p-6 flex flex-col justify-between group h-full border border-border-subtle"
    >
      <div>
        {/* Visual Frame */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-background-surface border border-border-subtle mb-5">
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-20 transition-opacity" />
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded bg-background-primary/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono text-text-muted">
            {project.orderNumber}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-accent-primary">
            {project.subtitle}
          </span>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-2.5 group-hover:text-accent-highlight transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="surface" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between">
        {project.repositoryUrl ? (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary rounded"
            aria-label={`View ${project.title} repository`}
          >
            <Github className="w-3.5 h-3.5 text-accent-primary" />
            <span>GitHub Repository</span>
            <ArrowUpRight className="w-3 h-3 text-text-muted" />
          </a>
        ) : (
          <span className="text-[11px] font-mono text-text-muted">
            Architecture / Web Demo
          </span>
        )}
      </div>
    </GlassCard>
  );
}
