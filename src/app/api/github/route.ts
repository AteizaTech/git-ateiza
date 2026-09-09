import { NextResponse } from "next/server";

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: { name: string; color: string } | null;
  topics: string[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

// Fallback matching actual AteizaTech repositories
const FALLBACK_REPOS: PinnedRepo[] = [
  {
    name: "AteizaTech",
    description: "Cybersecurity and Automation, threat detection pipelines, and autonomous SecOps workflows.",
    url: "https://github.com/AteizaTech/AteizaTech",
    stars: 0,
    language: { name: "Python", color: "#3572A5" },
    topics: ["cybersecurity", "automation", "python", "secops"]
  },
  {
    name: "git-ateiza",
    description: "Git and Git-Hub and Piscine architecture, interactive learning environment.",
    url: "https://github.com/AteizaTech/git-ateiza",
    stars: 0,
    language: { name: "TypeScript", color: "#3178c6" },
    topics: ["git", "github", "piscine", "typescript"]
  },
  {
    name: "ateiza",
    description: "Portfolio & distributed systems web architecture engine with sub-millisecond execution constraints.",
    url: "https://github.com/AteizaTech/ateiza",
    stars: 0,
    language: { name: "TypeScript", color: "#3178c6" },
    topics: ["portfolio", "nextjs", "react", "systems"]
  },
  {
    name: "poetry",
    description: "Python packaging and dependency management made easy with automated workflows.",
    url: "https://github.com/AteizaTech/poetry",
    stars: 0,
    language: { name: "Python", color: "#3572A5" },
    topics: ["python", "packaging", "dependencies", "build-tool"]
  }
];

export async function GET() {
  const token = process.env.GITHUB_PAT;
  const username = "AteizaTech";

  const headers: Record<string, string> = {
    "User-Agent": "AteizaTech-Portfolio",
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Directly fetch live repositories from GitHub REST API for AteizaTech
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=12`, {
      headers,
      next: { revalidate: 300 } // Cache results for 5 minutes (ISR)
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, falling back to static ledger`);
      return NextResponse.json(FALLBACK_REPOS);
    }

    interface RawGitHubRepo {
      name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      language: string | null;
      topics?: string[];
      fork?: boolean;
    }

    const repos: RawGitHubRepo[] = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      return NextResponse.json(FALLBACK_REPOS);
    }

    const mappedRepos: PinnedRepo[] = repos.map((repo) => {
      const lang = repo.language || (repo.name === "poetry" ? "Python" : null);
      const color = lang ? LANGUAGE_COLORS[lang] || "#888888" : "#888888";

      // Provide meaningful fallback descriptions if empty on GitHub
      let description = repo.description;
      if (!description || description.trim() === "") {
        if (repo.name === "ateiza") {
          description = "Portfolio & distributed systems web architecture engine.";
        } else if (repo.name === "git-ateiza") {
          description = "Git and Git-Hub and Piscine architecture.";
        } else if (repo.name === "AteizaTech") {
          description = "Cybersecurity and Automation system core.";
        } else {
          description = "Official repository by AteizaTech.";
        }
      }

      // Default topics if none provided on repository
      let topics = repo.topics && repo.topics.length > 0 ? repo.topics : [];
      if (topics.length === 0) {
        if (repo.name.toLowerCase().includes("git")) {
          topics = ["git", "github", "piscine"];
        } else if (repo.name.toLowerCase().includes("ateizatech")) {
          topics = ["cybersecurity", "automation", "python"];
        } else if (repo.name.toLowerCase().includes("ateiza")) {
          topics = ["nextjs", "typescript", "systems"];
        } else if (repo.name.toLowerCase().includes("poetry")) {
          topics = ["python", "packaging", "automation"];
        }
      }

      return {
        name: repo.name,
        description,
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        language: lang ? { name: lang, color } : null,
        topics,
      };
    });

    return NextResponse.json(mappedRepos);
  } catch (error) {
    console.error("Failed to fetch live repos for AteizaTech:", error);
    return NextResponse.json(FALLBACK_REPOS);
  }
}
