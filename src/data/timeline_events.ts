export interface TimelineEvent {
  year: string;
  type: "academic" | "professional";
  title: string;
  institution: string;
  description: string;
}

// Keep this list newest-first. To add an education entry, copy an item below,
// set type to "academic", then update the text fields. The archive page reads
// this list automatically; no component or layout changes are needed.

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2024 - Present",
    type: "professional",
    title: "Senior Systems Architect",
    institution: "Antigravity Systems Labs",
    description: "Architecting high-frequency telemetry pipelines and edge computing infrastructures. Spearheading optimization strategies for sub-millisecond execution engines."
  },
  {
    year: "2023 - 2024",
    type: "professional",
    title: "Full-Stack Software Engineer",
    institution: "AgriLink Technologies",
    description: "Implemented a direct-to-consumer marketplace connecting local farming cooperatives directly to metropolitan consumers, optimizing regional delivery routing."
  },
  {
    year: "2020 - 2023",
    type: "academic",
    title: "M.Sc. in Distributed Systems & Parallel Computing",
    institution: "State Engineering University",
    description: "Research focus on consensus algorithms, WebSockets network layers, and scheduling tasks over distributed nodes. Graduated with Honors."
  },
  {
    year: "2016 - 2020",
    type: "academic",
    title: "B.Sc. in Computer Science & Software Engineering",
    institution: "State Science Institute",
    description: "Core curriculum: Compiler Design, Advanced Data Structures, Operating Systems, Database Management Systems, and Machine Learning Fundamentals."
  }
];
