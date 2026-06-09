"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "JEE OS",
    description:
      "Building a comprehensive AI-powered platform to help students prepare for JEE with personalized learning paths and real-time analytics.",
    status: "Active Development",
    statusColor: "bg-accent",
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    features: ["AI Recommendations", "Real-time Analytics", "Mock Tests"],
  },
  {
    name: "AI Study Planner",
    description:
      "Developing an intelligent scheduler that adapts to your learning patterns and optimizes study time using reinforcement learning.",
    status: "Active Development",
    statusColor: "bg-accent",
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    features: ["Smart Scheduling", "Progress Tracking", "Adaptive Learning"],
  },
  {
    name: "CodeSnap",
    description:
      "AI-powered code screenshot tool now live — syntax highlighting, 4 themes, PNG export with 2x resolution, and AI code explanations.",
    status: "Recently Launched",
    statusColor: "bg-emerald-500",
    gradient: "from-sky-500/10 via-blue-500/10 to-indigo-500/10",
    features: ["Syntax Highlighting", "4 Themes", "AI Explain", "PNG Export"],
  },
  {
    name: "FormLabs",
    description:
      "A visual drag-and-drop form builder now live — add 11 field types, configure properties in real-time, and export clean HTML or React code.",
    status: "Recently Launched",
    statusColor: "bg-emerald-500",
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    features: ["11 Field Types", "Drag & Drop", "Code Export", "Live Preview"],
  },
];

function BuildingCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -3 }}
      className="group"
    >
      <div className="glass-hover rounded-xl p-5 md:p-6 h-full border border-white/[0.04] group-hover:border-white/[0.1] transition-colors relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-white">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono ${
                project.statusColor === "bg-accent"
                  ? "bg-accent/10 text-accent-light border border-accent/20"
                  : project.statusColor === "bg-amber-500"
                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  : project.statusColor === "bg-emerald-500"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "bg-violet-500/10 text-violet-300 border border-violet-500/20"
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${project.statusColor}`} />
              {project.status}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.features.map((f) => (
              <span
                key={f}
                className="px-2 py-1 text-[11px] text-gray-500 bg-white/[0.03] rounded-md border border-white/[0.04]"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="py-24 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.015] via-transparent to-accent/[0.015] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            Currently Building
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            What I&apos;m working on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              right now
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project, index) => (
            <BuildingCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
