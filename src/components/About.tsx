"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import Reveal from "./Reveal";
import dynamic from "next/dynamic";

const GitHubActivity = dynamic(() => import("./GitHubActivity"), { ssr: false });

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const timeline = [
  {
    year: "2024",
    title: "Started Web Development",
    description:
      "Began with HTML, CSS, and JavaScript, then moved quickly into building responsive interfaces and small production-ready tools.",
  },
  {
    year: "2025",
    title: "Shipping Full Stack Products",
    description:
      "Expanded into React, Next.js, Node.js, and full-stack delivery while learning how to turn ideas into something people can actually use.",
  },
  {
    year: "2026",
    title: "Building AI Products",
    description:
      "Now focused on AI-powered products like FormLabs, CodeSnap, and Grahbook with a product-first mindset.",
  },
];

export default function About() {
  const heavyRef = useRef<HTMLDivElement>(null);
  const [loadHeavy, setLoadHeavy] = useState(false);

  useEffect(() => {
    const el = heavyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadHeavy(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-deferred py-16 sm:py-24 md:py-32 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="mb-14 md:mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3 block">
              About
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-5 leading-[1.08] text-white">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-500">
                {profile.name}
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              I&apos;m {profile.name}, focused on building modern web products, AI tools,
              and polished experiences that feel useful from the first interaction.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="glass-hover rounded-2xl p-8 mb-14 md:mb-16">
            <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">What I Do</h3>
            <div className="grid md:grid-cols-2 gap-6 text-zinc-400 text-sm leading-relaxed">
              <div>
                <p className="mb-3">
                  I design, build, and deploy modern web applications with a product-first mindset.
                  My stack centers on <strong className="text-zinc-200 font-medium">React, Next.js, TypeScript, and Node.js</strong>,
                  with deep experience in AI integrations using OpenAI and GPT-4o-mini.
                </p>
                <p>
                  I care about shipping products that solve real problems — not just writing code.
                  Every project I build starts with understanding the user and ends with measurable impact.
                </p>
              </div>
              <div>
                <p className="mb-3">
                  I&apos;ve built WhatsApp commerce platforms for Indian merchants, visual form builders
                  that eliminate repetitive work, and developer tools that save time across workflows.
                </p>
                <p>
                  Currently focused on AI-powered products — adding intelligence where it genuinely
                  helps the product, not as decoration.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[13px] md:left-[17px] top-1 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-10 md:space-y-12"
          >
            {timeline.map((item) => (
              <motion.div
                key={item.year}
                variants={staggerItem}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-0 md:left-1 top-0.5 w-[26px] h-[26px] md:w-[34px] md:h-[34px] rounded-full border border-white/20 z-10 flex items-center justify-center bg-[#09090b]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <div className="glass-hover rounded-2xl p-5 md:p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mt-1 mb-2 text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={heavyRef}>
          <div className="mt-12 sm:mt-16">
            {loadHeavy && <GitHubActivity />}
          </div>
        </div>
      </div>
    </section>
  );
}
