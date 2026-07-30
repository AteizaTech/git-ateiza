"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export interface Article {
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
}

const FALLBACK_ARTICLES: Article[] = [
  {
    title: "Optimizing TCP Socket Buffers in Rust for Edge Telemetry Pipelines",
    brief: "Deconstructing raw socket operations, system-level buffer tuning, and handling high-concurrency event loops using Rust's Tokio runtime.",
    url: "https://dlazyhntr.hashnode.dev/optimizing-tcp-sockets-in-rust",
    publishedAt: "2026-07-20T08:00:00Z"
  },
  {
    title: "Minimizing Layout Shifts: Building a Custom WebAssembly Render Engine",
    brief: "How we shifted UI layout calculations from the main browser thread into WebAssembly, achieving smooth 60fps renders under heavy data loads.",
    url: "https://dlazyhntr.hashnode.dev/wasm-layout-renderer",
    publishedAt: "2026-06-15T08:00:00Z"
  },
  {
    title: "Edge Cache vs. ISR: Architectural Trade-offs in Modern Frameworks",
    brief: "A detailed performance audit analyzing the LCP and TTFB metrics of edge-cached serverless functions compared to Incremental Static Regeneration.",
    url: "https://dlazyhntr.hashnode.dev/edge-vs-isr-audit",
    publishedAt: "2026-05-02T08:00:00Z"
  }
];

export default function WritingPreview() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      const query = `
        query {
          publication(host: "dlazyhntr.hashnode.dev") {
            posts(first: 3) {
              edges {
                node {
                  title
                  brief
                  url
                  publishedAt
                }
              }
            }
          }
        }
      `;

      try {
        const res = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          throw new Error("Hashnode GQL failed");
        }

        const json = await res.json();
        const edges = json?.data?.publication?.posts?.edges;

        if (edges && Array.isArray(edges) && edges.length > 0) {
          const formatted: Article[] = edges.map((e: any) => ({
            title: e.node.title,
            brief: e.node.brief || "Click to read full article.",
            url: e.node.url,
            publishedAt: e.node.publishedAt
          }));
          setArticles(formatted);
        } else {
          setArticles(FALLBACK_ARTICLES);
        }
      } catch (err) {
        console.warn("Failed to fetch Hashnode posts, using fallback:", err);
        setArticles(FALLBACK_ARTICLES);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className={styles.writingGrid}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className={styles.articleCard}
            style={{ opacity: 0.6, animation: "pulseGlow 2s infinite" }}
          >
            <div style={{ width: "80px", height: "15px", background: "var(--border-muted)", borderRadius: "4px", marginBottom: "12px" }} />
            <div style={{ width: "90%", height: "24px", background: "var(--border-muted)", borderRadius: "4px", marginBottom: "12px" }} />
            <div style={{ width: "100%", height: "45px", background: "var(--border-muted)", borderRadius: "4px" }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.writingGrid} id="writing-preview">
      {articles.map((article) => (
        <a
          key={article.title}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.articleCard}
          id={`article-card-${article.title.replace(/\s+/g, "-").toLowerCase()}`}
        >
          <div>
            <div className={styles.articleMeta}>
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <p className={styles.articleExcerpt}>{article.brief}</p>
          </div>
          <div className={styles.articleReadMore}>
            Read Article <span>→</span>
          </div>
        </a>
      ))}
    </div>
  );
}
