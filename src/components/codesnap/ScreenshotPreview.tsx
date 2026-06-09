"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { toPng } from "html-to-image";

interface ScreenshotPreviewProps {
  code: string;
  language: string;
  theme: "dark" | "light" | "nord" | "monokai";
  title: string;
}

const themeStyles: Record<string, { bg: string; fg: string; headerBg: string; accent: string }> = {
  dark: { bg: "#1e1e2e", fg: "#cdd6f4", headerBg: "#181825", accent: "#89b4fa" },
  light: { bg: "#ffffff", fg: "#1e1e2e", headerBg: "#f5f5f5", accent: "#3B82F6" },
  nord: { bg: "#2e3440", fg: "#d8dee9", headerBg: "#242933", accent: "#88c0d0" },
  monokai: { bg: "#272822", fg: "#f8f8f2", headerBg: "#1e1f1c", accent: "#a6e22e" },
};

const languages = [
  { id: "javascript", label: "JavaScript", ext: ".js" },
  { id: "typescript", label: "TypeScript", ext: ".ts" },
  { id: "jsx", label: "JSX", ext: ".jsx" },
  { id: "tsx", label: "TSX", ext: ".tsx" },
  { id: "python", label: "Python", ext: ".py" },
  { id: "html", label: "HTML", ext: ".html" },
  { id: "css", label: "CSS", ext: ".css" },
];

const sampleCodes: Record<string, string> = {
  typescript: `import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then((res) => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
  javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const fastFib = memoize(fibonacci);
console.log(fastFib(40));`,
  python: `from typing import List, Optional
from pydantic import BaseModel

class Task(BaseModel):
    id: int
    title: str
    completed: bool = False
    tags: List[str] = []

class TaskManager:
    def __init__(self):
        self.tasks: List[Task] = []

    def add_task(self, title: str, tags: Optional[List[str]] = None) -> Task:
        task = Task(
            id=len(self.tasks) + 1,
            title=title,
            tags=tags or []
        )
        self.tasks.append(task)
        return task

    def complete_task(self, task_id: int) -> Optional[Task]:
        for task in self.tasks:
            if task.id == task_id:
                task.completed = True
                return task
        return None`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  <main>
    <h1>Welcome to My App</h1>
    <p>This is a demo page.</p>
  </main>
</body>
</html>`,
  css: `:root {
  --primary: #3B82F6;
  --secondary: #6366F1;
  --background: #0a0a0a;
  --foreground: #f8f8f8;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", system-ui, sans-serif;
  background: var(--background);
  color: var(--foreground);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}`,
  jsx: `import React, { useState } from "react";

interface CounterProps {
  initialValue?: number;
}

export default function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      {count !== initialValue && (
        <button onClick={() => setCount(initialValue)}>Reset</button>
      )}
    </div>
  );
}`,
  tsx: `import { createContext, useContext, useReducer, type ReactNode } from "react";

interface AuthState {
  user: { id: string; name: string } | null;
  token: string | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: AuthState["user"]; token: string } }
  | { type: "LOGOUT" };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}`,
};

export default function ScreenshotPreview({
  code,
  language,
  theme: themeName,
  title,
}: ScreenshotPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState("");
  const [copying, setCopying] = useState(false);

  const curTheme = themeStyles[themeName];

  useEffect(() => {
    async function highlight() {
      if (!code) { setHighlighted(""); return; }
      try {
        const hljs = (await import("highlight.js")).default;
        const lang = language === "jsx" || language === "tsx" ? "javascript" : language;
        const result = hljs.highlight(code, { language: lang });
        setHighlighted(result.value);
      } catch {
        setHighlighted(code.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c)));
      }
    }
    highlight();
  }, [code, language]);

  const exportPng = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `${title || "codesnap"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  }, [title]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
  }, [code]);

  return (
    <div className="flex flex-col gap-4">
      {/* Preview */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Shadow glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-30"
          style={{ backgroundColor: curTheme.bg }}
        />
        <div
          ref={previewRef}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: curTheme.bg }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{
              backgroundColor: curTheme.headerBg,
              borderColor: `${curTheme.fg}10`,
            }}
          >
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* File name */}
            <div
              className="flex-1 text-center text-xs font-mono truncate mx-4"
              style={{ color: `${curTheme.fg}80` }}
            >
              {title}
            </div>
            {/* Language badge */}
            <div
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${curTheme.accent}15`,
                color: curTheme.accent,
                border: `1px solid ${curTheme.accent}20`,
              }}
            >
              {language}
            </div>
          </div>

          {/* Code */}
          <div className="p-5 overflow-x-auto">
            {highlighted ? (
              <pre
                className="font-mono text-sm leading-[1.65]"
                style={{ color: curTheme.fg }}
              >
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
            ) : code ? (
              <pre
                className="font-mono text-sm leading-[1.65] whitespace-pre"
                style={{ color: curTheme.fg }}
              >
                {code}
              </pre>
            ) : (
              <div
                className="font-mono text-sm py-8 text-center"
                style={{ color: `${curTheme.fg}40` }}
              >
                Start typing or paste your code
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={exportPng}
          disabled={!code}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-accent text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Export PNG
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!code}
          className="flex items-center justify-center gap-2 px-5 py-3 glass text-gray-300 text-sm font-medium rounded-xl transition-all duration-300 hover:bg-white/10 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
        >
          {copying ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export { languages, sampleCodes };
