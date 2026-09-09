








"use client";

import Link from "next/link";
import homeStyles from "../styles/Home.module.css";

export default function Header() {
    return (
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
        </header>


    );
}
