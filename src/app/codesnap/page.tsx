"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () => import("@/components/codesnap/CodeEditor"),
  { ssr: false }
);

import ScreenshotPreview, {
  languages,
  sampleCodes,
} from "@/components/codesnap/ScreenshotPreview";
import ExplainPanel from "@/components/codesnap/ExplainPanel";

const themes = [
  { id: "dark" as const, label: "Dark" },
  { id: "light" as const, label: "Light" },
  { id: "nord" as const, label: "Nord" },
  { id: "monokai" as const, label: "Monokai" },
];

export default function CodeSnapPage() {
  const [code, setCode] = useState(sampleCodes.typescript);
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState("dark");
  const [title, setTitle] = useState("app.tsx");

  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang);
    setCode(sampleCodes[lang] || sampleCodes.typescript);
    const langInfo = languages.find((l) => l.id === lang);
    setTitle(`app${langInfo?.ext || ".tsx"}`);
  }, []);

  const presetCode = useCallback((lang: string) => {
    setLanguage(lang);
    setCode(sampleCodes[lang] || sampleCodes.typescript);
    const langInfo = languages.find((l) => l.id === lang);
    setTitle(`app${langInfo?.ext || ".tsx"}`);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/[0.04] bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Portfolio</span>
            </a>
            <span className="text-gray-700/50">/</span>
            <span className="text-sm font-semibold text-white tracking-tight">
              CodeSnap
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-accent/60 bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">
              AI-Powered
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {languages.slice(0, 4).map((lang) => (
              <button
                key={lang.id}
                onClick={() => presetCode(lang.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  language === lang.id
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left panel - Editor */}
        <div className="lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.04]">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1.5 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent/40 transition-colors"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-medium hidden sm:block">Theme</label>
              <div className="flex gap-1 bg-white/[0.03] p-0.5 rounded-lg border border-white/[0.06]">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`w-5 h-5 rounded-md transition-all duration-200 ${
                      theme === t.id
                        ? "ring-1 ring-accent/40 scale-110"
                        : "opacity-50 hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        t.id === "dark"
                          ? "#1e1e2e"
                          : t.id === "light"
                          ? "#ffffff"
                          : t.id === "nord"
                          ? "#2e3440"
                          : "#272822",
                    }}
                    title={t.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0">
              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
              />
            </div>
            <ExplainPanel code={code} language={language} />
          </div>
        </div>

        {/* Right panel - Preview */}
        <div className="lg:w-1/2 flex flex-col bg-white/[0.01]">
          {/* Preview toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-xs text-gray-500 font-medium">Preview</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-2.5 py-1.5 text-xs text-gray-300 font-mono w-28 focus:outline-none focus:border-accent/40 transition-colors"
                placeholder="filename.tsx"
              />
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl"
            >
              <ScreenshotPreview
                code={code}
                language={language}
                theme={theme as "dark" | "light" | "nord" | "monokai"}
                title={title}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
