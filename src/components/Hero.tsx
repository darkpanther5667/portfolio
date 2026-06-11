"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import MagneticButton from "./MagneticButton";
import TextScramble from "./TextScramble";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

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

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const isDesktop = useDesktopEffects();

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
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

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center pt-16 sm:pt-20"
      >
        {/* Top Badge */}
        <motion.div variants={fadeUp} className="inline-flex max-w-full items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 sm:mb-7 group hover:bg-white/[0.06] transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-[11px] sm:text-sm text-gray-300 font-medium tracking-wide">
            {profile.name} &bull; {profile.role}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={fadeUp} className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

          <h1 className="text-[clamp(2rem,8vw,7.5rem)] font-bold tracking-[-0.04em] leading-[0.92] mb-5 sm:mb-6">
            <span className="block text-sm sm:text-lg md:text-xl font-medium tracking-normal text-accent mb-2">
              <TextScramble text={profile.name} delay={200} speed={40} />
            </span>
            <span className="block">Building intelligent</span>
            <span className="block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-white">
                products
              </span>{" "}
              with code
            </span>
            <span className="block">and AI.</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2"
        >
          I design, build, and deploy modern web applications, AI-powered
          tools, and polished digital products.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <MagneticButton href="#projects">
            <div className="relative w-full sm:w-auto px-8 py-3.5 bg-accent text-white rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.5)] active:scale-95 cursor-pointer touch-feedback">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </MagneticButton>

          <MagneticButton href="#contact">
            <div className="w-full sm:w-auto px-8 py-3.5 glass text-gray-200 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white/[0.08] active:scale-95 cursor-pointer border border-white/10 hover:border-accent/30 touch-feedback">
              Get In Touch
            </div>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator — hidden on mobile */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400/70 font-mono">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}