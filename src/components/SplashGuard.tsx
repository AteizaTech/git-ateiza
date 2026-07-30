"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Components.module.css";

export default function SplashGuard() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [fading, setFading] = useState<boolean>(false);

  useEffect(() => {
    const splashKey = "iamadedo-splash-shown";
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

    // A refresh is a new visit, while client-side navigation back to the home
    // route keeps this tab's marker and therefore skips the splash.
    if (navigation?.type === "reload") {
      sessionStorage.removeItem(splashKey);
    }

    if (sessionStorage.getItem(splashKey)) {
      return;
    }

    sessionStorage.setItem(splashKey, "true");
    setMounted(true);

    // Fade out phase starts at 3000ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 3000);

    // Completely purge from DOM tree at 3500ms
    const purgeTimer = setTimeout(() => {
      setMounted(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(purgeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="splash-guard"
      className={`${styles.splashOverlay} ${
        fading ? styles.splashOverlayFading : styles.splashOverlayActive
      }`}
    >
      <picture>
        {/* Mobile vertical crop (9:16 layout variant) */}
        <source
          media="(max-width: 768px)"
          srcSet="/splash-mobile.png"
          type="image/png"
        />
        {/* Desktop wide crop (16:9 layout variant) */}
        <img
          src="/splash-desktop.png"
          alt="Technical Initialization Splash Screen"
          className={styles.splashImage}
          loading="eager"
        />
      </picture>

      <div className={styles.splashLoader}>
        <div className={styles.splashText}>Initializing Core Systems</div>
        <div className={styles.splashProgressTrack}>
          <div className={styles.splashProgressBar}></div>
        </div>
      </div>
    </div>
  );
}
