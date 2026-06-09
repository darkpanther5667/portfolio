"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "FormLabs",
    tagline: "Visual drag-and-drop form builder",
    description:
      "A browser-based form builder that lets you drag, drop, and configure form fields in real-time. Export clean HTML or React code with a single click. Built with native HTML5 Drag and Drop API — no extra dependencies.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "highlight.js"],
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    liveUrl: "/formlabs",
    githubUrl: "#",
    metrics: ["11 Field Types", "Drag & Drop", "Code Export"],
    internal: true,
  },
  {
    title: "CodeSnap",
    tagline: "AI-powered code screenshot tool",
    description:
      "A beautiful code screenshot tool with syntax highlighting, multiple themes, and AI-powered code explanations. Write or paste code, choose your style, and export stunning PNG screenshots perfect for sharing on social media, presentations, or documentation.",
    tech: ["Next.js", "TypeScript", "CodeMirror", "AI", "html-to-image"],
    gradient: "from-sky-600/20 via-blue-600/20 to-indigo-600/20",
    accent: "bg-sky-500",
    liveUrl: "/codesnap",
    githubUrl: "#",
    metrics: ["Syntax Highlighting", "4 Themes", "AI Explain"],
    internal: true,
  },
  {
    title: "JEE OS",
    tagline: "AI-powered exam preparation platform",
    description:
      "A comprehensive OS-like platform for JEE preparation with AI-powered study recommendations, real-time progress tracking, personalized learning paths, and mock test analytics. Built to handle thousands of concurrent users with sub-100ms response times.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AI"],
    gradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    accent: "bg-blue-500",
    liveUrl: "#",
    githubUrl: "#",
    metrics: ["1.2k+ Users", "99.9% Uptime", "<100ms Latency"],
  },
  {
    title: "AI Study Planner",
    tagline: "Smart scheduling powered by artificial intelligence",
    description:
      "An intelligent study planner using AI to create optimized study schedules based on your learning style, goals, and available time. Adapts in real-time as you progress, identifies weak areas, and adjusts the curriculum.",
    tech: ["React", "Node.js", "OpenAI", "PostgreSQL", "Redis"],
    gradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    liveUrl: "#",
    githubUrl: "#",
    metrics: ["AI-Powered", "Real-time Sync", "Smart Alerts"],
  },
  {
    title: "Startup Landing Page",
    tagline: "High-conversion marketing template",
    description:
      "A premium landing page template for startups launching their MVP. Features A/B testing, analytics integration, smooth page transitions, SEO optimization, and modular components. 95+ Lighthouse scores.",
    tech: ["Next.js", "Framer Motion", "TailwindCSS", "Vercel", "MDX"],
    gradient: "from-violet-600/20 via-indigo-600/20 to-blue-600/20",
    accent: "bg-violet-500",
    liveUrl: "#",
    githubUrl: "#",
    metrics: ["98% A11y", "95+ LH", "0.3s FCP"],
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
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
            <a
              href={project.liveUrl}
              className="relative px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] active:scale-95 group/btn"
            >
              <span className="relative z-10">Live Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
            </a>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
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
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
