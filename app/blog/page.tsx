'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BlogPost } from '@/types/blog'

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('bah_blog_posts')
    if (saved) {
      try {
        setPosts(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  return (
    <>
      <Navbar isLoggedIn={false} onAdminClick={() => window.location.href = '/#admin'} onLogout={() => {}} />
      <section style={{ paddingTop: '120px', minHeight: '80vh', padding: '120px 5% 60px' }}>
        <div className="section-header reveal">
          <div className="section-tag">Insights & News</div>
          <h2>Our <em>Blog</em></h2>
          <p>Read the latest insights from BAH Management Solutions.</p>
        </div>

        <div className="blog-grid">
          {posts.map((p, i) => (
            <Link href={`/blog/${p.slug}`} key={p.id} style={{ textDecoration: 'none' }}>
              <div className={`blog-card reveal stagger-${(i % 6) + 1}`}>
                {p.mediaUrl ? (
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    {p.mediaType === 'video' ? (
                      <video src={p.mediaUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={p.mediaUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                ) : (
                  <div className="blog-img" style={{ background: 'var(--dark3)', height: '200px' }}>
                    <span style={{ fontSize: '4rem' }}>{p.emoji}</span>
                  </div>
                )}
                <div className="blog-body">
                  <div className="blog-category">{p.category}</div>
                  <div className="blog-meta">
                    <span>📅 {p.date}</span>
                    <span>✍️ {p.author}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginTop: '2rem' }}>No blog posts available yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
