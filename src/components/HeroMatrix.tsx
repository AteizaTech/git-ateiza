"use client";

import styles from "../styles/Components.module.css";

export default function HeroMatrix() {
  return (
    <section className={styles.heroContainer} id="hero">
      <div className={styles.heroGreeting}>[ SYSTEM INITIALIZED SUCCESSFULLY ]</div>
      
      <h1 className={styles.heroName}>
        Hi, I am <span className="dual-gradient-text">IamAdedo</span>.
      </h1>

      <div className={styles.heroSpecs}>
        <span className={styles.specBadge}>Distributed Systems</span>
        <span className={styles.specBadge}>High-Performance Web</span>
        <span className={styles.specBadge}>Edge Infrastructure</span>
        <span className={styles.specBadge}>Systems Programming</span>
      </div>

      <p className={styles.heroBio}>
        I design and build distributed execution networks and edge storage systems that operate under sub-millisecond constraints. Focused on architecture reliability, high scalability, and clean modular codebases.
      </p>

      <div className={styles.heroActions}>
        <a href="#projects" className={styles.btnPrimary} id="hero-cta-projects">
          View Flagship Codebases
        </a>
        <a href="#contact" className={styles.btnSecondary} id="hero-cta-contact">
          Establish Connection
        </a>
      </div>
    </section>
  );
}
