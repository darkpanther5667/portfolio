"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import Reveal from "./Reveal";
import GitHubActivity from "./GitHubActivity";
import dynamic from "next/dynamic";

const Workspace3D = dynamic(() => import("./Workspace3D"), { ssr: false });

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

const stats = [
  { label: "Projects Shipped", value: "5+" },
  { label: "Technologies", value: "15+" },
  { label: "GitHub Stars", value: "100+" },
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="mb-14 md:mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              About
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                {profile.name}
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              I&apos;m {profile.name}, focused on building modern web products, AI tools,
              and polished experiences that feel useful from the first interaction.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14 md:mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-hover rounded-xl p-5 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="glass-hover rounded-2xl p-8 mb-14 md:mb-16">
            <h3 className="text-xl font-semibold mb-4">What I Do</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-400 text-sm leading-relaxed">
              <div>
                <p className="mb-3">
                  I design, build, and deploy modern web applications with a product-first mindset.
                  My stack centers on <strong className="text-gray-300">React, Next.js, TypeScript, and Node.js</strong>,
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
          <div className="absolute left-[13px] md:left-[17px] top-1 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-10 md:space-y-12"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={staggerItem}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-0 md:left-1 top-0.5 w-[26px] h-[26px] md:w-[34px] md:h-[34px] rounded-full border-[3px] border-black z-10 flex items-center justify-center bg-accent">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                </div>

                <div className="glass-hover rounded-xl p-5 md:p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 bg-white/[0.04] text-accent border border-white/[0.06]">
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mt-1 mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Reveal>
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl font-semibold mb-6 text-center">My Workspace</h3>
            <Workspace3D />
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
