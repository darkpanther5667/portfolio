"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import BackgroundEffects from "./BackgroundEffects";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const heroHighlights = [
  {
    name: "Grahbook",
    category: "WhatsApp Commerce & UPI",
    metric: "AI Storefront",
    href: "/projects/grahbook",
    dot: "bg-emerald-400",
  },
  {
    name: "FormLabs",
    category: "Visual Form Builder",
    metric: "1-Click JSX/HTML",
    href: "/formlabs",
    dot: "bg-indigo-400",
  },
  {
    name: "CodeSnap",
    category: "AI Developer Tool",
    metric: "GPT-4o Explain",
    href: "/codesnap",
    dot: "bg-sky-400",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-12 sm:pb-16"
    >
      <BackgroundEffects />

      <div
        className="absolute inset-0 pointer-events-none noise-overlay"
        style={{ zIndex: 2 }}
      />

      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-5 sm:px-6 text-center"
        >
          {/* Editorial Status Pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass mb-7 sm:mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs text-zinc-300 font-medium tracking-tight">
              Available for select product builds &amp; AI engineering
            </span>
            <span className="hidden sm:inline-block text-zinc-600">&bull;</span>
            <a
              href="#projects"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-white transition-colors"
            >
              <span>Explore work</span>
              <span>&rarr;</span>
            </a>
          </motion.div>

          {/* New-Age Metallic Editorial Headline */}
          <motion.div variants={fadeUp} className="relative">
            <h1 className="text-[clamp(2.5rem,7vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[1.02] mb-6">
              <span className="block bg-gradient-to-b from-white via-white/95 to-zinc-400 bg-clip-text text-transparent">
                Designing &amp; shipping
              </span>
              <span className="block bg-gradient-to-r from-indigo-300 via-white to-zinc-400 bg-clip-text text-transparent">
                intelligent web products.
              </span>
            </h1>
          </motion.div>

          {/* Refined Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-9 sm:mb-10 leading-relaxed font-normal"
          >
            I&apos;m <strong className="text-zinc-100 font-medium">{profile.name}</strong> — a full-stack
            developer and AI product builder crafting fast, high-craft software from first
            prototype to production scale.
          </motion.p>

          {/* High-Craft CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-zinc-950 rounded-full font-medium text-sm transition-all duration-200 hover:bg-zinc-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)] active:scale-98"
            >
              <span>View Selected Work</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 glass text-zinc-200 rounded-full font-medium text-sm transition-all duration-200 hover:bg-white/[0.08] hover:text-white active:scale-98"
            >
              <span>Start a Conversation</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bento Product Strip (New-Age Dock) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl w-full mx-auto px-5 sm:px-6 mt-12 sm:mt-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {heroHighlights.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="glass-hover rounded-2xl px-4 py-3.5 flex items-center justify-between group"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                  <span className="text-xs font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">
                    {item.metric}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 truncate">
                  {item.category}
                </p>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}