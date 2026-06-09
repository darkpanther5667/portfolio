"use client";

import { motion } from "framer-motion";

const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Prisma", "PostgreSQL", "TailwindCSS", "Vercel", "OpenAI",
  "Claude AI", "Git", "Docker",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export default function TechStack() {
  return (
    <section id="skills" className="py-24 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Tools I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              work with
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech}
              variants={pillVariants}
              whileHover={{
                scale: 1.08,
                y: -4,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(59, 130, 246, 0.3)",
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="px-4 py-2.5 rounded-full border border-white/[0.06] cursor-default"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            >
              <span className="text-sm md:text-base text-gray-200 font-medium">
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
