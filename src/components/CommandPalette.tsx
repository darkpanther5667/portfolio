"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: string;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    { id: "projects", label: "Projects", description: "View all projects", icon: "", action: () => scrollTo("projects"), category: "Navigate" },
    { id: "about", label: "About", description: "Learn about me", icon: "", action: () => scrollTo("about"), category: "Navigate" },
    { id: "services", label: "Services", description: "What I offer", icon: "", action: () => scrollTo("services"), category: "Navigate" },
    { id: "contact", label: "Contact", description: "Get in touch", icon: "", action: () => scrollTo("contact"), category: "Navigate" },
    { id: "blog", label: "Blog", description: "Read articles", icon: "", action: () => window.location.href = "/blog", category: "Navigate" },
    { id: "grahbook", label: "Grahbook", description: "WhatsApp Commerce", icon: "", action: () => window.location.href = "/projects/grahbook", category: "Projects" },
    { id: "formlabs", label: "FormLabs", description: "Form Builder", icon: "", action: () => window.location.href = "/projects/formlabs", category: "Projects" },
    { id: "codesnap", label: "CodeSnap", description: "Code Screenshots", icon: "", action: () => window.location.href = "/projects/codesnap", category: "Projects" },
    { id: "github", label: "GitHub", description: "View GitHub profile", icon: "", action: () => window.open("https://github.com/darkpanther5667", "_blank"), category: "Social" },
    { id: "linkedin", label: "LinkedIn", description: "Connect on LinkedIn", icon: "", action: () => window.open("https://www.linkedin.com/in/manas-agrawal-2b0352320/", "_blank"), category: "Social" },
    { id: "x", label: "X (Twitter)", description: "Follow on X", icon: "", action: () => window.open("https://x.com/agrawalmanas150", "_blank"), category: "Social" },
    { id: "email", label: "Email", description: "contact@manasagrawal.online", icon: "", action: () => window.location.href = "mailto:contact@manasagrawal.online", category: "Contact" },
    { id: "top", label: "Back to Top", description: "Scroll to top", icon: "", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), category: "Navigate" },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Trigger button — desktop only */}
      <button
        onClick={() => {
          setIsOpen(true);
          setQuery("");
          setSelectedIndex(0);
        }}
        className="hidden md:flex fixed bottom-6 left-6 z-50 items-center gap-2 px-4 py-2.5 glass rounded-full text-sm text-gray-400 hover:text-white transition-colors border border-white/[0.06] hover:border-white/[0.12] touch-feedback"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span>Commands</span>
        <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] rounded border border-white/[0.08]">
          ⌘K
        </kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => {
          setIsOpen(true);
          setQuery("");
          setSelectedIndex(0);
        }}
        className="md:hidden fixed bottom-6 left-6 z-50 w-12 h-12 glass rounded-full flex items-center justify-center border border-white/[0.06] touch-feedback"
        aria-label="Open commands"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[15%] sm:top-[20%] left-1/2 -translate-x-1/2 z-[101] w-[92vw] max-w-lg"
            >
              <div className="glass rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search commands..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleItemKeyDown}
                    className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                  />
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-white/[0.04] rounded border border-white/[0.06]">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[50vh] overflow-y-auto py-2">
                  {filtered.length === 0 ? (
                    <div className="px-5 py-8 text-center text-sm text-gray-500">
                      No commands found
                    </div>
                  ) : (
                    filtered.map((cmd, i) => (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                          i === selectedIndex
                            ? "bg-white/[0.06] text-white"
                            : "text-gray-400 hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="text-base flex-shrink-0 w-6 text-center">{cmd.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{cmd.label}</div>
                          {cmd.description && (
                            <div className="text-xs text-gray-500 truncate">{cmd.description}</div>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-600 uppercase">{cmd.category}</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-white/[0.06] flex items-center gap-4 text-[10px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white/[0.04] rounded border border-white/[0.06]">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white/[0.04] rounded border border-white/[0.06]">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white/[0.04] rounded border border-white/[0.06]">esc</kbd>
                    close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}