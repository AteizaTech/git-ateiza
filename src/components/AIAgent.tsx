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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
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
    if (isChatbotOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [messages, isChatbotOpen]);

  // Handle ESC key to close chatbot terminal
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isChatbotOpen) {
        setIsChatbotOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => window.removeEventListener("keydown", handleKeyDownGlobal);
  }, [isChatbotOpen]);

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

  const openChatbotWithQuery = (cmd: string) => {
    setIsChatbotOpen(true);
    executeCommand(cmd);
  };

  const toggleChatbotTerminal = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <>
      {/* Module 4: Copilot Terminal Card in Document Flow */}
      <div className={styles.agentAnchor} id="agent-terminal">
        <div className={styles.agentDockCard}>
          {/* Card Header */}
          <div className={styles.agentDockHeader}>
            <div className={styles.agentDockHeaderLeft}>
              <div className={styles.agentDockEyebrow}>
                [ COPILOT TERMINAL // SYSTEM TELEMETRY ]
              </div>
              <h3 className={styles.agentDockTitle}>Interactive Agent Terminal</h3>
              <p className={styles.agentDockCopy}>
                Directly probe system capabilities, AI cybersecurity automation pipelines, and
                engineering specializations via the AteizaTech Copilot.
              </p>
            </div>

            <div className={styles.agentDockHeaderRight}>
              <div className={styles.agentStatusBadge}>
                <span className={styles.pulseIndicator} />
                <span>COPILOT ONLINE // PORT 4096</span>
              </div>
            </div>
          </div>

          {/* Telemetry Matrix Grid */}
          <div className={styles.agentTelemetryGrid}>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>RUNTIME DAEMON</span>
              <span className={styles.telemetryValue}>
                <span className={styles.pulseIndicator} />
                ateizatech-agentd
              </span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>AI CORE ENGINE</span>
              <span className={`${styles.telemetryValue} ${styles.telemetryValueHighlight}`}>
                SecOps Copilot v2.5
              </span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>PRIMARY DOMAIN</span>
              <span className={styles.telemetryValue}>AI Cybersecurity & Automation</span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>INTERFACE LINK</span>
              <span className={`${styles.telemetryValue} ${styles.telemetryValueHighlight}`}>
                Interactive Chatbot Terminal
              </span>
            </div>
          </div>

          {/* Call-to-Action Row: Calls the Chatbot Terminal */}
          <div className={styles.agentCallToActionRow}>
            <button
              type="button"
              className={`${styles.callChatbotBtn} ${
                isChatbotOpen ? styles.callChatbotBtnActive : ""
              }`}
              onClick={toggleChatbotTerminal}
              id="call-chatbot-terminal-btn"
              aria-label="Call Chatbot Terminal"
            >
              <span className={styles.pulseIndicator} />
              <span>
                {isChatbotOpen ? "Chatbot Terminal Active [Focus / Close]" : "⚡ Call Chatbot Terminal ◬"}
              </span>
            </button>

            {/* Suggested Prompt Trigger Chips */}
            <div className={styles.terminalChipsRow}>
              <span className={styles.terminalChipLabel}>QUICK CALLS:</span>
              <button
                type="button"
                className={styles.terminalChipBtn}
                onClick={() => openChatbotWithQuery("security")}
              >
                $ security
              </button>
              <button
                type="button"
                className={styles.terminalChipBtn}
                onClick={() => openChatbotWithQuery("projects")}
              >
                $ projects
              </button>
              <button
                type="button"
                className={styles.terminalChipBtn}
                onClick={() => openChatbotWithQuery("stack")}
              >
                $ stack
              </button>
              <button
                type="button"
                className={styles.terminalChipBtn}
                onClick={() => openChatbotWithQuery("experience")}
              >
                $ experience
              </button>
              <button
                type="button"
                className={styles.terminalChipBtn}
                onClick={() => openChatbotWithQuery("contact")}
              >
                $ contact
              </button>
              <button
                type="button"
                className={styles.terminalChipBtn}
                onClick={() => openChatbotWithQuery("help")}
              >
                $ help
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Copilot Launcher Button (Viewport Corner) */}
      <button
        type="button"
        className={styles.floatingCopilotLauncher}
        onClick={toggleChatbotTerminal}
        aria-label={isChatbotOpen ? "Close Chatbot Terminal" : "Call Copilot Terminal"}
        id="floating-copilot-launcher"
      >
        <span className={styles.pulseIndicator} />
        <span>{isChatbotOpen ? "✕ Close Copilot" : "◬ Call Copilot Terminal"}</span>
      </button>

      {/* The Chatbot Terminal Window (Summoned by Copilot) */}
      {isChatbotOpen && (
        <div
          className={styles.chatbotTerminalWindow}
          id="chatbot-terminal-window"
          role="dialog"
          aria-label="AteizaTech Copilot Chatbot Terminal"
        >
          {/* Top Bar with Traffic Light Controls */}
          <div className={styles.chatbotTerminalHeader}>
            <div className={styles.chatbotTerminalDots}>
              <span
                className={`${styles.terminalDot} ${styles.terminalDotRed}`}
                onClick={() => setIsChatbotOpen(false)}
                title="Close Chatbot Terminal"
              />
              <span
                className={`${styles.terminalDot} ${styles.terminalDotYellow}`}
                onClick={() => setIsChatbotOpen(false)}
                title="Minimize Terminal"
              />
              <span
                className={`${styles.terminalDot} ${styles.terminalDotGreen}`}
                onClick={() => executeCommand("clear")}
                title="Clear Terminal Buffer"
              />
            </div>

            <div className={styles.chatbotTerminalTitle}>
              <span className={styles.pulseIndicator} />
              <span>bash: ateizatech-ai // copilot terminal</span>
            </div>

            <div className={styles.chatbotTerminalControls}>
              <button
                type="button"
                className={styles.chatbotHeaderBtn}
                onClick={() => executeCommand("clear")}
                title="Clear terminal logs"
              >
                [clear]
              </button>
              <button
                type="button"
                className={styles.chatbotCloseBtn}
                onClick={() => setIsChatbotOpen(false)}
                aria-label="Close Chatbot Terminal"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Command Filter Chips */}
          <div className={styles.chatbotQuickChipsBar}>
            <span className={styles.terminalChipLabel}>RUN:</span>
            <button
              type="button"
              className={styles.chatbotQuickChip}
              onClick={() => executeCommand("security")}
            >
              security
            </button>
            <button
              type="button"
              className={styles.chatbotQuickChip}
              onClick={() => executeCommand("projects")}
            >
              projects
            </button>
            <button
              type="button"
              className={styles.chatbotQuickChip}
              onClick={() => executeCommand("stack")}
            >
              stack
            </button>
            <button
              type="button"
              className={styles.chatbotQuickChip}
              onClick={() => executeCommand("experience")}
            >
              experience
            </button>
            <button
              type="button"
              className={styles.chatbotQuickChip}
              onClick={() => executeCommand("contact")}
            >
              contact
            </button>
            <button
              type="button"
              className={styles.chatbotQuickChip}
              onClick={() => executeCommand("help")}
            >
              help
            </button>
          </div>

          {/* Console Output Logs */}
          <div className={styles.chatbotConsoleLogs}>
            {messages.map((m, idx) => (
              <div key={idx} className={styles.chatbotLogEntry}>
                {m.sender === "system" && (
                  <div className={styles.chatbotLogSystem}>{m.text}</div>
                )}
                {m.sender === "user" && (
                  <div className={styles.chatbotLogUser}>
                    <span className={styles.chatbotLogUserPrefix}>
                      visitor@ateizatech:~$
                    </span>
                    <span>{m.text}</span>
                  </div>
                )}
                {m.sender === "agent" && (
                  <div className={styles.chatbotLogAgent}>
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

          {/* Interactive Shell Input Row */}
          <div className={styles.chatbotPromptRow}>
            <span className={styles.chatbotPromptPrefix}>visitor@ateizatech:~$</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.chatbotPromptInput}
              placeholder="Query security, projects, stack, or custom query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="chatbot-terminal-prompt-input"
            />
            <button
              type="button"
              className={styles.chatbotPromptBtn}
              onClick={handleSend}
              id="chatbot-terminal-send-btn"
            >
              Run ↵
            </button>
          </div>
        </div>
      )}
    </>
  );
}

