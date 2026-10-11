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
    gradient: "from-indigo-500/[0.07] via-zinc-500/[0.03] to-transparent",
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
    gradient: "from-zinc-400/[0.06] via-indigo-500/[0.04] to-transparent",
    features: ["Dynamic Rescheduling", "Retention Tracking", "Topic Weakness AI"],
  },
];

function BuildingCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div variants={staggerItem} className="group">
      <div className="glass-hover rounded-2xl p-6 md:p-7 h-full border border-white/[0.06] group-hover:border-white/[0.14] transition-colors relative overflow-hidden flex flex-col">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                {project.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {project.status}
            </span>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
              <span>Milestone Progress</span>
              <span className="text-zinc-200">{project.progress}%</span>
            </div>
            <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-zinc-400 via-white to-indigo-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.06]">
            <div className="flex flex-wrap gap-1.5">
              {project.features.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 text-[10px] text-zinc-400 bg-white/[0.03] rounded-md border border-white/[0.05]"
                >
                  {f}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-mono text-zinc-300 hover:text-white transition-colors shrink-0"
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
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="mb-12 md:mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3 block">
              In The Lab
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-white">
              Currently{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-500">
                building next.
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
