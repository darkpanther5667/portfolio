"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import TechStackGraph from "./TechStackGraph";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Prisma", "PostgreSQL", "TailwindCSS", "Vercel", "OpenAI",
  "Claude AI", "Git", "Docker",
];

export default function TechStack() {
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="mb-8 sm:mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Tools I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                work with
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
              Hover over nodes to explore connections between technologies
            </p>
          </div>
        </Reveal>

        {/* Interactive graph — replaces static pills */}
        <Reveal>
          <TechStackGraph />
        </Reveal>

        {/* Static pills below as fallback/secondary */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto mt-8 sm:mt-10"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech}
              variants={staggerItem}
              whileHover={{ scale: 1.08, y: -4 }}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/[0.06] cursor-default transition-colors duration-200 touch-feedback"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            >
              <span className="text-xs sm:text-sm md:text-base text-gray-200 font-medium">
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}