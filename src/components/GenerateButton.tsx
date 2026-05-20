// src/components/GenerateButton.tsx
type State = "idle" | "loading" | "done" | "error";

export default function GenerateButton({ state, onClick }: { state: State; onClick: () => void }) {
  const isLoading = state === "loading";

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.625rem 1.25rem",
        background: isLoading ? "var(--accent-dim)" : "var(--accent)",
        color: isLoading ? "var(--accent)" : "#000",
        border: isLoading ? "1px solid var(--border-accent)" : "none",
        borderRadius: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.06em",
        cursor: isLoading ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          GENERATING...
        </>
      ) : (
        <>
          ⚡ GENERATE MORNING BRIEF
        </>
      )}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: "spin 1s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="20" strokeDashoffset="10" />
    </svg>
  );
}
