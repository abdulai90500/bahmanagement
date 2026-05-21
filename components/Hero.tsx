import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-inner">
        <div className="hero-img-wrapper reveal-left">
          <Image
            src="/images/ma.png"
            alt="Bah Management Solutions professional consultant"
            className="hero-image"
            width={520}
            height={600}
            priority
          />
        </div>
        <div className="hero-content reveal-right stagger-1">
          <h1>
            Bah <em>Management</em>
            <br />Solutions
          </h1>
          <p className="hero-sub">
            Bah Management Solutions delivers comprehensive business advisory,
            financial management, and organizational development services
            tailored for growth-focused enterprises.
          </p>
        </div>
      </div>
    </section>
  )
}

