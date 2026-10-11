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

const journey = [
  {
    year: "Product",
    title: "Builder-first mindset",
    description:
      "I start with the user problem, then shape the interface and architecture around what actually needs to ship.",
    gradient: "from-white/40 to-zinc-600/20",
    count: "01",
  },
  {
    year: "Stack",
    title: "Full-stack execution",
    description:
      "I move comfortably across frontend, backend, and deployment, which makes it easier to keep momentum while iterating.",
    gradient: "from-indigo-400/40 to-zinc-600/20",
    count: "02",
  },
  {
    year: "AI",
    title: "Shipping intelligence",
    description:
      "I add AI where it helps the product, not as decoration. That keeps the experience useful, fast, and focused.",
    gradient: "from-zinc-300/40 to-indigo-400/20",
    count: "03",
  },
];

export default function Experience() {
  return (
    <section id="journey" className="section-deferred py-16 sm:py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3 block">
              What I Bring
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-white">
              How I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-500">
                build.
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
          {journey.map((item, index) => (
            <motion.div
              key={item.year}
              variants={staggerItem}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="glass-hover rounded-2xl p-6 md:p-7 h-full flex flex-col"
              >
                <span className="text-5xl md:text-6xl font-bold text-white/[0.04] leading-none mb-2 select-none font-mono">
                  {item.count}
                </span>

                <div className="inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-mono mb-4 bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                  {item.year}
                </div>

                <div className={`h-px w-12 bg-gradient-to-r ${item.gradient} mb-4`} />

                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed flex-1">{item.description}</p>
              </motion.div>

              {index < journey.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-4 w-8 h-px bg-gradient-to-r from-white/15 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
