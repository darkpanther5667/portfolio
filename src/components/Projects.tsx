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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

interface FeaturedProject {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
  accent: string;
  liveUrl: string;
  internalAppUrl?: string;
  githubUrl: string;
  metrics: string[];
  featured?: boolean;
}

const projects: FeaturedProject[] = [
  {
    slug: "grahbook",
    title: "Grahbook",
    tagline: "WhatsApp Commerce for Indian Merchants",
    description:
      "Built from the ground up as a full commerce platform for local Indian merchants who run their business through WhatsApp. Turns any WhatsApp number into an AI-powered store — customers browse catalogs, place orders, and pay via UPI without leaving the chat, backed by an AI ledger and real-time revenue analytics.",
    tech: ["React", "TypeScript", "Vite", "Framer Motion", "Firebase", "TailwindCSS"],
    gradient: "from-emerald-700/30 via-green-600/20 to-teal-600/20",
    accent: "bg-emerald-500",
    liveUrl: "https://grahbook.vercel.app",
    githubUrl: "https://github.com/darkpanther5667/grahbook",
    metrics: ["WhatsApp Commerce", "AI Ledger", "UPI Payments"],
    featured: true,
  },
  {
    slug: "formlabs",
    title: "FormLabs",
    tagline: "Visual drag-and-drop form builder",
    description:
      "Built from scratch to ship forms 5x faster for client projects. Drag 11 field types onto a live canvas, configure validation and properties in real time, and export clean, production-ready HTML or React code in one click with zero external drag-and-drop dependencies.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "highlight.js"],
    gradient: "from-teal-600/25 via-emerald-600/20 to-cyan-600/20",
    accent: "bg-teal-500",
    liveUrl: "https://formlabs-eight.vercel.app",
    internalAppUrl: "/formlabs",
    githubUrl: "https://github.com/darkpanther5667/formlabs",
    metrics: ["11 Field Types", "Drag & Drop", "1-Click React/HTML Export"],
  },
  {
    slug: "codesnap",
    title: "CodeSnap",
    tagline: "AI-powered code screenshot & explain tool",
    description:
      "A live CodeMirror editor with syntax highlighting via highlight.js, 4 presentation themes (Dark, Light, Nord, Monokai), one-click 2x PNG export, and an integrated GPT-4o-mini AI Explain assistant to break down complex code snippets in seconds.",
    tech: ["Next.js", "TypeScript", "CodeMirror", "GPT-4o-mini", "html-to-image"],
    gradient: "from-sky-600/25 via-blue-600/20 to-indigo-600/20",
    accent: "bg-sky-500",
    liveUrl: "https://codesnap-eta.vercel.app",
    internalAppUrl: "/codesnap",
    githubUrl: "https://github.com/darkpanther5667/codesnap",
    metrics: ["Live CodeMirror", "4 Themes @ 2x PNG", "AI Explain"],
  },
];

