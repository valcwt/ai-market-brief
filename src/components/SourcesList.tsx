// src/components/SourcesList.tsx

interface Source {
  title: string;
  source: string;
  pubDate: string;
}

export default function SourcesList({ sources }: { sources: Source[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="animate-in delay-1" style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "0.875rem 1.25rem",
        borderBottom: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: "var(--text-muted)",
        letterSpacing: "0.1em",
      }}>
        SOURCE HEADLINES — {sources.length} SIGNALS PROCESSED
      </div>

      <div style={{ padding: "0.75rem" }}>
        {sources.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.625rem 0.75rem",
              borderRadius: 6,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", minWidth: 0 }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                marginTop: 3,
                flexShrink: 0,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {item.title}
              </span>
            </div>
            <span style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
              marginTop: 3,
              flexShrink: 0,
            }}>
              {item.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
