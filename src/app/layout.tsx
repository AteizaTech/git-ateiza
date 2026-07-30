import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IamAdedo | Distributed Systems & High-Performance Web Architect",
  description: "Portfolio of IamAdedo, featuring high-performance distributed systems engineering, edge computing layouts, and systems programming.",
  keywords: ["IamAdedo", "Systems Engineer", "Next.js Portfolio", "Distributed Systems", "Rust Developer", "High Performance Web"],
  authors: [{ name: "IamAdedo" }],
  openGraph: {
    title: "IamAdedo | Systems & Web Architect",
    description: "Sleek, high-performance developer portfolio built under sub-millisecond execution constraints.",
    type: "website",
    url: "https://iamadedo.dev"
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