function ProjectVisualPreview({ slug }: { slug: string }) {
  if (slug === "grahbook") {
    return (
      <div className="w-full max-w-md mx-auto bg-black/50 border border-emerald-500/20 rounded-xl p-3.5 shadow-2xl text-left font-sans">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-white">Sharma Kirana Store</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
              WhatsApp Bot
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">UPI Active</span>
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="bg-white/[0.06] rounded-lg px-3 py-1.5 text-gray-200 max-w-[80%]">
            2x Aashirvaad Atta 5kg, 1x Tata Tea Gold
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/25 rounded-lg px-3 py-2 text-emerald-100 ml-auto max-w-[85%]">
            <div className="flex justify-between items-center font-medium">
              <span>Order #1042 Confirmed</span>
              <span className="text-emerald-300 font-mono">₹680</span>
            </div>
            <div className="text-[10px] text-emerald-300/80 mt-0.5">
              AI Ledger updated &bull; Paid via UPI
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "formlabs") {
    return (
      <div className="w-full max-w-sm mx-auto bg-black/50 border border-teal-500/20 rounded-xl p-3.5 shadow-2xl text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400/60" />
            <span className="w-2 h-2 rounded-full bg-amber-400/60" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
          </div>
          <span className="text-[10px] font-mono text-teal-300 bg-teal-500/15 px-2 py-0.5 rounded">
            Export React JSX
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 space-y-1.5">
            {["Text Input", "Email", "Select"].map((f) => (
              <div
                key={f}
                className="text-[9px] font-mono px-2 py-1 rounded bg-white/[0.05] text-gray-300 border border-white/[0.06]"
              >
                + {f}
              </div>
            ))}
          </div>
          <div className="col-span-2 bg-white/[0.03] border border-dashed border-teal-500/30 rounded-lg p-2 space-y-1.5">
            <div className="h-4 rounded bg-white/10 px-2 flex items-center text-[9px] text-gray-300">
              Full Name *
            </div>
            <div className="h-4 rounded bg-white/10 px-2 flex items-center text-[9px] text-gray-300">
              work@company.com
            </div>
            <div className="h-4 w-20 rounded bg-teal-500/40 flex items-center justify-center text-[9px] text-white font-medium">
              Submit
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-[#0d1117]/90 border border-sky-500/25 rounded-xl p-3.5 shadow-2xl text-left font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/70" />
          <span className="w-2 h-2 rounded-full bg-amber-400/70" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-[10px] text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded">
          AI Explain &bull; 2x PNG
        </span>
      </div>
      <div className="text-[10px] leading-relaxed space-y-0.5">
        <div>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-sky-300">shipProduct</span> ={" "}
          <span className="text-purple-400">async</span> () =&gt; &#123;
        </div>
        <div className="pl-3">
          <span className="text-purple-400">const</span> res ={" "}
          <span className="text-purple-400">await</span>{" "}
          <span className="text-emerald-300">ai.explain</span>(code);
        </div>
        <div className="pl-3">
          <span className="text-purple-400">return</span>{" "}
          <span className="text-amber-300">exportPng2x</span>(res);
        </div>
        <div>&#125;;</div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <motion.div variants={staggerItem} className="group h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="glass-hover rounded-2xl overflow-hidden h-full flex flex-col border border-white/[0.06] group-hover:border-accent/25 transition-colors duration-500 touch-feedback"
      >
        <div
          className={`relative py-6 px-4 sm:px-6 bg-gradient-to-br ${project.gradient} flex flex-col items-center justify-center overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 w-full mb-4">
            <ProjectVisualPreview slug={project.slug} />
          </div>

          <div className="relative z-10 flex flex-wrap justify-center gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="px-2.5 py-1 text-[10px] font-mono bg-black/40 rounded-full text-white/80 border border-white/10"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-accent-light/80 text-xs sm:text-sm font-mono mt-0.5">
                {project.tagline}
              </p>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] transition-colors"
            >
              <span>Case Study</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] sm:text-xs text-gray-300 bg-white/[0.03] rounded-full border border-white/[0.06] group-hover:border-accent/20 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 sm:px-5 py-2 sm:py-2.5 bg-accent text-white text-xs sm:text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.4)] active:scale-95"
            >
              Live Demo
            </a>

            {project.internalAppUrl && (
              <Link
                href={project.internalAppUrl}
                className="px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-accent/10 hover:bg-accent/20 text-accent-light border border-accent/25 transition-colors"
              >
                Try Interactive App
              </Link>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2 sm:py-2.5 glass text-gray-300 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95 border border-white/10"
            >
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
    <section id="projects" className="section-deferred py-16 sm:py-24 md:py-32 px-5 sm:px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Shipped products,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                real impact
              </span>
            </h2>
            <p className="text-gray-500 text-base mt-3 max-w-2xl">
              Production web applications and AI tools — explore live demos, interactive apps, or full engineering case studies.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
