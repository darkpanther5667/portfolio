"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import { Project } from "@/lib/projects-data";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";
import { useState } from "react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function ProjectDetail({ project }: { project: Project }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: `https://manasagrawal.online/projects/${project.slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: profile.name,
      url: "https://manasagrawal.online",
    },
    featureList: project.features || project.tech,
    screenshot: project.ogImage || "/opengraph-image",
    ...(project.liveUrl && { url: project.liveUrl }),
    ...(project.githubUrl && { codeRepository: project.githubUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />

      <section className="py-24 md:py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Project
                </span>
                <div className={`w-2 h-2 rounded-full ${project.accent}`} />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-4">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light">
                {project.tagline}
              </p>
            </div>
          </Reveal>

          <div className="relative mb-16">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-white/[0.06]">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={project.ogImage || "/opengraph-image"}
                alt={`${project.title} project preview`}
                className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-3 gap-8 mb-16"
          >
            <motion.div variants={staggerItem} className="lg:col-span-2">
              <div className="glass-hover rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {project.longDescription || project.description}
                  </p>
                  {project.problem && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-accent">The Problem</h3>
                      <p className="text-gray-400 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-accent">The Solution</h3>
                      <p className="text-gray-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                  {project.results && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-accent">Results</h3>
                      <p className="text-gray-400 leading-relaxed">
                        {project.results}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-6">
              <div className="glass-hover rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm text-gray-300 bg-white/[0.03] rounded-full border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-hover rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Metrics</h3>
                <div className="space-y-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]"
                    >
                      <div className={`w-2 h-2 rounded-full ${project.accent}`} />
                      <span className="text-sm text-gray-300">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(project.liveUrl || project.githubUrl) && (
                <div className="glass-hover rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Links</h3>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">View Source</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          <Reveal>
            <div className="text-center">
              <MagneticButton href="/#projects">
                <div className="relative px-8 py-3.5 bg-accent text-white rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.5)] active:scale-95 cursor-pointer">
                  <span className="relative z-10">Back to Projects</span>
                </div>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}