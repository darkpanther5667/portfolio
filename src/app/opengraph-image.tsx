import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 40%), radial-gradient(circle at bottom right, rgba(96,165,250,0.2), transparent 35%), linear-gradient(135deg, #050816 0%, #09111f 50%, #03060c 100%)",
          color: "#f8f8f8",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 26,
              color: "#cbd5e1",
            }}
          >
            Manas Agrawal
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: -3,
              maxWidth: 980,
            }}
          >
            Building intelligent products with code and AI.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {["FormLabs", "CodeSnap", "Grahbook", "Next.js", "OpenAI"].map((item) => (
            <div
              key={item}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
                fontSize: 24,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
