'use client'

const services = [
  {
    num: '01',
    icon: '📊',
    title: 'Financial Management, Auditing & Tax Administration Training',
    desc: 'Enhancing financial skills, auditing expertise, and tax administration capabilities for individuals and businesses to optimize performance and compliance.',
  },
  {
    num: '02',
    icon: '🎨',
    title: 'Branding & Market Visibility',
    desc: 'Develop your brand identity and market presence through innovative strategies and campaigns that attract attention and drive growth.',
  },
  {
    num: '03',
    icon: '🛠️',
    title: 'Internal Control & Business Systems',
    desc: 'Implement robust internal controls and efficient business systems to improve accuracy, accountability, and operational efficiency.',
  },
  {
    num: '04',
    icon: '📈',
    title: 'Business Development & Growth Strategy',
    desc: 'Create strategies for business expansion, market penetration, and sustainable growth to maximize opportunities and profitability.',
  },
  {
    num: '05',
    icon: '🚚',
    title: 'Procurement & Supply Chain Optimization',
    desc: 'Optimize your procurement processes and supply chain operations to reduce costs, increase efficiency, and ensure timely delivery.',
  },
  {
    num: '06',
    icon: '💡',
    title: 'Technical & Soft Skills Training',
    desc: 'Empower your team with technical expertise and soft skills that enhance productivity, collaboration, and overall performance.',
  },
]

export default function Services() {
  const scrollToContact = () => {
    const section = document.getElementById('contact')
    if (!section) return
    const y = section.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section id="services">
      <div className="section-header reveal">
        <div className="section-tag">What We Do</div>
        <h2>Our Core <em>Services</em></h2>
        <p>We provide practical, data-driven support that helps individuals and businesses become more efficient, profitable, and successful.</p>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <div key={s.num} className={`service-card reveal-scale stagger-${i + 1}`}>
            <div className="service-num">{s.num}</div>
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-link" onClick={scrollToContact}>Enquire Now →</span>
          </div>
        ))}
      </div>
    </section>
  )
}
