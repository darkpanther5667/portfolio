"use client";


const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Prisma", "PostgreSQL", "TailwindCSS", "Vercel", "OpenAI",
  "Claude AI", "Git", "Docker",
];

const pillVariants = {
  hidden: { opacity: 1, scale: 1, y: 0 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export default function TechStack() {
  return (
    <section id="skills" className="py-24 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Tools I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              work with
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="px-4 py-2.5 rounded-full border border-white/[0.06] cursor-default hover:scale-105 hover:-translate-y-1 transition-all duration-200"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            >
              <span className="text-sm md:text-base text-gray-200 font-medium">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
