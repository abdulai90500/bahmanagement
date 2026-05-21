export interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  author: string
  date: string
  emoji: string
  mediaUrl?: string
  mediaType?: 'image' | 'video'
}
