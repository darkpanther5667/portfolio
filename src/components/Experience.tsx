"use client";

import { motion } from "framer-motion";

const journey = [
  {
    year: "Product",
    title: "Builder-first mindset",
    description:
      "I start with the user problem, then shape the interface and architecture around what actually needs to ship.",
    gradient: "from-blue-500/20 to-purple-500/20",
    count: "01",
  },
  {
    year: "Stack",
    title: "Full-stack execution",
    description:
      "I move comfortably across frontend, backend, and deployment, which makes it easier to keep momentum while iterating.",
    gradient: "from-purple-500/20 to-pink-500/20",
    count: "02",
  },
  {
    year: "AI",
    title: "Shipping intelligence",
    description:
      "I add AI where it helps the product, not as decoration. That keeps the experience useful, fast, and focused.",
    gradient: "from-pink-500/20 to-blue-500/20",
    count: "03",
  },
];

export default function Experience() {
  return (
    <section id="journey" className="py-24 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            What I Bring
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            How I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              build
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {journey.map((item, index) => (
            <div
              key={item.year}
              className="relative"
            >
              <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="glass-hover rounded-2xl p-6 md:p-7 h-full flex flex-col"
              >
                <span className="text-5xl md:text-6xl font-bold text-white/[0.03] leading-none mb-2 select-none">
                  {item.count}
                </span>

                <div
                  className="inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-mono mb-4 bg-white/[0.04] text-gray-400 border border-white/[0.06]"
                >
                  {item.year}
                </div>

                <div className={`h-1 w-14 rounded-full bg-gradient-to-r ${item.gradient} mb-4`} />

                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{item.description}</p>
              </motion.div>

              {index < journey.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-4 w-8 h-px bg-gradient-to-r from-accent/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
