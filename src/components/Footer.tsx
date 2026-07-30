"use client";

import Link from "next/link";
import homeStyles from "../../styles/Home.module.css";

export default function Footer() {
    return (
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
    );
}
