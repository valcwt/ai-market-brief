"use client";
// src/app/page.tsx
import { useState } from "react";
import Header from "@/components/Header";
import GenerateButton from "@/components/GenerateButton";
import BriefCard from "@/components/BriefCard";
import SourcesList from "@/components/SourcesList";
import StatusBar from "@/components/StatusBar";

export interface BriefData {
  brief: {
    summary: string;
    sentiment: "bullish" | "bearish" | "neutral";
    keyPoints: string[];
    model: string;
  };
  sources: { title: string; source: string; pubDate: string }[];
  generatedAt: string;
}

type State = "idle" | "loading" | "done" | "error";

export default function Home() {
  const [state, setState] = useState<State>("idle");
  const [data, setData] = useState<BriefData | null>(null);
  const [error, setError] = useState<string>("");

  async function handleGenerate() {
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/brief", { method: "POST" });
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Unknown error");
      setData(json);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      setState("error");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", width: "100%" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <StatusBar state={state} generatedAt={data?.generatedAt} />
          <GenerateButton state={state} onClick={handleGenerate} />
        </div>

        {/* Idle state */}
        {state === "idle" && (
          <div className="animate-in" style={{
            border: "1px dashed var(--border)",
            borderRadius: 12,
            padding: "4rem 2rem",
            textAlign: "center",
            color: "var(--text-muted)",
          }}>
            <div style={{ fontSize: 40, marginBottom: "1rem" }}>⚡</div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.05em" }}>
              AWAITING SIGNAL
            </p>
            <p style={{ marginTop: "0.5rem", fontSize: 13, color: "var(--text-muted)" }}>
              Click Generate to fetch market data and run AI analysis
            </p>
          </div>
        )}

        {/* Loading skeletons */}
        {state === "loading" && (
          <div className="animate-in">
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
              <div className="skeleton" style={{ height: 16, width: "30%", marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 12, width: "100%", marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 12, width: "90%", marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 12, width: "75%" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "1rem" }}>
                  <div className="skeleton" style={{ height: 12, width: "80%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 12, width: "60%" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {state === "error" && (
          <div className="animate-in" style={{
            background: "var(--red-dim)",
            border: "1px solid rgba(255,77,106,0.2)",
            borderRadius: 12,
            padding: "1.5rem",
            color: "var(--red)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
          }}>
            ERROR: {error}
          </div>
        )}

        {/* Results */}
        {state === "done" && data && (
          <div>
            <BriefCard brief={data.brief} generatedAt={data.generatedAt} />
            <SourcesList sources={data.sources} />
          </div>
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)", fontSize: 12, fontFamily: "var(--font-mono)", borderTop: "1px solid var(--border)" }}>
        AI MARKET BRIEF — POWERED BY OPENROUTER · NOT FINANCIAL ADVICE
      </footer>
    </div>
  );
}
