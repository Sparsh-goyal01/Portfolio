import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { CodingProfilesSection } from "@/components/coding-profiles/CodingProfilesSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { BackgroundAtmosphere } from "@/components/ui/BackgroundAtmosphere";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GlobalPointerGlow } from "@/components/ui/GlobalPointerGlow";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background-primary text-text-primary overflow-hidden">
      {/* Desktop-only Dynamic Cursor */}
      <CustomCursor />

      {/* Global Pointer-Following Ambient Glow (All Sections) */}
      <GlobalPointerGlow />

      {/* Global Background Atmosphere (Grid + Subtle Depth Glows) */}
      <BackgroundAtmosphere />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Area with Semantic Sections */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CodingProfilesSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
