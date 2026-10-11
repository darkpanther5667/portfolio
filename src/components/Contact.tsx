"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/profile";
import Reveal from "./Reveal";
import { useDesktopEffects } from "@/lib/use-desktop-effects";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const links = [
  {
    label: "GitHub",
    href: profile.githubUrl,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: profile.xUrl,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: profile.linkedInUrl,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const isDesktop = useDesktopEffects();
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const subject = encodeURIComponent(
      `Project Inquiry from ${name.trim() || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name || "N/A"}\nEmail: ${email || "N/A"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-deferred py-16 sm:py-24 md:py-32 px-5 sm:px-6 relative overflow-hidden">
      {isDesktop && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="max-w-4xl mx-auto relative">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-5 block">
              Contact
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.035em] leading-[0.98] mb-5 text-white">
              Let&apos;s build your next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-indigo-200 to-zinc-500">
                product
              </span>
              <br />
              together.
            </h2>

            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Have a project, idea, or role in mind? Copy my email in one click or send a quick brief below.
            </p>
          </div>
        </Reveal>

        {/* Primary Email + Copy Action Bar */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-medium transition-all duration-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.22)] active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied {profile.email}!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy {profile.email}</span>
                </>
              )}
            </button>

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 glass text-zinc-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/[0.08] border border-white/10 hover:border-white/20 hover:text-white active:scale-95"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* Quick Project Brief Form */}
        <Reveal>
          <form
            onSubmit={handleInquirySubmit}
            className="glass-hover rounded-2xl p-6 sm:p-8 border border-white/[0.08] max-w-2xl mx-auto text-left"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                  Send a Quick Brief
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Replies within 24 hours &bull; Free initial consultation
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available now
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs text-zinc-400 mb-1.5 font-mono">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs text-zinc-400 mb-1.5 font-mono">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors"
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="contact-message" className="block text-xs text-zinc-400 mb-1.5 font-mono">
                What are we building? *
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your product idea, timeline, or goals..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/25 transition-colors resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                {submitted
                  ? "Opening your email client with the brief..."
                  : `Or email directly at ${profile.email}`}
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
              >
                Send Message &rarr;
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
