"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../styles/Components.module.css";

interface Message {
  sender: "user" | "agent" | "system";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  default:
    "AteizaTech AI Security & Automation Shell initialized. Ask anything about AI cybersecurity automation, autonomous threat detection pipelines, live GitHub repositories, or technical architecture.",
  security:
    "Specialized in AI Cybersecurity Automation, autonomous threat detection pipelines, SOAR playbooks, and zero-trust infrastructure defense. Core focus includes proactive vulnerability intelligence, machine learning anomaly detection, and automated incident triage.",
  projects:
    "Active repositories directly fetched from AteizaTech GitHub: 'AteizaTech' (Cybersecurity & Automation), 'git-ateiza' (interactive learning architecture), 'ateiza' (distributed systems portfolio engine), and 'poetry' (Python packaging & dependency workflows).",
  stack:
    "Core competencies: Python (PyTorch, SecOps scripting), TypeScript/Next.js, Rust (Tokio), Go, Docker, Linux systems architecture, and automated threat telemetry pipelines.",
  experience:
    "Senior Systems & Security Automation Architect at Antigravity Systems Labs. M.Sc. in Distributed Systems & Parallel Computing. Extensive track record in zero-latency telemetry pipelines and automated threat defense.",
  contact:
    "Direct communication channel: contact@ateizatech.dev. You can also download the PDF resume or use the quick copy action in the contact module above.",
  help:
    "Available commands: 'security', 'stack', 'projects', 'experience', 'contact', 'clear'. You can also type any custom question or system query."
};

function getResponse(query: string): string {
  const lower = query.toLowerCase().trim();
  if (lower === "help") {
    return KNOWLEDGE_BASE.help;
  }
  if (
    lower.includes("security") ||
    lower.includes("cyber") ||
    lower.includes("automation") ||
    lower.includes("threat") ||
    lower.includes("defense")
  ) {
    return KNOWLEDGE_BASE.security;
  }
  if (
    lower.includes("project") ||
    lower.includes("repo") ||
    lower.includes("work") ||
    lower.includes("built") ||
    lower.includes("codebase")
  ) {
    return KNOWLEDGE_BASE.projects;
  }
  if (
    lower.includes("stack") ||
    lower.includes("language") ||
    lower.includes("tech") ||
    lower.includes("rust") ||
    lower.includes("python") ||
    lower.includes("go")
  ) {
    return KNOWLEDGE_BASE.stack;
  }
  if (
    lower.includes("experience") ||
    lower.includes("job") ||
    lower.includes("education") ||
    lower.includes("school") ||
    lower.includes("degree")
  ) {
    return KNOWLEDGE_BASE.experience;
  }
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("hire") ||
    lower.includes("reach")
  ) {
    return KNOWLEDGE_BASE.contact;
  }
  return `Telemetry acknowledgment for query "${query}": Analysis indexed. AteizaTech specializes in AI Cybersecurity Automation, high-assurance distributed systems, and autonomous threat mitigation pipelines. Reach out directly via contact@ateizatech.dev.`;
}

