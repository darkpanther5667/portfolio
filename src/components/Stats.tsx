"use client";

import { motion } from "framer-motion";
import CountUp from "./CountUp";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const stats = [
  { value: 3, label: "Products Shipped", suffix: "+" },
  { value: 2, label: "In Development", suffix: "" },
  { value: 4, label: "Open Source Repos", suffix: "" },
  { value: 1, label: "Year Building", suffix: "+" },
];

function StatItem({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) {
  return (
    <motion.div variants={staggerItem} className="glass-hover rounded-2xl p-4 sm:p-6 md:p-7 text-center group touch-feedback">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-2 block">
        <CountUp from={0} to={value} duration={2} />
        {suffix}
      </span>
      <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
