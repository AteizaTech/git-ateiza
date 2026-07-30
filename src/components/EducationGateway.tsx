"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function EducationGateway() {
  return (
    <Link href="/archive" className={styles.eduGatewayCard} id="edu-gateway-card">
      <div className={styles.eduGatewayContent}>
        <div className={styles.eduInstitution}>[ STATE ENGINEERING UNIVERSITY ]</div>
        <h3 className={styles.eduDegree}>M.Sc. in Distributed Systems & Parallel Computing</h3>
        <p className={styles.eduDescription}>
          Specialized in distributed consensus algorithms, high-concurrency protocols, and offscreen thread scheduling. Click to review full academic ledger and experience timeline.
        </p>
      </div>
      <div className={styles.eduArrow}>→</div>
    </Link>
  );
}
