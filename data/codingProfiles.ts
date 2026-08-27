import { CodingProfileStats } from "@/lib/types/portfolio";

export const codingProfilesData: {
  github: CodingProfileStats;
  leetcode: CodingProfileStats;
} = {
  github: {
    platform: "GitHub",
    username: "@sparsh-goyal01",
    profileUrl: "https://github.com/sparsh-goyal01",
    badgeFallback: "250+ Days",
    graphTitle: "GitHub Contribution Heatmap (Past Year)",
    ctaText: "View GitHub Profile",
    metrics: [
      { label: "Repositories", value: 17 },
      { label: "Contributions", value: 35 },
      { label: "Commits", value: 105 },
    ],
    fallbacks: {
      publicRepos: 17,
      contributions: 35,
      commits: 105,
    },
    topLanguages: [
      { name: "JavaScript", percentage: 35 },
      { name: "TypeScript", percentage: 30 },
      { name: "Python", percentage: 20 },
      { name: "C++", percentage: 10 },
      { name: "Others", percentage: 5 },
    ],
  },
  leetcode: {
    platform: "LeetCode",
    username: "@dev_sparsh01",
    profileUrl: "https://leetcode.com/u/dev_sparsh01/",
    badgeFallback: "250+ Days",
    graphTitle: "Submission Heatmap (Past 26 Weeks)",
    ctaText: "View LeetCode Profile",
    metrics: [
      { label: "Total Solved", value: 250, unit: "+" },
      { label: "Acceptance Rate", value: "--" },
      { label: "Contest Rating", value: "--" },
      { label: "Global Ranking", value: "--" },
    ],
    fallbacks: {
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      totalSolved: 0,
      acceptanceRate: 0,
      contestRating: 0,
      ranking: 0,
    },
  },
};
