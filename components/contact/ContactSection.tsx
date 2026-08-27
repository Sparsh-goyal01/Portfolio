import React from "react";
import { Container } from "@/ui/Container";
import { SectionHeader } from "@/ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import { profileData } from "@/data/profile";
import { GlassCard } from "@/ui/GlassCard";
import { Mail, Linkedin, Github, MessageSquare, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  const { canonicalEmail, socialLinks } = profileData;

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-24 sm:py-32 relative border-t border-border-subtle/50"
    >
      <Container>
        <SectionHeader
          eyebrow="Contact"
          heading="Let's build something premium together."
          description="Have an open engineering role, backend project, or data-driven application in mind? Reach out directly or send a message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links and Availability */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <GlassCard variant="interactive" className="p-6 border border-border-subtle group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <span className="text-xs font-mono text-text-muted uppercase">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${canonicalEmail}`}
                    className="block text-base font-semibold text-text-primary group-hover:text-accent-highlight transition-colors mt-0.5"
                  >
                    {canonicalEmail}
                  </a>
                </div>
              </div>
            </GlassCard>

            {/* Social Channels Card */}
            <GlassCard variant="interactive" className="p-6 border border-border-subtle">
              <span className="text-xs font-mono text-text-muted uppercase block mb-4">
                Professional Channels
              </span>
              <div className="space-y-3">
                <a
                  href="https://linkedin.com/in/sparshgoyal06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border-subtle hover:border-accent-primary/40 hover:text-accent-primary transition-all text-sm font-mono text-text-primary"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-accent-highlight" />
                    <span>linkedin.com/in/sparshgoyal06</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted" />
                </a>

                <a
                  href="https://github.com/sparsh-goyal01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border-subtle hover:border-accent-primary/40 hover:text-accent-primary transition-all text-sm font-mono text-text-primary"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-accent-primary" />
                    <span>github.com/sparsh-goyal01</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted" />
                </a>
              </div>
            </GlassCard>

            {/* Availability Note */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-border-subtle text-xs font-mono text-text-muted space-y-2">
              <div className="flex items-center gap-2 text-text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Quick Response Time</span>
              </div>
              <p className="leading-relaxed">
                Open for full-time backend and full-stack software development roles, data analytics projects, and technical collaborations.
              </p>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
