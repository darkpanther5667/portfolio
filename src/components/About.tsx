"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2024",
    title: "Started Web Development",
    description:
      "Began my journey with HTML, CSS, and JavaScript, building my first websites and discovering the power of the web.",
  },
  {
    year: "2025",
    title: "Exploring AI & Full Stack",
    description:
      "Dove into React, Next.js, Node.js, and started integrating AI APIs into my projects to build smarter applications.",
  },
  {
    year: "2026",
    title: "Building AI Products",
    description:
      "Shipping real-world AI-powered applications — from study tools to intelligent platforms that solve real problems.",
  },
  {
    year: "Future",
    title: "Launching Real Startups",
    description:
      "Building products that make a real impact. The best is yet to come.",
    future: true,
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            About
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
            Passionate about{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              technology
            </span>{" "}
            and building.
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            I&apos;m a student passionate about software development, AI tools,
            product building, and entrepreneurship.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[13px] md:left-[17px] top-1 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <div className="space-y-10 md:space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-12 md:pl-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.1, type: "spring", stiffness: 200 }}
                  className={`absolute left-0 md:left-1 top-0.5 w-[26px] h-[26px] md:w-[34px] md:h-[34px] rounded-full border-[3px] border-black z-10 flex items-center justify-center ${
                    item.future ? "bg-accent-light/40" : "bg-accent"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${item.future ? "bg-accent-light" : "bg-white"}`} />
                </motion.div>

                <div className={`glass-hover rounded-xl p-5 md:p-6 ${item.future ? "border-accent/20" : ""}`}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 ${
                      item.future
                        ? "bg-accent/10 text-accent-light border border-accent/20"
                        : "bg-white/[0.04] text-accent border border-white/[0.06]"
                    }`}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mt-1 mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
