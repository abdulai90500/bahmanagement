'use client'

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const section = document.getElementById(id)
    if (!section) return
    const yOffset = -80
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ cursor: 'default' }}>
            Bah<span> Management Solutions</span>
          </div>
          <p>
            Delivering strategic excellence and transformative management solutions for businesses
            across Sierra Leone and West Africa.
          </p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a>Strategic Management</a></li>
            <li><a>Financial Advisory</a></li>
            <li><a>Operations Consulting</a></li>
            <li><a>HR Development</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a>Privacy Policy</a></li>
            <li><a>Terms of Service</a></li>
            <li><a>Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-marquee-container">
        <div className="footer-marquee">
          <span>BAH MANAGEMENT SOLUTIONS ✦ STRATEGIC EXCELLENCE ✦ FINANCIAL ADVISORY ✦ OPERATIONS CONSULTING ✦ BUSINESS DEVELOPMENT ✦</span>
          <span>BAH MANAGEMENT SOLUTIONS ✦ STRATEGIC EXCELLENCE ✦ FINANCIAL ADVISORY ✦ OPERATIONS CONSULTING ✦ BUSINESS DEVELOPMENT ✦</span>
          <span>BAH MANAGEMENT SOLUTIONS ✦ STRATEGIC EXCELLENCE ✦ FINANCIAL ADVISORY ✦ OPERATIONS CONSULTING ✦ BUSINESS DEVELOPMENT ✦</span>
          <span>BAH MANAGEMENT SOLUTIONS ✦ STRATEGIC EXCELLENCE ✦ FINANCIAL ADVISORY ✦ OPERATIONS CONSULTING ✦ BUSINESS DEVELOPMENT ✦</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BAH Management Solutions. All rights reserved.</span>
        <span style={{ color: 'var(--gold)' }}></span>
      </div>
    </footer>
  )
}

