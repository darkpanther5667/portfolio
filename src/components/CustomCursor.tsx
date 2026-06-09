"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const isHovering = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest(
      'a, button, [data-cursor-interactive], input, textarea, select, [role="button"]'
    );
    if (interactive) {
      isHovering.current = true;
      document.body.style.cursor = "none";
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(59, 130, 246, 0.4)";
        ringRef.current.style.backgroundColor = "rgba(59, 130, 246, 0.04)";
      }
      if (cursorRef.current) {
        cursorRef.current.style.width = "4px";
        cursorRef.current.style.height = "4px";
        cursorRef.current.style.backgroundColor = "#60A5FA";
      }
    } else {
      isHovering.current = false;
      document.body.style.cursor = "none";
      if (ringRef.current) {
        ringRef.current.style.width = "28px";
        ringRef.current.style.height = "28px";
        ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.15)";
        ringRef.current.style.backgroundColor = "transparent";
      }
      if (cursorRef.current) {
        cursorRef.current.style.width = "6px";
        cursorRef.current.style.height = "6px";
        cursorRef.current.style.backgroundColor = "#f8f8f8";
      }
    }
  }, []);

  const handleMouseLeaveDoc = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.opacity = "0";
    }
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
    }
    document.body.style.cursor = "auto";
  }, []);

  const handleMouseEnterDoc = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.opacity = "1";
    }
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
    }
    document.body.style.cursor = "none";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);
    document.addEventListener("mouseenter", handleMouseEnterDoc);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      document.removeEventListener("mouseenter", handleMouseEnterDoc);
      document.body.style.cursor = "auto";
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeaveDoc, handleMouseEnterDoc]);

  // Hide on touch devices
  useEffect(() => {
    const checkTouch = () => {
      if ("ontouchstart" in window) {
        if (cursorRef.current) cursorRef.current.style.display = "none";
        if (ringRef.current) ringRef.current.style.display = "none";
      }
    };
    checkTouch();
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#f8f8f8",
          borderRadius: "50%",
          transform: "translate(-100px, -100px)",
          transition: "width 0.15s, height 0.15s, background-color 0.15s",
          willChange: "transform",
        }}
      />
      {/* Ring follower */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          width: "28px",
          height: "28px",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          marginLeft: "-14px",
          marginTop: "-14px",
          transition:
            "width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}
