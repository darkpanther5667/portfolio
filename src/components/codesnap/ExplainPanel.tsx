"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExplainPanelProps {
  code: string;
  language: string;
}

export default function ExplainPanel({ code, language }: ExplainPanelProps) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    if (!code.trim()) return;

    setOpen(true);
    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const res = await fetch("/api/explain-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to explain");
      }

      setExplanation(data.explanation);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setExplanation("");
  };

  return (
    <>
      {/* Explain button */}
      <button
        onClick={handleExplain}
        disabled={!code.trim() || loading}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 bg-accent/10 text-accent-light hover:bg-accent/20 border border-accent/20 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {loading ? (
            <>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </>
          ) : (
            <>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </>
          )}
        </svg>
        {loading ? "Analyzing..." : "Explain with AI"}
      </button>

      {/* Explanation panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.04]"
          >
            <div className="p-4 bg-white/[0.01]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-200">AI Analysis</span>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error ? (
                <div className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                  {error}
                </div>
              ) : (
                <div className="text-xs text-gray-400 leading-relaxed">
                  {loading && !explanation ? (
                    <span className="text-gray-500 animate-pulse">Analyzing your code...</span>
                  ) : (
                    explanation || null
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
