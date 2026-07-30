"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../styles/Components.module.css";
import ragContext from "../data/rag_context.json";

interface ChatMessage {
  sender: "user" | "agent";
  text: string;
}

export default function AIAgent() {
  const [visible, setVisible] = useState<boolean>(false);
  const [docked, setDocked] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const logsEndRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const anchorTop = anchorRef.current?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const hasReachedAnchor = anchorTop <= window.innerHeight * 0.72;
      setDocked(hasReachedAnchor);
      setVisible(window.scrollY > 300 && !hasReachedAnchor);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // When agent triggers, slide in and show banner for 4s
  useEffect(() => {
    if (visible) {
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Scroll to bottom of chat logs when new messages are added
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initial welcome message inside chat logs
  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setMessages([
        {
          sender: "agent",
          text: `[ RAG-BOUNDARY SYSTEMS INITIALIZED ]\nHello, I am IamAdedo's AI assistant. Ask me about their stack, projects, availability, or email coordinates. Type your command.`,
        },
      ]);
    }
  }, [chatOpen, messages.length]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const newMessages = [...messages, { sender: "user" as const, text: userText }];
    setMessages(newMessages);
    setInputValue("");

    // Simulate thinking delay
    setTimeout(() => {
      const responseText = processQuery(userText);
      setMessages((prev) => [...prev, { sender: "agent" as const, text: responseText }]);
    }, 450);
  };

  const processQuery = (input: string): string => {
    const query = input.toLowerCase();

    // Check availability keywords
    if (
      query.includes("availab") ||
      query.includes("status") ||
      query.includes("hire") ||
      query.includes("job") ||
      query.includes("contract") ||
      query.includes("open")
    ) {
      const roles = ragContext.availability.roles.map((r) => `\n- ${r}`).join("");
      const regions = ragContext.availability.regions.join(", ");
      return `[ AVAILABILITY LEDGER ]\nStatus: ${ragContext.availability.status}\nPreferred Roles: ${roles}\nLocations: ${regions}\n${ragContext.system_instructions.fallback_contact_cta}`;
    }

    // Check stack keywords
    if (
      query.includes("stack") ||
      query.includes("tech") ||
      query.includes("language") ||
      query.includes("framework") ||
      query.includes("rust") ||
      query.includes("go") ||
      query.includes("typescript") ||
      query.includes("react") ||
      query.includes("next")
    ) {
      return `[ ENGINEERING STACK ]\nFrontend: ${ragContext.stack.frontend.join(", ")}\nBackend: ${ragContext.stack.backend.join(", ")}\nInfrastructure: ${ragContext.stack.infrastructure.join(", ")}`;
    }

    // Check project keywords
    if (
      query.includes("project") ||
      query.includes("work") ||
      query.includes("agrilink") ||
      query.includes("aeneas") ||
      query.includes("pulseflow") ||
      query.includes("helix") ||
      query.includes("hydra")
    ) {
      const details = ragContext.projects
        .map((p) => `\n* ${p.name}: ${p.summary}`)
        .join("");
      return `[ PROJECT ARCHIVE ]\nFlagship structures:${details}\nFor detailed metrics, please review the Projects subpage.`;
    }

    // Check contact coordinates
    if (
      query.includes("email") ||
      query.includes("contact") ||
      query.includes("address") ||
      query.includes("cv") ||
      query.includes("resume")
    ) {
      return `[ DIRECT CHANNELS ]\nEmail: ${ragContext.developer.email}\nResume: ${ragContext.developer.resumeUrl}\nFeel free to write to the direct address for rapid response.`;
    }

    // System instruction: refuse off-topic questions
    return ragContext.system_instructions.strict_boundary_reply;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const isDisplayed = visible || docked;

  return (
    <section ref={anchorRef} className={styles.agentAnchor} aria-label="AI assistant">
      <div
        className={`${styles.agentWrapper} ${docked ? styles.agentWrapperDocked : ""} ${
          isDisplayed ? styles.agentWrapperVisible : styles.agentWrapperHidden
        }`}
        id="ai-agent-wrapper"
      >
      {/* Introduction banner (4s timer) */}
      {showBanner && !chatOpen && (
        <div className={styles.agentBanner} id="ai-agent-banner">
          👋 Need answers quick? Ask my RAG Agent about my stack and availability!
        </div>
      )}

      {/* Floating Chat console window */}
      {chatOpen && (
        <div className={styles.chatBox} id="ai-chat-console">
          <div className={styles.chatHeader}>
            <div className={styles.chatTitle}>
              <span className={styles.pulseIndicator}></span>
              RAG_SYSTEM_SHELL v1.0
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className={styles.chatCloseBtn}
              id="close-chat-btn"
            >
              [X]
            </button>
          </div>

          <div className={styles.chatLogs}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.chatMsg} ${
                  msg.sender === "user" ? styles.chatMsgUser : styles.chatMsgAgent
                }`}
                style={{ whiteSpace: "pre-line" }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          <div className={styles.chatInputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Query stack, projects, status..."
              className={styles.chatInput}
              id="chat-input"
            />
            <button
              onClick={handleSendMessage}
              className={styles.chatSendBtn}
              id="send-chat-btn"
            >
              Run
            </button>
          </div>
        </div>
      )}

      {docked && (
        <div className={styles.agentDockCard}>
          <div className={styles.agentDockEyebrow}>[ AI SYSTEMS DESK ]</div>
          <h2 className={styles.agentDockTitle}>Have a question before we connect?</h2>
          <p className={styles.agentDockCopy}>
            Ask about IamAdedo&apos;s projects, engineering stack, availability, or the best way to get in touch.
          </p>
        </div>
      )}

      {/* Trigger floating action button */}
      <div className={styles.agentLauncherContainer}>
        <div className={styles.agentTooltip}>Interactive AI Systems Interface</div>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`${styles.agentLauncher} ${chatOpen ? styles.agentLauncherActive : ""}`}
          id="toggle-ai-launcher"
        >
          <span className={styles.agentLauncherIcon}>{chatOpen ? "+" : "🤖"}</span>
        </button>
      </div>
      </div>
    </section>
  );
}
