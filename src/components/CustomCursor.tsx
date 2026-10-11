"use client";

import { useEffect, useRef } from "react";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

export default function CustomCursor() {
  const isDesktop = useDesktopEffects();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveringRef = useRef(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const trailPoints = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.body.style.cursor = "none";

    let animId: number | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const { x, y } = mousePos.current;
      const isHovering = isHoveringRef.current;
      velocity.current.x *= 0.85;
      velocity.current.y *= 0.85;
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
      let writeIdx = 0;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age++;
        if (p.age < 16) {
          const alpha = 1 - p.age / 16;
          const size = Math.max(0.5, alpha * 3);

          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.4})`;
          ctx.fill();
          points[writeIdx++] = p;
        }
      }
      points.length = writeIdx;

      if (points.length > 0 || speed > 0.1) {
        animId = requestAnimationFrame(draw);
      } else {
        animId = null;
      }
    };

    const startLoop = () => {
      if (animId === null) {
        animId = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      velocity.current = { x: dx, y: dy };
      prevPos.current = { x: mousePos.current.x, y: mousePos.current.y };
      mousePos.current = { x: e.clientX, y: e.clientY };

      trailPoints.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailPoints.current.length > 16) {
        trailPoints.current.shift();
      }
      startLoop();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          'a, button, [data-cursor-interactive], input, textarea, select, [role="button"]'
        )
      );
      if (interactive !== isHoveringRef.current) {
        isHoveringRef.current = interactive;
        startLoop();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}