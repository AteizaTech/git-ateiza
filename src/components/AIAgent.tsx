"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../styles/Components.module.css";

interface Message {
  sender: "user" | "agent";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  default:
    "I am Adedo's system agent. You can query me about distributed architectures, past projects, academic research, or how to get in touch.",
  projects:
    "Adedo's flagship architectures include HNTR OSPR DROP (sandbox compiler), HNTR PWR River (distributed streaming queue), AgriLink D2C, Aeneas Restorer, and Helix DNS Firewall.",
  stack:
    "Core competencies include Rust (Tokio), Go, TypeScript/Next.js, WebAssembly, distributed consensus (Raft), and low-latency network telemetry.",
  experience:
    "Currently Senior Systems Architect at Antigravity Systems Labs. Previously at AgriLink Technologies. Holds an M.Sc. in Distributed Systems & Parallel Computing.",
  contact:
    "You can reach Adedo directly via email at contact@iamadedo.dev or download the PDF resume from the contact terminal."
};

function getResponse(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes("project") || lower.includes("repo") || lower.includes("work") || lower.includes("built")) {
    return KNOWLEDGE_BASE.projects;
  }
  if (lower.includes("stack") || lower.includes("language") || lower.includes("tech") || lower.includes("rust") || lower.includes("go")) {
    return KNOWLEDGE_BASE.stack;
  }
  if (lower.includes("experience") || lower.includes("job") || lower.includes("education") || lower.includes("school") || lower.includes("degree")) {
    return KNOWLEDGE_BASE.experience;
  }
  if (lower.includes("contact") || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
    return KNOWLEDGE_BASE.contact;
  }
  return "System acknowledgment: Query indexed. Feel free to explore the Projects and Writing sections for in-depth architectural telemetry, or reach out at contact@iamadedo.dev.";
}

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "System initialized. Ask me anything about IamAdedo's systems, projects, or technical qualifications."
    }
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { sender: "user", text: trimmed };
    const replyText = getResponse(trimmed);
    const agentMsg: Message = { sender: "agent", text: replyText };

    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.agentAnchor}>
      <div
        className={`${styles.agentWrapper} ${styles.agentWrapperVisible} ${styles.agentWrapperDocked}`}
      >
        {isOpen && (
          <div className={styles.chatBox}>
            <div className={styles.chatHeader}>
              <div className={styles.chatTitle}>
                <span className={styles.pulseIndicator} />
                <span>IamAdedo.ai // Terminal</span>
              </div>
              <button
                type="button"
                className={styles.chatCloseBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>

            <div className={styles.chatLogs}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`${styles.chatMsg} ${
                    m.sender === "user" ? styles.chatMsgUser : styles.chatMsgAgent
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            <div className={styles.chatInputArea}>
              <input
                type="text"
                className={styles.chatInput}
                placeholder="Query system (e.g. stack, projects)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className={styles.chatSendBtn}
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        )}

        <div className={styles.agentDockCard}>
          <div className={styles.agentDockEyebrow}>[ QUERY COPILOT ]</div>
          <h3 className={styles.agentDockTitle}>Interactive Agent Terminal</h3>
          <p className={styles.agentDockCopy}>
            Directly probe system capabilities, project architectures, and engineering specializations via automated telemetry query.
          </p>

          <div className={styles.agentLauncherContainer}>
            <div className={styles.agentTooltip}>
              {isOpen ? "Close Terminal" : "Initialize Copilot"}
            </div>
            <button
              type="button"
              className={`${styles.agentLauncher} ${
                isOpen ? styles.agentLauncherActive : ""
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle AI Assistant"
            >
              <span className={styles.agentLauncherIcon}>
                {isOpen ? "✕" : "◬"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
