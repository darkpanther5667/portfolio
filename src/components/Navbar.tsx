"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none safe-top"
    >
      <nav
        className={cn(
          "pointer-events-auto max-w-4xl mx-auto h-12 sm:h-13 px-4 sm:px-5 rounded-full flex items-center justify-between transition-all duration-300",
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border border-white/[0.09] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_32px_-8px_rgba(0,0,0,0.65)]"
            : "bg-zinc-900/45 backdrop-blur-md border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        )}
      >
        <a
          href="#hero"
          className="flex items-center gap-2.5 group"
        >
          <span className="w-6 h-6 rounded-full bg-gradient-to-b from-white to-zinc-400 text-zinc-950 text-xs font-bold flex items-center justify-center tracking-tighter shadow-sm">
            M
          </span>
          <span className="text-sm font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            Manas Agrawal
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <span>Get in touch</span>
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/[0.06] touch-feedback"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[4px]">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block w-4 h-[1.5px] bg-zinc-200 origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-4 h-[1.5px] bg-zinc-200"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="block w-4 h-[1.5px] bg-zinc-200 origin-center"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden mt-2 max-w-4xl mx-auto rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-2xl"
          >
            <div className="p-3 flex flex-col gap-1">
              {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-zinc-300 hover:text-white transition-colors py-2.5 px-4 rounded-xl hover:bg-white/[0.05]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}