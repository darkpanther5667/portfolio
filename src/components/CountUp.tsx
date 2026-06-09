"use client";

import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  from: number;
  to: number;
  duration: number;
  start?: boolean;
}

export default function CountUp({ from, to, duration, start = true }: CountUpProps) {
  const [count, setCount] = useState(from);
  const rafId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!start) {
      setCount(from);
      return;
    }

    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [from, to, duration, start]);

  return <>{count.toLocaleString()}</>;
}
