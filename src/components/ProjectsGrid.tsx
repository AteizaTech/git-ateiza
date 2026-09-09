"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Components.module.css";
import { PinnedRepo } from "../app/api/github/route";

export default function ProjectsGrid() {
  const [repos, setRepos] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPinnedRepos() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          throw new Error("Failed to fetch pinned repositories");
        }
        const data: PinnedRepo[] = await res.json();
        setRepos(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchPinnedRepos();
  }, []);

  if (loading) {
    return (
      <div className={styles.repoGrid}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className={styles.repoCard}
            style={{ opacity: 0.6, animation: "pulseGlow 2s infinite" }}
          >
            <div className={styles.repoHeader}>
              <div
                style={{
                  width: "150px",
                  height: "20px",
                  background: "var(--border-muted)",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "40px",
                  height: "15px",
                  background: "var(--border-muted)",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "60px",
                background: "var(--border-muted)",
                borderRadius: "4px",
                margin: "16px 0",
              }}
            />
            <div className={styles.repoFooter}>
              <div
                style={{
                  width: "80px",
                  height: "15px",
                  background: "var(--border-muted)",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>[ WARNING: Failed to establish API pipe to host. Rendering offline data ledger fallback. ]</p>
      </div>
    );
  }

  return (
    <div className={styles.repoGrid} id="projects-grid">
      {repos.map((repo) => (
        <a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoCard}
          id={`repo-card-${repo.name}`}
        >
          <div>
            <div className={styles.repoHeader}>
              <h3 className={styles.repoTitle}>{repo.name}</h3>
              {repo.stars > 0 && (
                <span className={styles.repoStarInfo}>
                  ★ {repo.stars}
                </span>
              )}
            </div>
            <p className={styles.repoDesc}>{repo.description}</p>
          </div>

          <div className={styles.repoFooter}>
            {repo.language && (
              <div className={styles.repoLang}>
                <span
                  className={styles.langCircle}
                  style={{ backgroundColor: repo.language.color }}
                />
                {repo.language.name}
              </div>
            )}
            {repo.topics && repo.topics.length > 0 && (
              <div className={styles.repoTags}>
                {repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className={styles.repoTag}>
                    #{topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
