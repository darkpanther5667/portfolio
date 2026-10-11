import { profile } from "@/lib/profile";

export const maxDuration = 30;

function getBuiltInReply(message: string): string {
  const q = message.toLowerCase();
  if (q.includes("built") || q.includes("project") || q.includes("work") || q.includes("grahbook") || q.includes("formlabs") || q.includes("codesnap")) {
    return `${profile.name} has built Grahbook (an AI-powered WhatsApp commerce & UPI platform for Indian merchants), FormLabs (a visual drag-and-drop form builder with 1-click React/HTML export), and CodeSnap (an AI code screenshot & explanation tool). He is also currently building JEE OS and an AI Study Planner.`;
  }
  if (q.includes("stack") || q.includes("skill") || q.includes("tech")) {
    return `${profile.name} specializes in Next.js, TypeScript, React, Node.js, PostgreSQL, Prisma, Firebase, TailwindCSS, Framer Motion, and AI/LLM integrations using OpenAI and GPT-4o-mini.`;
  }
  if (q.includes("hire") || q.includes("available") || q.includes("freelance") || q.includes("rate") || q.includes("cost")) {
    return `Yes! ${profile.name} is currently available for freelance projects, full-stack product builds, and AI integrations. Rates depend on project scope — reach out at ${profile.email} or use the Contact section for a free initial consultation!`;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return `You can reach ${profile.name} directly at ${profile.email}, on GitHub (@${profile.githubHandle}), LinkedIn, or X (@agrawalmanas150), or by filling out the Quick Brief form in the Contact section.`;
  }
  return `${profile.name} is an ${profile.role} who ships full-stack web apps and AI products like Grahbook, FormLabs, and CodeSnap. Feel free to ask about his projects, tech stack, or how to hire him (${profile.email})!`;
}

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return Response.json({ error: "No message provided" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return Response.json({
      reply: getBuiltInReply(message),
    });
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://manasagrawal.online",
        "X-Title": "Portfolio AI Chat",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for a developer's portfolio website. You help visitors learn about the developer.

About the developer:
- Name: ${profile.name}
- Role: ${profile.role}
- Skills: Next.js, TypeScript, React, Node.js, PostgreSQL, Prisma, Firebase, AI/LLM integration, TailwindCSS, Framer Motion
- Shipped projects: Grahbook (WhatsApp commerce & UPI platform for Indian merchants), FormLabs (visual drag-and-drop form builder), CodeSnap (AI code screenshot tool)
- In R&D: JEE OS (AI exam prep platform), AI Study Planner
- Services: Web app development, AI integration, full-stack consulting
- Process: Discovery → Design & Prototype → Build & Iterate → Deliver & Deploy
- Availability: Open for freelance work, free consultation available
- Contact: Email: ${profile.email} | GitHub: ${profile.githubHandle}

Rules:
- Be enthusiastic and helpful
- Keep responses concise (2-4 sentences)
- If asked about hiring, encourage them to reach out via ${profile.email} or the contact form
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
        reply: getBuiltInReply(message),
      });
    }

    const reply = data.choices?.[0]?.message?.content;
    return Response.json({ reply: reply || getBuiltInReply(message) });
  } catch (err) {
    console.error("AI chat error:", err);
    return Response.json({ reply: getBuiltInReply(message) });
  }
}
