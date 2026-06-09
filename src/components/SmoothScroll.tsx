"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent-light to-accent z-[9999] origin-left"
      style={{
        scaleX: smoothProgress,
        opacity: useTransform(smoothProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]),
      }}
    />
  );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
