"use client";

import { useState } from "react";
import styles from "../styles/Components.module.css";

export default function ContactZone() {
  const [copied, setCopied] = useState<boolean>(false);
  const emailAddress = "contact@iamadedo.dev";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email text:", err);
    }
  };

  const handleResumeClick = () => {
    // Open the resume PDF in a new tab
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section className={styles.contactWrapper} id="contact">
      <div className={styles.contactBox}>
        <div>
          <div className={styles.heroGreeting}>[ ESTABLISH CHANNEL CONNECTION ]</div>
          <h2 className={styles.heroName} style={{ fontSize: "2.5rem", margin: "10px 0" }}>
            Let's build something bulletproof.
          </h2>
          <p className={styles.heroBio} style={{ margin: "16px auto", maxWidth: "600px" }}>
            Open for full-time engineering team integration, distributed core pipeline contract work, or high-performance architectural systems auditing.
          </p>
        </div>

        <div className={styles.contactCopyContainer}>
          <div className={styles.contactEmailString}>{emailAddress}</div>
          <button
            onClick={handleCopyEmail}
            className={`${styles.contactCopyBtn} ${copied ? styles.contactCopyBtnCopied : ""}`}
            id="copy-email-btn"
          >
            {copied ? "Copied!" : "Copy String"}
          </button>
        </div>

        <div className={styles.heroActions} style={{ justifyContent: "center" }}>
          <a
            href={`mailto:${emailAddress}`}
            className={styles.btnPrimary}
            id="mailto-direct-link"
          >
            Open Mail Client ↗
          </a>
          <a
            href="/resume.pdf"
            download="IamAdedo_Resume.pdf"
            onClick={handleResumeClick}
            className={styles.btnSecondary}
            id="download-resume-btn"
          >
            Download PDF Resume ↓
          </a>
        </div>
      </div>
    </section>
  );
}
