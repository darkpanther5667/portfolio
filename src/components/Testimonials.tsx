"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
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

const reasons = [
  {
    title: "Real products, not demos",
    desc: "FormLabs and CodeSnap are live, deployed, and usable right now. The portfolio is built around evidence, not claims.",
  },
  {
    title: "Full ownership, end to end",
    desc: "Design, architecture, backend, frontend, deployment — Manas handles the whole chain and keeps momentum intact.",
  },
  {
    title: "Communication stays simple",
    desc: "Updates stay in plain English, progress stays visible, and the project stays easy to follow.",
  },
];

export default function WhyMe() {
  return (
    <section id="why-me" className="section-deferred py-16 sm:py-24 md:py-28 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-14 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3 block">
              Proof
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-white">
              Why work with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-500">
                {profile.name}.
              </span>
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-5 md:gap-6"
        >
          {reasons.map((r, index) => (
            <motion.div
              key={r.title}
              variants={staggerItem}
              className="glass-hover rounded-2xl p-6 md:p-7"
            >
              <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                <span className="text-zinc-200 text-xs font-mono font-semibold">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{r.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
