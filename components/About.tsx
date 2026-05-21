export default function About() {
  return (
    <section id="about">
      <div className="about-grid">
        {/* Visual Card */}
        <div className="about-visual reveal-left">
          <div className="about-card-main">
            <div className="about-inner-content">
              <div className="about-icon-big">🏛️</div>
              <h3>Excellence in Management</h3>
              <p>Empowering businesses</p>
            </div>
          </div>
          <div className="about-card-float">✦ Trusted Partner<br />for Growth</div>
        </div>

        {/* Text Content */}
        <div className="about-text reveal-right">
          <div className="section-header">
            <div className="section-tag">About Us</div>
            <h2> <em>Bah</em> Management Solutions</h2>
          </div>

          <p>
            Bah Management Solutions is a strategic business consulting firm that helps businesses,
            institutions, and entrepreneurs overcome financial inefficiencies, weak internal controls,
            stagnant growth, poor brand visibility, and supply chain challenges. We provide integrated
            consulting solutions across finance, auditing, business development, branding, and
            procurement empowering our clients to achieve profitability, accountability, operational
            excellence, and competitive market positioning.
          </p>

          <p>
            Unlike traditional consultants who address problems in isolation, we examine every aspect
            of the business and base our advice on real data and evidence, ensuring sustainable growth
            and long-term impact.
          </p>

        </div>
      </div>
    </section>
  )
}

