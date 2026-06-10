"use client";

import CountUp from "./CountUp";

const stats = [
  { value: 3, label: "Live Products", suffix: "+" },
  { value: 2, label: "Active Builds", suffix: "+" },
  { value: 3, label: "Core Services", suffix: "+" },
  { value: 1, label: "AI-First Focus", suffix: "" },
];

function StatItem({ value, label, suffix, index }: { value: number; label: string; suffix: string; index: number }) {
  return (
    <div
      className="glass-hover rounded-2xl p-6 md:p-7 text-center group"
    >
      <span className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mb-2 block">
        <CountUp from={0} to={value} duration={2} />
        {suffix}
      </span>
      <div className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-16 md:py-20 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
