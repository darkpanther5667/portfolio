"use client";

import { useEffect, useState } from "react";

const sectionIds = [
  "hero",
  "projects",
  "building",
  "services",
  "process",
  "stats",
  "about",
  "skills",
  "journey",
  "why-me",
  "contact",
];

export default function ScrollBackgroundShift() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        threshold: [0.25, 0.5],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2.5">
        {sectionIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Jump to ${id}`}
            className={` pointer-events-auto rounded-full transition-all duration-300 ${
              activeSection === id
                ? "w-1.5 h-5 bg-white/80"
                : "w-1.5 h-1.5 bg-white/15 hover:bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}