"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MouseGlow() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[1]"
      style={{
        x: springX,
        y: springY,
        width: "600px",
        height: "600px",
        marginLeft: "-300px",
        marginTop: "-300px",
        background:
          "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 30%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
