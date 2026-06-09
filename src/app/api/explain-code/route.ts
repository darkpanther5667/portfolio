import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { code, language } = await req.json();

  if (!code) {
    return Response.json({ error: "No code provided" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({
      explanation:
        "AI explanation requires an OpenAI API key. Set OPENAI_API_KEY in your environment variables to enable this feature.",
    });
  }

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a senior software engineer. Explain what this ${language} code does in 3-4 concise sentences. Focus on purpose, key patterns, and interesting techniques. Be direct — no fluff.`,
      prompt: `Explain this ${language} code:\n\n${code}`,
    });

    return Response.json({ explanation: result.text });
  } catch (err) {
    console.error("AI explain error:", err);
    return Response.json(
      { explanation: "Failed to analyze code. Check your API key and try again." },
      { status: 500 }
    );
  }
}
