export interface Project {
  title: string;
  description: string;
  problem: string;
  architecture: string;
  metrics: string;
  stack: string[];
  githubUrl: string;
}

export const staticProjects: Project[] = [
  {
    title: "AgriLink D2C Engine",
    description: "A direct-to-consumer digital marketplace connecting regional farmers and local vendors directly with consumers.",
    problem: "Supply chains are fragmented, introducing significant markups and logistics overhead for fresh produce distributors.",
    architecture: "Built with Next.js Server Components, custom geo-queries on Mapbox API, and edge cache replication.",
    metrics: "Reduced supply chain latency by 35% and increased vendor profit margins by 18% during pilot runs.",
    stack: ["Next.js", "React", "Mapbox GL", "PostgreSQL", "Node.js"],
    githubUrl: "https://github.com/IamAdedo/agrilink-d2c"
  },
  {
    title: "Aeneas Inscription Restorer",
    description: "Deep learning sequence-to-sequence model restoring missing characters and dating Latin inscriptions.",
    problem: "Ancient epigraphic texts suffer from physical erosion and missing segments, requiring expert-level manual restoration.",
    architecture: "Employs PyTorch transformer nodes trained on Latin corpora (Aeneas framework) with sequence-to-sequence encoders.",
    metrics: "Achieved 87.4% character restoration accuracy and pinned epigraph dates within a 25-year margin.",
    stack: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker"],
    githubUrl: "https://github.com/IamAdedo/aeneas-restorer"
  },
  {
    title: "PulseFlow Real-time Analytics",
    description: "An isolated client-side dashboard digesting real-time telemetry from edge networks.",
    problem: "Web sockets and raw data feeds cause high layout thrashing and UI thread blocking under extreme traffic bursts.",
    architecture: "Utilizes HTML5 canvas rendering pipelines driven by offscreen Web Workers for zero main-thread layout shifts.",
    metrics: "Smoothly renders 10,000+ data points per second at a consistent 60 FPS, with 0% main-thread blocking.",
    stack: ["TypeScript", "HTML5 Canvas", "Web Workers", "WebSockets"],
    githubUrl: "https://github.com/IamAdedo/pulseflow-analytics"
  },
  {
    title: "Helix DNS Firewall",
    description: "A high-performance local DNS routing proxy that filters ad trackers and malicious hosts.",
    problem: "Standard browser extensions fail to block trackers at the system layer and cause request overhead.",
    architecture: "Written in Rust using Tokio async task workers and raw UDP socket listener buffers.",
    metrics: "Filters requests under 1.2 milliseconds average latency, reducing network bandwidth usage by 22%.",
    stack: ["Rust", "Tokio", "DNS-Protocol", "Docker"],
    githubUrl: "https://github.com/IamAdedo/helix-dns"
  },
  {
    title: "Hydra Content Pipeline",
    description: "A distributed assets compressor and asset hosting middleware engine.",
    problem: "Dynamic media websites suffer from heavy image loading overhead, causing high LCP times.",
    architecture: "Runs image compression and format optimization (WebP/AVIF) dynamically on Edge networks.",
    metrics: "Improved average Largest Contentful Paint (LCP) times by 1.8 seconds across dynamic layout viewports.",
    stack: ["JavaScript", "Cloudflare Workers", "Sharp", "WebP API"],
    githubUrl: "https://github.com/IamAdedo/hydra-pipeline"
  }
];
