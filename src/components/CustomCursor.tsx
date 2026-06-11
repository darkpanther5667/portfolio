"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

export default function CustomCursor() {
  const isDesktop = useDesktopEffects();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - prevPos.current.x;
    const dy = e.clientY - prevPos.current.y;
    velocity.current = { x: dx, y: dy };
    prevPos.current = { x: mousePos.current.x, y: mousePos.current.y };
    mousePos.current = { x: e.clientX, y: e.clientY };

    trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    if (trailPoints.current.length > 20) {
      trailPoints.current.shift();
    }
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest(
      'a, button, [data-cursor-interactive], input, textarea, select, [role="button"]'
    );
    setIsHovering(Boolean(interactive));
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [handleMouseMove, handleMouseOver, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const { x, y } = mousePos.current;
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const targetRadius = isHovering ? 28 : 14;
      const targetColor = isHovering ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0.06)";
      const targetBorder = isHovering ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.2)";

      // --- Main blob ---
      const squish = Math.min(speed * 0.015, 0.4);
      const angle = Math.atan2(velocity.current.y, velocity.current.x);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Outer glow
      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, targetRadius * 2.5);
      glowGrad.addColorStop(0, isHovering ? "rgba(59, 130, 246, 0.08)" : "rgba(255, 255, 255, 0.03)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, targetRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Main shape - deformed circle based on velocity
      ctx.beginPath();
      ctx.ellipse(0, 0, targetRadius * (1 + squish), targetRadius * (1 - squish * 0.5), 0, 0, Math.PI * 2);
      ctx.fillStyle = targetColor;
      ctx.fill();
      ctx.strokeStyle = targetBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = isHovering ? "#3b82f6" : "#ffffff";
      ctx.fill();

      ctx.restore();

      // --- Trail ---
      const points = trailPoints.current;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age++;
        const alpha = Math.max(0, 1 - p.age / 20);
        const size = Math.max(0.5, (1 - p.age / 20) * 3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.4})`;
        ctx.fill();
      }

      // Remove dead points
      trailPoints.current = points.filter((p) => p.age < 20);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isDesktop, isHovering]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}