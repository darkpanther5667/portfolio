"use client";

import { useState, useEffect } from "react";

export default function BackgroundEffects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-1/4 -right-1/4 w-[200px] h-[200px] rounded-full bg-accent/3 blur-[60px]" />
        <div className="absolute -top-1/3 left-0 w-[150px] h-[150px] rounded-full bg-accent/2 blur-[50px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] rounded-full bg-accent/5 blur-[150px] animate-pulse-glow"
      />
      <div
        className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-purple-500/4 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="absolute -top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] animate-gradient"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute -bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/3 blur-[100px] animate-gradient"
        style={{ animationDelay: "-10s" }}
      />

      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}