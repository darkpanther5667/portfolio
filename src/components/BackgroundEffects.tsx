"use client";

import { useEffect, useRef } from "react";
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const count = Math.min(
        180,
        Math.floor((window.innerWidth * window.innerHeight) / 8000)
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
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

  return (
    <>
      {/* Deep ambient gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bottom-right blue glow */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] rounded-full bg-accent/5 blur-[150px] animate-pulse-glow" />
        {/* Top-right purple glow */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-purple-500/4 blur-[140px] animate-pulse-glow"
          style={{ animationDelay: "-2s" }}
        />
        {/* Top-left subtle glow */}
        <div
          className="absolute -top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] animate-gradient"
          style={{ animationDelay: "-5s" }}
        />
        {/* Bottom-left secondary glow */}
        <div
          className="absolute -bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/3 blur-[100px] animate-gradient"
          style={{ animationDelay: "-10s" }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Starfield */}
      {isDesktop ? <Starfield /> : null}
    </>
  );
}
