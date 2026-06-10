"use client";

import { profile } from "@/lib/profile";

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
  return (
    <section id="about" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
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

        <div className="relative">
          <div className="absolute left-[13px] md:left-[17px] top-1 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

          <div className="space-y-10 md:space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="relative pl-12 md:pl-16"
              >
                <div
                  className={`absolute left-0 md:left-1 top-0.5 w-[26px] h-[26px] md:w-[34px] md:h-[34px] rounded-full border-[3px] border-black z-10 flex items-center justify-center bg-accent`}
                >
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                </div>

                <div className="glass-hover rounded-xl p-5 md:p-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 bg-white/[0.04] text-accent border border-white/[0.06]"
                  >
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mt-1 mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
