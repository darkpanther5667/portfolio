"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TechNode {
  id: string;
  label: string;
  category: "frontend" | "backend" | "ai" | "tools" | "database";
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  frontend: { bg: "bg-blue-500/20", text: "text-blue-400", glow: "shadow-blue-500/20" },
  backend: { bg: "bg-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  ai: { bg: "bg-purple-500/20", text: "text-purple-400", glow: "shadow-purple-500/20" },
  tools: { bg: "bg-amber-500/20", text: "text-amber-400", glow: "shadow-amber-500/20" },
  database: { bg: "bg-rose-500/20", text: "text-rose-400", glow: "shadow-rose-500/20" },
};

const connections: [string, string][] = [
  ["React", "Next.js"], ["React", "TypeScript"], ["React", "TailwindCSS"],
  ["Next.js", "Node.js"], ["Next.js", "TypeScript"], ["Next.js", "PostgreSQL"],
  ["Node.js", "PostgreSQL"], ["Node.js", "Redis"], ["Node.js", "Firebase"],
  ["TypeScript", "Next.js"], ["TypeScript", "Node.js"],
  ["TailwindCSS", "Framer Motion"],
  ["OpenAI", "GPT-4o-mini"], ["OpenAI", "Next.js"],
  ["PostgreSQL", "Prisma"], ["Prisma", "Next.js"],
  ["Firebase", "React"], ["Redis", "Node.js"],
  ["GPT-4o-mini", "CodeSnap"], ["GPT-4o-mini", "FormLabs"],
  ["CodeMirror", "CodeSnap"], ["html-to-image", "CodeSnap"],
];

const techNodes: Omit<TechNode, "x" | "y" | "vx" | "vy">[] = [
  { id: "react", label: "React", category: "frontend", size: 1 },
  { id: "nextjs", label: "Next.js", category: "frontend", size: 1.2 },
  { id: "typescript", label: "TypeScript", category: "frontend", size: 1.1 },
  { id: "tailwindcss", label: "TailwindCSS", category: "frontend", size: 0.9 },
  { id: "framer", label: "Framer Motion", category: "frontend", size: 0.8 },
  { id: "nodejs", label: "Node.js", category: "backend", size: 1 },
  { id: "firebase", label: "Firebase", category: "backend", size: 0.8 },
  { id: "openai", label: "OpenAI", category: "ai", size: 1.1 },
  { id: "gpt4o", label: "GPT-4o-mini", category: "ai", size: 0.9 },
  { id: "postgresql", label: "PostgreSQL", category: "database", size: 0.9 },
  { id: "redis", label: "Redis", category: "database", size: 0.7 },
  { id: "prisma", label: "Prisma", category: "database", size: 0.8 },
  { id: "codemirror", label: "CodeMirror", category: "tools", size: 0.7 },
  { id: "html2img", label: "html-to-image", category: "tools", size: 0.6 },
  { id: "vite", label: "Vite", category: "tools", size: 0.7 },
];

function forceSimulation(nodes: TechNode[], canvasW: number, canvasH: number) {
  const cx = canvasW / 2;
  const cy = canvasH / 2;

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    // Center gravity
    n.vx += (cx - n.x) * 0.0003;
    n.vy += (cy - n.y) * 0.0003;

    // Repulsion
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = n.x - nodes[j].x;
      const dy = n.y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = 200 / (dist * dist);
      n.vx += (dx / dist) * force;
      n.vy += (dy / dist) * force;
    }

    // Connection attraction
    for (const [a, b] of connections) {
      if (n.label === a || n.label === b) {
        const other = nodes.find((x) => x.label === (n.label === a ? b : a));
        if (other) {
          const dx = other.x - n.x;
          const dy = other.y - n.y;
          n.vx += dx * 0.00008;
          n.vy += dy * 0.00008;
        }
      }
    }

    // Damping
    n.vx *= 0.92;
    n.vy *= 0.92;

    // Apply
    n.x += n.vx;
    n.y += n.vy;

    // Bounds
    const padding = 60;
    n.x = Math.max(padding, Math.min(canvasW - padding, n.x));
    n.y = Math.max(padding, Math.min(canvasH - padding, n.y));
  }
}

export default function TechStackGraph() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<TechNode[]>([]);
  const animRef = useRef<number>(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const initNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    nodesRef.current = techNodes.map((t, i) => ({
      ...t,
      x: cx + (Math.cos((i / techNodes.length) * Math.PI * 2) * 120) + (Math.random() - 0.5) * 40,
      y: cy + (Math.sin((i / techNodes.length) * Math.PI * 2) * 120) + (Math.random() - 0.5) * 40,
      vx: 0,
      vy: 0,
    }));

    setInitialized(true);
  }, []);

  useEffect(() => {
    initNodes();
    const handleResize = () => initNodes();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initNodes]);

  useEffect(() => {
    if (!initialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      forceSimulation(nodesRef.current, rect.width, rect.height);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [initialized]);

  const nodes = nodesRef.current;
  const connectedToHovered = hovered
    ? connections
        .filter(([a, b]) => a === hovered || b === hovered)
        .flat()
        .filter((l) => l !== hovered)
    : [];

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl overflow-hidden glass-hover">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div ref={canvasRef} className="absolute inset-0">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([a, b], i) => {
            const nodeA = nodes.find((n) => n.label === a);
            const nodeB = nodes.find((n) => n.label === b);
            if (!nodeA || !nodeB) return null;

            const isHighlighted =
              hovered && (a === hovered || b === hovered);
            const isDimmed = hovered && !isHighlighted;

            return (
              <line
                key={i}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke={isHighlighted ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.06)"}
                strokeWidth={isHighlighted ? 1.5 : 0.5}
                className={`transition-all duration-300 ${isDimmed ? "opacity-30" : ""}`}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const colors = categoryColors[node.category];
          const isHovered = hovered === node.label;
          const isConnected = connectedToHovered.includes(node.label);
          const isDimmed = hovered && !isHovered && !isConnected;

          return (
            <motion.div
              key={node.id}
              className="absolute flex items-center justify-center pointer-events-auto cursor-pointer"
              style={{
                left: node.x - 30 * node.size,
                top: node.y - 30 * node.size,
                width: 60 * node.size,
                height: 60 * node.size,
              }}
              animate={{
                scale: isHovered ? 1.3 : 1,
                opacity: isDimmed ? 0.3 : 1,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHovered(node.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`w-full h-full rounded-full ${colors.bg} border border-white/[0.08] flex items-center justify-center backdrop-blur-sm transition-shadow duration-300 ${
                  isHovered ? `shadow-lg ${colors.glow}` : ""
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-medium ${colors.text} text-center leading-tight px-1`}>
                  {node.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
        {Object.entries(categoryColors).map(([cat, colors]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${colors.bg} border border-white/[0.1]`} />
            <span className="text-[9px] text-gray-500 capitalize">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}