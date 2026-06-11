"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function BlogPage() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="mb-14 md:mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
                Writing
              </span>
            </h1>
            <p className="text-gray-400 text-lg mt-3 max-w-2xl">
              Deep dives into the projects I build, the problems I solve, and the technologies I use.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.slug} variants={staggerItem}>
              <Link href={`/blog/${post.slug}`}>
                <article className="glass-hover rounded-2xl p-6 md:p-8 transition-all duration-500 border border-white/[0.06] hover:border-accent/20 group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <time className="text-xs font-mono text-gray-500">{post.date}</time>
                      <span className="text-gray-600">·</span>
                      <span className="text-xs font-mono text-gray-500">{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono bg-white/[0.04] text-gray-400 border border-white/[0.06] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-base leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm text-accent font-medium group-hover:gap-3 transition-all">
                    Read article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}