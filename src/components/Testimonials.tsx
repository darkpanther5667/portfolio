"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "I ship real products",
    desc: "FormLabs and CodeSnap are live, deployed, and usable right now. I don't do todo apps or tutorial projects — everything I build solves an actual problem.",
  },
  {
    title: "Full ownership, end to end",
    desc: "Design, architecture, backend, frontend, deployment — I handle it. You don't need a team, just one person who can wear every hat.",
  },
  {
    title: "Communication is part of the build",
    desc: "You get regular updates in plain English, not engineering jargon. No guesswork, no surprise delays, no vanishing acts.",
  },
];

export default function WhyMe() {
  return (
    <section id="why-me" className="py-24 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14 text-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            Why Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Why work with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              me
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((r, index) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-hover rounded-2xl p-6 md:p-7"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                <span className="text-accent text-sm font-mono font-bold">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
