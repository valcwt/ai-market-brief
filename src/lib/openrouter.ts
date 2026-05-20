// src/lib/openrouter.ts
// Calls OpenRouter API with free models (DeepSeek, Llama, Mistral)

export interface BriefResult {
  summary: string;
  sentiment: "bullish" | "bearish" | "neutral";
  keyPoints: string[];
  model: string;
}

// Free models available on OpenRouter (no credit card needed for these)
const FREE_MODELS = [
  "deepseek/deepseek-r1:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
];

export async function generateMarketBrief(headlines: string[]): Promise<BriefResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "your_openrouter_api_key_here") {
    // Return a demo brief if no API key is set
    return getDemoBrief();
  }

  const headlinesText = headlines.map((h, i) => `${i + 1}. ${h}`).join("\n");

  const prompt = `You are a professional financial analyst. Based on these market headlines, generate a concise morning market brief.

HEADLINES:
${headlinesText}

Respond ONLY with valid JSON in this exact format:
{
  "summary": "2-3 sentence executive summary of market conditions",
  "sentiment": "bullish" or "bearish" or "neutral",
  "keyPoints": ["point 1", "point 2", "point 3", "point 4"]
}`;

  let lastError: Error | null = null;

  for (const model of FREE_MODELS) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-market-brief.vercel.app",
          "X-Title": "AI Market Brief",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          temperature: 0.3,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`OpenRouter ${res.status}: ${err}`);
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content ?? "";

      // Strip markdown code fences if present
      const jsonStr = content.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(jsonStr);

      return {
        summary: parsed.summary ?? "No summary available.",
        sentiment: parsed.sentiment ?? "neutral",
        keyPoints: parsed.keyPoints ?? [],
        model,
      };
    } catch (err) {
      lastError = err as Error;
      continue; // Try next model
    }
  }

  console.error("All OpenRouter models failed:", lastError);
  return getDemoBrief();
}

function getDemoBrief(): BriefResult {
  return {
    summary:
      "Markets open with a cautious tone as investors weigh Fed commentary against resilient earnings data. The ES and NQ futures are showing modest gains in pre-market, though upside momentum remains limited ahead of this week's macro data releases.",
    sentiment: "neutral",
    keyPoints: [
      "Fed maintains higher-for-longer stance — watch 10Y yields",
      "Tech sector outperforming; semis leading the Nasdaq",
      "Dollar strength weighing on commodities and EM assets",
      "Key levels: ES 5,250 support, NQ 18,400 pivot zone",
    ],
    model: "demo-mode",
  };
}
