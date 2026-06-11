"use client";

import { useEffect, useState } from "react";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

interface SectionColor {
  id: string;
  gradient: string;
  glow: string;
}

const sectionColors: SectionColor[] = [
  { id: "hero", gradient: "from-blue-900/20 via-transparent to-transparent", glow: "rgba(59,130,246,0.06)" },
  { id: "projects", gradient: "from-emerald-900/15 via-transparent to-transparent", glow: "rgba(16,185,129,0.05)" },
  { id: "services", gradient: "from-purple-900/15 via-transparent to-transparent", glow: "rgba(139,92,246,0.05)" },
  { id: "process", gradient: "from-cyan-900/15 via-transparent to-transparent", glow: "rgba(6,182,212,0.05)" },
  { id: "about", gradient: "from-indigo-900/15 via-transparent to-transparent", glow: "rgba(99,102,241,0.05)" },
  { id: "journey", gradient: "from-violet-900/15 via-transparent to-transparent", glow: "rgba(139,92,246,0.05)" },
  { id: "why-me", gradient: "from-rose-900/15 via-transparent to-transparent", glow: "rgba(244,63,94,0.05)" },
  { id: "stats", gradient: "from-amber-900/10 via-transparent to-transparent", glow: "rgba(245,158,11,0.04)" },
  { id: "contact", gradient: "from-blue-900/20 via-transparent to-transparent", glow: "rgba(59,130,246,0.06)" },
];

export default function ScrollBackgroundShift() {
  const [activeSection, setActiveSection] = useState("hero");
  const isDesktop = useDesktopEffects();

  useEffect(() => {
    // Use IntersectionObserver instead of scroll events
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const id = entry.target.id;
            if (sectionColors.some((s) => s.id === id)) {
              setActiveSection(id);
            }
          }
        }
      },
      {
        threshold: [0.3, 0.5],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionColors.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const current = sectionColors.find((s) => s.id === activeSection) || sectionColors[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div
        className={`absolute inset-0 bg-gradient-to-b ${current.gradient} transition-all duration-1000 ease-out`}
      />

      {isDesktop && (
        <>
          <div
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[200px] transition-all duration-1000 ease-out"
            style={{ background: current.glow }}
          />

          <div
            className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] transition-all duration-1000 ease-out"
            style={{ background: current.glow }}
          />
        </>
      )}

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {sectionColors.map((s) => (
          <div
            key={s.id}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeSection === s.id
                ? "bg-accent scale-150"
                : "bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}