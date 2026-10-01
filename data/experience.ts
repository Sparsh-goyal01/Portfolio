import { Achievement, AboutCard } from "@/lib/types/portfolio";

export const achievementsData: Achievement[] = [
  {
    year: "2025",
    result: "Winner",
    title: "TechnoCrats Hackathon Winner",
    description:
      "Built a secured platform for purge-level data erasing during a 36-hour innovation sprint.",
  },
];

export const aboutCardsData: AboutCard[] = [
  {
    id: "intro",
    categoryNumber: "01",
    title: "Introduction",
    description:
      "I build scalable web apps with clean backend systems and data-driven solutions.",
    iconName: "terminal",
  },
  {
    id: "career",
    categoryNumber: "02",
    title: "Career Summary",
    description:
      " Backend-focused SDE with strong DSA, API, and database skills.",
    iconName: "briefcase",
  },
  {
    id: "skills-summary",
    categoryNumber: "03",
    title: "Skills Summary",
    description:
      "C++, Node.js, Express.js, SQL, React.js, REST APIs, System Design, and Git.",
    iconName: "cpu",
  },
  {
    id: "interests",
    categoryNumber: "04",
    title: "Interests",
    description:
      "Backend engineering, scalable systems, problem solving, and modern web development.",
    iconName: "compass",
  },
];
