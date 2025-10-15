export default function TopCasinosSkeleton() {
  return (
    <section
      id="top-casinos-section"
      className="top-casinos-section section container"
      aria-busy
    >
      <h2 className="h2-heading" aria-hidden>
        Top Casinos
      </h2>
      <div className="offers-grid skeleton-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    </section>
  );
}
