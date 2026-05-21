'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import VisionMission from '@/components/VisionMission'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoginModal from '@/components/LoginModal'
import AdminPanel from '@/components/AdminPanel'


import { BlogPost } from '@/types/blog'

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "5 Strategic Pillars Every Growing Business Needs",
    slug: "5-strategic-pillars-every-growing-business-needs",
    category: "Strategy",
    excerpt: "Discover the foundational strategies that separate high-growth companies from the rest in today's competitive landscape.",
    content: "Building a successful business requires more than just a great product or service. It demands robust systems, disciplined execution, and a clear long-term roadmap. The 5 pillars are: 1. Financial Discipline, 2. Brand Authority, 3. Strong Internal Systems, 4. Agile Strategy, and 5. Talent Transformation. Implementing these guarantees sustainable scaling.",
    author: "A. Bangura",
    date: "Dec 10, 2024",
    emoji: "📊"
  },
  {
    id: 2,
    title: "Financial Planning in an Uncertain Economic Climate",
    slug: "financial-planning-in-an-uncertain-economic-climate",
    category: "Finance",
    excerpt: "How to build financial resilience and navigate volatility with smart planning frameworks and adaptive budgeting.",
    content: "Economic shifts are inevitable, but business failure is not. By moving away from rigid annual budgets toward rolling forecasts and scenario planning, organizations can pivot dynamically when conditions change. Establish a 6-month cash reserve, stress-test your supply chains, and prioritize high-margin services to build true institutional resilience.",
    author: "A. Koroma",
    date: "Nov 28, 2024",
    emoji: "💰"
  },
  {
    id: 3,
    title: "Building a High-Performance Culture in African Enterprises",
    slug: "building-a-high-performance-culture-in-african-enterprises",
    category: "HR",
    excerpt: "The unique challenges and proven approaches to cultivating excellence within African organizational contexts.",
    content: "A company is only as good as its people. Elevating output in growth markets involves alignment of personal incentives with corporate key results, heavy investment in technical and soft-skills training, and setting extreme standards of performance accountability coupled with empathy. Creating transparency eliminates organizational drag and fuels exponential growth.",
    author: "F. Sesay",
    date: "Nov 15, 2024",
    emoji: "🌍"
  }
]

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  // Load and sync posts and login state from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('bah_blog_posts')
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts))
      } catch (e) {
        setPosts(DEFAULT_POSTS)
      }
    } else {
      setPosts(DEFAULT_POSTS)
      localStorage.setItem('bah_blog_posts', JSON.stringify(DEFAULT_POSTS))
    }

    const loginState = localStorage.getItem('bah_admin_logged_in')
    if (loginState === 'true') {
      setIsAdminLoggedIn(true)
    }

    // Check URL to automatically trigger admin panel
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      if (loginState === 'true') {
        setIsAdminOpen(true)
      } else {
        setIsLoginOpen(true)
      }
    }
  }, [])

  // Save posts to localStorage whenever they change
  const handleSavePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts)
    localStorage.setItem('bah_blog_posts', JSON.stringify(newPosts))
  }

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true)
    localStorage.setItem('bah_admin_logged_in', 'true')
    setIsLoginOpen(false)
    setIsAdminOpen(true)
  }

  // Handle logout
  const handleLogout = () => {
    setIsAdminLoggedIn(false)
    setIsAdminOpen(false)
    localStorage.removeItem('bah_admin_logged_in')
  }

  // IntersectionObserver reveal scroll transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Select all reveal elements on render
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [posts]) // Re-run when posts change to observe new post cards

  // Close modals on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLoginOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Navbar
        isLoggedIn={isAdminLoggedIn}
        onAdminClick={() => {
          if (isAdminLoggedIn) {
            setIsAdminOpen(true)
          } else {
            setIsLoginOpen(true)
          }
        }}
        onLogout={handleLogout}
      />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <Contact />
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onLogout={handleLogout}
        posts={posts}
        onSavePosts={handleSavePosts}
      />
    </>
  )
}
