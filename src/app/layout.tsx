import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AteizaTech | AI Cybersecurity Automation & Systems Architect",
  description: "Portfolio of AteizaTech, featuring AI cybersecurity automation, autonomous threat detection pipelines, and resilient zero-trust security engineering.",
  keywords: ["AteizaTech", "AI Cybersecurity", "Security Automation", "Zero Trust", "Threat Detection", "SecOps"],
  authors: [{ name: "AteizaTech" }],
  openGraph: {
    title: "AteizaTech | AI Cybersecurity Automation Architect",
    description: "AI cybersecurity automation, autonomous threat detection, and resilient zero-trust security architectures.",
    type: "website",
    url: "https://ateizatech.dev"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
