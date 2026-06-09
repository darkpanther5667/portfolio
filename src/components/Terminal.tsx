"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CommandHandler = (args: string[]) => string | React.ReactNode;

const commands: Record<string, { desc: string; handler: CommandHandler }> = {
  help: {
    desc: "Show available commands",
    handler: () => (
      <div className="space-y-1">
        <p className="text-accent/80 font-semibold mb-2">Available commands:</p>
        {Object.entries(commands).map(([cmd, val]) => (
          <div key={cmd} className="flex gap-4">
            <span className="text-accent font-mono w-20 shrink-0">{cmd}</span>
            <span className="text-gray-500">{val.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  whoami: {
    desc: "About me",
    handler: () => (
      <div>
        <p className="text-gray-300">
          AI Product Builder &amp; Full Stack Developer. I build real products — from concept to deployment.
          Specialize in Next.js, TypeScript, and AI integration. Currently shipping CodeSnap and FormLabs.
        </p>
      </div>
    ),
  },
  skills: {
    desc: "List tech skills",
    handler: () => (
      <div>
        <p className="text-accent/80 font-semibold mb-2">Tech Stack:</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <span className="text-gray-400">Frontend:</span>
          <span className="text-gray-200">React, Next.js, TypeScript, TailwindCSS</span>
          <span className="text-gray-400">Backend:</span>
          <span className="text-gray-200">Node.js, PostgreSQL, Prisma, REST APIs</span>
          <span className="text-gray-400">AI/ML:</span>
          <span className="text-gray-200">OpenAI, Vercel AI SDK, LLM Integration</span>
          <span className="text-gray-400">Tools:</span>
          <span className="text-gray-200">Git, Docker, Vercel, Framer Motion</span>
        </div>
      </div>
    ),
  },
  projects: {
    desc: "Show featured projects",
    handler: () => (
      <div>
        <p className="text-accent/80 font-semibold mb-2">Featured Projects:</p>
        <div className="space-y-2">
          <div>
            <span className="text-emerald-400 font-mono">FormLabs</span>
            <span className="text-gray-500 ml-2">— Visual drag-and-drop form builder</span>
          </div>
          <div>
            <span className="text-sky-400 font-mono">CodeSnap</span>
            <span className="text-gray-500 ml-2">— AI-powered code screenshot tool</span>
          </div>
          <div>
            <span className="text-amber-400 font-mono">JEE OS</span>
            <span className="text-gray-500 ml-2">— AI exam prep platform (in dev)</span>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-2">Type "open formlabs" or "open codesnap" to visit.</p>
      </div>
    ),
  },
  open: {
    desc: "Open a project (formlabs | codesnap)",
    handler: (args) => {
      const target = args[0];
      if (target === "formlabs") {
        if (typeof window !== "undefined") window.open("https://formlabs-eight.vercel.app", "_blank");
        return <span className="text-emerald-400">Opening FormLabs...</span>;
      }
      if (target === "codesnap") {
        if (typeof window !== "undefined") window.open("https://codesnap-eta.vercel.app", "_blank");
        return <span className="text-sky-400">Opening CodeSnap...</span>;
      }
      return <span className="text-red-400">Unknown project. Try "formlabs" or "codesnap".</span>;
    },
  },
  contact: {
    desc: "Show contact information",
    handler: () => (
      <div>
        <p className="text-accent/80 font-semibold mb-2">Contact:</p>
        <p className="text-gray-400">
          Email:{" "}
          <a href="mailto:hello@example.com" className="text-accent hover:underline">
            hello@example.com
          </a>
        </p>
        <p className="text-gray-400">
          GitHub:{" "}
          <a href="https://github.com/darkpanther5667" target="_blank" className="text-accent hover:underline">
            darkpanther5667
          </a>
        </p>
        <p className="text-gray-500 text-xs mt-2">Type "hire" to start a conversation.</p>
      </div>
    ),
  },
  hire: {
    desc: "Start the hiring process",
    handler: () => (
      <div>
        <p className="text-emerald-400 font-semibold mb-2">
          🚀 Great choice! Here's how to hire me:
        </p>
        <p className="text-gray-300 mb-3">
          1. <span className="text-accent">Email me</span> at hello@example.com with your project details
        </p>
        <p className="text-gray-300 mb-3">
          2. <span className="text-accent">Schedule a free call</span> — we discuss scope, timeline, and budget
        </p>
        <p className="text-gray-300 mb-3">
          3. I ship your product in <span className="text-accent">weekly iterations</span>
        </p>
        <p className="text-gray-500 text-xs">
          Or type "email" to pre-fill a message right now.
        </p>
      </div>
    ),
  },
  email: {
    desc: "Pre-fill a hiring email",
    handler: () => {
      const subject = encodeURIComponent("Let's work together");
      const body = encodeURIComponent(
        "Hi,\n\nI came across your portfolio and I'm impressed by your work. I'd like to discuss a project.\n\nBrief: [describe your project]\nTimeline: [your timeline]\nBudget: [your budget]\n\nLooking forward to hearing from you."
      );
      if (typeof window !== "undefined")
        window.open(`mailto:hello@example.com?subject=${subject}&body=${body}`, "_blank");
      return <span className="text-emerald-400">Opening email draft...</span>;
    },
  },
  clear: {
    desc: "Clear the terminal",
    handler: () => "",
  },
  experience: {
    desc: "Show work experience",
    handler: () => (
      <div>
        <p className="text-accent/80 font-semibold mb-2">Experience:</p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-200 font-medium">AI Product Builder</span>
            <span className="text-gray-600 ml-2">• Freelance • Present</span>
            <p className="text-gray-500 text-xs">Building AI-powered web apps, form builders, and developer tools.</p>
          </div>
          <div>
            <span className="text-gray-200 font-medium">Full Stack Developer</span>
            <span className="text-gray-600 ml-2">• Freelance</span>
            <p className="text-gray-500 text-xs">End-to-end product development from concept to deployment.</p>
          </div>
        </div>
      </div>
    ),
  },
  cls: {
    desc: "Clear the terminal",
    handler: () => "",
  },
};

interface TerminalLine {
  type: "input" | "output";
  content: string | React.ReactNode;
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content: (
        <div>
          <p className="text-accent font-mono mb-2">
            ╔═══╗╔═══╗╔════╗╔═══╗╔═══╗╔╗──╔╗╔═══╗╔═══╗
          </p>
          <p className="text-accent font-mono mb-2">
            ╚══╗║║╔═╝║║╔╗╔╗║║╔══╝║╔══╝║║──║║║╔═╗║║╔═╗║
          </p>
          <p className="text-accent font-mono mb-2">
            ─╔╝╔╝║╚═╗║║║║║║║║╚══╗║╚══╗║╚╗╔╝║║╚═╝║║╚═╝║
          </p>
          <p className="text-accent font-mono mb-2">
            ╔╝╔╝─║╔╗║║║║║║║║║╔══╝║╔══╝║╔╗╔╗║║╔╗╔╝║╔╗╔╝
          </p>
          <p className="text-accent font-mono mb-2">
            ╔╝╔╝─║╚═╝║║║║║║║║╚══╗║╚══╗║║╚╝║║║║║╚╗║║║╚╗
          </p>
          <p className="text-accent font-mono mb-2">
            ╚══╝─╚═══╝╚╝╚╝╚╝╚═══╝╚═══╝╚╝──╚╝╚╝╚═╝╚╝╚═╝
          </p>
          <div className="border-t border-accent/20 my-3" />
          <p className="text-gray-400 font-mono text-sm">
            Welcome to the developer terminal. Type{" "}
            <span className="text-accent">help</span> for commands.
          </p>
          <p className="text-gray-600 font-mono text-xs mt-1">
            Try: whoami · skills · projects · hire · contact
          </p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input" as const, content: `$ ${input}` },
    ];

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    if (commands[cmd]) {
      const result = commands[cmd].handler(args);
      if (cmd === "clear" || cmd === "cls") {
        setLines([]);
        setInput("");
        return;
      }
      newLines.push({ type: "output", content: result || "" });
    } else {
      newLines.push({
        type: "output",
        content: (
          <span className="text-red-400">
            Unknown command: {cmd}. Type <span className="text-accent">help</span> for available commands.
          </span>
        ),
      });
    }

    setLines(newLines);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 backdrop-blur-xl flex items-center justify-center hover:bg-accent/20 transition-all duration-200 active:scale-90 group"
        title="Open Terminal"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent group-hover:scale-110 transition-transform">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[60vh] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50"
            style={{ backgroundColor: "#0d0d1a" }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-gray-600 font-mono ml-2">developer@portfolio:~$</span>
              <div className="flex-1" />
              <span className="text-[10px] text-gray-700 font-mono">Interactive Terminal</span>
            </div>

            {/* Terminal body */}
            <div className="h-[calc(100%-80px)] overflow-y-auto p-4 font-mono text-sm" style={{ backgroundColor: "#0d0d1a" }}>
              {lines.map((line, i) =>
                line.content ? (
                  <div key={i} className={`mb-1 ${line.type === "input" ? "text-gray-400" : "text-gray-300"}`}>
                    {line.content}
                  </div>
                ) : null
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.02]"
            >
              <span className="text-accent font-mono text-sm shrink-0">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm text-gray-200 font-mono placeholder-gray-700 focus:outline-none"
                placeholder="Type help for commands..."
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
