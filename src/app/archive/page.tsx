"use client";

import Link from "next/link";
import styles from "../../styles/Subpages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { timelineEvents } from "../../data/timeline_events";
import Header from "../../components/Header";

export default function ExperienceArchive() {
  return (
    <div className={homeStyles.pageContainer}>
      {/* Background glow elements */}
      <div className={homeStyles.bgGlow}>
        <div className={homeStyles.glowCyan} style={{ top: "5%" }} />
        <div className={homeStyles.glowViolet} style={{ top: "50%" }} />
      </div>
      {/* 
      <header className={homeStyles.header}>
        <div className={homeStyles.headerInner}>
          <Link href="/" className={homeStyles.logo}>
            <span className={homeStyles.logoIcon}>◬</span> AteizaTech.sys
          </Link>
          <nav className={homeStyles.nav}>
            <Link href="/" className={homeStyles.navLink}>
              Matrix
            </Link>
            <Link href="/projects" className={homeStyles.navLink}>
              Projects
            </Link>
            <Link href="/archive" className={homeStyles.navLink} style={{ color: "var(--accent-cyan)" }}>
              Archive
            </Link>
            <Link href="/writing" className={homeStyles.navLink}>
              Writing
            </Link>
          </nav>
        </div>
      </header> */}

      <Header />

      <main className={homeStyles.mainContent}>
        {/* Header Block */}
        <section className={styles.subpageHeader}>
          <Link href="/" className={styles.backLink} id="back-to-matrix-from-archive">
            [ ← Return to Matrix ]
          </Link>
          <h1 className={styles.title}>System Timeline & Archive</h1>
          <p className={styles.subtitle}>
            A chronological mapping of professional systems design experience and distributed computing academic credentials.
          </p>
        </section>

        {/* Chronological Timeline Track */}
        <section className={styles.sectionSpacer} style={{ borderBottom: "none" }}>
          <div className={styles.timelineContainer} id="timeline-ledger">
            <div className={styles.timelineLine} />

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={styles.timelineItem}
                id={`timeline-item-${index}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={styles.timelineNode} />
                <div className={styles.timelineTime}>{event.year}</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{event.title}</h3>
                  <div className={styles.timelineOrg}>
                    {event.type === "professional" ? "🏢" : "🎓"} {event.institution}
                  </div>
                  <p className={styles.timelineDesc}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={homeStyles.footer}>
        <div className={homeStyles.footerInner}>
          <div>
            <Link href="/" className={homeStyles.footerLogo}>
              AteizaTech // distributed systems
            </Link>
          </div>
          <div>© {new Date().getFullYear()} AteizaTech. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
