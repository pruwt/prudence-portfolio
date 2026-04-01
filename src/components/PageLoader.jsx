export default function PageLoader() {
  return (
    <div
      className="min-h-screen bg-[#F9F2ED] flex items-center justify-center"
      style={{ paddingTop: "64px" }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div
          className="animate-spin"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "2.5px solid rgba(186,6,61,0.12)",
            borderTopColor: "#BA063D",
          }}
        />
        {/* Pulse dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#BA063D",
                opacity: 0.3,
                animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.15; transform: scale(0.8); }
          40%            { opacity: 0.9;  transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
