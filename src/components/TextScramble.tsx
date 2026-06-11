"use client";

import { useState, useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  tag?: "span" | "h1" | "h2" | "h3" | "p";
}

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
  tag: Tag = "span",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let timeout: NodeJS.Timeout;
    let iteration = 0;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }

        iteration += 1 / 2;
      }, speed);

      timeout = interval;
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timeout);
    };
  }, [hasStarted, text, delay, speed]);

  return (
    <div ref={ref}>
      <Tag className={`${className} ${!isComplete ? "font-mono" : ""}`}>
        {displayText || "\u00A0"}
      </Tag>
    </div>
  );
}