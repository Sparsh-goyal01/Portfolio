import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour caching

export async function GET() {
  const username = process.env.LEETCODE_USERNAME || "dev_sparsh01";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username },
      }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const user = data?.data?.matchedUser;

      if (user) {
        const stats = user.submitStatsGlobal?.acSubmissionNum || [];
        const totalObj = stats.find((s: { difficulty: string; count: number }) => s.difficulty === "All");
        const easyObj = stats.find((s: { difficulty: string; count: number }) => s.difficulty === "Easy");
        const medObj = stats.find((s: { difficulty: string; count: number }) => s.difficulty === "Medium");
        const hardObj = stats.find((s: { difficulty: string; count: number }) => s.difficulty === "Hard");

        return NextResponse.json({
          success: true,
          username: `@${username}`,
          profileUrl: `https://leetcode.com/u/${username}/`,
          totalSolved: totalObj?.count ?? 176,
          easySolved: easyObj?.count ?? 103,
          mediumSolved: medObj?.count ?? 62,
          hardSolved: hardObj?.count ?? 11,
          ranking: user.profile?.ranking ?? null,
          acceptanceRate: null,
          updatedAt: new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    // Fall through to fallback
  }

  // Graceful fallback if LeetCode GraphQL is temporarily unreachable
  return NextResponse.json({
    success: false,
    username: `@${username}`,
    profileUrl: `https://leetcode.com/u/${username}/`,
    totalSolved: 176,
    easySolved: 103,
    mediumSolved: 62,
    hardSolved: 11,
    ranking: null,
    acceptanceRate: null,
    message: "LeetCode live data temporarily unavailable",
  });
}
