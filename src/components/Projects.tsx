"use client";

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const projects = [
  {
    title: "Grahbook",
    tagline: "WhatsApp Commerce for Indian Merchants",
    description:
      "Built from the ground up as a full commerce platform for local Indian merchants who run their business through WhatsApp. The problem: small shops in India rely entirely on WhatsApp to chat with customers, but have no way to manage orders, payments, or inventory within the app. Grahbook turns any WhatsApp number into an AI-powered store — customers can browse catalogs, place orders, and pay via UPI without ever leaving the chat. The landing page features a WhatsApp phone mockup with live chat simulation, dark/light theme, and real-time merchant dashboard preview. The React dashboard shows AI-powered ledger entries, automated revenue tracking, and a bento-grid metrics layout — all animated with Framer Motion.",
    tech: ["React", "TypeScript", "Vite", "Framer Motion", "Firebase", "TailwindCSS"],
    gradient: "from-emerald-700/30 via-green-600/20 to-teal-600/20",
    accent: "bg-emerald-500",
    liveUrl: "https://grahbook.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/grahbook",
    metrics: ["WhatsApp Commerce", "AI Ledger", "UPI Payments"],
  },
  {
    title: "FormLabs",
    tagline: "Visual drag-and-drop form builder",
    description:
      "Built from scratch when I needed a faster way to ship forms for client projects. The problem: hand-coding every form field, styling, and state management was killing productivity. FormLabs lets you drag fields onto a canvas, configure properties in real-time, and export clean HTML or React code in one click. Used HTML5 Drag and Drop API — zero external dependencies for the core interaction. Ships complete forms with proper labels, validation, and state handling.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "highlight.js"],
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    liveUrl: "https://formlabs-eight.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/formlabs",
    metrics: ["11 Field Types", "Drag & Drop", "Code Export"],
  },
  {
    title: "CodeSnap",
    tagline: "AI-powered code screenshot tool",
    description:
      "I noticed developers spend time manually formatting code for social media posts and presentations. CodeSnap solves this with a live code editor (CodeMirror), syntax highlighting via highlight.js, and one-click PNG export at 2x resolution. Added an AI explain feature using GPT-4o-mini for when you need to quickly understand or present someone else's code. Four themes (Dark, Light, Nord, Monokai) cover the major presentation styles developers actually use.",
    tech: ["Next.js", "TypeScript", "CodeMirror", "AI", "html-to-image"],
    gradient: "from-sky-600/20 via-blue-600/20 to-indigo-600/20",
    accent: "bg-sky-500",
    liveUrl: "https://codesnap-eta.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/codesnap",
    metrics: ["Syntax Highlighting", "4 Themes", "AI Explain"],
  },
  {
    title: "JEE OS",
    tagline: "AI-powered exam preparation platform (in development)",
    description:
      "Currently building a comprehensive OS-like platform for JEE preparation. Focused on AI-powered study recommendations, real-time progress tracking, and personalized learning paths. The architecture uses Next.js with PostgreSQL and Prisma for the data layer, with AI recommendations powered by OpenAI.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AI"],
    gradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    accent: "bg-blue-500",
    liveUrl: "",
    githubUrl: "",
    metrics: ["In Development", "AI Powered", "Full Stack"],
  },
  {
    title: "AI Study Planner",
    tagline: "Smart scheduling with AI (in development)",
    description:
      "An intelligent study planner concept that uses AI to create optimized study schedules based on your learning patterns. The idea is to adapt in real-time as you progress, identifying weak areas and adjusting the curriculum automatically.",
    tech: ["React", "Node.js", "OpenAI", "PostgreSQL", "Redis"],
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    liveUrl: "",
    githubUrl: "",
    metrics: ["In Development", "Smart Scheduling", "Adaptive"],
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const liveAvailable = Boolean(project.liveUrl);
  const sourceAvailable = Boolean(project.githubUrl);

  return (
    <motion.div variants={staggerItem} className="group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="glass-hover rounded-2xl overflow-hidden h-full flex flex-col border border-white/[0.06] group-hover:border-accent/20 transition-colors duration-500"
      >
        <div
          className={`relative h-48 md:h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 text-center px-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white/90 tracking-tight">
              {project.title}
            </h3>
            <p className="text-white/40 text-sm mt-2 font-mono">
              {project.tagline}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 pb-4">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="px-2.5 py-1 text-[10px] font-mono bg-black/30 backdrop-blur rounded-full text-white/60 border border-white/10"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />
        </div>

        <div className="p-5 md:p-6 flex flex-col flex-1">
          <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs text-gray-300 bg-white/[0.03] rounded-full border border-white/[0.06] group-hover:border-accent/20 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {liveAvailable ? (
              <a
                href={project.liveUrl}
                className="relative px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] active:scale-95 group/btn"
              >
                <span className="relative z-10">Live Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
              </a>
            ) : (
              <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.03] text-gray-500 border border-white/[0.06]">
                Coming Soon
              </span>
            )}
            {sourceAvailable ? (
              <a
                href={project.githubUrl}
                className="px-5 py-2.5 glass text-gray-300 text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95 border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Source
                </span>
              </a>
            ) : (
              <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.03] text-gray-500 border border-white/[0.06]">
                Private
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-14 md:mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              Featured Projects
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Real products,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                real impact
              </span>
            </h2>
            <p className="text-gray-500 text-base mt-3 max-w-2xl">
              Each project is built with production in mind — real users, real data, real infrastructure.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-5 md:gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-lg mb-6">
              Want to dive deeper into any project?
            </p>
            <a
              href="/projects/grahbook"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 rounded-full text-sm font-medium text-gray-300 transition-all duration-300 border border-accent/20 hover:border-accent/40"
            >
              <span>View Project Details</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
