"use client";

import { useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  tag?: "span" | "h1" | "h2" | "h3" | "p";
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
  tag: Tag = "span",
}: TextScrambleProps) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }

    let rafId: number | null = null;
    let startTime: number | null = null;
    let lastTick = 0;
    const totalSteps = text.length * 2;
    const stepDuration = Math.max(16, speed);

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      if (elapsed < delay) {
        rafId = requestAnimationFrame(step);
        return;
      }

      if (timestamp - lastTick >= stepDuration) {
        lastTick = timestamp;
        const activeElapsed = elapsed - delay;
        const progress = Math.min(activeElapsed / (totalSteps * (stepDuration * 0.65)), 1);
        const revealedCount = progress * text.length;

        if (progress >= 1) {
          el.textContent = text;
          return;
        }

        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
          } else if (i < revealedCount) {
            out += text[i];
          } else {
            out += chars[(Math.random() * chars.length) | 0];
          }
        }
        el.textContent = out;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [text, delay, speed]);

  return (
    <span className="inline-block" style={{ contain: "layout style" }}>
      <Tag
        ref={elRef as React.RefObject<never>}
        className={className}
      >
        {text}
      </Tag>
    </span>
  );
}