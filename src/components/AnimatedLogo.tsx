"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedLogoProps {
  className?: string;
}

export default function AnimatedLogo({ className = "" }: AnimatedLogoProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  // Geometric "M" mark - hexagonal prism style
  const points = [
    { x: 30, y: 8 },   // top-left
    { x: 50, y: 8 },   // top-center
    { x: 70, y: 8 },   // top-right
    { x: 75, y: 18 },  // right-upper
    { x: 60, y: 58 },  // right-lower
    { x: 50, y: 62 },  // bottom-center-right
    { x: 40, y: 58 },  // bottom-center-left
    { x: 25, y: 18 },  // left-upper
    { x: 38, y: 18 },  // inner-top-left
    { x: 50, y: 42 },  // inner-bottom
    { x: 62, y: 18 },  // inner-top-right
  ];

  const pathData = [
    `M ${points[0].x} ${points[0].y}`,
    `L ${points[7].x} ${points[7].y}`,
    `L ${points[5].x} ${points[5].y}`,
    `L ${points[4].x} ${points[4].y}`,
    `L ${points[2].x} ${points[2].y}`,
    `L ${points[1].x} ${points[1].y}`,
    `L ${points[0].x} ${points[0].y}`,
  ].join(" ");

  const innerPath = [
    `M ${points[8].x} ${points[8].y}`,
    `L ${points[9].x} ${points[9].y}`,
    `L ${points[10].x} ${points[10].y}`,
  ].join(" ");

  const totalLength = 200;
  const innerLength = 60;

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 70"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer shape */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* Inner "V" shape */}
      <motion.path
        d={innerPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      />

      {/* Accent dots at vertices */}
      {[
        { x: points[0].x, y: points[0].y },
        { x: points[1].x, y: points[1].y },
        { x: points[2].x, y: points[2].y },
        { x: points[5].x, y: points[5].y },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r="2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
        />
      ))}

      {/* Glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// Simple text-based animated logo variant
export function AnimatedTextLogo({ className = "" }: AnimatedLogoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const letters = "MANAS".split("");

  return (
    <div ref={ref} className={`flex gap-0.5 ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="text-2xl font-bold tracking-tighter text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1 + i * 0.08,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}