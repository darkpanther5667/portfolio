"use client";

import { motion } from "framer-motion";

const journey = [
  {
    year: "2025",
    title: "Started Web Development",
    description:
      "Began with HTML, CSS, and JavaScript fundamentals. Built my first responsive websites and explored the world of frontend development.",
    gradient: "from-blue-500/20 to-purple-500/20",
    count: "01",
  },
  {
    year: "2026",
    title: "Building AI Products",
    description:
      "Combining full-stack development with AI to build intelligent applications. Exploring Next.js, APIs, and modern tooling.",
    gradient: "from-purple-500/20 to-pink-500/20",
    count: "02",
  },
  {
    year: "Future",
    title: "Launching Real Startups",
    description:
      "Taking ideas to production. Building real products, solving real problems, and making a dent in the universe.",
    gradient: "from-pink-500/20 to-blue-500/20",
    count: "03",
    future: true,
  },
];

export default function Experience() {
  return (
    <section id="journey" className="py-24 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Learning{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              journey
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {journey.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`glass-hover rounded-2xl p-6 md:p-7 h-full flex flex-col ${
                  item.future ? "border-accent/20" : ""
                }`}
              >
                <span className="text-5xl md:text-6xl font-bold text-white/[0.03] leading-none mb-2 select-none">
                  {item.count}
                </span>

                <div
                  className={`inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-mono mb-4 ${
                    item.future
                      ? "bg-accent/10 text-accent-light border border-accent/20"
                      : "bg-white/[0.04] text-gray-400 border border-white/[0.06]"
                  }`}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
