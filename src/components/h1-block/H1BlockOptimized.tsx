"use client";

// Inline critical CSS for maximum performance
const criticalCSS = `
  .h1-section-optimized {
    display: flex;
    justify-content: center;
    margin: -76px auto 136px auto;
    content-visibility: auto;
    contain-intrinsic-size: auto 96px;
  }
  .h1-section-optimized h1 {
    font-family: var(--font-secondary);
    font-weight: 900;
    color: #ffffff;
    font-size: 28px;
    text-transform: uppercase;
    background-color: #2a2a2c;
    border-radius: 8px;
    padding: 23px;
    max-width: 1120px;
    width: 100%;
    text-align: center;
    content-visibility: auto;
    contain-intrinsic-size: auto 96px;
  }
  @media (max-width: 1180px) {
    .h1-section-optimized h1 {
      max-width: 828px;
    }
  }
  @media (max-width: 913px) {
    .h1-section-optimized h1 {
      max-width: 544px;
    }
  }
  @media (max-width: 768px) {
    .h1-section-optimized {
      margin: 64px auto;
      contain-intrinsic-size: auto 72px;
    }
    .h1-section-optimized h1 {
      font-size: 20px;
      margin: -24px 40px 0;
      max-width: 496px;
      padding: 16px;
      contain-intrinsic-size: auto 72px;
    }
  }
  @media (max-width: 380px) {
    .h1-section-optimized h1 {
      margin: 0 20px;
    }
  }
`;

export default function H1BlockOptimized() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      <section id="h1-section" className="h1-section-optimized">
        <h1>HIGHROLLER CASINO – LEVEL UP YOUR GAMING ADVENTURE</h1>
      </section>
    </>
  );
}
