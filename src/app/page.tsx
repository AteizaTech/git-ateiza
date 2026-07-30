"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";
import HeroMatrix from "../components/HeroMatrix";
import ProjectsGrid from "../components/ProjectsGrid";
import EducationGateway from "../components/EducationGateway";
import WritingPreview from "../components/WritingPreview";
import ContactZone from "../components/ContactZone";
import AIAgent from "../components/AIAgent";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className={styles.pageContainer}>

      {/* Cybernetic ambient backgrounds */}
      <div className={styles.bgGlow}>
        <div className={styles.glowCyan} />
        <div className={styles.glowViolet} />
      </div>

      {/* Navigation Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo} id="nav-logo">
            <span className={styles.logoIcon}>◬</span> IamAdedo
          </Link>
          <nav className={styles.nav}>
            <a href="#hero" className={styles.navLink}>
              Matrix
            </a>
            <Link href="/projects" className={styles.navLink}>
              Projects
            </Link>
            <Link href="/archive" className={styles.navLink}>
              Archive
            </Link>
            <Link href="/writing" className={styles.navLink}>
              Writing
            </Link>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main layout matrix */}
      <main className={styles.mainContent}>
        {/* Module 1: The Hero Matrix */}
        <HeroMatrix />

        {/* Module 2: Flagship Case Studies Grid */}
        <section className={styles.section} id="projects">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionSubtitle}>Module 02 // Flagship Architectures</div>
              <h2 className={styles.sectionTitle}>Case Studies & Pinned Repositories</h2>
            </div>
            <Link href="/projects" className={styles.sectionActionLink} id="view-all-projects-link">
              [ View More Architecture & Activity → ]
            </Link>
          </div>
          <ProjectsGrid />
        </section>

        {/* Module 4: Educational Highlight Card */}
        <section className={styles.section} id="education">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionSubtitle}>Module 03 // Academic Gateway</div>
              <h2 className={styles.sectionTitle}>Engineering Qualifications</h2>
            </div>
          </div>
          <EducationGateway />
        </section>

        {/* Module 5: Writing Publication Preview */}
        <section className={styles.section} id="writing">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionSubtitle}>Module 04 // Publication Feed</div>
              <h2 className={styles.sectionTitle}>Recent Systems Logs</h2>
            </div>
            <Link href="/writing" className={styles.sectionActionLink} id="view-all-writing-link">
              [ View All Articles → ]
            </Link>
          </div>
          <WritingPreview />
        </section>

        {/* Module 6: Contact & Direct Copy CTAs */}
        <section className={styles.section} id="contact-zone" style={{ borderBottom: "none" }}>
          <ContactZone />
          <AIAgent />
        </section>
      </main>

      {/* Footer Branding */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <Link href="/" className={styles.footerLogo}>
              IamAdedo // distributed systems
            </Link>
          </div>
          <div className={styles.footerSocials}>
            <a
              href="https://github.com/IamAdedo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              id="footer-github-link"
            >
              GitHub
            </a>
            <a
              href="https://dlazyhntr.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              id="footer-hashnode-link"
            >
              Hashnode
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              id="footer-linkedin-link"
            >
              LinkedIn
            </a>
          </div>
          <div>© {new Date().getFullYear()} IamAdedo. All Rights Reserved.</div>
        </div>
      </footer>

    </div>
  );
}
