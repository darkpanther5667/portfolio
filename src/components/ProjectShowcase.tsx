"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "grahbook",
    title: "Grahbook",
    tagline: "WhatsApp Commerce for Indian Merchants",
    gradient: "from-emerald-600 to-teal-500",
    accent: "#10b981",
    tech: ["React", "Firebase", "TailwindCSS"],
    metrics: ["WhatsApp Commerce", "AI Ledger", "UPI Payments"],
    liveUrl: "https://grahbook.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/grahbook",
  },
  {
    id: "formlabs",
    title: "FormLabs",
    tagline: "Visual drag-and-drop form builder",
    gradient: "from-teal-600 to-cyan-500",
    accent: "#14b8a6",
    tech: ["Next.js", "Framer Motion", "highlight.js"],
    metrics: ["11 Field Types", "Drag & Drop", "Code Export"],
    liveUrl: "https://formlabs-eight.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/formlabs",
  },
  {
    id: "codesnap",
    title: "CodeSnap",
    tagline: "AI-powered code screenshot tool",
    gradient: "from-sky-600 to-blue-500",
    accent: "#0ea5e9",
    tech: ["Next.js", "CodeMirror", "GPT-4o-mini"],
    metrics: ["Syntax Highlighting", "4 Themes", "AI Explain"],
    liveUrl: "https://codesnap-eta.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/codesnap",
  },
  {
    id: "jee-os",
    title: "JEE OS",
    tagline: "AI-powered exam preparation",
    gradient: "from-blue-600 to-purple-500",
    accent: "#3b82f6",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    metrics: ["In Development", "AI Powered", "Full Stack"],
    liveUrl: "",
    githubUrl: "",
  },
];

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % projects.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[active];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? -15 : 15,
    }),
  };

  return (
    <div className="w-full max-w-5xl mx-auto" ref={containerRef}>
      {/* Main showcase card */}
      <div className="relative perspective-[1200px] mb-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="glass-hover rounded-3xl overflow-hidden border border-white/[0.06]">
              {/* Project header */}
              <div className={`relative h-48 sm:h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Floating dots */}
                <div className="absolute inset-0">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/20"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Title */}
                <div className="relative z-10 text-center px-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/90 tracking-tight"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/50 text-sm sm:text-base mt-3 font-mono"
                  >
                    {project.tagline}
                  </motion.p>
                </div>

                {/* Nav arrows */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all touch-feedback z-20"
                  aria-label="Previous project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all touch-feedback z-20"
                  aria-label="Next project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                {/* Metric pills */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 sm:gap-3 px-4">
                  {project.metrics.map((m, i) => (
                    <motion.span
                      key={m}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="px-3 py-1.5 text-[10px] sm:text-xs font-mono bg-black/30 backdrop-blur-sm rounded-full text-white/70 border border-white/10"
                    >
                      {m}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Info section */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs text-gray-300 bg-white/[0.04] rounded-full border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 touch-feedback"
                      style={{ backgroundColor: project.accent, color: "white" }}
                    >
                      Live Demo
                    </a>
                  ) : (
                    <span className="px-6 py-2.5 rounded-full text-sm font-medium bg-white/[0.04] text-gray-500 border border-white/[0.06]">
                      Coming Soon
                    </span>
                  )}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 glass text-gray-300 text-sm font-medium rounded-full border border-white/[0.08] hover:bg-white/[0.06] transition-all touch-feedback"
                    >
                      Source
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-3">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full touch-feedback ${
              i === active
                ? "w-8 h-2"
                : "w-2 h-2 bg-white/15 hover:bg-white/25"
            }`}
            style={i === active ? { backgroundColor: p.accent } : undefined}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </div>
  );
}