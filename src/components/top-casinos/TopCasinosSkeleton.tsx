export default function TopCasinosSkeleton() {
  return (
    <section id="top-casinos-section" className="top-casinos-section section container" aria-busy>
      <h2 className="h2-heading" aria-hidden>
        Top Casinos
      </h2>
      <div className="offers-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 260,
              height: 300,
              borderRadius: 8,
              background: "#1f1f1f",
              outline: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
    </section>
  );
}


