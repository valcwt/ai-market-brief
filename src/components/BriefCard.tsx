// src/components/BriefCard.tsx
type Sentiment = "bullish" | "bearish" | "neutral";

interface BriefCardProps {
  brief: {
    summary: string;
    sentiment: Sentiment;
    keyPoints: string[];
    model: string;
  };
  generatedAt: string;
}

const SENTIMENT_CONFIG = {
  bullish: { label: "BULLISH", color: "var(--accent)", bg: "var(--accent-dim)", icon: "▲" },
  bearish: { label: "BEARISH", color: "var(--red)", bg: "var(--red-dim)", icon: "▼" },
  neutral: { label: "NEUTRAL", color: "var(--amber)", bg: "var(--amber-dim)", icon: "◆" },
};

export default function BriefCard({ brief, generatedAt }: BriefCardProps) {
  const sentiment = SENTIMENT_CONFIG[brief.sentiment] ?? SENTIMENT_CONFIG.neutral;
  const time = new Date(generatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="animate-in" style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      marginBottom: "1.25rem",
      overflow: "hidden",
    }}>
      {/* Card header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.25rem",
        borderBottom: "1px solid var(--border)",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            MORNING BRIEF · {time}
          </span>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 8px",
            borderRadius: 4,
            background: sentiment.bg,
            color: sentiment.color,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}>
            {sentiment.icon} {sentiment.label}
          </span>
        </div>
        <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
          {brief.model === "demo-mode" ? "DEMO MODE" : brief.model.split("/").pop()?.replace(":free", "").toUpperCase()}
        </span>
      </div>

      {/* Summary */}
      <div style={{ padding: "1.25rem" }}>
        <p style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: "var(--text)",
          marginBottom: "1.5rem",
          borderLeft: `3px solid ${sentiment.color}`,
          paddingLeft: "1rem",
        }}>
          {brief.summary}
        </p>

        {/* Key points */}
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            KEY POINTS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.625rem" }}>
            {brief.keyPoints.map((point, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.625rem",
                padding: "0.75rem 1rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 13,
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 11, marginTop: 2, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