export default function AIAgent() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: "[SYSTEM] AteizaTech Security Telemetry Shell v2.5.0 initialized."
    },
    {
      sender: "agent",
      text: "Copilot active. Ask anything regarding cybersecurity automation, repositories, architecture, or tech stack."
    }
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTerminalOpen]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      setMessages([
        {
          sender: "system",
          text: "[SYSTEM] Shell buffer cleared. Telemetry daemon re-initialized."
        }
      ]);
      setInput("");
      return;
    }

    const userMsg: Message = { sender: "user", text: trimmed };
    const replyText = getResponse(trimmed);
    const agentMsg: Message = { sender: "agent", text: replyText };

    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInput("");
  };

  const handleSend = () => {
    executeCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (cmd: string) => {
    if (!isTerminalOpen) {
      setIsTerminalOpen(true);
    }
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const scrollToTerminal = () => {
    const terminalEl = document.getElementById("agent-terminal");
    if (terminalEl) {
      terminalEl.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsTerminalOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  };

  return (
    <>
      <div className={styles.agentAnchor} id="agent-terminal">
        <div className={styles.agentDockCard}>
          {/* Card Header */}
          <div className={styles.agentDockHeader}>
            <div className={styles.agentDockHeaderLeft}>
              <div className={styles.agentDockEyebrow}>
                [ SECURITY COPILOT // RECONNAISSANCE TERMINAL ]
              </div>
              <h3 className={styles.agentDockTitle}>Interactive Agent Terminal</h3>
              <p className={styles.agentDockCopy}>
                Directly probe system capabilities, AI cybersecurity automation pipelines, and
                engineering specializations via automated telemetry query.
              </p>
            </div>

            <div className={styles.agentDockHeaderRight}>
              <div className={styles.agentStatusBadge}>
                <span className={styles.pulseIndicator} />
                <span>COPILOT ONLINE</span>
              </div>
              <button
                type="button"
                className={styles.terminalControlBtn}
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                id="toggle-terminal-view-btn"
              >
                {isTerminalOpen ? "[ Minimize Shell ]" : "[ Open Shell ]"}
              </button>
              <button
                type="button"
                className={styles.terminalControlBtn}
                onClick={() => executeCommand("clear")}
                id="clear-terminal-logs-btn"
              >
                [ Clear ]
              </button>
            </div>
          </div>

          {/* Suggested Query Chips */}
          <div className={styles.terminalChipsRow}>
            <span className={styles.terminalChipLabel}>QUICK PROMPTS:</span>
            <button
              type="button"
              className={styles.terminalChipBtn}
              onClick={() => handleChipClick("security")}
            >
              $ security
            </button>
            <button
              type="button"
              className={styles.terminalChipBtn}
              onClick={() => handleChipClick("projects")}
            >
              $ projects
            </button>
            <button
              type="button"
              className={styles.terminalChipBtn}
              onClick={() => handleChipClick("stack")}
            >
              $ stack
            </button>
            <button
              type="button"
              className={styles.terminalChipBtn}
              onClick={() => handleChipClick("experience")}
            >
              $ experience
            </button>
            <button
              type="button"
              className={styles.terminalChipBtn}
              onClick={() => handleChipClick("contact")}
            >
              $ contact
            </button>
            <button
              type="button"
              className={styles.terminalChipBtn}
              onClick={() => handleChipClick("help")}
            >
              $ help
            </button>
          </div>

          {/* In-Flow Terminal Window - Never Overlays Card Content */}
          {isTerminalOpen && (
            <div className={styles.terminalWindow} id="agent-terminal-window">
              {/* Terminal Window Topbar */}
              <div className={styles.terminalWindowHeader}>
                <div className={styles.terminalWindowDots}>
                  <span className={`${styles.terminalDot} ${styles.terminalDotRed}`} />
                  <span className={`${styles.terminalDot} ${styles.terminalDotYellow}`} />
                  <span className={`${styles.terminalDot} ${styles.terminalDotGreen}`} />
                </div>
                <div className={styles.terminalWindowTitle}>
                  <span>bash: ateizatech-ai // security telemetry</span>
                </div>
                <div className={styles.terminalWindowMeta}>PID: 4096 [RUNNING]</div>
              </div>

              {/* Scrollable Logs */}
              <div className={styles.terminalConsoleLogs}>
                {messages.map((m, idx) => (
                  <div key={idx} className={styles.terminalLogEntry}>
                    {m.sender === "system" && (
                      <div className={styles.terminalLogSystem}>{m.text}</div>
                    )}
                    {m.sender === "user" && (
                      <div className={styles.terminalLogUser}>
                        <span className={styles.terminalLogUserPrompt}>
                          visitor@ateizatech:~$
                        </span>
                        <span>{m.text}</span>
                      </div>
                    )}
                    {m.sender === "agent" && (
                      <div className={styles.terminalLogAgent}>
                        <strong style={{ color: "var(--accent-cyan)", marginRight: "6px" }}>
                          [COPILOT]
                        </strong>
                        {m.text}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              {/* Command Prompt Input Row */}
              <div className={styles.terminalPromptRow}>
                <span className={styles.terminalPromptPrefix}>visitor@ateizatech:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.terminalPromptInput}
                  placeholder="Type a command or question (e.g. security, stack, projects)..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  id="agent-terminal-input"
                />
                <button
                  type="button"
                  className={styles.terminalPromptBtn}
                  onClick={handleSend}
                  id="agent-terminal-submit"
                >
                  Run ↵
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Non-obtrusive Floating Copilot Shortcut in the bottom-right viewport corner */}
      <button
        type="button"
        className={styles.floatingCopilotLauncher}
        onClick={scrollToTerminal}
        aria-label="Scroll to Interactive Agent Terminal"
        id="floating-copilot-shortcut"
      >
        <span className={styles.pulseIndicator} />
        <span>◬ Copilot Terminal</span>
      </button>
    </>
  );
}

