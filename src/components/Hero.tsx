"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import MagneticButton from "./MagneticButton";

const ThreeBackground = dynamic(
  () => import("./ThreeBackground"),
  { ssr: false }
);
const FloatingProjectCards = dynamic(
  () => import("./FloatingProjectCards"),
  { ssr: false }
);
const BackgroundEffects = dynamic(
  () => import("./BackgroundEffects"),
  { ssr: false }
);
const MouseGlow = dynamic(() => import("./MouseGlow"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BackgroundEffects />
      <ThreeBackground />
      <MouseGlow />

      <div
        className="absolute inset-0 pointer-events-none noise-overlay"
        style={{ zIndex: 3 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <FloatingProjectCards />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex max-w-full items-center gap-2 px-4 py-1.5 rounded-full glass mb-7 group hover:bg-white/[0.06] transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide">
            {profile.name} &bull; {profile.role}
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[clamp(2.4rem,10vw,7.5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-6"
          >
            <span className="block text-base sm:text-lg md:text-xl font-medium tracking-normal text-accent mb-2">
              {profile.name}
            </span>
            <span className="block">Building intelligent</span>
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-white">
                products
              </span>{" "}
              with code
            </span>
            <span className="block">and AI.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed"
        >
          I design, build, and deploy modern web applications, AI-powered
          tools, and polished digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
        >
          <MagneticButton href="#projects">
            <div className="relative w-full sm:w-auto px-8 py-3.5 bg-accent text-white rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.5)] active:scale-95 cursor-pointer">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </MagneticButton>

          <MagneticButton href="#contact">
            <div className="w-full sm:w-auto px-8 py-3.5 glass text-gray-200 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white/[0.08] active:scale-95 cursor-pointer border border-white/10 hover:border-accent/30">
              Get In Touch
            </div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400/70 font-mono">
            Scroll
          </span>
          <div className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
