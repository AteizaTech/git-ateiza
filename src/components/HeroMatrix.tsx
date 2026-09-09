"use client";

import styles from "../styles/Components.module.css";

export default function HeroMatrix() {
  return (
    <section className={styles.heroContainer} id="hero">
      <div className={styles.heroGreeting}>[ SYSTEM INITIALIZED SUCCESSFULLY ]</div>
      
      <h1 className={styles.heroName}>
        Hi, I am <span className="dual-gradient-text">AteizaTech</span>.
      </h1>

      <div className={styles.heroSpecs}>
        <span className={styles.specBadge}>AI Threat Detection</span>
        <span className={styles.specBadge}>Cybersecurity Automation</span>
        <span className={styles.specBadge}>Zero-Trust Infrastructure</span>
        <span className={styles.specBadge}>SecOps & Incident Response</span>
      </div>

      <p className={styles.heroBio}>
        I am an AI Cybersecurity Automation Engineer building autonomous threat detection pipelines, intelligent incident response workflows, and resilient zero-trust defenses. Focused on proactive threat mitigation, automated vulnerability intelligence, and mission-critical system hardening.
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
