import { NextResponse } from "next/server";

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: { name: string; color: string } | null;
  topics: string[];
}

const FALLBACK_PINNED_REPOS: PinnedRepo[] = [
  {
    name: "HNTR OSPR DROP",
    description: "An advanced sandbox compiler environment optimized for agentic operations and low-memory execution runtimes.",
    url: "https://github.com/IamAdedo/hntr-ospr-drop",
    stars: 142,
    language: { name: "TypeScript", color: "#3178c6" },
    topics: ["compiler", "sandbox", "security", "webassembly"]
  },
  {
    name: "HNTR PWR River",
    description: "A distributed message streaming queue with multi-region transaction replication and sub-millisecond persistence layers.",
    url: "https://github.com/IamAdedo/hntr-pwr-river",
    stars: 98,
    language: { name: "Go", color: "#00ADD8" },
    topics: ["distributed-systems", "message-queue", "tokio", "replication"]
  },
  {
    name: "antigravity-core",
    description: "The core engine executing AI programming tasks with secure sandboxing and real-time terminal sync.",
    url: "https://github.com/IamAdedo/antigravity-core",
    stars: 231,
    language: { name: "Rust", color: "#dea584" },
    topics: ["rust", "agentic-coding", "sandbox", "async"]
  },
  {
    name: "agrilink-d2c",
    description: "Direct-to-consumer digital marketplace connecting regional farmers and local vendors with consumers.",
    url: "https://github.com/IamAdedo/agrilink-d2c",
    stars: 45,
    language: { name: "TypeScript", color: "#3178c6" },
    topics: ["nextjs", "react", "mapbox", "postgresql"]
  },
  {
    name: "aeneas-restorer",
    description: "Deep learning sequence-to-sequence model restoring missing characters and dating ancient Latin inscriptions.",
    url: "https://github.com/IamAdedo/aeneas-restorer",
    stars: 64,
    language: { name: "Python", color: "#3572A5" },
    topics: ["pytorch", "nlp", "transformers", "latin"]
  },
  {
    name: "helix-dns",
    description: "High-performance local DNS firewall and ad routing proxy written in Rust using the Tokio async runtime.",
    url: "https://github.com/IamAdedo/helix-dns",
    stars: 52,
    language: { name: "Rust", color: "#dea584" },
    topics: ["rust", "tokio", "dns", "firewall"]
  }
];

export async function GET() {
  const token = process.env.GITHUB_PAT;

  if (!token) {
    // Return fallback mock data if no secret token is configured
    return NextResponse.json(FALLBACK_PINNED_REPOS);
  }

  const query = `
    query {
      user(login: "IamAdedo") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage {
                name
                color
              }
              repositoryTopics(first: 5) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Cache results for 1 hour (ISR)
    });

    if (!res.ok) {
      throw new Error(`GitHub GraphQL API returned status ${res.status}`);
    }

    const data = await res.json();
    const nodes = data?.data?.user?.pinnedItems?.nodes;

    if (!nodes || !Array.isArray(nodes)) {
      throw new Error("No pinned items returned from GitHub GraphQL");
    }

    interface GraphQLNode {
      name: string;
      description?: string | null;
      url: string;
      stargazerCount?: number;
      primaryLanguage?: { name: string; color: string } | null;
      repositoryTopics?: {
        nodes?: Array<{ topic: { name: string } }>;
      };
    }

    const pinnedRepos: PinnedRepo[] = (nodes as GraphQLNode[]).map((node) => ({
      name: node.name,
      description: node.description || "No description provided.",
      url: node.url,
      stars: node.stargazerCount || 0,
      language: node.primaryLanguage
        ? { name: node.primaryLanguage.name, color: node.primaryLanguage.color }
        : null,
      topics: node.repositoryTopics?.nodes?.map((t) => t.topic.name) || []
    }));

    return NextResponse.json(pinnedRepos);
  } catch (error) {
    console.error("Failed to fetch pinned repos, using fallback:", error);
    return NextResponse.json(FALLBACK_PINNED_REPOS);
  }
}
