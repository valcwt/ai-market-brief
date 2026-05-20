// src/app/api/brief/route.ts
// POST /api/brief — fetches news and generates AI market brief

import { NextResponse } from "next/server";
import { fetchFinancialNews } from "@/lib/fetchNews";
import { generateMarketBrief } from "@/lib/openrouter";

export const runtime = "nodejs";
export const maxDuration = 30; // 30s timeout for Vercel free tier

export async function POST() {
  try {
    // Step 1: Fetch financial news
    const news = await fetchFinancialNews();
    const headlines = news.map((n) => n.title);

    // Step 2: Generate AI brief
    const brief = await generateMarketBrief(headlines);

    // Step 3: Return combined result
    return NextResponse.json({
      success: true,
      brief,
      sources: news.slice(0, 8),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Brief generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate brief" },
      { status: 500 }
    );
  }
}
