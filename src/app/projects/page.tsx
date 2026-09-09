"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Subpages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { staticProjects } from "../../data/static_projects";
import ThemeToggle from "../../components/ThemeToggle";

interface GitRepo {
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  language: string | null;
  fork: boolean;
  size: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProjectsLedger() {
  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    const addLog = (log: string) => {
      setTerminalLogs((prev) => [...prev, log]);
    };

    async function fetchActiveLab() {
      addLog("[$] ssh -T git@github.com");
      await delay(400);
      addLog("[$] connection established. host: api.github.com");
      await delay(300);
      addLog("[$] querying user/IamAdedo/repos?sort=updated");

      try {
        const res = await fetch("https://api.github.com/users/IamAdedo/repos?sort=updated&per_page=30");
        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }
        const data: GitRepo[] = await res.json();
        await delay(500);
        addLog(`[$] fetched ${data.length} repository buffers.`);

        // Filtering Middleware: Fork check, Empty check (size == 0), Documentation/Scratchpad check
        await delay(300);
        addLog("[$] loading middleware filtering stack...");
        await delay(400);

        const filtered = data.filter((repo) => {
          if (repo.fork) {
            return false;
          }
          if (repo.size === 0) {
            return false;
          }
          // Filter out scratchpads or documentation-only repositories
          const desc = (repo.description || "").toLowerCase();
          const name = repo.name.toLowerCase();
          if (
            name.includes("docs") ||
            name.includes("readme") ||
            (desc.includes("documentation") && !repo.language)
          ) {
            return false;
          }
          return true;
        });

        addLog(`[$] middleware complete. discarded ${data.length - filtered.length} forks/scratchpads.`);
        await delay(300);
        addLog(`[$] mapping ledger with ${filtered.length} active pipelines.`);

        setRepos(filtered);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        addLog(`[!] ERROR: Failed to pull active repositories: ${message}`);
        // Populate fallback mock repos for testing UI when offline/blocked
        setRepos([
          {
            name: "hntr-ospr-drop",
            description: "An advanced sandbox compiler environment optimized for agentic operations.",
            html_url: "https://github.com/IamAdedo/hntr-ospr-drop",
            updated_at: new Date().toISOString(),
            language: "TypeScript",
            fork: false,
            size: 1048
          },
          {
            name: "hntr-pwr-river",
            description: "A distributed message streaming queue with multi-region replication.",
            html_url: "https://github.com/IamAdedo/hntr-pwr-river",
            updated_at: new Date().toISOString(),
            language: "Go",
            fork: false,
            size: 2048
          },
          {
            name: "antigravity-core",
            description: "Core AI agent task runner.",
            html_url: "https://github.com/IamAdedo/antigravity-core",
            updated_at: new Date().toISOString(),
            language: "Rust",
            fork: false,
            size: 4096
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveLab();
  }, []);

  return (
    <div className={homeStyles.pageContainer}>
      {/* Background glow elements */}
      <div className={homeStyles.bgGlow}>
        <div className={homeStyles.glowCyan} style={{ top: "10%" }} />
        <div className={homeStyles.glowViolet} style={{ top: "60%" }} />
      </div>

      <header className={homeStyles.header}>
        <div className={homeStyles.headerInner}>
          <Link href="/" className={homeStyles.logo}>
            <span className={homeStyles.logoIcon}>◬</span> IamAdedo
          </Link>
          <nav className={homeStyles.nav}>
            <Link href="/" className={homeStyles.navLink}>
              Matrix
            </Link>
            <Link href="/projects" className={homeStyles.navLink} style={{ color: "var(--accent-cyan)" }}>
              Projects
            </Link>
            <Link href="/archive" className={homeStyles.navLink}>
              Archive
            </Link>
            <Link href="/writing" className={homeStyles.navLink}>
              Writing
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className={homeStyles.mainContent}>
        {/* Header Section */}
        <section className={styles.subpageHeader}>
          <Link href="/" className={styles.backLink} id="back-to-matrix">
            [ ← Return to Matrix ]
          </Link>
          <h1 className={styles.title}>Project Infrastructure Ledger</h1>
          <p className={styles.subtitle}>
            Reviewing production-ready flagship models in the upper ledger, alongside the live active repository pipeline.
          </p>
        </section>

        {/* Upper Ledger (Handcrafted Masterworks) */}
        <section className={styles.sectionSpacer}>
          <h2 className={styles.subSectionTitle}>Handcrafted Architectures & Systems</h2>
          <div className={styles.secondaryGrid} id="secondary-projects-grid">
            {staticProjects.map((project) => (
              <div
                key={project.title}
                className={styles.secondaryCard}
                id={`secondary-card-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                <div className={styles.cardDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Problem:</span>
                    <span className={styles.detailVal}>{project.problem}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Architecture:</span>
                    <span className={styles.detailVal}>{project.architecture}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Metrics:</span>
                    <span className={styles.detailVal}>{project.metrics}</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.cardStack}>
                    {project.stack.slice(0, 3).map((badge) => (
                      <span key={badge} className={styles.cardBadge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    Source ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lower Ledger ("Active Lab" Live GitHub Feed) */}
        <section className={styles.sectionSpacer} style={{ borderBottom: "none" }}>
          <h2 className={styles.subSectionTitle}>Active Lab (Live Stream Feed)</h2>

          <div className={styles.terminalContainer} id="active-lab-terminal">
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.terminalTitle}>GITHUB_MIDDLEWARE_SHELL v1.0.2</div>
              <div style={{ width: "42px" }} />
            </div>

            <div className={styles.terminalOutput}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "16px", lineHeight: "1.4" }}>
                {terminalLogs.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>

              {loading ? (
                <div className={styles.terminalLoading}>
                  <span>⚙ Decoding repository packets...</span>
                </div>
              ) : (
                <div className={styles.terminalHeaderRow}>
                  <div>Repository Name</div>
                  <div>Ecosystem</div>
                  <div>Last Synchronized</div>
                  <div>Access Point</div>
                </div>
              )}

              {!loading && (
                <div className={styles.terminalBody}>
                  {repos.map((repo) => (
                    <div key={repo.name} className={styles.terminalRow} id={`ledger-row-${repo.name}`}>
                      <div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.ledgerRepoName}
                        >
                          {repo.name}
                        </a>
                      </div>
                      <div className={styles.ledgerLang}>
                        {repo.language ? (
                          <>
                            <span
                              className={styles.ledgerCircle}
                              style={{
                                backgroundColor:
                                  repo.language === "TypeScript"
                                    ? "#3178c6"
                                    : repo.language === "Go"
                                    ? "#00ADD8"
                                    : repo.language === "Rust"
                                    ? "#dea584"
                                    : repo.language === "Python"
                                    ? "#3572A5"
                                    : "#64748b",
                              }}
                            />
                            {repo.language}
                          </>
                        ) : (
                          "Documentation"
                        )}
                      </div>
                      <div className={styles.ledgerDate}>
                        {new Date(repo.updated_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </div>
                      <div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.ledgerLink}
                        >
                          Codebase ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={homeStyles.footer}>
        <div className={homeStyles.footerInner}>
          <div>
            <Link href="/" className={homeStyles.footerLogo}>
              IamAdedo // distributed systems
            </Link>
          </div>
          <div>© {new Date().getFullYear()} IamAdedo. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
