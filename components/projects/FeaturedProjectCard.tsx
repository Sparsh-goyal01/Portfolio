import React from "react";
import Image from "next/image";
import { Project } from "@/lib/types/portfolio";
import { GlassCard } from "@/ui/GlassCard";
import { Badge } from "@/ui/Badge";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

interface FeaturedProjectCardProps {
  project: Project;
  reverseLayout?: boolean;
}

export function FeaturedProjectCard({
  project,
  reverseLayout = false,
}: FeaturedProjectCardProps) {
  return (
    <GlassCard
      variant="interactive"
      className="p-6 sm:p-8 lg:p-10 border border-border-strong group"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          reverseLayout ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Project Content Column */}
        <div
          className={`lg:col-span-7 flex flex-col justify-between ${
            reverseLayout ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div>
            {/* Header / Number & Priority Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-accent-primary font-bold">
                PROJ_{project.orderNumber}
              </span>
              <span className="text-text-muted text-xs">•</span>
              <Badge variant="accent" size="sm">
                FEATURED
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 group-hover:text-accent-highlight transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="surface" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-border-subtle/60">
            {project.repositoryUrl ? (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-md px-1"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="w-4 h-4 text-accent-primary" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </a>
            ) : (
              <span className="text-xs font-mono text-text-muted">
                Repository link not public
              </span>
            )}
          </div>
        </div>

        {/* Project Visual / Image Frame */}
        <div
          className={`lg:col-span-5 relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-background-surface border border-border-subtle ${
            reverseLayout ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity" />

          {/* Project Image */}
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Top-right subtle badge */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-background-primary/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono text-text-secondary">
            {project.subtitle}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
