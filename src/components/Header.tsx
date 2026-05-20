// src/components/Header.tsx
export default function Header() {
  return (
    <header style={{
      borderBottom: "1px solid var(--border)",
      padding: "1rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      background: "rgba(9,11,15,0.85)",
      backdropFilter: "blur(12px)",
      zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "var(--accent-dim)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}>⚡</div>
        <div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--accent)",
            letterSpacing: "0.08em",
          }}>AI MARKET BRIEF</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            INTELLIGENCE DASHBOARD v1.0
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase()}
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: "var(--accent)",
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
            animation: "pulse-dot 2s ease-in-out infinite",
            display: "inline-block",
          }} />
          LIVE
        </div>
      </div>
    </header>
  );
}
