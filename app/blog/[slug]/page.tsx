'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BlogPost } from '@/types/blog'
import Link from 'next/link'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const saved = localStorage.getItem('bah_blog_posts')
    if (saved) {
      try {
        const posts: BlogPost[] = JSON.parse(saved)
        const found = posts.find((p) => p.slug === slug)
        if (found) {
          setPost(found)
        }
      } catch (e) {
        console.error(e)
      }
    }
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <>
        <Navbar isLoggedIn={false} onAdminClick={() => router.push('/#admin')} onLogout={() => {}} />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading...
        </div>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Navbar isLoggedIn={false} onAdminClick={() => router.push('/#admin')} onLogout={() => {}} />
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <h2>Post not found</h2>
          <Link href="/blog" className="btn-primary">Return to Blog</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar isLoggedIn={false} onAdminClick={() => router.push('/#admin')} onLogout={() => {}} />
      <article style={{ paddingTop: '120px', minHeight: '80vh', padding: '120px 5% 60px', maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontWeight: 600 }}>
          ← Back to all posts
        </Link>
        
        <div className="section-tag">{post.category}</div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: '1rem 0 2rem', lineHeight: 1.2 }}>{post.emoji} {post.title}</h1>
        
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--muted)', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
          <span>✍️ By {post.author}</span>
          <span>📅 Published {post.date}</span>
        </div>

        {post.mediaUrl && (
          <div style={{ marginBottom: '3rem', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            {post.mediaType === 'video' ? (
              <video src={post.mediaUrl} controls style={{ width: '100%', display: 'block' }} />
            ) : (
              <img src={post.mediaUrl} alt={post.title} style={{ width: '100%', display: 'block' }} />
            )}
          </div>
        )}

        <div className="post-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)' }}>
          {/* If the user uses paragraphs or line breaks, we can render them here. For now, just split by newlines. */}
          {post.content.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
          ))}
        </div>
      </article>
      <Footer />
    </>
  )
}
