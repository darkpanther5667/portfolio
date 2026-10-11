"use client";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top architectural aurora beam (Linear / Raycast style) */}
      <div
        className="absolute -top-[280px] left-1/2 -translate-x-1/2 w-[900px] md:w-[1300px] h-[650px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.09) 0%, rgba(99, 102, 241, 0.08) 38%, rgba(99, 102, 241, 0.02) 65%, transparent 80%)",
        }}
      />

      {/* Subtle secondary warm-indigo ambient glow */}
      <div
        className="hidden md:block absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(165, 180, 252, 0.045) 0%, transparent 70%)",
        }}
      />

      {/* Radially masked fine architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 25%, #000 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 25%, #000 20%, transparent 100%)",
        }}
      />
    </div>
  );
}