"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let rafId: number;
    let stars: {
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      phase: number;
    }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      resize();
      const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 15000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        const twinkle = Math.sin(time * star.speed + star.phase);
        const alpha = star.alpha * (0.5 + 0.5 * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    init();
    rafId = requestAnimationFrame(animate);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

export default function BackgroundEffects() {
  const isDesktop = useDesktopEffects();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -bottom-1/4 -right-1/4 rounded-full bg-accent/5 blur-[150px] animate-pulse-glow ${
            isMobile ? "w-[300px] h-[300px]" : "w-[900px] h-[900px]"
          }`}
        />
        <div
          className={`absolute -top-1/4 -right-1/4 rounded-full bg-purple-500/4 blur-[140px] animate-pulse-glow ${
            isMobile ? "w-[250px] h-[250px]" : "w-[700px] h-[700px]"
          }`}
          style={{ animationDelay: "-2s" }}
        />
        <div
          className={`absolute -top-1/3 left-0 rounded-full bg-accent/3 blur-[120px] animate-gradient ${
            isMobile ? "w-[200px] h-[200px]" : "w-[500px] h-[500px]"
          }`}
          style={{ animationDelay: "-5s" }}
        />
        <div
          className={`absolute -bottom-1/3 left-1/4 rounded-full bg-blue-400/3 blur-[100px] animate-gradient ${
            isMobile ? "w-[180px] h-[180px]" : "w-[400px] h-[400px]"
          }`}
          style={{ animationDelay: "-10s" }}
        />

        <div
          className={`absolute inset-0 ${isMobile ? "opacity-[0.008]" : "opacity-[0.012]"}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "64px 64px",
          }}
        />
      </div>

      {isDesktop ? <Starfield /> : (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white/20 rounded-full animate-twinkle"
              style={{
                left: `${10 + (i * 10) % 80}%`,
                top: `${5 + (i * 13) % 90}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.15 + (i % 3) * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}