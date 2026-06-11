"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const steps = [
  {
    step: "01",
    title: "Discovery",
    desc: "We talk through your idea, goals, and constraints. I ask the tough questions before a single line of code is written. You get a clear scope and timeline.",
  },
  {
    step: "02",
    title: "Design & Prototype",
    desc: "I wireframe the core flows and build a working prototype fast. No pixel-perfect mockups — we validate with real interactions, not static screens.",
  },
  {
    step: "03",
    title: "Build & Iterate",
    desc: "I ship in short cycles so you see progress weekly. You review real deployed features, we adjust direction, and nothing gets built twice.",
  },
  {
    step: "04",
    title: "Deliver & Deploy",
    desc: "Production deployment with monitoring, documentation, and a handoff you actually understand. I don't disappear after launch.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              How I Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              From idea to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                production
              </span>
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-5 md:gap-6"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={staggerItem}
              className="glass-hover rounded-xl p-6 md:p-7 border border-white/[0.04] group flex gap-5"
            >
              <span className="text-3xl md:text-4xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors font-mono leading-none shrink-0">
                {s.step}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
