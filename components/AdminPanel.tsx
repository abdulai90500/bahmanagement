'use client'
import { useState, useEffect } from 'react'
import { BlogPost } from '@/types/blog'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  posts: BlogPost[]
  onSavePosts: (newPosts: BlogPost[]) => void
}

type TabType = 'dashboard' | 'new-post' | 'manage-posts'

export default function AdminPanel({ isOpen, onClose, onLogout, posts, onSavePosts }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [toastMessage, setToastMessage] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  // Form states
  const [postTitle, setPostTitle] = useState('')
  const [postCat, setPostCat] = useState('Strategy')
  const [postEmoji, setPostEmoji] = useState('📊')
  const [postExcerpt, setPostExcerpt] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postAuthor, setPostAuthor] = useState('BAH Editorial')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string>('')
  const [mediaType, setMediaType] = useState<'image' | 'video' | undefined>(undefined)
  const [isPublishing, setIsPublishing] = useState(false)

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  // Prevent background scroll when admin dashboard is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // Trigger floating notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setToastShow(true)
    setTimeout(() => setToastShow(false), 3000)
  }

  // Clear Editor fields
  const clearForm = () => {
    setPostTitle('')
    setPostExcerpt('')
    setPostContent('')
    setPostEmoji('📊')
    setPostAuthor('BAH Editorial')
    setMediaFile(null)
    setMediaPreviewUrl('')
    setMediaType(undefined)
    setEditingId(null)
  }

  // Handle File selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMediaFile(file)
    const type = file.type.startsWith('video/') ? 'video' : 'image'
    setMediaType(type)

    // Create local preview
    const objectUrl = URL.createObjectURL(file)
    setMediaPreviewUrl(objectUrl)
  }

  // Create or Update Blog Post
  const handlePublish = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      triggerToast('Title and content are required.')
      return
    }

    setIsPublishing(true)
    let uploadedMediaUrl = mediaPreviewUrl // might be a previous upload url if editing
    let currentMediaType = mediaType

    // If there is a new file to upload
    if (mediaFile) {
      const formData = new FormData()
      formData.append('file', mediaFile)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.success) {
          uploadedMediaUrl = data.url
        } else {
          triggerToast('File upload failed.')
          setIsPublishing(false)
          return
        }
      } catch (err) {
        console.error('Upload error', err)
        triggerToast('File upload error.')
        setIsPublishing(false)
        return
      }
    }

    const generatedSlug = generateSlug(postTitle)

    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

    if (editingId !== null) {
      // Editing Mode
      const updated = posts.map((p) => {
        if (p.id === editingId) {
          return {
            ...p,
            title: postTitle.trim(),
            slug: generatedSlug,
            category: postCat,
            excerpt: postExcerpt.trim() || postTitle.trim(),
            content: postContent.trim(),
            author: postAuthor.trim() || 'BAH Editorial',
            emoji: postEmoji.trim() || '📊',
            mediaUrl: uploadedMediaUrl || p.mediaUrl,
            mediaType: currentMediaType || p.mediaType
          }
        }
        return p
      })
      onSavePosts(updated)
      setEditingId(null)
      triggerToast('Post updated successfully!')
    } else {
      // Create Mode
      const newPost: BlogPost = {
        id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
        title: postTitle.trim(),
        slug: generatedSlug,
        category: postCat,
        excerpt: postExcerpt.trim() || postTitle.trim(),
        content: postContent.trim(),
        author: postAuthor.trim() || 'BAH Editorial',
        date: formattedDate,
        emoji: postEmoji.trim() || '📊',
        mediaUrl: uploadedMediaUrl || undefined,
        mediaType: currentMediaType || undefined
      }
      onSavePosts([newPost, ...posts])
      triggerToast('Post published successfully!')
    }

    clearForm()
    setActiveTab('manage-posts')
    setIsPublishing(false)
  }

  // Delete Post
  const handleDelete = (id: number) => {
    if (confirm('Delete this post permanently?')) {
      const filtered = posts.filter((p) => p.id !== id)
      onSavePosts(filtered)
      triggerToast('Post deleted.')
    }
  }

  // Setup Edit Form
  const handleEditSetup = (p: BlogPost) => {
    setEditingId(p.id)
    setPostTitle(p.title)
    setPostCat(p.category)
    setPostExcerpt(p.excerpt)
    setPostContent(p.content)
    setPostAuthor(p.author)
    setPostEmoji(p.emoji)
    setMediaPreviewUrl(p.mediaUrl || '')
    setMediaType(p.mediaType)
    setMediaFile(null)
    setActiveTab('new-post')
    triggerToast('Loaded into editor. Make changes and click Publish.')
  }

  return (
    <div id="admin-panel" className="admin-page open" style={{ zIndex: 4000, position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      {/* Topbar */}
      <div className="admin-topbar">
        <h2 style={{ cursor: 'pointer' }} onClick={onClose}>BAH Admin Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>👤 Administrator</span>
          <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem', color: 'var(--dark)', borderColor: 'rgba(0,0,0,0.2)' }} onClick={onLogout}>
            Sign Out
          </button>
          <button className="modal-close" style={{ position: 'relative', top: 0, right: 0, fontSize: '1.25rem' }} onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      {/* Admin Panel Body */}
      <div className="admin-body">
        {/* Sidebar Navigation */}
        <div className="admin-sidebar">
          <div className={`admin-nav-item${activeTab === 'dashboard' ? ' active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <span>📊</span><span>Dashboard</span>
          </div>
          <div className={`admin-nav-item${activeTab === 'new-post' ? ' active' : ''}`} onClick={() => setActiveTab('new-post')}>
            <span>✏️</span><span>{editingId !== null ? 'Edit Post' : 'New Post'}</span>
          </div>
          <div className={`admin-nav-item${activeTab === 'manage-posts' ? ' active' : ''}`} onClick={() => setActiveTab('manage-posts')}>
            <span>📋</span><span>Manage Posts</span>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="admin-tab active">
              <h3>Dashboard Overview</h3>
              <p>Welcome back! Here&apos;s a quick snapshot of your blog.</p>
              <div className="admin-stats-grid">
                <div className="admin-stat">
                  <div className="num">{posts.length}</div>
                  <div className="label">Total Posts</div>
                </div>
                <div className="admin-stat">
                  <div className="num">✅</div>
                  <div className="label">Status: Online</div>
                </div>
                <div className="admin-stat">
                  <div className="num">{new Date().getFullYear()}</div>
                  <div className="label">Current Year</div>
                </div>
              </div>
              <div style={{ background: 'var(--white)', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', borderRadius: '8px', padding: '1.5rem', maxWidth: '600px' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>Quick Actions</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={() => { clearForm(); setActiveTab('new-post'); }}>
                    + Write New Post
                  </button>
                  <button className="btn-outline" style={{ color: 'var(--dark)', borderColor: 'rgba(0,0,0,0.2)' }} onClick={() => setActiveTab('manage-posts')}>
                    View All Posts
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* New Post / Editor Tab */}
          {activeTab === 'new-post' && (
            <div className="admin-tab active">
              <h3>{editingId !== null ? 'Edit Blog Post' : 'Write New Post'}</h3>
              <p>{editingId !== null ? 'Modify and publish your blog post changes.' : 'Create a new blog post that will appear on the website.'}</p>
              <div className="post-form">
                <div className="form-group">
                  <label>Post Title *</label>
                  <input
                    type="text"
                    placeholder="Enter an engaging title..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select value={postCat} onChange={(e) => setPostCat(e.target.value)}>
                      <option>Strategy</option>
                      <option>Finance</option>
                      <option>HR</option>
                      <option>Operations</option>
                      <option>Technology</option>
                      <option>Leadership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Emoji / Icon</label>
                    <input
                      type="text"
                      placeholder="📊"
                      value={postEmoji}
                      maxLength={4}
                      onChange={(e) => setPostEmoji(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Excerpt (short summary)</label>
                  <input
                    type="text"
                    placeholder="A brief summary shown in blog listing..."
                    value={postExcerpt}
                    onChange={(e) => setPostExcerpt(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Full Content *</label>
                  <textarea
                    placeholder="Write your full article here..."
                    value={postContent}
                    rows={8}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Author Name</label>
                  <input
                    type="text"
                    placeholder="e.g. A. Bangura"
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Cover Media (Image or Video)</label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                  {mediaPreviewUrl && (
                    <div style={{ marginTop: '1rem', maxWidth: '300px' }}>
                      {mediaType === 'video' ? (
                        <video src={mediaPreviewUrl} controls style={{ width: '100%', borderRadius: '8px' }} />
                      ) : (
                        <img src={mediaPreviewUrl} alt="Preview" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                      )}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={handlePublish} disabled={isPublishing}>
                    {isPublishing ? 'Publishing...' : editingId !== null ? 'Update Post' : 'Publish Post'}
                  </button>
                  <button className="btn-outline" style={{ color: 'var(--dark)', borderColor: 'rgba(0,0,0,0.2)' }} onClick={clearForm}>
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manage Posts Tab */}
          {activeTab === 'manage-posts' && (
            <div className="admin-tab active">
              <h3>Manage Posts</h3>
              <p>Edit or delete existing blog posts.</p>
              <div className="blog-posts-list" id="adminPostsList">
                {posts.map((p) => (
                  <div key={p.id} className="post-item">
                    <div className="post-item-info">
                      <h4>{p.emoji} {p.title}</h4>
                      <span>{p.category} · {p.date} · By {p.author}</span>
                    </div>
                    <div className="post-actions">
                      <button className="btn-sm edit" onClick={() => handleEditSetup(p)}>
                        Edit
                      </button>
                      <button className="btn-sm delete" onClick={() => handleDelete(p.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <p style={{ color: 'var(--muted)', padding: '2rem 0' }}>No posts yet. Write your first post!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Success Toast Alert */}
      <div className={`success-toast${toastShow ? ' show' : ''}`} style={{ zIndex: 5000 }}>
        {toastMessage}
      </div>
    </div>
  )
}
