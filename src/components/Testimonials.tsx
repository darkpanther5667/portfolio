"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Your Name Here",
    role: "Future Client",
    text: "This could be your testimonial. Building trust one project at a time.",
    placeholder: true,
  },
  {
    name: "Your Name Here",
    role: "Future Collaborator",
    text: "A great experience working together on innovative projects.",
    placeholder: true,
  },
  {
    name: "Your Name Here",
    role: "Future Partner",
    text: "Professional, creative, and dedicated to delivering exceptional results.",
    placeholder: true,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14 text-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            What people{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              say
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-hover rounded-2xl p-6 md:p-7 flex flex-col"
            >
              <div className="text-5xl text-accent/20 font-serif leading-none mb-4 select-none">
                &quot;
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6 border-l-2 border-accent/20 pl-4">
                {t.text}
              </p>
              <div className="border-t border-white/[0.06] pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-sm text-gray-600 font-medium">?</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{t.name}</div>
                    <div className="text-xs text-gray-600">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
