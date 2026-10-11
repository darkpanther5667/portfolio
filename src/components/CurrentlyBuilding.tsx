"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const projects = [
  {
    slug: "jee-os",
    name: "JEE OS",
    description:
      "A comprehensive OS-like platform for JEE preparation featuring AI-powered study recommendations, real-time analytics, and adaptive mock testing.",
    status: "Active R&D",
    progress: 65,
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI"],
    gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
    features: ["AI Study Paths", "Real-time Analytics", "Adaptive Mock Tests"],
  },
  {
    slug: "ai-study-planner",
    name: "AI Study Planner",
    description:
      "An adaptive scheduling engine that reshapes daily study blocks in real time based on retention curves, weak-topic detection, and session velocity.",
    status: "Architecture & Prototype",
    progress: 45,
    stack: ["React", "Node.js", "OpenAI", "PostgreSQL", "Redis"],
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    features: ["Dynamic Rescheduling", "Retention Tracking", "Topic Weakness AI"],
  },
];

function BuildingCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div variants={staggerItem} className="group">
      <div className="glass-hover rounded-2xl p-6 md:p-7 h-full border border-white/[0.06] group-hover:border-accent/25 transition-colors relative overflow-hidden flex flex-col">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
        />
        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-accent/10 text-accent-light border border-accent/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {project.status}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
              <span>Milestone Progress</span>
              <span className="text-accent-light">{project.progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
            <div className="flex flex-wrap gap-1.5">
              {project.features.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 text-[10px] text-gray-400 bg-white/[0.03] rounded-md border border-white/[0.04]"
                >
                  {f}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-mono text-accent-light hover:text-white transition-colors shrink-0"
            >
              Specs &rarr;
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="section-deferred py-20 md:py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.015] via-transparent to-accent/[0.015] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="mb-12 md:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              In The Lab
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              Currently{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                building next
              </span>
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-4 md:gap-5"
        >
          {projects.map((project) => (
            <BuildingCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
