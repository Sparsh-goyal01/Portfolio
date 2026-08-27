"use client";

import React, { useState } from "react";
import { Container } from "@/ui/Container";
import { SectionHeader } from "@/ui/SectionHeader";
import { GlassCard } from "@/ui/GlassCard";
import { FileText, Download, CheckCircle2, Shield, ExternalLink, Loader2 } from "lucide-react";

export function ResumeSection() {
  const [downloading, setDownloading] = useState(false);
  const resumeDownloadUrl = "/api/resume";
  const resumeViewUrl = "/Resume_Sparsh_Goyal.pdf";

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Normal anchor tag download with fallback blob trigger
    try {
      setDownloading(true);
      const response = await fetch(resumeDownloadUrl);
      if (!response.ok) throw new Error("Failed to fetch resume");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume_Sparsh_Goyal.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: direct window open
      window.open(resumeViewUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      id="resume"
      aria-label="Resume Download"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container>
        <SectionHeader
          eyebrow="Resume"
          heading="Download my resume for a full view."
          description="Quick snapshot of my experience, skills, and education in one PDF document."
        />

        <GlassCard
          variant="elevated"
          className="p-8 sm:p-12 border border-border-strong max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8 text-accent-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">
                  Sparsh Goyal — SDE Resume
                </h3>
                <p className="text-text-secondary text-sm font-mono">
                  Format: PDF • Backend &amp; Full-Stack Focus • Updated 2025/2026
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Credentials
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-accent-highlight" />
                    Clean 1-Page Summary
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              {/* Primary Download Button */}
              <button
                type="button"
                onClick={handleDownload as unknown as React.MouseEventHandler<HTMLButtonElement>}
                disabled={downloading}
                data-cursor="pdf"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-accent-primary text-black font-bold text-sm hover:bg-accent-highlight shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:opacity-75 cursor-pointer"
                aria-label="Download Sparsh Goyal's Resume PDF"
              >
                {downloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{downloading ? "Downloading..." : "Download Resume"}</span>
              </button>

              {/* Secondary View in Tab Button */}
              <a
                href={resumeViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 border border-border-subtle hover:border-accent-primary/40 hover:bg-accent-primary/10 text-text-secondary hover:text-text-primary text-sm font-mono transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                aria-label="View Sparsh Goyal's Resume PDF in new tab"
              >
                <ExternalLink className="w-4 h-4 text-accent-primary" />
                <span>View PDF</span>
              </a>
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
