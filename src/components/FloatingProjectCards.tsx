"use client";

import { motion } from "framer-motion";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

const cards = [
  {
    id: "jee-os",
    title: "JEE OS",
    tag: "Exam Platform",
    gradient: "from-blue-600/30 via-purple-600/20 to-pink-600/20",
    accent: "bg-blue-500",
    position: "top-[10%] right-[6%] lg:right-[10%]",
    delay: 0,
    tilt: -2,
  },
  {
    id: "ai-planner",
    title: "AI Study Planner",
    tag: "AI + Productivity",
    gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/20",
    accent: "bg-emerald-500",
    position: "bottom-[18%] left-[6%] lg:left-[10%]",
    delay: -2,
    tilt: 1.5,
  },
  {
    id: "startup-page",
    title: "Startup Landing",
    tag: "Design System",
    gradient: "from-violet-600/30 via-indigo-600/20 to-blue-600/20",
    accent: "bg-violet-500",
    position: "top-[35%] left-[4%] lg:left-[8%]",
    delay: -4,
    tilt: -1,
  },
  {
    id: "metrics",
    title: "Live Metrics",
    tag: "Analytics Dashboard",
    gradient: "from-amber-600/30 via-orange-600/20 to-rose-600/20",
    accent: "bg-amber-500",
    position: "bottom-[30%] right-[6%] lg:right-[10%]",
    delay: -1,
    tilt: 2.5,
  },
];

const mobileCards = cards.slice(0, 2);

function DesktopCard({
  title,
  tag,
  gradient,
  accent,
  delay,
  tilt,
}: (typeof cards)[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.8 + Math.abs(delay) * 0.1,
        ease: "easeOut" as const,
      }}
      className="absolute hidden lg:block"
      style={{ zIndex: 3 }}
    >
      <motion.div
        animate={{ y: [0, -6, 3, 0] }}
        transition={{
          duration: 5 + Math.abs(delay),
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        whileHover={{ scale: 1.05, y: -8, rotate: 0 }}
        className="w-[180px] group cursor-default"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="rounded-xl overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] transition-shadow duration-300 group-hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.15)] group-hover:border-accent/20">
          <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="flex gap-1.5 absolute top-2.5 left-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                <div className={`w-4 h-0.5 rounded-full ${accent}`} />
              </div>
            </div>
          </div>
          <div className="p-3">
            <h4 className="text-xs font-semibold text-white/90 truncate">{title}</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">{tag}</p>
            <div className="flex gap-1.5 mt-2">
              <span className="px-1.5 py-[1px] text-[8px] rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.04]">
                {tag.split(" ")[0]}
              </span>
              <span className="px-1.5 py-[1px] text-[8px] rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.04]">
                Live
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileCard({
  title,
  tag,
  gradient,
  accent,
  index,
}: (typeof mobileCards)[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6 + index * 0.15,
        ease: "easeOut" as const,
      }}
      className="flex-shrink-0 w-[150px] sm:w-[170px]"
    >
      <motion.div
        animate={{ y: [0, -4, 2, 0] }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.8,
        }}
        className="group cursor-default"
      >
        <div className="rounded-xl overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] active:scale-95 transition-transform duration-200">
          <div className={`h-16 sm:h-20 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div className="flex gap-1 absolute top-2 left-2.5">
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>
            <div className="relative z-10">
              <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                <div className={`w-3 h-0.5 rounded-full ${accent}`} />
              </div>
            </div>
          </div>
          <div className="p-2.5">
            <h4 className="text-[11px] font-semibold text-white/90 truncate">{title}</h4>
            <p className="text-[9px] text-gray-500 mt-0.5">{tag}</p>
            <div className="flex gap-1 mt-1.5">
              <span className="px-1.5 py-[1px] text-[7px] rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.04]">
                {tag.split(" ")[0]}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingProjectCards() {
  const isDesktop = useDesktopEffects();

  if (isDesktop) {
    return (
      <>
        {cards.map((card) => (
          <DesktopCard key={card.id} {...card} />
        ))}
      </>
    );
  }

  return (
    <div className="absolute bottom-12 left-0 right-0 z-10 px-5 sm:hidden">
      <div className="flex gap-3 justify-center">
        {mobileCards.map((card, index) => (
          <MobileCard key={card.id} {...card} index={index} />
        ))}
      </div>
    </div>
  );
}