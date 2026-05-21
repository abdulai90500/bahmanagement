export default function VisionMission() {
  return (
    <section id="vmc" className="vmc-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Our Purpose</div>
          <h2>Vision, Mission &amp; <em>Core Values</em></h2>
        </div>

        <div className="vmc-grid">
          {/* Vision */}
          <div className="vmc-card reveal-scale stagger-1">
            <h3>Vision</h3>
            <p>
              To be the trusted partner driving sustainable growth and competitiveness for businesses
              and entrepreneurs across Africa through solutions that use data and evidence to create
              meaningful results.
            </p>
          </div>

          {/* Mission */}
          <div className="vmc-card reveal-scale stagger-2">
            <h3>Mission</h3>
            <p>
              To deliver innovative, reliable, and practical consulting solutions in finance, auditing,
              business development, branding, and procurement, enabling our clients to improve
              profitability, strengthen accountability, optimize operations, and expand market reach.
            </p>
          </div>

          {/* Core Values */}
          <div className="vmc-card reveal-scale stagger-3">
            <h3>Core Values</h3>
            <ul className="core-values">
              <li>Integrity</li>
              <li>Excellence</li>
              <li>Innovation</li>
              <li>Collaboration</li>
              <li>Accountability</li>
              <li>Sustainability</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
