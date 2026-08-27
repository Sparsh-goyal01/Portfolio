import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour caching

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "sparsh-goyal01";
  const token = process.env.GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Sparsh-Goyal-Portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // 1. Fetch user public profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    let publicRepos = 17;
    let profileUrl = `https://github.com/${username}`;
    let name = "Sparsh Goyal";

    if (userRes.ok) {
      const userData = await userRes.json();
      publicRepos = typeof userData.public_repos === "number" ? userData.public_repos : 17;
      profileUrl = userData.html_url || profileUrl;
      name = userData.name || name;
    }

    // 2. Fetch real contributions
    let contributions = 35;
    try {
      const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        next: { revalidate: 3600 },
      });
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        if (contribData.total?.lastYear) {
          contributions = contribData.total.lastYear;
        } else if (contribData.contributions?.length) {
          contributions = contribData.contributions.reduce(
            (acc: number, c: { count: number }) => acc + c.count,
            0
          );
        }
      }
    } catch {
      // Keep default fallback
    }

    // 3. Fetch real commit count
    let commits = 105;
    try {
      const commitsRes = await fetch(
        `https://api.github.com/search/commits?q=author:${username}`,
        {
          headers: {
            ...headers,
            Accept: "application/vnd.github.cloak-preview+json",
          },
          next: { revalidate: 3600 },
        }
      );
      if (commitsRes.ok) {
        const commitsData = await commitsRes.json();
        if (typeof commitsData.total_count === "number" && commitsData.total_count > 0) {
          commits = commitsData.total_count;
        }
      }
    } catch {
      // Keep default fallback
    }

    return NextResponse.json({
      success: true,
      username: `@${username}`,
      name,
      profileUrl,
      publicRepos,
      contributions,
      commits,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      username: `@${username}`,
      profileUrl: `https://github.com/${username}`,
      publicRepos: 17,
      contributions: 35,
      commits: 105,
      message: "GitHub live stats temporarily unavailable",
    });
  }
}
