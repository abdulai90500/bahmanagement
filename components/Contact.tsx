'use client'
import { useState } from 'react'

export default function Contact() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  
  const [submitted, setSubmitted] = useState(false)
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setValidationError('Please fill in all required fields.')
      return
    }

    // Basic email format check
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.')
      return
    }

    setValidationError('')
    setSubmitted(true)
  }

  return (
    <section id="contact">
      <div className="section-header reveal">
        <div className="section-tag">Get in Touch</div>
        <h2>Let&apos;s Work <em>Together</em></h2>
      </div>
      
      <div className="contact-wrapper">
        {/* Info Column */}
        <div className="contact-info reveal-left">
          <h3>Ready to Transform Your Business?</h3>
          <p>
            Whether you&apos;re looking to optimize operations, develop strategy, or navigate complex
            business challenges, our team is ready to help.
          </p>

          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-detail">
              <strong>Office Address</strong>
              <span>6 Old Railway Line, Brookfields, Freetown, Sierra Leone</span>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <div className="contact-detail">
              <strong>Phone Numbers</strong>
              <span>+232 74873450 / +232 80947443</span>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">✉️</div>
            <div className="contact-detail">
              <strong>Email Address</strong>
              <span>bahmanagementsolution@gmail.com</span>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">🕐</div>
            <div className="contact-detail">
              <strong>Business Hours</strong>
              <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
            </div>
          </div>
        </div>

        {/* Interactive Form Column */}
        <div className="reveal-right" style={{ width: '100%' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="post-form" style={{ background: 'var(--dark3)', border: '1px solid rgba(90, 150, 220, 0.2)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif', fontSize: '1.4rem' }}>
                Send us a Message
              </h3>

              {validationError && (
                <div className="login-error show" style={{ marginBottom: '1rem' }}>
                  ⚠️ {validationError}
                </div>
              )}

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Service Interested In</label>
                <select value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="">Select a service...</option>
                  <option>Strategic Management</option>
                  <option>Financial Advisory</option>
                  <option>Operations Consulting</option>
                  <option>HR & Talent Development</option>
                  <option>Risk Management</option>
                  <option>Digital Transformation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project or challenge..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          ) : (
            <div className="form-success show" style={{ height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--dark3)', border: '1px solid var(--gold)', borderRadius: '8px', padding: '3rem', textAlign: 'center' }}>
              <div className="check" style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--white)' }}>
                Message Received!
              </h3>
              <p style={{ color: 'var(--muted)', maxWidth: '400px', lineHeight: '1.6' }}>
                Thank you for reaching out, <strong>{fullName}</strong>. Our team will review your enquiry about <strong>{service || 'our consulting solutions'}</strong> and get back to you within 24 hours.
              </p>
              <button 
                className="btn-outline" 
                style={{ marginTop: '2rem', padding: '10px 24px', fontSize: '0.8rem' }}
                onClick={() => {
                  setSubmitted(false)
                  setFullName('')
                  setEmail('')
                  setService('')
                  setMessage('')
                }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
