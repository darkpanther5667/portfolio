export const maxDuration = 30;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return Response.json({ error: "No message provided" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return Response.json({
      reply:
        "Hey! This AI chat needs an OpenRouter API key to work. Drop me an email at hello@example.com in the meantime!",
    });
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://portfolio-tan-zeta-1lewuen7gr.vercel.app",
        "X-Title": "Portfolio AI Chat",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for a developer's portfolio website. You help visitors learn about the developer.

About the developer:
- Role: AI Product Builder & Full Stack Developer
- Skills: Next.js, TypeScript, React, Node.js, PostgreSQL, Prisma, AI/LLM integration, TailwindCSS, Framer Motion
- Current projects: FormLabs (visual form builder), CodeSnap (AI code screenshot tool), JEE OS (AI exam prep)
- Services: Web app development, AI integration, full-stack consulting
- Process: Discovery → Design & Prototype → Build & Iterate → Deliver & Deploy
- Availability: Open for freelance work, free consultation available
- Contact: hello@example.com, GitHub: darkpanther5667

Rules:
- Be enthusiastic and helpful
- Keep responses concise (2-4 sentences)
- If asked about hiring, encourage them to reach out via email
- If asked about rates, say "varies by project scope — best to discuss on a free call"
- Be honest — if you don't know something, say so
- Never mention you're an AI unless asked directly`,
          },
          { role: "user", content: message },
        ],
        max_tokens: 300,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("OpenRouter error:", data);
      return Response.json({
        reply: "The AI service is temporarily unavailable. Please email me at hello@example.com!",
      });
    }

    const reply = data.choices?.[0]?.message?.content;
    return Response.json({ reply: reply || "No response generated." });
  } catch (err) {
    console.error("AI chat error:", err);
    return Response.json(
      { reply: "Sorry, I hit a hiccup! Please try again or email me at hello@example.com." },
      { status: 500 }
    );
  }
}
