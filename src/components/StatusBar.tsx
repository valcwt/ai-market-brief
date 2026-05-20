// src/components/StatusBar.tsx
type State = "idle" | "loading" | "done" | "error";

export default function StatusBar({ state, generatedAt }: { state: State; generatedAt?: string }) {
  const configs = {
    idle: { label: "READY", color: "var(--text-muted)", dot: "var(--text-muted)" },
    loading: { label: "FETCHING DATA...", color: "var(--amber)", dot: "var(--amber)" },
    done: { label: generatedAt ? `GENERATED AT ${new Date(generatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}` : "DONE", color: "var(--accent)", dot: "var(--accent)" },
    error: { label: "ERROR — RETRY", color: "var(--red)", dot: "var(--red)" },
  };

  const cfg = configs[state];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: cfg.color,
      letterSpacing: "0.06em",
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: cfg.dot,
        display: "inline-block",
        animation: state === "loading" ? "pulse-dot 1s ease-in-out infinite" : "none",
      }} />
      {cfg.label}
    </div>
  );
}
