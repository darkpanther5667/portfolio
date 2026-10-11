"use client";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="hidden md:block absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full animate-pulse-glow"
        style={{
          animationDelay: "-2s",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-1/3 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="hidden md:block absolute -bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="hidden md:block absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}