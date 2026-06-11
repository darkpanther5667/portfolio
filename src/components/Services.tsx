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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const services = [
  {
    title: "Web Apps",
    desc: "Full-stack web applications with Next.js, React, TypeScript, and modern backend stacks. From MVPs to production systems.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    desc: "Add intelligence to existing products — GPT-powered features, code analysis, smart recommendations, and automated workflows.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2 6.5 4 8.5V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.5c2-2 4-5 4-8.5a8 8 0 0 0-8-8z" />
        <circle cx="9" cy="10" r="1" />
        <circle cx="15" cy="10" r="1" />
        <path d="M9.5 14c.5.5 1.5 1 2.5 1s2-.5 2.5-1" />
      </svg>
    ),
  },
  {
    title: "Full-Stack Consulting",
    desc: "Architecture reviews, code audits, and technical direction for teams looking to level up their stack and development practices.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.01] via-transparent to-accent/[0.01] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              What I Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Services{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                I offer
              </span>
            </h2>
            <p className="text-gray-500 text-base mt-3 max-w-2xl">
              From concept to deployment — I build products that solve real problems.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-4 md:gap-5"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              className="glass-hover rounded-xl p-6 md:p-7 border border-white/[0.04] group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/15 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
