'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface NavbarProps {
  isLoggedIn: boolean
  onAdminClick: () => void
  onLogout: () => void
}

export default function Navbar({ isLoggedIn, onAdminClick, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('navbar')
      if (nav) {
        nav.style.boxShadow =
          window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none'
      }
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const section = document.getElementById(id)
    if (!section) return
    const yOffset = -80
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav id="navbar">
      <div className="nav-logo" onClick={(e) => {
        if (window.location.pathname !== '/') {
          window.location.href = '/'
        } else {
          scrollToSection(e, 'home')
        }
      }}>
        <Image src="/images/logo.png" alt="Bah Management Solutions Logo" className="logo-img" width={50} height={50} />
        <span>Bah Management Solutions</span>
      </div>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
        <li><a href="/#home" onClick={(e) => {
          if (window.location.pathname !== '/') {
            window.location.href = '/#home'
          } else {
            scrollToSection(e, 'home')
          }
        }}>Home</a></li>
        <li><a href="/#about" onClick={(e) => {
          if (window.location.pathname !== '/') {
            window.location.href = '/#about'
          } else {
            scrollToSection(e, 'about')
          }
        }}>About</a></li>
        <li><a href="/#services" onClick={(e) => {
          if (window.location.pathname !== '/') {
            window.location.href = '/#services'
          } else {
            scrollToSection(e, 'services')
          }
        }}>Services</a></li>
        <li><a href="/#contact" onClick={(e) => {
          if (window.location.pathname !== '/') {
            window.location.href = '/#contact'
          } else {
            scrollToSection(e, 'contact')
          }
        }}>Contact</a></li>

      </ul>

      <button
        className="hamburger"
        id="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  )
}

