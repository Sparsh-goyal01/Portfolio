export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  iconName: string;
}

export interface ProfileIdentity {
  name: string;
  firstName: string;
  lastName: string;
  primaryRole: string;
  positioning: string;
  pageTitle: string;
  metaDescription: string;
  primaryFocus: string;
  currentActivity: string;
  profileLabel: string;
  headline: string;
  lead: string;
  highlightTags: string[];
  canonicalEmail: string;
  socialLinks: SocialLink[];
  heroCard: {
    portraitAsset: string;
    portraitAlt: string;
    cardName: string;
    cardSubtitle: string;
    focus: string;
    current: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  categoryNumber: string;
  iconName: string;
}

export interface Achievement {
  year: string;
  result: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export type ProjectPriority = "featured" | "supporting";

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  repositoryUrl: string | null;
  liveUrl?: string | null;
  image: string;
  imageAlt: string;
  priority: ProjectPriority;
  orderNumber: string;
}

export interface CodingProfileStats {
  platform: "GitHub" | "LeetCode";
  username: string;
  profileUrl: string;
  badgeFallback: string;
  metrics: {
    label: string;
    value: string | number;
    unit?: string;
  }[];
  graphTitle: string;
  ctaText: string;
  fallbacks: Record<string, string | number>;
  topLanguages?: { name: string; percentage: number }[];
}

export type TechLayer = "CORE" | "MID" | "BACKGROUND";

export interface TechConstellationItem {
  id: string;
  name: string;
  category: string;
  hudCategory: string;
  microcopy: string;
  layer: TechLayer;
  position: {
    x: number; // percentage offset -50 to 50
    y: number; // percentage offset -50 to 50
  };
  mobilePosition?: {
    x: number;
    y: number;
  };
  size: "sm" | "md" | "lg";
  depth: number;
  highlightColor?: string;
  svgIconKey: string;
  floatParams: {
    duration: number;
    delay: number;
    amplitudeX: number;
    amplitudeY: number;
    rotation: number;
    parallaxStrength: number;
  };
}
