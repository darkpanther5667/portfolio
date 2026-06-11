"use client";

import { useState, useEffect } from "react";

export default function BackgroundEffects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute -bottom-1/4 -right-1/4 rounded-full bg-accent/5 blur-[150px] animate-pulse-glow ${
          isMobile ? "w-[300px] h-[300px]" : "w-[900px] h-[900px]"
        }`}
      />
      <div
        className={`absolute -top-1/4 -right-1/4 rounded-full bg-purple-500/4 blur-[140px] animate-pulse-glow ${
          isMobile ? "w-[250px] h-[250px]" : "w-[700px] h-[700px]"
        }`}
        style={{ animationDelay: "-2s" }}
      />
      <div
        className={`absolute -top-1/3 left-0 rounded-full bg-accent/3 blur-[120px] animate-gradient ${
          isMobile ? "w-[200px] h-[200px]" : "w-[500px] h-[500px]"
        }`}
        style={{ animationDelay: "-5s" }}
      />
      <div
        className={`absolute -bottom-1/3 left-1/4 rounded-full bg-blue-400/3 blur-[100px] animate-gradient ${
          isMobile ? "w-[180px] h-[180px]" : "w-[400px] h-[400px]"
        }`}
        style={{ animationDelay: "-10s" }}
      />

      <div
        className={`absolute inset-0 ${isMobile ? "opacity-[0.008]" : "opacity-[0.012]"}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: isMobile ? "48px 48px" : "64px 64px",
        }}
      />
    </div>
  );
}